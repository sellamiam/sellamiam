/**
 * Civic Tech Saint John (CTSJ) - Client-Side Skill Extractor & Taxonomy
 */

export const SKILL_TAXONOMY = {
  // Software & Development
  python: { label: "Python", category: "Dev", synonyms: ["python", "django", "fastapi", "flask", "pandas", "numpy"] },
  react: { label: "React / Next.js", category: "Dev", synonyms: ["react", "react.js", "reactjs", "next.js", "nextjs"] },
  javascript: { label: "JavaScript / TypeScript", category: "Dev", synonyms: ["javascript", "js", "typescript", "ts", "node", "nodejs"] },
  web_frontend: { label: "HTML / CSS / Web", category: "Dev", synonyms: ["html", "css", "tailwind", "bootstrap", "frontend", "front-end"] },
  wordpress: { label: "WordPress / PHP", category: "Dev", synonyms: ["wordpress", "wp", "php", "cms"] },
  mobile_app: { label: "Mobile Apps", category: "Dev", synonyms: ["mobile", "ios", "android", "flutter", "react native", "swift", "kotlin"] },
  devops_cloud: { label: "Cloud & DevOps", category: "Dev", synonyms: ["docker", "kubernetes", "aws", "gcp", "google cloud", "azure", "git", "github", "ci/cd"] },
  database_sql: { label: "SQL & Databases", category: "Dev", synonyms: ["sql", "postgresql", "postgres", "mysql", "mongodb", "firestore", "bigquery"] },

  // Data & Analytics
  data_analysis: { label: "Data Analysis", category: "Data", synonyms: ["data analysis", "data analyst", "data cleaning", "analytics", "statistics", "excel", "sheets"] },
  gis_mapping: { label: "GIS & Digital Maps", category: "Data", synonyms: ["gis", "qgis", "arcgis", "mapping", "spatial", "geospatial", "leaflet", "mapbox", "openstreetmap"] },
  open_data: { label: "Open Data & Scraping", category: "Data", synonyms: ["open data", "scraping", "web scraping", "civic data", "census"] },
  bi_visualization: { label: "Data Visualization", category: "Data", synonyms: ["powerbi", "power bi", "tableau", "looker", "dashboard", "charts"] },
  ai_ml: { label: "AI & Machine Learning", category: "Data", synonyms: ["ai", "machine learning", "ml", "llm", "nlp", "deep learning"] },

  // Design & Product
  ui_ux: { label: "UI / UX Design", category: "Design", synonyms: ["ui", "ux", "ui/ux", "user experience", "user interface", "wireframe", "wireframing", "prototype"] },
  figma: { label: "Figma", category: "Design", synonyms: ["figma"] },
  graphic_design: { label: "Graphic Design & Branding", category: "Design", synonyms: ["graphic design", "canva", "photoshop", "illustrator", "branding", "logo"] },
  accessibility: { label: "Accessibility (a11y)", category: "Design", synonyms: ["accessibility", "a11y", "wcag", "screen readers", "inclusive design"] },

  // Community & Operations
  facilitation: { label: "Workshop Facilitation", category: "Community", synonyms: ["facilitation", "facilitator", "teaching", "workshop", "mentoring", "digital literacy"] },
  public_speaking: { label: "Public Speaking", category: "Community", synonyms: ["public speaking", "presentation", "presenting", "pitching", "speaker"] },
  event_planning: { label: "Event Planning & Logistics", category: "Community", synonyms: ["event planning", "events", "logistics", "coordination"] },
  grant_writing: { label: "Grant Writing & Fundraising", category: "Community", synonyms: ["grant", "grant writing", "fundraising", "sponsorship", "donor"] },
  marketing_social: { label: "Social Media & Marketing", category: "Community", synonyms: ["social media", "marketing", "content creation", "copywriting", "pr", "communications"] },
  civic_policy: { label: "Civic Policy & Advocacy", category: "Community", synonyms: ["policy", "advocacy", "municipal", "city hall", "nonprofit", "social justice"] },
};

/**
 * Automatically parses arbitrary text (e.g. pasted bio, resume, LinkedIn summary)
 * and extracts corresponding skill IDs.
 */
export function parseSkillsFromText(text) {
  if (!text || typeof text !== "string") return [];

  // Normalize: lower case and pad spaces around punctuation
  const cleanText = " " + text.toLowerCase().replace(/[^a-z0-9+#_]/g, " ") + " ";
  const matched = new Set();

  for (const [key, item] of Object.entries(SKILL_TAXONOMY)) {
    // Check primary key
    if (cleanText.includes(" " + key.replace("_", " ") + " ")) {
      matched.add(key);
      continue;
    }
    // Check all synonyms
    for (const syn of item.synonyms) {
      if (cleanText.includes(" " + syn.toLowerCase() + " ")) {
        matched.add(key);
        break;
      }
    }
  }

  return Array.from(matched);
}

/**
 * Autocomplete helper for user search input
 */
export function searchSkills(query) {
  if (!query || query.trim() === "") return [];
  const q = query.toLowerCase().trim();

  return Object.entries(SKILL_TAXONOMY)
    .filter(([key, item]) => {
      return (
        item.label.toLowerCase().includes(q) ||
        item.synonyms.some((s) => s.toLowerCase().includes(q))
      );
    })
    .map(([key, item]) => ({ id: key, label: item.label, category: item.category }));
}
