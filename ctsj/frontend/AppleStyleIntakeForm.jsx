import React, { useState, useEffect, useRef } from "react";
import { SKILL_TAXONOMY, parseSkillsFromText, searchSkills } from "./skills_parser";

/**
 * Civic Tech Saint John (CTSJ) - Apple-Inspired Minimalist Intake Form
 * Designed with clean Apple Human Interface Guidelines:
 * - Neutral soft background (#F5F5F7), pure white elevated card (#FFFFFF)
 * - San Francisco / Inter typography, hairline 1px borders (#E5E5EA)
 * - Interactive Skill Autocomplete with individual '✕' deletion chips
 * - Understated, non-tacky availability toggles and inputs
 */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["Morning", "Afternoon", "Evening"];
const CITIES = [
  "Saint John, NB",
  "Rothesay, NB",
  "Quispamsis, NB",
  "Grand Bay-Westfield, NB",
  "Hampton, NB",
  "Fredericton, NB",
  "Moncton, NB",
  "Other / Remote",
];

export default function AppleStyleIntakeForm({ kioskMode = false }) {
  // Mandatory fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Optional fields
  const [tel, setTel] = useState("");
  const [role, setRole] = useState("Volunteer");
  const [city, setCity] = useState("Saint John, NB");
  const [selectedSkills, setSelectedSkills] = useState(["React", "Python"]);
  const [availability, setAvailability] = useState({
    days: ["Tue"],
    slots: { Tue: ["Evening"] },
    hoursPerWeek: "1-3 hrs",
  });
  const [caslEmailOptIn, setCaslEmailOptIn] = useState(false);

  // UI state
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [skillQuery, setSkillQuery] = useState("");
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [showBioModal, setShowBioModal] = useState(false);
  const [bioText, setBioText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [kioskCountdown, setKioskCountdown] = useState(10);

  const autocompleteRef = useRef(null);

  // Handle skill search autocomplete
  useEffect(() => {
    if (skillQuery.trim().length > 0) {
      const results = searchSkills(skillQuery).filter(
        (s) => !selectedSkills.includes(s.label)
      );
      setSkillSuggestions(results);
    } else {
      setSkillSuggestions([]);
    }
  }, [skillQuery, selectedSkills]);

  // Handle on-blur email lookup
  const handleEmailBlur = async () => {
    if (!email || !email.includes("@")) return;

    try {
      const res = await fetch("https://api.civictechsaintjohn.ca/checkVolunteerEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      const data = await res.json();

      if (data.exists && data.profile) {
        setIsExistingUser(true);
        if (data.profile.firstName) setFirstName(data.profile.firstName);
        if (data.profile.lastName) setLastName(data.profile.lastName);
        if (data.profile.tel) setTel(data.profile.tel);
        if (data.profile.role) setRole(data.profile.role);
        if (data.profile.city) setCity(data.profile.city);
        if (data.profile.skills?.length) setSelectedSkills(data.profile.skills);
        if (data.profile.availability) setAvailability(data.profile.availability);
      }
    } catch (err) {
      console.log("Lookup mock bypass", err);
    }
  };

  // Add / Remove Skills
  const addSkill = (skillLabel) => {
    if (!selectedSkills.includes(skillLabel)) {
      setSelectedSkills([...selectedSkills, skillLabel]);
    }
    setSkillQuery("");
    setSkillSuggestions([]);
  };

  const removeSkill = (skillLabel) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skillLabel));
  };

  // Extract from bio
  const handleBioExtract = () => {
    const extractedKeys = parseSkillsFromText(bioText);
    const newLabels = extractedKeys.map((k) => SKILL_TAXONOMY[k].label);
    const merged = Array.from(new Set([...selectedSkills, ...newLabels]));
    setSelectedSkills(merged);
    setShowBioModal(false);
    setBioText("");
  };

  // Toggle Day / Slot
  const toggleDay = (day) => {
    const days = availability.days.includes(day)
      ? availability.days.filter((d) => d !== day)
      : [...availability.days, day];
    setAvailability({ ...availability, days });
  };

  const toggleSlot = (day, slot) => {
    const currentSlots = availability.slots[day] || [];
    const updated = currentSlots.includes(slot)
      ? currentSlots.filter((s) => s !== slot)
      : [...currentSlots, slot];
    setAvailability({
      ...availability,
      slots: { ...availability.slots, [day]: updated },
    });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !termsAccepted) return;

    setSubmitting(true);
    // Submit API call...
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  // Kiosk Auto-Reset
  useEffect(() => {
    if (!submitted || !kioskMode) return;
    const interval = setInterval(() => {
      setKioskCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleReset();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted, kioskMode]);

  const handleReset = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setTel("");
    setRole("Volunteer");
    setCity("Saint John, NB");
    setSelectedSkills([]);
    setAvailability({ days: [], slots: {}, hoursPerWeek: "" });
    setTermsAccepted(false);
    setCaslEmailOptIn(false);
    setIsExistingUser(false);
    setSubmitted(false);
    setKioskCountdown(10);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6 font-sans antialiased text-[#1D1D1F]">
        <div className="bg-white max-w-md w-full rounded-3xl p-8 border border-[#E5E5EA] shadow-sm text-center">
          <div className="w-14 h-14 bg-[#E8F5E9] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-5 text-2xl">
            ✓
          </div>
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            {isExistingUser ? "Profile Updated" : "Welcome to Civic Tech"}
          </h2>
          <p className="text-[#86868B] text-sm mb-6 leading-relaxed">
            Thank you, {firstName}. Your profile has been securely saved to our community roster.
          </p>
          {kioskMode ? (
            <div className="space-y-4">
              <p className="text-xs text-[#86868B]">
                Screen will clear in <span className="font-semibold text-[#1D1D1F]">{kioskCountdown}s</span> for the next volunteer.
              </p>
              <button
                onClick={handleReset}
                className="w-full py-3 bg-[#1D1D1F] text-white rounded-xl text-sm font-medium hover:bg-black transition-colors"
              >
                Register Next Volunteer
              </button>
            </div>
          ) : (
            <button
              onClick={handleReset}
              className="text-sm font-medium text-[#0071E3] hover:underline"
            >
              Submit another response
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 font-sans antialiased text-[#1D1D1F]">
      <div className="max-w-3xl mx-auto">
        {/* Apple-style minimalist header with Official CTSJ Logo */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <svg
              className="h-10 text-[#1D1D1F] transition-opacity hover:opacity-90"
              viewBox="0 0 540 100"
              fill="currentColor"
            >
              {/* Power Icon */}
              <g transform="translate(10, 10)">
                <path
                  d="M 40 12 A 32 32 0 1 0 56 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <line
                  x1="48"
                  y1="4"
                  x2="48"
                  y2="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </g>
              {/* CIVIC TECH SAINT JOHN */}
              <text
                x="110"
                y="46"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                fontSize="28"
                fontWeight="600"
                letterSpacing="1.5"
                fill="currentColor"
              >
                CIVIC TECH SAINT JOHN
              </text>
              {/* Technology + Social Good */}
              <text
                x="112"
                y="74"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                fontSize="18"
                fontWeight="600"
                letterSpacing="0.5"
                fill="currentColor"
              >
                Technology + Social Good
              </text>
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
            Volunteer & Community Intake
          </h1>
          <p className="text-xs sm:text-sm text-[#86868B] mt-1.5 font-normal">
            Build open-source solutions for Greater Saint John.
          </p>
        </div>

        {/* Existing User Notification */}
        {isExistingUser && (
          <div className="mb-6 p-4 bg-white rounded-2xl border border-[#0071E3]/20 shadow-sm flex items-start gap-3 transition-all animate-fadeIn">
            <span className="text-[#0071E3] text-lg mt-0.5">ℹ</span>
            <div className="text-sm">
              <p className="font-medium text-[#1D1D1F]">Existing profile recognized</p>
              <p className="text-[#86868B] text-xs mt-0.5">
                We've loaded your current skills and availability. Review or update anything below, then submit to save.
              </p>
            </div>
          </div>
        )}

        {/* Main Apple-Style Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E5EA] shadow-sm space-y-8"
        >
          {/* SECTION 1: Identity & Contact */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#86868B] mb-4">
              Your Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                  Email Address <span className="text-[#0071E3]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-[#FBFBFD] border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder-[#86868B]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                  Phone Number <span className="text-xs text-[#86868B] font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  placeholder="506-555-0199"
                  className="w-full px-3.5 py-2.5 bg-[#FBFBFD] border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder-[#86868B]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                  First Name <span className="text-[#0071E3]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jane"
                  className="w-full px-3.5 py-2.5 bg-[#FBFBFD] border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder-[#86868B]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                  Last Name <span className="text-[#0071E3]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full px-3.5 py-2.5 bg-[#FBFBFD] border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder-[#86868B]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                  Community Role <span className="text-xs text-[#86868B] font-normal">(Optional)</span>
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FBFBFD] border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition"
                >
                  <option value="Volunteer">Volunteer</option>
                  <option value="Advocate">Community Advocate</option>
                  <option value="Ambassador">Ambassador</option>
                  <option value="Project Lead">Project Lead</option>
                  <option value="General Member">Attendee / Member</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1D1D1F] mb-1.5">
                  Municipality / City <span className="text-xs text-[#86868B] font-normal">(Optional)</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FBFBFD] border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr className="border-[#F2F2F7]" />

          {/* SECTION 2: Skills with Apple-style Autocomplete & 'X' Delete Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#86868B]">
                Skills & Experience <span className="text-xs font-normal lowercase">(optional)</span>
              </h2>
              <button
                type="button"
                onClick={() => setShowBioModal(true)}
                className="text-xs font-medium text-[#0071E3] hover:underline cursor-pointer"
              >
                Paste bio to extract skills
              </button>
            </div>

            {/* Selected Chips */}
            <div className="flex flex-wrap gap-2 mb-3 min-h-[38px] p-2 bg-[#FBFBFD] border border-[#E5E5EA] rounded-2xl">
              {selectedSkills.length === 0 ? (
                <span className="text-xs text-[#86868B]/70 py-1 px-2 font-normal">
                  No skills selected yet. Type below to search or paste your summary.
                </span>
              ) : (
                selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5EA] text-[#1D1D1F] text-xs font-medium rounded-full shadow-2xs group"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F2F2F7] transition"
                      title="Remove skill"
                    >
                      ✕
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Autocomplete Search Input */}
            <div className="relative" ref={autocompleteRef}>
              <input
                type="text"
                value={skillQuery}
                onChange={(e) => setSkillQuery(e.target.value)}
                placeholder="Type a skill (e.g. Python, Figma, GIS, Public Speaking)..."
                className="w-full px-3.5 py-2.5 bg-[#FBFBFD] border border-[#E5E5EA] rounded-xl text-sm text-[#1D1D1F] placeholder-[#86868B]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition"
              />

              {/* Floating Dropdown */}
              {skillSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white border border-[#E5E5EA] rounded-2xl shadow-lg z-20 overflow-hidden divide-y divide-[#F2F2F7]">
                  {skillSuggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => addSkill(item.label)}
                      className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F5F5F7] flex items-center justify-between text-[#1D1D1F] transition"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs text-[#86868B] bg-[#F2F2F7] px-2 py-0.5 rounded-md font-normal">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <hr className="border-[#F2F2F7]" />

          {/* SECTION 3: Minimalist Availability Selector */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#86868B] mb-3">
              Availability <span className="text-xs font-normal lowercase">(optional)</span>
            </h2>

            {/* Day Segmented Controls */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {DAYS.map((day) => {
                const selected = availability.days.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all ${
                      selected
                        ? "bg-[#1D1D1F] text-white shadow-2xs"
                        : "bg-[#FBFBFD] text-[#86868B] border border-[#E5E5EA] hover:text-[#1D1D1F]"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Time Slot Toggle for active days */}
            {availability.days.length > 0 && (
              <div className="p-4 bg-[#FBFBFD] border border-[#E5E5EA] rounded-2xl space-y-3">
                <span className="text-xs text-[#86868B] block font-medium">
                  Select preferred time slots for chosen days:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SLOTS.map((slot) => {
                    const isSelected = availability.days.some((day) =>
                      (availability.slots[day] || []).includes(slot)
                    );
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          availability.days.forEach((day) => toggleSlot(day, slot));
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition ${
                          isSelected
                            ? "bg-[#0071E3] border-[#0071E3] text-white"
                            : "bg-white border-[#E5E5EA] text-[#1D1D1F] hover:bg-[#F5F5F7]"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <hr className="border-[#F2F2F7]" />

          {/* SECTION 4: Consent & Submission */}
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#0071E3] focus:ring-[#0071E3] border-[#E5E5EA]"
              />
              <span className="text-xs text-[#86868B] leading-relaxed">
                I agree to the{" "}
                <span className="text-[#1D1D1F] font-medium underline">
                  Volunteer Terms & Community Guidelines
                </span>{" "}
                <span className="text-[#0071E3]">*</span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={caslEmailOptIn}
                onChange={(e) => setCaslEmailOptIn(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#0071E3] focus:ring-[#0071E3] border-[#E5E5EA]"
              />
              <span className="text-xs text-[#86868B] leading-relaxed">
                I consent to receive occasional emails regarding project calls, meetups, and workshops (CASL compliant, unsubscribe anytime).
              </span>
            </label>

            {/* Submit Button anchored at the bottom (Full Width on Mobile & Desktop) */}
            <div className="pt-4 border-t border-[#F2F2F7]">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-8 bg-[#0071E3] hover:bg-[#0077ED] text-white text-base font-medium rounded-2xl shadow-sm hover:shadow transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <span>Saving to Roster...</span>
                ) : isExistingUser ? (
                  <span>Update Profile</span>
                ) : (
                  <span>Submit Profile</span>
                )}
              </button>
              <p className="text-center text-xs text-[#86868B] mt-2.5 font-normal">
                Your contact details are encrypted and will never be shared publicly.
              </p>
            </div>
          </div>
        </form>

        {/* Bio Extraction Modal */}
        {showBioModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white max-w-lg w-full rounded-3xl p-6 border border-[#E5E5EA] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-[#1D1D1F]">
                  Paste Bio or Resume
                </h3>
                <button
                  onClick={() => setShowBioModal(false)}
                  className="text-sm text-[#86868B] hover:text-[#1D1D1F]"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-[#86868B]">
                Paste a short bio, LinkedIn summary, or bullet points. We’ll automatically extract relevant technical and community skills.
              </p>
              <textarea
                rows={5}
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                placeholder="e.g. Front-end engineer with React, Python, and UI/UX design experience. Passionate about community mapping..."
                className="w-full p-3.5 bg-[#FBFBFD] border border-[#E5E5EA] rounded-xl text-xs text-[#1D1D1F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBioModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#86868B] hover:text-[#1D1D1F]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBioExtract}
                  className="px-5 py-2 bg-[#1D1D1F] text-white text-xs font-medium rounded-xl hover:bg-black transition"
                >
                  Extract Skills
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
