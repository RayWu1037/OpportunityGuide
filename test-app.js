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

  toggle(value, force) {
    if (typeof force === "boolean") {
      if (force) this.values.add(value);
      else this.values.delete(value);
      return force;
    }
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
    this.placeholder = "";
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

  async dispatch(type, event = {}) {
    const handlers = this.listeners[type] || [];
    await Promise.all(
      handlers.map((handler) =>
        handler({
          preventDefault() {},
          target: this,
          ...event,
        }),
      ),
    );
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
  "accessibilityPanel",
  "appTitle",
  "appSubtitle",
  "uiLanguageLabelText",
  "uiLanguageSelect",
  "profileForm",
  "userName",
  "userLocation",
  "userLanguage",
  "largeTextBtn",
  "contrastBtn",
  "readBtn",
  "profileTitle",
  "nameLabelText",
  "locationLabelText",
  "preferredLanguageLabelText",
  "saveProfileBtn",
  "guideTitle",
  "guideText",
  "stateTitle",
  "stateList",
  "restartBtn",
  "backBtn",
  "skipBtn",
  "whyTitle",
  "dashboardTitle",
  "todayTitle",
  "copyPlanBtn",
  "printBtn",
  "noticeText",
  "questionTitle",
  "questionText",
  "storyStep",
  "optionGrid",
  "whyText",
  "todayTasks",
  "recommendations",
  "printSummary",
  "freeInputBox",
  "freeInputLabelText",
  "freeInput",
  "freeInputBtn",
];

const elements = Object.fromEntries(ids.map((id) => [id, new FakeElement(id)]));
elements.uiLanguageSelect.value = "en";
elements.userLanguage.value = "en";

const tabs = ["jobs", "skills", "support", "career"].map((name) => {
  const tab = new FakeElement("", "button");
  tab.dataset.tab = name;
  if (name === "jobs") tab.classList.add("active");
  return tab;
});

const documentElement = new FakeElement("html", "html");
const context = {
  console,
  tabs,
  setTimeout(callback) {
    callback();
  },
  document: {
    title: "",
    documentElement,
    body: new FakeElement("body", "body"),
    getElementById(id) {
      return elements[id] || null;
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
async function clickOption(optionId) {
  const button = elements.optionGrid.children.find((child) => child.dataset.optionId === optionId);
  if (!button) throw new Error("Missing option: " + optionId);
  await button.click();
}

(async () => {
  if (state.uiLanguage !== "en") throw new Error("English is not the default language");
  if (!elements.questionTitle.textContent.includes("What help")) {
    throw new Error("Default question is not English");
  }
  if (!elements.recommendations.innerHTML.includes("Remote customer support")) {
    throw new Error("Default recommendations are not English");
  }

  elements.uiLanguageSelect.value = "es";
  await elements.uiLanguageSelect.dispatch("change");
  if (!elements.questionTitle.textContent.includes("¿Qué ayuda")) {
    throw new Error("Spanish switch did not update the current question");
  }
  if (!elements.recommendations.innerHTML.includes("Soporte al cliente")) {
    throw new Error("Spanish switch did not update recommendations");
  }

  elements.uiLanguageSelect.value = "zh";
  await elements.uiLanguageSelect.dispatch("change");
  if (!elements.questionTitle.textContent.includes("你现在")) {
    throw new Error("Chinese switch did not update the current question");
  }
  if (!elements.recommendations.innerHTML.includes("远程客服")) {
    throw new Error("Chinese switch did not update recommendations");
  }

  elements.uiLanguageSelect.value = "en";
  await elements.uiLanguageSelect.dispatch("change");
  elements.userLanguage.value = "es";
  await elements.userLanguage.dispatch("change");
  if (state.uiLanguage !== "en" || state.language !== "es") {
    throw new Error("Preferred language should not change interface language");
  }
  if (!elements.questionTitle.textContent.includes("What help")) {
    throw new Error("Preferred language changed the interface text");
  }

  await clickOption("learnSkill");
  if (activeTab !== "skills") {
    throw new Error("Learning path should automatically switch to the Skills tab");
  }
  await elements.restartBtn.click();

  await clickOption("mentalHelp");
  if (activeTab !== "support") {
    throw new Error("Mental health path should automatically switch to the Support tab");
  }
  await elements.restartBtn.click();

  elements.userName.value = "Alex";
  elements.userLocation.value = "Chicago";
  await elements.profileForm.dispatch("submit");
  if (state.uiLanguage !== "en" || state.language !== "es") {
    throw new Error("Profile save should keep interface and preferred language separate");
  }

  await clickOption("findJob");
  await clickOption("now");
  await clickOption("remoteWork");
  if (activeTab !== "jobs") {
    throw new Error("Job path should keep the Jobs tab active");
  }
  if (elements.optionGrid.children.some((child) => child.dataset.optionId === "sitRemote")) {
    throw new Error("Repeated sitting/remote option should not appear after remote work was selected");
  }
  await clickOption("noExperience");
  await clickOption("resume");
  await clickOption("jobsFirst");

  if (!elements.questionTitle.textContent.includes("Your opportunity path is ready")) {
    throw new Error("Did not reach the done screen");
  }
  if (!state.goals.includes("job")) throw new Error("Job goal missing");
  if (!state.bodyNeeds.includes("sit_or_remote")) throw new Error("Remote body need missing");
  if (!state.supportNeeds.includes("resume")) throw new Error("Resume support missing");
  if (!elements.todayTasks.innerHTML.includes("Apply to or save 2 jobs")) {
    throw new Error("English job task missing");
  }
  if (!elements.todayTasks.innerHTML.includes("one-page resume")) {
    throw new Error("English resume task missing");
  }

  await tabs.find((tab) => tab.dataset.tab === "skills").click();
  if (!elements.recommendations.innerHTML.includes("Basic computer")) {
    throw new Error("Expected English skill recommendation missing");
  }

  await tabs.find((tab) => tab.dataset.tab === "jobs").click();
  if (!elements.recommendations.innerHTML.includes("l=Chicago")) {
    throw new Error("Job recommendations should include the user's location in precise links");
  }
  if (!elements.recommendations.innerHTML.includes("entry%20level%20remote%20customer%20support")) {
    throw new Error("Job recommendations should include precise role search terms");
  }
  if (!elements.printSummary.innerHTML.includes("Printable Action Plan") || !elements.printSummary.innerHTML.includes("https://www.indeed.com/jobs")) {
    throw new Error("Printable summary should be concise and include precise links");
  }

  elements.uiLanguageSelect.value = "es";
  await elements.uiLanguageSelect.dispatch("change");
  if (!elements.questionTitle.textContent.includes("Tu ruta")) {
    throw new Error("Done screen did not translate to Spanish");
  }
  if (!elements.todayTasks.innerHTML.includes("Postula o guarda")) {
    throw new Error("Tasks did not translate to Spanish");
  }

  await elements.largeTextBtn.click();
  await elements.contrastBtn.click();
  if (!document.body.classList.contains("large-text")) throw new Error("Large text toggle failed");
  if (!document.body.classList.contains("high-contrast")) throw new Error("Contrast toggle failed");

  await elements.copyPlanBtn.click();
  if (!globalThis.copiedText.includes("Plan de acción de OpportunityGuide") || !globalThis.copiedText.includes("Trabajos recomendados")) {
    throw new Error("Copied Spanish plan is incomplete");
  }

  globalThis.__result = {
    currentLanguage: state.uiLanguage,
    title: elements.questionTitle.textContent,
    firstTask: elements.todayTasks.querySelectorAll("li")[0].textContent,
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
