# Mohamed Sellamia
## Quant Developer and Full-Stack Engineer

I build production-grade software applications focusing on quantitative systems, full-stack web platforms, data collection pipelines, and custom browser utilities. My work emphasizes robust software architecture, deterministic data processing, and reliable integration testing.

---

## Technical Ecosystem

* **Languages**: Python, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3
* **Backend & Databases**: Node.js, Express, Prisma ORM, PostgreSQL, SQLite3, REST APIs
* **Data & Quantitative**: Pandas, NumPy, GeoPandas, Matplotlib, yfinance, Vectorized Backtesting
* **Automation & Scrape**: Selenium WebDriver, Google Sheets API, Gspread
* **DevOps & Infrastructure**: Google Cloud Platform (GCP), Docker, Docker Compose, Linux, Bash Scripting, CI/CD

---

## Architectural Approach: Separating Concerns for High-Reliability Systems

To build resilient services, I apply a strict three-layer architecture pattern to separate business intents from physical system execution:

1. **Directive Layer**: Natural-language standard operating procedures (SOPs) written in Markdown that document execution paths, structural expectations, inputs, outputs, and edge cases.
2. **Orchestration Layer**: Coordination logic that parses directives, routes resources, validates system inputs/outputs, and handles API rate limits or connection failures.
3. **Execution Layer**: Deterministic, highly optimized, and unit-tested Python or Node.js scripts. All database transactions, API calls, and file operations live here to ensure repeatable executions.

This separation prevents compounding logic errors and isolates runtime issues, making services easier to debug and scale.

---

## Selected Projects and Systems

### 1. Quantitative Trading Systems (Private)
A quantitative scanner and automated execution engine deployed on Google Cloud Platform.
* **Stack**: Python, Alpaca API, Pandas, NumPy, Telegram Bot API, GCP
* **Details**:
  * **Universe Scanner**: A portfolio scanner checking candidate trade signals across a 1,000-stock universe on 4-hour charts.
  * **Market Regime Filters**: Incorporates logic checking VIX and SPY trends to dynamically adjust strategy allocations.
  * **Portfolio Command Interface**: Deployed as a persistent systemd daemon (`telegram_commander.py`) to manage active positions, retrieve PnL, and monitor status queries directly via Telegram.
  * **Strategy Verification**: Built using parameter configurations validated against walk-forward out-of-sample data splits with robust take-profit and stop-loss logic.

### 2. CampConnect: Full-Stack Activity Marketplace (Private)
A full-stack marketplace web application connecting families with summer camps, tutors, and coaches.
* **Stack**: Node.js, Express, Prisma ORM, PostgreSQL, Stripe API, Docker, JWT
* **Details**:
  * **Role-Based Access & Security**: Parents, providers, and administrator portals secured with JSON Web Tokens (JWT) using refresh token rotations and Bcrypt password hashing.
  * **Transaction Engine**: Stripe API integration handling checkout workflows for one-time bookings and recurring monthly provider subscriptions, backed by asynchronous Stripe webhook listeners.
  * **Environment Containerization**: Containerized with Docker and Docker Compose for predictable development environments and local testing, deployed via automated shell-based pipelines.
  * **Interactive Search Boards**: Features interactive activity boards allowing users to filter, organize, and catalog bookings.

### 3. EOS Energy Storage Career Tracker (Private)
An automated web scraper and data processing pipeline tracking recruitment listings and hiring trends at EOS Energy Storage.
* **Stack**: Python, Selenium WebDriver, SQLite3, Google Sheets API, Pandas, Matplotlib
* **Details**:
  * **Automated Data Extraction**: Employs Selenium WebDriver with ChromeDriver to query and crawl job boards.
  * **Deduplication Engine**: Uses local SQLite storage with unique constraint schemas to prevent duplicate record logging.
  * **Cloud Synchronization**: Appends newly scraped listings to a Google Sheets document via the Google Sheets API for shared tracking.
  * **Trend Visualization**: Includes an analytics engine using Pandas and Matplotlib to parse historical records and graph hiring velocity trends.

### 4. Job Flag: Browser-Based Content Verification (Public)
A Chrome browser extension designed to identify and flag potentially fraudulent online job postings.
* **Stack**: Vanilla JavaScript, Chrome Extension V3 API, Groq Cloud API, Llama 3.1
* **Details**:
  * **On-Page Parsing**: Runs real-time DOM analysis on active LinkedIn and Indeed listings, sending parsed job details to a background prompt processing thread.
  * **Heuristics Processing**: Checks listings for standard warning signs including extreme salary discrepancies, vague descriptions, and pyramid-style language.
  * **User HUD**: Embeds legitimacy badges directly into the browser DOM interface, displaying granular risk scores and categorized summaries of detected anomalies on hover.

### 5. BCE.TO Vectorized Backtesting Suite (Private)
A vectorized parameter optimizer and backtesting tool for equities listed on the Toronto Stock Exchange.
* **Stack**: Python, Pandas, NumPy, yfinance, Monte Carlo Simulation
* **Details**:
  * **Vectorized Computations**: Replaced legacy spreadsheets with vectorized Pandas code, producing significant performance gains and discovering optimized entry/exit parameters.
  * **Overfitting Prevention**: Utilizes walk-forward analysis splits to validate parameter configurations against unseen historical data periods.
  * **Risk Assessment**: Generates Monte Carlo simulations (1,000 runs) to track strategy yield variance and identify worst-case drawdown boundaries.

### 6. SJVotes26: Election Analytics & GIS Mapping (Public)
An analytical mapping pipeline visualizing demographics and participation trends for Saint John municipal elections.
* **Stack**: Python, GeoPandas, Pandas, Matplotlib
* **Details**:
  * **Geospatial Joins**: Employs GeoPandas to intersect census Forward Sortation Area (FSA) centroid coordinates with municipal electoral boundaries, mapping survey data without hardcoded boundaries.
  * **Data Pipeline**: Ingests unstructured survey responses to output structured regional demographics.
  * **Visualizations**: Produces multi-variable matrices showing city-wide resident concerns and age participation ratios.

---

## Contact and Links

* **Email**: sellamiam@gmail.com
* **GitHub**: [github.com/sellamiam](https://github.com/sellamiam)
* **Location**: Saint John, NB, Canada
