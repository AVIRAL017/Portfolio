# Aviral — 3D Cyber AI/ML Engineering Portfolio

A production-grade, immersive 3D engineering portfolio for **Aviral** (B.Tech CSE — AI & ML @ Pranveer Singh Institute of Technology), specializing in Computer Vision, Deep Learning, Generative AI, and Autonomous Geospatial Intelligence.

Built with **React 18 + Vite + TypeScript + React Three Fiber + Three.js + Framer Motion + GSAP / Lenis + Tailwind CSS**.

---

## ⚡ Core Technical Highlights

- **Live 3D Neural Network (Hero)**: Multi-layer neural network with 3D instanced nodes, additive-blended synaptic edges, real-time signal propagation pulses traveling layer-to-layer, drifting wireframe CNN feature-map slabs, and mouse parallax camera interaction.
- **Graceful WebGL Fallback**: High-performance 2D HTML5 canvas fallback ensuring 100% device compatibility and accessibility.
- **Cinematic Training Loader**: Epoch progress counter (1/50 → 50/50), simulated cross-entropy loss decay ($0.892 \to 0.024$), validation accuracy ascent, and topology verification before reveal.
- **Holographic 3D Project Displays**:
  - **AERION (Priority 1 — Featured)**: Dual-mode satellite/drone intelligence platform with live YOLO bounding boxes, damage SSIM detection, and thermal heatmap overlay.
  - **Perigee (Priority 2)**: Explainable AI satellite conjunction assessment with 3D orbital rings, SGP4 trajectory propagation, and XGBoost collision risk telemetry.
  - **HazardAI (Priority 3)**: Atmospheric chemical dispersion simulation with Gaussian plume concentration contours, affected OSM infrastructure intersection, and A* evacuation routing.
  - **RAKSHAK (Priority 4)**: Gradient-boosted decision tree branching and 149-city accident hotspot emergency dispatch graph.
  - **Kanpur Civic Management Portal (Priority 5)**: Isometric wireframe city grid and civic complaint pipeline.
- **Deep-Dive Architecture Modals**: Interactive modal for each project with full engineering specifications, verified tech stacks, and repository links.
- **Interactive Skills Matrix**: Filterable neural clusters (Programming Languages, Machine Learning, Artificial Intelligence, Tools & Frameworks, Core CS) with progress meters and hover connection highlighting.
- **Competitive Programming Telemetry**: Animated real-time counter for **210+ LeetCode problems solved** and **HackerRank 3-Star Problem Solving** badge.
- **Verified Credentials**: Live direct links to certificates hosted on GitHub, including Hack with UP 2025, PROTECH 2025 Finalist, ISRO Bharatiya Antariksh Hackathon 2026, and Coursera/DeepLearning.AI/Stanford specializations.
- **Zero School/Class 12 Details**: Strictly adheres to the resume source of truth, featuring only B.Tech at PSIT Kanpur (CGPA: 8.03/10).
- **Responsive & Accessible**: Custom cyber crosshair cursor with magnetic hover, keyboard-accessible navigation, semantic HTML5, JSON-LD structured data schema, meta OpenGraph/Twitter tags, and `prefers-reduced-motion` compliance.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework & Core** | React 18, Vite 5, TypeScript |
| **3D & Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Animations & Smooth Scroll** | Framer Motion, Lenis Smooth Scroll, GSAP |
| **Styling & HUD Design** | Tailwind CSS, Lucide Icons, Custom Cyber CSS Utilities |
| **Deployment** | Vercel (SPA rewrite rules + security headers) |

---

## 🚀 Local Development

### Prerequisites
- Node.js (v18+ recommended, tested on Node v24)
- npm (v9+)

### Installation & Run

```bash
# 1. Clone repository
git clone https://github.com/AVIRAL017/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` to explore the portfolio in real time.

---

## 📦 Production Build & Testing

```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

The production output will be generated inside the `dist/` directory, code-split into optimized chunks (`three`, `r3f`, `motion`, `index`).

---

## 🌐 Deploy to Vercel

This project is pre-configured with a production-ready `vercel.json` containing SPA rewrites and modern security headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`).

### Option 1: Deploy with Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally or run with npx
npx vercel

# For production deployment
npx vercel --prod
```

When prompted:
- **Set up and deploy?**: `yes`
- **Which scope?**: Choose your personal Vercel account
- **Link to existing project?**: `no`
- **What's your project's name?**: `aviral-portfolio`
- **In which directory is your code located?**: `./`
- **Want to modify settings?**: `no` (Vercel automatically detects Vite)

### Option 2: Deploy via Vercel Web Dashboard

1. Push your repository to GitHub (`https://github.com/AVIRAL017/portfolio`).
2. Log into [vercel.com](https://vercel.com) and click **"Add New..." → "Project"**.
3. Import your GitHub repository.
4. Framework Preset will auto-detect as **Vite**.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**.

---

## 🔑 Environment Variables

Create a `.env` file in the root directory if you wish to use Formspree for the contact form:

```env
# Optional Formspree key (form will fallback to mailto if empty)
VITE_FORMSPREE_KEY=your_formspree_id_here
```

---

## 📄 Source of Truth & External Links

All biographical details, summary text, project descriptions, and credentials originate strictly from `/Resume.pdf` and verified GitHub repositories:

- **GitHub Profile**: [https://github.com/AVIRAL017](https://github.com/AVIRAL017)
- **LinkedIn**: [https://linkedin.com/in/aviral-692407312](https://linkedin.com/in/aviral-692407312)
- **LeetCode**: [https://leetcode.com/u/AVIRAL_17/](https://leetcode.com/u/AVIRAL_17/)
- **HackerRank**: [https://www.hackerrank.com/profile/AIML1B_059](https://www.hackerrank.com/profile/AIML1B_059)
- **AERION Repo**: [https://github.com/AVIRAL017/AERION](https://github.com/AVIRAL017/AERION)
- **Perigee Repo**: [https://github.com/AVIRAL017/Perigee](https://github.com/AVIRAL017/Perigee)
- **HazardAI Repo**: [https://github.com/AVIRAL017/Hazard_AI](https://github.com/AVIRAL017/Hazard_AI)
- **RAKSHAK Repo**: [https://github.com/AVIRAL017/RAKSHAK-MAIN](https://github.com/AVIRAL017/RAKSHAK-MAIN)
- **Civic Portal Repo**: [https://github.com/AVIRAL017/CIVIC-MANAGEMENT-PORTAL-MAIN](https://github.com/AVIRAL017/CIVIC-MANAGEMENT-PORTAL-MAIN)

Placeholder live URLs are cataloged in [`TODO_LINKS.md`](./TODO_LINKS.md).
