# OpportunityGuide

An accessible opportunity navigation prototype for low-income, disabled, and low-education users.

## Features

- English-first interface with live language switching for English, Spanish, and Chinese.
- Simple profile form: name, city or ZIP code, and preferred language.
- Choice-based guided intake: one plain-language question at a time.
- User need classification: jobs, skills, mental health support, money basics, body/access needs, and career support.
- Personalized recommendations:
  - Quick-start jobs: remote support, data entry, cashier, cleaning, food service, warehouse, auto shop helper, carpentry helper, caregiver roles.
  - Free skill paths: basic computer use, customer service, auto repair, carpentry safety, caregiving, English, budgeting, credit, and scam prevention.
  - Support resources: 988, FindTreatment.gov, NAMI, Ticket to Work, job centers, and Goodwill.
  - Career guidance: resume help, interview practice, disability accommodation templates, scam checks, and daily job-search tasks.
- Accessibility controls: large text, high contrast, plain-language mode, and read-current-question.
- Action plan generation with copy and print/PDF support.

## How to Use

Open `index.html` directly in a browser.

You can also preview with a local server:

```powershell
py -m http.server 8787 --bind 127.0.0.1
```

Then visit:

```text
http://127.0.0.1:8787/index.html
```

## Test

```powershell
node --check app.js
node --check test-app.js
node test-app.js
```

## Note

This is a resource navigation prototype. It does not provide medical, legal, or investment advice. If a user may hurt themselves or is in crisis, they should contact 988 or local emergency services first.
