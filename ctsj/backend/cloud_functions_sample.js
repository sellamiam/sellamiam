/**
 * Civic Tech Saint John (CTSJ) - Google Cloud Function Endpoints (v2.0)
 * Runtime: Node.js 20 (Google Cloud Functions / Cloud Run)
 */

const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

/**
 * 1. Email Lookup Endpoint (Real-Time Pre-Fill Check)
 * Called when volunteer enters their email to check if they already exist in the DB.
 */
exports.checkVolunteerEmail = async (req, res) => {
  // CORS setup
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).send("");

  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { email } = req.body;
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const docRef = db.collection("volunteers").doc(normalizedEmail);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(200).json({ exists: false });
    }

    const data = doc.data();
    // Return existing profile data so the volunteer can edit/update it
    return res.status(200).json({
      exists: true,
      message: "You are already in our database! Would you like to update your profile?",
      profile: {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        tel: data.tel || "",
        role: data.role || "volunteer",
        city: data.city || "Saint John, NB",
        skills: data.skills || [],
        availability: data.availability || { days: [], slots: {}, hoursPerWeek: "" },
        bioRawText: data.bioRawText || ""
      }
    });
  } catch (error) {
    console.error("Error checking email:", error);
    return res.status(500).json({ error: "Failed to query database" });
  }
};

/**
 * 2. Volunteer Intake & Profile Update Endpoint (Unified Submit)
 * Only firstName, lastName, and email are mandatory.
 * The rest (tel, role, city, skills, availability) are optional.
 */
exports.submitVolunteerProfile = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).send("");

  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const {
    email,
    firstName,
    lastName,
    tel,
    role,
    city,
    skills,
    availability,
    bioRawText,
    termsAccepted,
    caslEmailOptIn
  } = req.body;

  // Validation: Mandatory fields ONLY
  if (!email || !firstName || !lastName) {
    return res.status(400).json({
      error: "First Name, Last Name, and Email are mandatory."
    });
  }

  if (!termsAccepted) {
    return res.status(400).json({
      error: "You must accept the Community Terms & Conditions to proceed."
    });
  }

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const volunteerRef = db.collection("volunteers").doc(normalizedEmail);
    const existingDoc = await volunteerRef.get();
    const isUpdate = existingDoc.exists;

    const payload = {
      email: normalizedEmail,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      tel: tel ? tel.trim() : null,
      role: role || "volunteer",
      city: city ? city.trim() : "Saint John, NB",
      skills: Array.isArray(skills) ? skills : [],
      availability: availability || { days: [], slots: {}, hoursPerWeek: "" },
      bioRawText: bioRawText ? bioRawText.substring(0, 1000) : "",
      consent: {
        termsAccepted: true,
        termsVersion: "v1.0_2026",
        caslEmailOptIn: Boolean(caslEmailOptIn),
        caslConsentType: "express",
        consentTimestamp: new Date().toISOString()
      },
      updatedAt: FieldValue.serverTimestamp()
    };

    if (!isUpdate) {
      payload.createdAt = FieldValue.serverTimestamp();
      payload.status = "active";
    }

    await volunteerRef.set(payload, { merge: true });

    return res.status(200).json({
      success: true,
      isUpdate: isUpdate,
      message: isUpdate
        ? "Your profile has been successfully updated!"
        : "Welcome to Civic Tech Saint John! Your profile has been created."
    });
  } catch (error) {
    console.error("Error saving volunteer profile:", error);
    return res.status(500).json({ error: "Failed to save profile to database" });
  }
};

/**
 * 3. Webhook endpoint called by Google Sheets onEdit()
 */
exports.syncProjectWebhook = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const secretKey = req.headers["x-ctsj-secret-key"];
  if (!secretKey || secretKey !== process.env.CTSJ_API_SECRET) {
    return res.status(401).json({ error: "Unauthorized: Invalid secret key" });
  }

  const { projectId, name, status, leadName, leadEmail, neededSkills, repoUrl, communicationChannel, syncTimestamp } = req.body;

  if (!projectId) {
    return res.status(400).json({ error: "Missing required projectId" });
  }

  try {
    const projectRef = db.collection("projects").doc(projectId);
    await projectRef.set(
      {
        name,
        status: status || "ideation",
        leadName: leadName || "",
        leadEmail: leadEmail || "",
        neededSkills: Array.isArray(neededSkills) ? neededSkills : [],
        repoUrl: repoUrl || "",
        communicationChannel: communicationChannel || "",
        lastSyncedFromSheet: syncTimestamp || new Date().toISOString(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return res.status(200).json({ success: true, message: `Project ${projectId} synced successfully.` });
  } catch (error) {
    console.error("Firestore project sync error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
