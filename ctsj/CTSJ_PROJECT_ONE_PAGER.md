# Civic Tech Saint John (CTSJ) — Platform One-Pager
## Volunteer Talent Roster & Projects Sync Platform

> **Partner:** Civic Tech Saint John (Supported by Human Development Council)  
> **Meetings:** Tuesdays 6:30–8:00 PM @ Social Enterprise Hub (139 Prince Edward St, Saint John, NB)  
> **Core Objective:** Zero-cost, privacy-compliant Google-backed platform to intake volunteers, match skills to community initiatives, and synchronize active project statuses with Google Sheets.  
> **Timeline:** Work progresses based on contributor availability. **Target Completion: Tue Dec 1, 6:00 PM.**

---

## 1. System Screenshots

````carousel
![Desktop Intake Form](/Users/ctsj-contributor/.gemini/antigravity/brain/cceb7f8b-5d56-4821-8f55-da1294f5e838/screenshot_desktop.png)
<!-- slide -->
![Mobile Intake Form](/Users/ctsj-contributor/.gemini/antigravity/brain/cceb7f8b-5d56-4821-8f55-da1294f5e838/screenshot_mobile.png)
<!-- slide -->
![Volunteer Members Database](/Users/ctsj-contributor/.gemini/antigravity/brain/cceb7f8b-5d56-4821-8f55-da1294f5e838/screenshot_members_db.png)
<!-- slide -->
![Projects Database & Sync Hub](/Users/ctsj-contributor/.gemini/antigravity/brain/cceb7f8b-5d56-4821-8f55-da1294f5e838/screenshot_projects_db.png)
````

* **Desktop Form ([screenshot_desktop.png](./docs/images/screenshot_desktop.png)):** 2-column minimalist layout with official CTSJ power logo at top, skill chips with `✕` dismiss, floating autocomplete, availability pills, and **Submit button anchored at the very bottom**.
* **Mobile Form ([screenshot_mobile.png](./docs/images/screenshot_mobile.png)):** Responsive smartphone layout with **Submit button anchored at the very bottom**.
* **Volunteer Members Database ([screenshot_members_db.png](./docs/images/screenshot_members_db.png)):** Searchable member talent roster with name, email, role, city, skill tags, availability, and CASL verification.
* **Projects Database & Sync Hub ([screenshot_projects_db.png](./docs/images/screenshot_projects_db.png)):** Active community initiatives table linked to Google Sheets with live sync timestamps.

---

## 2. Infrastructure: Google Cloud "Always Free" Tier (No Registration Needed)

Because Civic Tech Saint John is an unincorporated volunteer club, the system uses Google's standard **"Always Free" Tier**. This requires **no registered charity status, no corporate paperwork, and zero cost ($0.00)**:

| Google Tool | Free Tier Monthly/Daily Quota | CTSJ Expected Usage | Cost |
| :--- | :--- | :--- | :--- |
| **Cloud Firestore (DB)** | **50,000 reads/day**, **20,000 writes/day**, 1GB storage | ~50–100 reads/writes on meeting nights (<1% quota) | **$0.00** |
| **Cloud Functions** | **2,000,000 free invocations/month** | ~500 invocations/month (<0.1% quota) | **$0.00** |
| **BigQuery (Analytics)** | **10 GB storage**, **1 TB query processing/month** | ~5 MB storage, <1 GB queries | **$0.00** |
| **Google Sheets & Scripts** | Free with any standard Google account (20,000 webhook fetches/day) | ~50 edits/week | **$0.00** |
| **Firebase Web Hosting** | 10 GB storage, 360 MB/day transfer, free SSL | ~10 MB storage, <50 MB/day | **$0.00** |

*All services run under a standard Google/Gmail account with a $0 budget alert configured to prevent unexpected charges.*

---

## 3. Specifications & System Rules

1. **Permanent Entry Point:** Permanent QR code on projector screens & table tents pointing to `civictechsaintjohn.ca/join`.
2. **Form Validation:**
   * **Mandatory:** `email` *(normalized lowercase)*, `firstName`, `lastName`, Terms checkbox.
   * **Optional:** `tel` (phone), `role`, `city`, `skills` (tags), `availability` (days & slots), CASL opt-in.
3. **Smart Returning Member Lookup:** Typing an existing email recognizes the volunteer, pre-populates their saved skills and availability for fast editing—**zero extra check-in friction**.
4. **Skills Input:** Autocomplete search with individual `✕` delete buttons (`React ✕`, `Python ✕`, `GIS ✕`). Includes an understated text link to paste a bio or resume and auto-extract skills.
5. **Availability:** Segmented pill toggles across 7 days (`Mon`–`Sun`) and 3 time slots (`Morning`, `Afternoon`, `Evening`).
6. **Shared Laptop Kiosk Mode (`?mode=kiosk`):** 10-second auto-reset countdown after submission and browser autofill suppression to protect privacy on shared welcome table laptops.
7. **Google Sheets Sync:** Project leads update the Google Sheet; an `onEdit` webhook updates Firestore in `< 2 seconds`.
8. **Canadian Compliance:** Encrypted at rest (AES-256) and in transit (TLS 1.3) under **PIPEDA**. Explicit opt-in checkbox and audit logging under **CASL**.

---

## 4. Delivery & Staged Deliverables

Work progresses modularly **based on contributor availability**.  
**Target Completion: Tue Dec 1, 6:00 PM** *(ready for the 6:30 PM meeting at Social Enterprise Hub)*.

| Deliverable Link | Purpose |
| :--- | :--- |
| **1-Page PDF Document** | [CTSJ_PLATFORM_ONE_PAGER.pdf](./CTSJ_PLATFORM_ONE_PAGER.pdf) | Complete, print-ready PDF one-pager with screenshots. |
| **Interactive Prototype** | [ctsj_interactive_mockups.html](./docs/ctsj_interactive_mockups.html) | Interactive 4-in-1 browser prototype (Desktop, Mobile, DBs). |
| **React Component** | [VolunteerIntakeForm.jsx](./frontend/VolunteerIntakeForm.jsx) | Clean React component with bottom submit button & official logo. |
| **Cloud Function API** | [cloud_functions_sample.js](./backend/cloud_functions_sample.js) | Node.js backend endpoints for email lookup, upsert, and Sheets sync. |
| **Google Sheets Script** | [google_apps_script_sync.js](./scripts/google_apps_script_sync.js) | Google Sheet `onEdit` auto-sync webhook script. |
| **Official Logos** | [ctsj_logo_dark.png](./docs/images/ctsj_logo_dark.png) / [ctsj_logo.svg](./docs/images/ctsj_logo.svg) | Official transparent and vector logo assets. |
