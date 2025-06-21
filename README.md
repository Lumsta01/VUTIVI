# 🌿 Vutivi — Empowering Every Rand
*A lightweight, mobile‑friendly bookkeeping app for informal traders, street‑vendors and spaza‑shop owners.*

Vutivi helps micro‑entrepreneurs record **sales, expenses, stock purchases and people** (customers / suppliers / helpers) in seconds, using nothing more than a browser or low‑cost Android device.  
Data is stored locally (offline‑first) but the project can be upgraded to a full Flask/Firebase back‑end later.

---

## Table of Contents
1. [Demo](#demo)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Installation](#installation)  
5. [Usage](#usage)  
6. [Configuration](#configuration)  
7. [Troubleshooting](#troubleshooting)  
8. [Contributing](#contributing)  
9. [License](#license)  
10. [Project Structure](#project-structure)

---

## Demo
| Page | Screenshot | Description |
|------|------------|-------------|
| **Home / Tips** | ![Home](docs/img/home.png) | Rotating app & business tips, quick action buttons |
| **Add Sale** | ![Sale](docs/img/sale.png) | Calculator + form with auto‑fill, recent log |
| **Report** | ![Report](docs/img/report.png) | Weekly / daily / monthly filters, tables & profit |

*(screenshots live in `docs/img/` — replace with your own)*

---

## Features
- **Integrated Calculator** → auto‑fills amounts.
- **One‑click logging** for **Sales**, **Expenses**, **Stock** (People page under construction).
- **Offline‑first**: data saved in `localStorage`; no sign‑up required.
- **Responsive Tailwind UI**: works on low‑end smartphones.
- **Weekly / Daily / Monthly filter** on the **Report** page.
- **Dynamic Tips** to educate users on business & app best‑practices.

---

## Tech Stack
| Layer | Tech |
|-------|------|
| UI    | HTML 5, Tailwind CSS, vanilla JavaScript (ES6) |
| Data  | `localStorage` (JSON) for prototype |
| Optional Server | Flask (Python 3.10 +)  |
| Deployment | Static: **GitHub Pages** • Full: **Render.com** |

---

## Installation

### 1. Static‑only (0 setup)
```bash
git clone https://github.com/<you>/vutivi-app.git
cd vutivi-app
# open index.html in your browser OR deploy to GitHub Pages

