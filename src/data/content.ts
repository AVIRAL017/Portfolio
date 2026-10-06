export interface Project {
  id: string;
  title: string;
  subtitle: string;
  priority: number;
  featured?: boolean;
  description: string;
  architectureDetails: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  metrics?: { label: string; value: string }[];
  visualType: 'aerion' | 'perigee' | 'hazard' | 'rakshak' | 'civic';
  tags: string[];
}

export type SkillIconType =
  | 'python'
  | 'c'
  | 'cpp'
  | 'html5'
  | 'css3'
  | 'decision-tree'
  | 'random-forest'
  | 'gradient-boost'
  | 'xgboost'
  | 'catboost'
  | 'supervised-learning'
  | 'computer-vision'
  | 'deep-learning'
  | 'generative-ai'
  | 'rag'
  | 'object-detection'
  | 'change-detection'
  | 'pytorch'
  | 'yolo'
  | 'flask'
  | 'nodejs'
  | 'mongodb'
  | 'git'
  | 'dsa';

export interface SkillItem {
  name: string;
  iconType: SkillIconType;
  tag: string;
  highlights: string;
}

export interface SkillCategory {
  name: string;
  categoryKey: 'languages' | 'ml' | 'ai' | 'tools' | 'core';
  description: string;
  skills: SkillItem[];
}

export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  credentialUrl: string;
  category: 'Hackathon' | 'Exhibition' | 'Course';
}

export interface CompetitiveStat {
  platform: string;
  score: string;
  subtitle: string;
  profileUrl: string;
  detail: string;
  badge: string;
}

export interface EducationItem {
  degree: string;
  specialization?: string;
  institution: string;
  location: string;
  duration: string;
  score: string;
  scoreLabel: string;
  status?: string;
}

export interface PortfolioContent {
  personal: {
    name: string;
    tagline: string;
    focus: string;
    status: string;
    summary: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    leetcode: string;
    hackerrank: string;
    resumeUrl: string;
  };
  projects: Project[];
  skills: SkillCategory[];
  competitiveStats: CompetitiveStat[];
  achievements: Certification[];
  education: EducationItem[];
}

export const portfolioContent: PortfolioContent = {
  personal: {
    name: "Aviral",
    tagline: "Machine Learning & Software Engineer",
    focus: "Computer Vision • Physics-Informed ML • High-Performance Systems • Astrodynamics",
    status: "B.Tech CSE (AI & ML) @ PSIT Kanpur (2024–2028)",
    summary:
      "Machine Learning & Software Engineer specializing in Computer Vision, Physics-Informed ML, and High-Performance Backend Systems. Proven track record architecting multi-mode aerial surveillance pipelines (Siamese Networks, YOLOv8-OBB, ByteTrack) and astrodynamic collision forecasting systems aligned with NASA CARA research guidelines. Proficient in PyTorch, FastAPI, React/TypeScript, and scalable spatial intelligence full-stack deployments.",
    email: "aviralrajput17@gmail.com",
    phone: "+91 9528725448",
    linkedin: "https://linkedin.com/in/aviral-692407312",
    github: "https://github.com/AVIRAL017",
    leetcode: "https://leetcode.com/u/AVIRAL_17/",
    hackerrank: "https://www.hackerrank.com/profile/AIML1B_059",
    resumeUrl: "/Resume.pdf",
  },
  projects: [
    {
      id: "aerion",
      title: "AERION",
      subtitle: "AI Satellite & Drone Geospatial Intelligence Platform",
      priority: 1,
      featured: true,
      description:
        "Comprehensive dual-mode aerial intelligence platform engineering real-time change detection and tactical situational awareness from high-resolution satellite and drone telemetry.",
      architectureDetails: [
        "Engineered an end-to-end aerial intelligence platform with dual operational modes: post-disaster building structural damage assessment and autonomous border/perimeter tactical surveillance.",
        "Trained a Siamese ResNet-18 on benchmark xBD and xView2 datasets, combining hybrid feature-difference maps with SSIM to classify damage across 4 severity tiers (No Damage, Minor, Major, Destroyed).",
        "Fine-tuned YOLOv8s on VisDrone for small aerial targets and YOLOv8n-OBB on DOTA v1.5 for arbitrary-angle orientation without overlap ambiguity; integrated ByteTrack for persistent multi-object tracking across flight paths.",
        "Architected a 3-tier operational triage engine (CRITICAL, HIGH, MEDIUM) preserving raw coordinate provenance, coupled with Mistral RAG synthesis to generate structured tactical intelligence briefs."
      ],
      techStack: [
        "PyTorch",
        "YOLOv8-OBB",
        "OpenCV",
        "FastAPI",
        "Azure",
        "Mistral AI",
        "Siamese ResNet",
        "ByteTrack",
        "React",
        "Vite"
      ],
      githubUrl: "https://github.com/AVIRAL017/AERION",
      liveUrl: "https://aerion.aviral17.me",
      metrics: [
        { label: "Target Framework", value: "YOLOv8-OBB + Siamese" },
        { label: "Geospatial Triage", value: "3-Tier Priority" },
        { label: "Synthesis Layer", value: "Mistral RAG" }
      ],
      visualType: "aerion",
      tags: ["Computer Vision", "Satellite Imagery", "PyTorch", "Geospatial AI", "RAG"]
    },
    {
      id: "perigee",
      title: "Perigee",
      subtitle: "Explainable AI Satellite Conjunction & Collision Assessment",
      priority: 2,
      featured: false,
      description:
        "An explainable AI platform forecasting Low Earth Orbit (LEO) satellite collision risks, directly aligned with research priorities established by NASA’s Conjunction Assessment Risk Analysis (CARA) initiative.",
      architectureDetails: [
        "Developed an explainable astrodynamics AI platform forecasting Low Earth Orbit (LEO) satellite collision risks, directly aligned with research priorities established by NASA’s Conjunction Assessment Risk Analysis (CARA) initiative.",
        "Constructed a self-throttled ingestion pipeline caching live Conjunction Data Messages (CDMs) and TLEs from Space-Track.org into SQLite with rate-limit exponential backoff, preventing service interruptions.",
        "Propagated 3D orbital state vectors via SGP4 mechanics to extract 9 astrodynamic features (closing velocity, miss distance, covariance scaling, radar cross-section, radial/in-track/cross-track deltas ΔU, ΔV, ΔW).",
        "Tuned an XGBoost classifier achieving 79% accuracy across hazard tiers; implemented SHAP feature attributions, automated Mistral maneuver briefings, and an interactive Three.js 3D orbital trajectory viewer."
      ],
      techStack: [
        "Python",
        "SGP4 Astrodynamics",
        "XGBoost",
        "SHAP",
        "Mistral AI",
        "Three.js",
        "FastAPI",
        "SQLite",
        "Space-Track API"
      ],
      githubUrl: "https://github.com/AVIRAL017/Perigee",
      liveUrl: "https://github.com/AVIRAL017/Perigee",
      metrics: [
        { label: "Classification Accuracy", value: "79%" },
        { label: "Physics Features", value: "9 Derived (ΔU, ΔV, ΔW)" },
        { label: "Explainability", value: "SHAP + Mistral" }
      ],
      visualType: "perigee",
      tags: ["Orbital Mechanics", "XGBoost", "Explainable AI", "SGP4", "FastAPI"]
    },
    {
      id: "rakshak",
      title: "RAKSHAK",
      subtitle: "Predictive Safety & Emergency Dispatch Platform",
      priority: 3,
      featured: false,
      description:
        "Predictive safety platform leveraging dual Gradient Boosting classifiers to forecast accident probability and severity hotspots across 149 Indian cities.",
      architectureDetails: [
        "Developed a predictive safety platform leveraging dual Gradient Boosting classifiers to forecast accident probability and severity hotspots across 149 Indian cities.",
        "Integrated real-time weather, traffic density, and regional seismic telemetry into a multi-factor sensor fusion engine to drive intelligent, proactive ambulance pre-positioning and minimize first-responder transit latency."
      ],
      techStack: [
        "Python",
        "Flask",
        "Scikit-Learn",
        "Gradient Boosting",
        "Open-Meteo",
        "Leaflet",
        "REST APIs"
      ],
      githubUrl: "https://github.com/AVIRAL017/RAKSHAK",
      liveUrl: "https://github.com/AVIRAL017/RAKSHAK",
      metrics: [
        { label: "Covered Regions", value: "149 Indian Cities" },
        { label: "ML Classifiers", value: "Dual Gradient Boost" },
        { label: "Sensor Fusion", value: "Weather + Traffic + Seismic" }
      ],
      visualType: "rakshak",
      tags: ["Machine Learning", "Flask", "Gradient Boosting", "Emergency Dispatch"]
    },
    {
      id: "hazard-ai",
      title: "HazardAI",
      subtitle: "Atmospheric Chemical Dispersion & Evacuation Risk System (SIH1505)",
      priority: 4,
      featured: false,
      description:
        "Full-stack operational prototype predicting how airborne hazardous chemical releases disperse through industrial environments, scoring risks to real civilian infrastructure and computing safe evacuation routes.",
      architectureDetails: [
        "Gaussian Plume Dispersion Engine: Physics-based steady-state ground-level neutral gas dispersion modeling incorporating atmospheric turbulence stability classes.",
        "Chemical Database: Integrates 10 toxic industrial compounds with verified toxicology thresholds from NOAA CAMEO Chemicals.",
        "Geospatial Infrastructure Intersection: Real-time spatial queries against OpenStreetMap via Overpass API (hospitals, schools, road networks, parks) intersecting Shapely hazard polygons.",
        "Hazard-Avoiding Evacuation: A* graph search over live OSM road networks routing populations to safe green-zone assembly points away from downwind plumes."
      ],
      techStack: [
        "Python",
        "FastAPI",
        "NumPy",
        "SciPy",
        "GeoPandas",
        "Shapely",
        "scikit-learn",
        "React",
        "TypeScript",
        "Leaflet"
      ],
      githubUrl: "https://github.com/AVIRAL017/Hazard_AI",
      liveUrl: "https://github.com/AVIRAL017/Hazard_AI",
      metrics: [
        { label: "Passing Tests", value: "234+ Tests" },
        { label: "Dispersion Model", value: "Gaussian Plume" },
        { label: "Evacuation Routing", value: "OSM A* Graph" }
      ],
      visualType: "hazard",
      tags: ["GIS / Spatial AI", "FastAPI", "Scientific Computing", "Disaster Tech"]
    },
    {
      id: "civic-portal",
      title: "Kanpur Civic Management Portal",
      subtitle: "Municipal Service & Complaint Intelligence Platform",
      priority: 5,
      featured: false,
      description:
        "Smart civic governance platform enabling citizens to report municipal infractions, submit official FIRs, and schedule hospital appointments with live geo-tracking.",
      architectureDetails: [
        "Full-Stack Microservices: Architected with Node.js and MongoDB with structured schema validations for high-concurrency municipal issue filing.",
        "Real-Time Tracking: Live complaint status tracking pipeline with interactive spatial maps and department triage dashboards.",
        "Civic Services Integration: Unified portal for municipal grievance resolution, police FIR tracking, and healthcare scheduling."
      ],
      techStack: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "JavaScript",
        "Interactive Maps",
        "REST APIs"
      ],
      githubUrl: "https://github.com/AVIRAL017/CIVIC-MANAGEMENT-PORTAL-MAIN",
      liveUrl: "https://github.com/AVIRAL017/CIVIC-MANAGEMENT-PORTAL-MAIN",
      metrics: [
        { label: "Architecture", value: "Node.js + MongoDB" },
        { label: "Mapping", value: "Interactive Spatial" },
        { label: "Workflows", value: "Grievance + FIR + Health" }
      ],
      visualType: "civic",
      tags: ["Node.js", "MongoDB", "Civic Tech", "Full-Stack"]
    }
  ],
  skills: [
    {
      name: "Languages",
      categoryKey: "languages",
      description: "Systems programming, mathematical modeling, and standards-compliant web foundations",
      skills: [
        { name: "Python", iconType: "python", tag: "Primary Language", highlights: "PyTorch, FastAPI, Scientific Stack (NumPy, SciPy)" },
        { name: "C++", iconType: "cpp", tag: "Algorithms", highlights: "High-Performance Data Structures & Modern STL" },
        { name: "C", iconType: "c", tag: "Systems", highlights: "Low-level Memory Architecture & Pointer Mechanics" },
        { name: "JavaScript", iconType: "nodejs", tag: "Modern Web", highlights: "ESNext, Three.js, Interactive Async Pipelines" },
        { name: "SQL", iconType: "mongodb", tag: "Databases", highlights: "Relational Queries, Schema Optimization & Indexing" },
        { name: "HTML5 & CSS3", iconType: "html5", tag: "Web Standards", highlights: "Modern Semantic Layouts & GPU Accelerated Styling" }
      ]
    },
    {
      name: "AI & Deep Learning",
      categoryKey: "ai",
      description: "Deep neural networks, state-of-the-art vision models, and ensemble predictive algorithms",
      skills: [
        { name: "PyTorch", iconType: "pytorch", tag: "DL Framework", highlights: "Autograd, tensor computation, custom architectures, GPU acceleration" },
        { name: "Ultralytics YOLOv8", iconType: "yolo", tag: "Standard & OBB", highlights: "v8 detection, Oriented Bounding Boxes, VisDrone & DOTA benchmarks" },
        { name: "XGBoost", iconType: "xgboost", tag: "SOTA Boosting", highlights: "Second-order Taylor expansion, regularization, and tree pruning" },
        { name: "Siamese Networks", iconType: "change-detection", tag: "Metric Learning", highlights: "ResNet-18 feature difference mapping for xBD / xView2 damage grading" },
        { name: "ByteTrack", iconType: "computer-vision", tag: "Object Tracking", highlights: "Persistent multi-object tracking across flight telemetry paths" },
        { name: "Scikit-Learn", iconType: "supervised-learning", tag: "ML Toolkit", highlights: "Ensembles, pipelines, cross-validation & dimensionality reduction" }
      ]
    },
    {
      name: "Vision & Astrodynamics",
      categoryKey: "ml",
      description: "Computer vision benchmarks, remote sensing, and physics-informed orbital mechanics",
      skills: [
        { name: "OpenCV", iconType: "computer-vision", tag: "Vision Engine", highlights: "Image transformations, spatial kernels, feature extraction & morphology" },
        { name: "SSIM", iconType: "change-detection", tag: "Structural Metrics", highlights: "Structural Similarity Index metric analysis for structural damage detection" },
        { name: "Remote Sensing", iconType: "change-detection", tag: "Aerial Benchmark", highlights: "xBD, xView2, DOTA v1.5, and VisDrone satellite and drone datasets" },
        { name: "SGP4 Orbital Mechanics", iconType: "deep-learning", tag: "Astrodynamics", highlights: "3D state vector propagation from CDMs and TLEs (Space-Track.org)" }
      ]
    },
    {
      name: "GenAI & Explainability",
      categoryKey: "core",
      description: "Generative foundation models, evidence grounding, and feature attribution",
      skills: [
        { name: "SHAP", iconType: "supervised-learning", tag: "Feature Attribution", highlights: "Shapley additive explanations for orbital hazard classification models" },
        { name: "RAG Systems", iconType: "rag", tag: "Retrieval", highlights: "Evidence grounding, vector embedding search, and context windows" },
        { name: "Mistral LLM", iconType: "generative-ai", tag: "Synthesis Engine", highlights: "Operational tactical briefing synthesis and maneuver recommendations" },
        { name: "Operational Triage", iconType: "gradient-boost", tag: "Decision Pipeline", highlights: "3-tier priority categorization preserving raw coordinate heatmaps" }
      ]
    },
    {
      name: "Backend, Web & Cloud",
      categoryKey: "tools",
      description: "Scalable API services, real-time 3D web interfaces, and containerized deployments",
      skills: [
        { name: "FastAPI", iconType: "flask", tag: "High-Perf API", highlights: "Asynchronous Python endpoints, Pydantic schemas, high-throughput inference" },
        { name: "React & Vite", iconType: "html5", tag: "Frontend Stack", highlights: "Reactive state, custom hooks, performant component trees" },
        { name: "Three.js", iconType: "css3", tag: "3D Web Graphics", highlights: "WebGL orbital trajectories, interactive shaders, and scene graphs" },
        { name: "REST APIs & SQLite", iconType: "mongodb", tag: "Data Ingestion", highlights: "Self-throttled CDM/TLE caching with rate-limit exponential backoff" },
        { name: "MongoDB & Azure", iconType: "mongodb", tag: "Cloud & Storage", highlights: "Cloud infrastructure provisioning, geospatial indexing & scalable storage" },
        { name: "Docker & Git", iconType: "git", tag: "DevOps & CI/CD", highlights: "Containerization, microservice orchestration, and version-controlled pipelines" }
      ]
    }
  ],
  competitiveStats: [
    {
      platform: "LeetCode",
      score: "210+",
      subtitle: "Problems Solved",
      profileUrl: "https://leetcode.com/u/AVIRAL_17/",
      detail: "Handle: AVIRAL_17 • Comprehensive focus on graph theory, dynamic programming, trees, and algorithmic optimization.",
      badge: "210+ Solved"
    },
    {
      platform: "HackerRank",
      score: "4-Star",
      subtitle: "Problem Solving Badge",
      profileUrl: "https://www.hackerrank.com/profile/AIML1B_059",
      detail: "Profile: AIML1B_059 • 4-Star Coder in Problem Solving & Algorithms across data structures, sorting, and computational complexity.",
      badge: "★★★★ Problem Solving"
    }
  ],
  achievements: [
    {
      title: "ISRO Certification: Participated in ISRO Hackathon",
      issuer: "ISRO (Indian Space Research Organisation) — Bharatiya Antariksh Hackathon",
      date: "2026",
      credentialUrl: "https://github.com/AVIRAL017/CERTIFICATES/blob/main/AviralHLP-Certificate1743928473.pdf",
      category: "Hackathon"
    },
    {
      title: "Coursera Specializations (DeepLearning.AI)",
      issuer: "Verified in Neural Networks & Deep Learning, Advanced Learning Algorithms, and Generative AI",
      credentialUrl: "https://github.com/AVIRAL017/CERTIFICATES/blob/main/1-bb0eea3b-1533-420e-bbb0-3ff902f5730d%20(1).pdf",
      category: "Course"
    },
    {
      title: "Hack with Uttar Pradesh 2025 Participant",
      issuer: "Chandigarh University Hackathon (State-level competitive hackathon)",
      date: "2025",
      credentialUrl: "https://github.com/AVIRAL017/CERTIFICATES/blob/main/WhatsApp%20Image%202025-11-27%20at%2023.03.59_5d84796b.jpg",
      category: "Hackathon"
    },
    {
      title: "HackerRank Problem Solving: 4-Star Coder",
      issuer: "HackerRank Verified Gold Badge in Problem Solving & Algorithms (Profile: AIML1B_059)",
      credentialUrl: "https://www.hackerrank.com/profile/AIML1B_059",
      category: "Course"
    },
    {
      title: "Finalist at PROTECH 2025 Project Exhibition",
      issuer: "PSIT Kanpur",
      date: "2025",
      credentialUrl: "https://github.com/AVIRAL017/CERTIFICATES/blob/main/PSITKNP23062549.pdf",
      category: "Exhibition"
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science & Engineering",
      specialization: "Artificial Intelligence & Machine Learning (AI & ML)",
      institution: "Pranveer Singh Institute of Technology (PSIT)",
      location: "Kanpur, India",
      duration: "2024 – 2028",
      score: "8.034 / 10.0",
      scoreLabel: "Cumulative CGPA",
      status: "Currently Enrolled"
    },
    {
      degree: "Higher Secondary Certificate (Class XII - PCM)",
      specialization: "Physics, Chemistry, Mathematics (PCM)",
      institution: "Mount Litera Zee School",
      location: "Etawah, India",
      duration: "2024",
      score: "80.0%",
      scoreLabel: "Aggregate Score",
      status: "Completed"
    }
  ]
};
