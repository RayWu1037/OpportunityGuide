const fs = require("node:fs");
const vm = require("node:vm");

class FakeClassList {
  constructor() {
    this.values = new Set();
  }

  add(value) {
    this.values.add(value);
  }

  remove(value) {
    this.values.delete(value);
  }

  toggle(value) {
    if (this.values.has(value)) {
      this.values.delete(value);
      return false;
    }
    this.values.add(value);
    return true;
  }

  contains(value) {
    return this.values.has(value);
  }
}

class FakeElement {
  constructor(id = "", tag = "div") {
    this.id = id;
    this.tag = tag;
    this.children = [];
    this.dataset = {};
    this.attributes = {};
    this.listeners = {};
    this.className = "";
    this.classList = new FakeClassList();
    this.textContent = "";
    this.value = "";
    this.disabled = false;
    this.hidden = false;
    this._innerHTML = "";
  }

  set innerHTML(value) {
    this._innerHTML = value;
    if (value === "") this.children = [];
  }

  get innerHTML() {
    return this._innerHTML;
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  addEventListener(type, handler) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(handler);
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  getAttribute(name) {
    return this.attributes[name] || null;
  }

  remove() {
    this.removed = true;
  }

  async click() {
    const handlers = this.listeners.click || [];
    await Promise.all(handlers.map((handler) => handler({ preventDefault() {} })));
  }

  async dispatch(type) {
    const handlers = this.listeners[type] || [];
    await Promise.all(handlers.map((handler) => handler({ preventDefault() {} })));
  }

  querySelectorAll(selector) {
    if (selector === "li") {
      const matches = [...this._innerHTML.matchAll(/<li>(.*?)<\/li>/g)];
      return matches.map((match) => {
        const item = new FakeElement("", "li");
        item.textContent = match[1].replace(/<[^>]*>/g, "");
        return item;
      });
    }
    return [];
  }
}

const ids = [
  "profileForm",
  "userName",
  "userLocation",
  "userLanguage",
  "questionTitle",
  "questionText",
  "storyStep",
  "optionGrid",
  "whyText",
  "stateList",
  "todayTasks",
  "recommendations",
  "backBtn",
  "skipBtn",
  "restartBtn",
  "copyPlanBtn",
  "printBtn",
  "largeTextBtn",
  "contrastBtn",
  "simpleBtn",
  "readBtn",
  "freeInputBox",
  "freeInputLabel",
  "freeInput",
  "freeInputBtn",
];

const elements = Object.fromEntries(ids.map((id) => [id, new FakeElement(id)]));
elements.userLanguage.value = "zh";
elements.simpleBtn.attributes["aria-pressed"] = "true";

const tabs = ["jobs", "skills", "support", "career"].map((name) => {
  const tab = new FakeElement("", "button");
  tab.dataset.tab = name;
  if (name === "jobs") tab.classList.add("active");
  return tab;
});

const context = {
  console,
  tabs,
  setTimeout(callback) {
    callback();
  },
  document: {
    body: new FakeElement("body", "body"),
    getElementById(id) {
      return elements[id] || new FakeElement(id);
    },
    createElement(tag) {
      return new FakeElement("", tag);
    },
    querySelectorAll(selector) {
      if (selector === ".tab") return tabs;
      return [];
    },
  },
  window: {
    print() {},
    speechSynthesis: {
      cancel() {},
      speak() {},
    },
  },
  navigator: {
    clipboard: {
      async writeText(text) {
        context.copiedText = text;
      },
    },
  },
  copiedText: "",
  SpeechSynthesisUtterance: function SpeechSynthesisUtterance(text) {
    this.text = text;
  },
};

const appCode = fs.readFileSync("app.js", "utf8");
const testCode = `
async function clickOption(label) {
  const button = elements.optionGrid.children.find((child) => child.innerHTML.includes(label));
  if (!button) throw new Error("Missing option: " + label);
  await button.click();
}

(async () => {
  elements.userName.value = "Alex";
  elements.userLocation.value = "Chicago";
  elements.userLanguage.value = "bilingual";
  await elements.profileForm.dispatch("submit");

  await clickOption("我想尽快找工作");
  await clickOption("越快越好");
  await clickOption("坐着或远程工作");
  await clickOption("需要坐着或远程");
  await clickOption("没有经验");
  await clickOption("帮我做简历");
  await clickOption("先找工作");

  if (!elements.questionTitle.textContent.includes("机会路径已经生成")) {
    throw new Error("Did not reach done screen");
  }
  if (!state.goals.includes("job")) throw new Error("Job goal missing");
  if (!state.bodyNeeds.includes("sit_or_remote")) throw new Error("Remote body need missing");
  if (!state.supportNeeds.includes("resume")) throw new Error("Resume support missing");
  if (!elements.todayTasks.innerHTML.includes("申请")) throw new Error("Job task missing");
  if (!elements.todayTasks.innerHTML.includes("简历")) throw new Error("Resume task missing");
  if (!elements.recommendations.innerHTML.includes("远程客服") && !elements.recommendations.innerHTML.includes("数据录入")) {
    throw new Error("Expected remote-friendly job recommendation missing");
  }

  await tabs.find((tab) => tab.dataset.tab === "skills").click();
  if (!elements.recommendations.innerHTML.includes("基础电脑")) {
    throw new Error("Expected skill recommendation missing");
  }

  await elements.largeTextBtn.click();
  await elements.contrastBtn.click();
  if (!document.body.classList.contains("large-text")) throw new Error("Large text toggle failed");
  if (!document.body.classList.contains("high-contrast")) throw new Error("Contrast toggle failed");

  await elements.copyPlanBtn.click();
  if (!globalThis.copiedText.includes("向上路行动计划") || !globalThis.copiedText.includes("推荐工作")) {
    throw new Error("Copied plan is incomplete");
  }

  globalThis.__result = {
    title: elements.questionTitle.textContent,
    tasks: elements.todayTasks.querySelectorAll("li").map((item) => item.textContent),
    copiedLength: globalThis.copiedText.length,
    activeTab,
  };
})().catch((error) => {
  globalThis.__error = error.stack || String(error);
});
`;

vm.runInNewContext(`${appCode}\n${testCode}`, context);

setImmediate(() => {
  if (context.__error) {
    console.error(context.__error);
    process.exit(1);
  }
  console.log(JSON.stringify(context.__result, null, 2));
});
