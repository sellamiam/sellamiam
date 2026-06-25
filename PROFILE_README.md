# Mohamed Sellamia, MBA
## Data Analyst

I am a Data Analyst specializing in building end-to-end data workflows, advanced SQL engineering, and Python pipeline development. My work bridges the gap between traditional data analysis and modern AI architectures, utilizing Large Language Models (LLMs), agentic data pipelines, and intelligent semantic classifiers to handle unstructured data at scale.

I have years of experience developing automated ETL systems, executing complex relational database queries, and generating interactive data visualizations, complemented by deploying deterministic prompting systems and retrieval-augmented generation (RAG) concepts to unlock hidden insights in diverse datasets.

---

## Technical Ecosystem

* **AI & LLM Integration**: LLM API Orchestration (Groq, Llama 3.1, OpenAI), Prompt Engineering, Semantic Classifiers, Agentic Workflows
* **Data Analysis & Visualization**: Pandas, NumPy, GeoPandas, Matplotlib, Seaborn
* **Database & ETL**: SQL (PostgreSQL, SQLite3), Prisma ORM, Selenium WebDriver, Google Sheets API, REST APIs, JSON/XML parsing
* **Infrastructure & Automation**: Google Cloud Platform (GCP), Linux, Bash Scripting, Docker, Git

---

## Analytical & Architectural Approach: Agentic & Deterministic Design

To ensure predictable outputs when interfacing with probabilistic AI models, I design data systems using a structured three-layer pattern that isolates deterministic parsing from language model calls:

1. **Directive Layer**: Standard Operating Procedures (SOPs) and prompt schemas written in Markdown. This defines the exact context window instructions, database schemas, and data dictionaries to guide the LLM's boundary limits.
2. **Orchestration & Validation Layer**: Multi-agent routing engines that validate JSON payloads, manage semantic tokens, route processing pipelines, and dynamically recover from API rate limits or connectivity failures.
3. **Execution & Analysis Layer**: Vectorized parsing, database transactions, and statistical generators in Python (Pandas, GeoPandas, SQLite). This layer handles raw compute deterministically, preventing compounding logic errors.

---

## Selected Analytical Projects

### 1. Quantitative Market Data Systems (Private)
An automated time-series stock feed scanner and market analysis system deployed on Google Cloud Platform.
* **Stack**: Python, Alpaca API, Pandas, NumPy, Groq API, Telegram Bot API, GCP
* **Details**:
  * **Universe Scanner**: Developed a daily portfolio scanner parsing technical indicators and time-series records across a 1,000-stock universe on 4-hour historical logs.
  * **Intelligent Sentiment & Regime Analysis**: Integrated LLM analysis to classify financial sentiment and combined it with analytical models tracking VIX/SPY regimes for dynamic risk assessment.
  * **Interactive Clawdbot Daemon**: Engineered Clawdbot, a persistent systemd service daemon (`telegram_commander.py`) deployed on a GCP instance. This interactive Telegram handler maps custom modules to execute queries on demand (`/pnl`, `/positions`, `/status`) for real-time portfolio monitoring.
  * **Strategy Verification**: Designed backtesting verification pipelines checking strategy yields against out-of-sample data splits to validate statistical significance.

### 2. EOS Energy Storage Career Tracker (Private)
An automated data collection pipeline and database tracking recruitment velocity at EOS Energy Storage.
* **Stack**: Python, Selenium WebDriver, SQLite3, LLM Parsing, Google Sheets API, Pandas
* **Details**:
  * **Automated Data Extraction**: Constructed an ETL crawler using Selenium and ChromeDriver to parse dynamic recruitment listings from job boards.
  * **Intelligent Schema Classification**: Utilized zero-shot LLM parsing to transform unstructured text postings into structured JSON schemas, mapping skills, salaries, and levels.
  * **Deduplication & Relational Storage**: Engineered local SQLite tables with unique index constraints to prevent duplicate entries and maintain database integrity.
  * **Cloud Sync Pipeline**: Built an automated sync bridge via the Google Sheets API to upload cleaned, parsed data structures into cloud sheets.

### 3. SJVotes26: Election Analytics & GIS Mapping (Public)
An analytical geospatial mapping and demographic pipeline mapping voter trends and resident concerns for Saint John municipal elections.
* **Stack**: Python, GeoPandas, Pandas, Matplotlib, GIS Coordinates
* **Details**:
  * **Spatial Intersections**: Utilized GeoPandas to intersect Forward Sortation Area (FSA) centroid coordinate data with official municipal boundaries, eliminating hardcoded geographic maps.
  * **Data Normalization ETL**: Ingested survey response datasets, using string analytics to clean, index, and organize unstructured voter concerns by Ward (1-4).
  * **Visual Analytics**: Produced stacked multi-variable matrices and geographic grids outlining Ward-specific demographics and key city-wide issues.

### 4. Job Flag: Browser-Based Content Classification (Public)
A browser-based AI utility that parses on-page online job listing content to identify and flag potentially fraudulent listings.
* **Stack**: Vanilla JavaScript, Chrome Extension V3 API, Groq Cloud API, Llama 3.1
* **Details**:
  * **DOM Data Extraction**: Performs real-time DOM scanning on LinkedIn and Indeed pages to extract job description elements, salary scales, and company details.
  * **AI Risk Labeling Agent**: Routes extracted text data through custom prompt trees to evaluate risk profiles (e.g. unrealistic wages, vague descriptions, pyramid scheme markers).
  * **Interactive Overlay HUD**: Inserts responsive badges containing a calculated legitimacy score (0–100%) and a categorized markdown summary of detected warning signs on hover.

---

## Contact and Links

* **Email**: sellamiam@gmail.com
* **GitHub**: [github.com/sellamiam](https://github.com/sellamiam)
* **Location**: Saint John, NB, Canada
