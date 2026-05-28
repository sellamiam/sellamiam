# Mohamed Sellamia
## Data Analyst

I am a Data Analyst with extensive experience in Python programming, advanced SQL, and data pipeline engineering. My expertise lies in building end-to-end data workflows, from automated collection and ETL pipeline development to database design, statistical analysis, and interactive visualizations. 

I specialize in translating raw data—including geospatial datasets, time-series market feeds, and unstructured web data—into clear, actionable analytical insights.

---

## Technical Ecosystem

* **Languages**: SQL, Python, JavaScript (ES6+), HTML5, CSS3
* **Data Analysis & Visualization**: Pandas, NumPy, GeoPandas, Matplotlib, Seaborn
* **Database & ETL**: PostgreSQL, SQLite3, Prisma, Selenium WebDriver, Google Sheets API, REST APIs, JSON/XML parsing
* **Infrastructure & Automation**: Google Cloud Platform (GCP), Linux, Bash Scripting, Docker, Git

---

## Analytical & Architectural Approach

I build reliable data systems by separating logical workflows from processing engines. This ensures data pipelines are modular, scalable, and easy to maintain:

1. **Schema & Directive Layer**: Clear definitions of database schemas, data dictionaries, and analytical goals documented in Markdown to map execution expectations and boundary edge cases.
2. **ETL & Validation Layer**: Data parsing, cleaning, and sanity checking. All inbound data is validated against expectations to prevent garbage-in, garbage-out errors.
3. **Execution & Analysis Layer**: Vectorized computations, statistical models, and visualization generators. Executions use optimized Python packages (Pandas, NumPy, GeoPandas) to handle heavy computations efficiently.

---

## Selected Analytical Projects

### 1. Quantitative Market Data Systems (Private)
A market analysis system and data scanner deployed on Google Cloud Platform to evaluate time-series stock feeds and track trading trends.
* **Stack**: Python, Alpaca API, Pandas, NumPy, Telegram Bot API, GCP
* **Details**:
  * **Universe Scanner**: Developed a daily portfolio scanner checking and parsing key technical metrics across a 1,000-stock universe on 4-hour historical records.
  * **Regime Analysis**: Implemented analytical models tracking VIX and SPY volatility metrics to identify changing market conditions and output regime classifications.
  * **Monitoring & Alerts**: Built a persistent daemon (`telegram_commander.py`) to query the data engine, retrieve running PnL metrics, and push status alerts to Telegram.
  * **Strategy Verification**: Designed backtesting validation frameworks checking performance metrics against historical data splits to verify statistical significance.

### 2. EOS Energy Storage Career Tracker (Private)
An automated data collection pipeline and dashboard tracking job listings and recruitment velocity at EOS Energy Storage.
* **Stack**: Python, Selenium WebDriver, SQLite3, Google Sheets API, Pandas, Matplotlib
* **Details**:
  * **Automated Data Extraction**: Constructed a web scraper using Selenium and ChromeDriver to extract structured job posting datasets from dynamic web interfaces.
  * **Relational Storage & Deduplication**: Designed local SQLite database tables with unique index constraints to prevent duplicate entries and maintain database integrity.
  * **Cloud Sync Pipeline**: Built an ETL bridge using the Google Sheets API to clean and sync newly acquired records to cloud spreadsheets for reporting.
  * **Hiring Analytics**: Generated data visualizations using Pandas and Matplotlib to analyze and graph monthly hiring trends and career category growth.

### 3. SJVotes26: Election Analytics & GIS Mapping (Public)
An analytical geospatial mapping and census data pipeline visualizing ward-level demographics and resident concerns for Saint John municipal elections.
* **Stack**: Python, GeoPandas, Pandas, Matplotlib
* **Details**:
  * **Spatial Data Joins**: Leveraged GeoPandas to perform spatial intersections, joining census Forward Sortation Area (FSA) centroid coordinates with municipal electoral boundary files.
  * **ETL Pipeline**: Ingested and normalized multi-format poll survey datasets to aggregate unstructured voter responses by geographic Ward.
  * **Analytical Visualizations**: Produced stacked multi-variable matrices and 2x2 grid visualizations outlining Ward-specific participation demographics and priority issues.

### 4. Job Flag: Browser-Based Content Classification (Public)
A browser-based utility that extracts and parses online job listing content to identify potentially fraudulent postings.
* **Stack**: Vanilla JavaScript, Chrome Extension V3 API, Groq Cloud API, Llama 3.1
* **Details**:
  * **Data Extraction**: Performs live DOM parsing on LinkedIn and Indeed pages to extract job description metrics, salary variables, and company names.
  * **AI Analysis & Labeling**: Passes structured data through prompt parsing trees to classify and flag common fraud signals (e.g., wage anomalies, extreme descriptions).
  * **Visual HUD**: Inserts analytical overlay badges containing a calculated legitimacy score (0–100%) and a categorized summary of detected risk criteria on user hover.

---

## Contact and Links

* **Email**: sellamiam@gmail.com
* **GitHub**: [github.com/sellamiam](https://github.com/sellamiam)
* **Location**: Saint John, NB, Canada
