# Civic Tech Saint John (CTSJ) — 3-Engineer Collaboration & Contribution Guide

> **Team Size:** 3 Software Engineers  
> **Target Timeline:** 1 to 2 Sprints (Ready for Tuesday Hack Night)  
> **Development Model:** Contract-First, Trunk-Based Monorepo  

---

## 1. Optimal Role Division (3 Clear Lanes)

To avoid stepping on each other's toes and eliminate merge conflicts, divide the workload into three distinct ownership areas:

```
+-----------------------------------+-----------------------------------+-----------------------------------+
| ENGINEER 1: FRONTEND & UX         | ENGINEER 2: BACKEND & CLOUD       | ENGINEER 3: INTEGRATIONS & DEVOPS |
+-----------------------------------+-----------------------------------+-----------------------------------+
| • Responsive Web Form             | • Google Cloud & Firebase Setup   | • Google Sheets Project CMS       |
|   (Mobile + Desktop 2-column)     | • Firestore Collections & Schemas | • Google Apps Script Webhook      |
| • Municipal Autocomplete          | • Cloud Functions API (Node.js)   | • Organizer Querying & Looker BI  |
| • Skill Chips & Smart Bio Parser  | • Firestore Security Rules (RBAC) | • QR Assets & WordPress Route     |
| • 7-Day Availability Grid         | • PII Encryption & CASL Audit     | • CI/CD Deployment Pipeline       |
| • Kiosk Mode (Auto-reset timer)   | • API Contract Mocking            | • End-to-End Testing & Staging    |
+-----------------------------------+-----------------------------------+-----------------------------------+
```

---

## 2. Recommended Repository Structure (Monorepo)

Keep everything in a single GitHub repository (`CivicTechSaintJohn/ctsj-roster` or `projects/ctsj`) with isolated directories:

```text
ctsj/
├── frontend/                 # Owned by Engineer 1
│   ├── src/
│   │   ├── components/       # Form, SkillChips, AvailabilityGrid, KioskTimer
│   │   ├── lib/              # skills_parser.js, api_client.js
│   │   └── App.jsx
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                  # Owned by Engineer 2
│   ├── functions/            # Cloud Functions (index.js, handlers)
│   ├── firestore.rules       # Security rules (least-privilege PII protection)
│   ├── firestore.indexes.json
│   └── package.json
│
├── integrations/             # Owned by Engineer 3
│   ├── apps_script/          # google_apps_script_sync.js (Sheet onEdit webhook)
│   ├── looker_studio/        # BigQuery queries for volunteer/skills reports
│   └── qr/                   # High-res permanent vector QR codes
│
├── docs/                     # Shared documentation & architecture maps
│   └── images/               # UI mockups & slide templates
│
└── .github/workflows/        # CI/CD (GitHub Actions -> Firebase / Vercel)
```

---

## 3. The "Contract-First" Collaboration Strategy

The biggest bottleneck in small teams is the frontend engineer waiting on the backend to be deployed. Solve this on **Day 1** by locking in the JSON API Contract:

### Endpoint 1: `POST /checkVolunteerEmail`
```json
// Request
{ "email": "jane@example.com" }

// Response (If found)
{
  "exists": true,
  "profile": {
    "firstName": "Jane",
    "lastName": "Doe",
    "tel": "+15065550199",
    "role": "volunteer",
    "city": "Saint John, NB",
    "skills": ["python", "react"],
    "availability": { "days": ["tuesday"], "slots": { "tuesday": ["evening"] } }
  }
}
```

### Endpoint 2: `POST /submitVolunteerProfile`
```json
// Request
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "tel": "+15065550199",
  "role": "volunteer",
  "city": "Saint John, NB",
  "skills": ["python", "gis_mapping"],
  "availability": { ... },
  "termsAccepted": true,
  "caslEmailOptIn": true
}
// Response
{ "success": true, "isUpdate": false }
```

> **Why this matters:** Engineer 1 can mock this API in `localStorage` or with a 5-line local mock file and build 100% of the UI immediately while Engineer 2 configures the live Google Cloud environment.

---

## 4. Sprint Schedule & Milestones (2-Week Plan)

### Week 1: Core Build (Parallel Work)
* **Day 1 (All 3):** 30-minute sync. Agree on the architecture map, JSON API contracts, and GitHub repo setup.
* **Days 2–4:**
  * **Engineer 1:** Builds the desktop & mobile web forms, integrates `skills_parser.js`, and builds the availability matrix.
  * **Engineer 2:** Provisions Google Cloud project, creates Firestore schema, deploys `checkVolunteerEmail` and `submitVolunteerProfile` endpoints with CASL audit logging.
  * **Engineer 3:** Sets up the `Active Projects` Google Sheet, installs the Apps Script `onEdit` trigger, and sets up GitHub Actions CI/CD to deploy the frontend to Firebase Hosting / Cloudflare Pages.
* **Day 5 (Integration Day):** Connect frontend to the live Cloud Functions. Verify real-time email lookup and profile upsert.

### Week 2: Edge Cases, Kiosk Mode & Deployment
* **Days 6–7:**
  * **Engineer 1:** Adds `?mode=kiosk` 10-second auto-reset timer and autofill suppression for the on-site laptop.
  * **Engineer 2:** Locks down Firestore Security Rules (ensures PII is not readable by public unauthenticated calls).
  * **Engineer 3:** Connects BigQuery streaming export and builds the organizer query filter (e.g., filter volunteers by skill + Tuesday evening + Saint John).
* **Day 8:** Full dry run with all 3 engineers testing both mobile QR scanning and the desktop laptop kiosk.
* **Day 9 (Tuesday Meetup):** Live debut at the Social Enterprise Hub (139 Prince Edward St)!

---

## 5. Team Git & PR Workflow
1. **Main Branch Protected:** Nobody pushes directly to `main`.
2. **Branch Naming:**
   * `feat/frontend-availability-grid`
   * `feat/backend-email-lookup`
   * `feat/sheets-sync-webhook`
3. **PR Rule:** Every PR requires at least **1 review approval** from a teammate before merging.
4. **Automated Previews:** Set up PR preview deployments (e.g. Firebase Hosting Preview Channels or Vercel Previews) so the team can click and test features directly on their phones before merging!
