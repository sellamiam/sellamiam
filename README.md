# 👋 Hi, I'm Mohamed Sellamia
### Quant Developer | Full-Stack Engineer | AI Solutions Architect

I build robust, production-grade applications that bridge the gap between complex data, intelligent automation, and premium user experiences. My background spans building **high-performance algorithmic trading bots**, designing **role-based full-stack marketplaces**, engineering **spatial GIS analysis pipelines**, and deploying **AI-driven browser utilities**.

I specialize in **vectorized data engineering, robust software architecture, and deterministic agentic systems**—ensuring that probabilistic AI models are safely constrained by predictable business logic.

---

## 🛠️ Technical Ecosystem

| Category | Technologies & Tools |
| :--- | :--- |
| **Languages** | Python, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3 |
| **Backend & Databases** | Node.js, Express, Prisma ORM, PostgreSQL, SQLite3, REST APIs |
| **Data & Quantitative** | Pandas, NumPy, GeoPandas, Matplotlib, yfinance, Vectorized Backtesting |
| **AI & Automation** | Groq Cloud, Llama 3.1, Selenium WebDriver, Google Sheets API |
| **DevOps & Cloud** | Google Cloud Platform (GCP), Docker & Docker Compose, Linux, Bash Scripting, CI/CD |

---

## 🏗️ Architectural Philosophy: The 3-Layer Agentic System

To solve the inherent unpredictability of LLMs in production, I design applications using a strict **3-Layer Architecture** that separates concerns to maximize performance and reliability:

1. **Directive Layer (Intent)**: Clear, natural-language Standard Operating Procedures (SOPs) written in markdown that outline goals, inputs, outputs, and edge cases.
2. **Orchestration Layer (Decision-Making)**: Dynamic routing engines (LLM/agent-based) that read directives, coordinate resources, handle errors, and learn from API constraints.
3. **Execution Layer (Action)**: Deterministic, highly optimized, and unit-tested Python/Node.js scripts. All heavy lifting, API integrations, and database operations run here with complete predictability.

*By pushing execution complexity into deterministic, tested code, the orchestrator stays lightweight, errors don't compound, and the system remains robust.*

---

## 💼 Selected Projects & Engineered Solutions

Below is a curated showcase of both my public repositories and the architectural designs of my private, production-grade systems.

### 📈 1. Autonomous Quantitative Trading Platform (Private)
*A high-frequency quantitative portfolio scanner and automated execution engine deployed live on Google Cloud Platform.*
- **Core Stack**: `Python` • `Alpaca API` • `Pandas` • `NumPy` • `Telegram Bot API` • `GCP`
- **Architectural Highlights**:
  - **1000-Stock Scanning Loop**: Custom high-speed scanner checking candidate signals across a massive universe on 4-hour charts.
  - **Regime & ML Filtering**: Incorporates structural logic for VIX and SPY market regimes to auto-adjust trading postures.
  - **Dynamic Portfolio Commander**: Deployed a persistent systemd service daemon (`telegram_commander.py`) allowing interactive real-time management (`/pnl`, `/positions`, `/status`) directly via Telegram.
  - **Risk Mitigation & Validation**: Validated via rigorous in-sample parameters, walk-forward out-of-sample data splits, and robust take-profit/stop-loss logic to prevent alpha leakage.

### ⛺ 2. CampConnect: Full-Stack Activity Marketplace (Private)
*A secure, production-ready, full-stack marketplace connecting parents with summer camps, tutors, and coaches.*
- **Core Stack**: `Node.js` • `Express` • `Prisma ORM` • `PostgreSQL` • `Stripe API` • `Docker` • `JWT`
- **Architectural Highlights**:
  - **Role-Based Security**: Complete parent, provider, and administrator user pathways protected via JWT with automatic refresh-token rotation and Bcrypt password hashing.
  - **Financial Integrations**: Complete Stripe checkout integration facilitating one-time activity bookings and recurring SaaS provider subscriptions, handled reliably via webhook listeners.
  - **Cloud Infrastructure**: Containerized utilizing Docker Compose for seamless localized testing and fully integrated shell-based staging/production deployment scripts.
  - **Pinterest-Style Boards**: Highly interactive parent "Idea Boards" to dynamically curate, filter, and share activities.

### 🗳️ 3. SJVotes26: Election Analytics & GIS Geoprocessing (Public)
*An automated geographic mapping and voter demographic pipeline for Saint John municipal elections.*
- **Core Stack**: `Python` • `GeoPandas` • `Pandas` • `Matplotlib` • `Statistics Canada GIS`
- **Architectural Highlights**:
  - **Dynamic Regional Boundary Intersection**: Eliminates hardcoded boundary assumptions by automatically intersecting Forward Sortation Area (FSA) centroid coordinates with official municipal boundaries.
  - **Clean Data Pipeline**: Ingests multi-format municipal poll survey datasets and outputs isolated Ward level graphics (1-4).
  - **Visualizations**: Generates stacked multi-variable matrices detailing city-wide resident concerns and age participation ratios.
  - **Repository**: *(Private/Local version shown in portfolio, public versions shareable on request)*

### 🔍 4. Job Flag: AI-Powered Job Legitimacy Extension (Public)
*A lightweight Chrome Extension that protects job seekers by identifying fraudulent postings in real time.*
- **Core Stack**: `JavaScript (ES6)` • `Chrome Extension V3 API` • `Groq Cloud API` • `Llama 3.1`
- **Architectural Highlights**:
  - **On-Page Fraud Detection**: Real-time DOM scanning on LinkedIn and Indeed, sending job posting details through an asynchronous prompt pipeline to evaluate risk.
  - **Intelligent Risk Heuristics**: Analyzes listings for common indicators of pyramid schemes, work-from-home scams, extreme wage discrepancies, and missing company information.
  - **Interactive HUD**: Displays legitimacy trust badges (0-100% scale) directly inside the browser UI, offering detailed hovered breakdowns of AI-detected red flags.

### 📊 5. BCE.TO Vectorized Backtesting Engine (Private)
*A high-speed parameter optimization suite designed for Toronto Stock Exchange (XTSE) equities.*
- **Core Stack**: `Python` • `Pandas` • `yfinance` • `NumPy` • `Monte Carlo Simulation`
- **Architectural Highlights**:
  - **Vectorized Backtests**: Replaced archaic Excel simulations with modular, high-speed Python logic, leading to **+192% in-sample yield optimization** on assets like BCE.TO.
  - **Walk-Forward Validation**: Evaluates optimized parameters against unseen out-of-sample data, mitigating typical curve-fitting issues.
  - **Monte Carlo Analysis**: Computes probability metrics over 1,000 randomized reshuffles of strategy returns to confirm performance reliability and evaluate the 5th percentile worst-case risk boundary.

### 🌐 6. Selenium-Based Automated ETL Pipeline (Private)
*A production automation script built to scrape job trends, catalog them in a database, and sync to public cloud metrics.*
- **Core Stack**: `Python` • `Selenium WebDriver` • `SQLite3` • `Google Sheets API` • `Pandas`
- **Architectural Highlights**:
  - **Reliable Web Scraping**: Formulates automated Selenium navigation routines to circumvent modern JS pagination structures.
  - **Deduplication Strategy**: Implements strict unique index constraints on SQLite, bypassing redundant scrapes.
  - **Sheets Synchronization**: Utilizes `gspread` and OAuth2 Service Accounts to auto-append clean records to cloud sheets.

---

## 📫 Connect With Me

- **Email**: [sellamiam@gmail.com](mailto:sellamiam@gmail.com)
- **GitHub**: [github.com/sellamiam](https://github.com/sellamiam)
- **Location**: Saint John, NB, Canada 🇨🇦

---
*“Simplicity is the ultimate sophistication. By pairing robust, deterministic pipelines with cutting-edge AI, we build software that works predictably in an unpredictable world.”*
