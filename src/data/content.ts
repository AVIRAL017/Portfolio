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

export interface SkillCategory {
  name: string;
  categoryKey: 'languages' | 'ml' | 'ai' | 'tools' | 'core';
  description: string;
  skills: { name: string; level: number; highlights?: string }[];
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

export interface EducationInfo {
  degree: string;
  specialization: string;
  institution: string;
  duration: string;
  cgpa: string;
  status: string;
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
  education: EducationInfo;
}

export const portfolioContent: PortfolioContent = {
  personal: {
    name: "Aviral",
    tagline: "Computer Vision & Generative AI Engineer",
    focus: "Autonomous Geospatial AI • Conjunction Assessment • Chemical Dispersion Modeling",
    status: "B.Tech CSE (AI & ML) @ PSIT Kanpur",
    summary:
      "Second-year B.Tech Computer Science (AI & ML) student (CGPA: 8.03/10) with experience in Machine Learning, Deep Learning, and AI-powered web applications. Skilled in developing predictive models using Python and Flask with a strong interest in Computer Vision and Generative AI.",
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
        "Disaster Mode: Siamese ResNet18 damage detection on xBD & xView2 datasets with hybrid SSIM + feature difference mapping.",
        "Border Security Mode: YOLOv8s fine-tuned on VisDrone dataset paired with YOLOv8n OBB (Oriented Bounding Boxes) trained on DOTA v1.5 for aerial vehicle tracking with ByteTrack.",
        "Operational Intelligence: Multi-tiered triage pipeline categorizing threats (Critical/High/Medium) feeding a retrieval-augmented generation (RAG) pipeline powered by Mistral for grounded situational reporting.",
        "Evidence-first principle: All inferences maintain deterministic provenance and raw coordinate heatmaps before synthesized reporting."
      ],
      techStack: [
        "Python",
        "PyTorch",
        "Ultralytics YOLO",
        "OpenCV",
        "FastAPI",
        "Flask",
        "React",
        "TypeScript",
        "Vite",
        "MongoDB",
        "Azure",
        "Nginx"
      ],
      githubUrl: "https://github.com/AVIRAL017/AERION",
      liveUrl: "#", // Documented in TODO_LINKS.md
      metrics: [
        { label: "Target Framework", value: "YOLOv8 + Siamese" },
        { label: "Geospatial Triage", value: "3-Tier Priority" },
        { label: "Synthesis Layer", value: "RAG + Mistral" }
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
        "An explainable AI system that predicts satellite collision ('conjunction') risk using real government tracking telemetry (CDMs and TLEs from Space-Track.org) propagated with the SGP4 orbital model.",
      architectureDetails: [
        "Data Ingestion: Continuous ingestion of live Conjunction Data Messages (CDMs) and Two-Line Elements (TLEs) via a self-throttled local caching layer.",
        "Orbital Trajectory Propagation: Employs the SGP4 orbital mechanics model to extrapolate 3D trajectories and extract 9 physics-grounded features (miss distance, relative velocity, radial/cross-track deltas, object dimensions).",
        "Model Architecture: Tuned XGBoost classifier trained across Low, Medium, and High risk classifications achieving 79% accuracy.",
        "Explainable AI: Integrated SHAP explainability breakdowns and Mistral-generated operational summaries, aligning directly with NASA's 2025 CARA unmet operational research mandate.",
        "Interactive 3D Mission Control: Full-stack dashboard with real-time 3D orbit visualization, satellite conjunction search, and risk analytics."
      ],
      techStack: [
        "Python",
        "FastAPI",
        "SGP4",
        "XGBoost",
        "SHAP",
        "Mistral AI",
        "React",
        "TypeScript",
        "Three.js",
        "Space-Track API"
      ],
      githubUrl: "https://github.com/AVIRAL017/Perigee",
      liveUrl: "#", // Documented in TODO_LINKS.md
      metrics: [
        { label: "Classification Accuracy", value: "79%" },
        { label: "Physics Features", value: "9 Derived" },
        { label: "Explainability", value: "SHAP + Mistral" }
      ],
      visualType: "perigee",
      tags: ["Orbital Mechanics", "XGBoost", "Explainable AI", "SGP4", "FastAPI"]
    },
    {
      id: "hazard-ai",
      title: "HazardAI",
      subtitle: "Atmospheric Chemical Dispersion & Evacuation Risk System (SIH1505)",
      priority: 3,
      featured: false,
      description:
        "Full-stack operational prototype predicting how airborne hazardous chemical releases disperse through industrial environments, scoring risks to real civilian infrastructure and computing safe evacuation routes.",
      architectureDetails: [
        "Gaussian Plume Dispersion Engine: Physics-based steady-state ground-level neutral gas dispersion modeling incorporating atmospheric turbulence stability classes.",
        "Chemical Database: Integrates 10 toxic industrial compounds with verified toxicology thresholds from NOAA CAMEO Chemicals.",
        "Geospatial Infrastructure Intersection: Real-time spatial queries against OpenStreetMap via Overpass API (hospitals, schools, road networks, parks) intersecting Shapely hazard polygons.",
        "Dynamic Weather & Anomaly Detection: Live atmospheric telemetry pulled from Open-Meteo with scikit-learn Isolation Forest detecting anomalous meteorological shifts.",
        "Hazard-Avoiding Evacuation: A* graph search over live OSM road networks routing populations to safe green-zone assembly points away from downwind plumes."
      ],
      techStack: [
        "Python",
        "FastAPI",
        "NumPy",
        "SciPy",
        "GeoPandas",
        "Shapely",
        "pyproj",
        "scikit-learn",
        "React",
        "TypeScript",
        "Leaflet",
        "Open-Meteo"
      ],
      githubUrl: "https://github.com/AVIRAL017/Hazard_AI",
      liveUrl: "#", // Documented in TODO_LINKS.md
      metrics: [
        { label: "Passing Tests", value: "234+ Tests" },
        { label: "Dispersion Model", value: "Gaussian Plume" },
        { label: "Evacuation Routing", value: "OSM A* Graph" }
      ],
      visualType: "hazard",
      tags: ["GIS / Spatial AI", "FastAPI", "Scientific Computing", "Disaster Tech", "React"]
    },
    {
      id: "rakshak",
      title: "RAKSHAK",
      subtitle: "AI Emergency Response & Multi-City Accident Hotspot Forecasting",
      priority: 4,
      featured: false,
      description:
        "AI-powered emergency response and dispatch platform leveraging dual Gradient Boosting classifiers to forecast vehicular accident hotspots and optimize life-saving emergency medical logistics.",
      architectureDetails: [
        "Predictive Modeling: Dual Gradient Boosting classifiers mapping spatial-temporal accident probabilities across 149 Indian cities.",
        "Multi-Source Telemetry: Real-time ingestion of live traffic conditions, meteorological weather data, and regional seismic signals.",
        "Intelligent Dispatch: Dynamic ambulance pre-positioning and optimized routing algorithms cutting emergency transit times to critical incidents."
      ],
      techStack: [
        "Python",
        "Flask",
        "Gradient Boosting",
        "Scikit-Learn",
        "Pandas",
        "NumPy",
        "Geospatial Routing"
      ],
      githubUrl: "https://github.com/AVIRAL017/RAKSHAK-MAIN",
      liveUrl: "#", // Documented in TODO_LINKS.md
      metrics: [
        { label: "Covered Regions", value: "149 Indian Cities" },
        { label: "ML Classifiers", value: "Dual Gradient Boost" },
        { label: "Routing", value: "Dynamic Emergency" }
      ],
      visualType: "rakshak",
      tags: ["Machine Learning", "Flask", "Gradient Boosting", "Emergency Dispatch"]
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
      liveUrl: "#", // Documented in TODO_LINKS.md
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
      name: "Programming Languages",
      categoryKey: "languages",
      description: "Core software engineering and system languages",
      skills: [
        { name: "Python", level: 95, highlights: "PyTorch, FastAPI, Scientific Computing" },
        { name: "C", level: 85, highlights: "Systems, Memory & Pointers" },
        { name: "C++", level: 88, highlights: "Algorithms, STL, Performance" },
        { name: "HTML5", level: 92, highlights: "Semantic Structure & Web Standards" },
        { name: "CSS3", level: 90, highlights: "Modern Layouts, Glassmorphism, Animations" }
      ]
    },
    {
      name: "Machine Learning",
      categoryKey: "ml",
      description: "Supervised and ensemble predictive algorithms",
      skills: [
        { name: "Decision Trees", level: 92, highlights: "Splitting criteria & tree pruning" },
        { name: "Random Forest", level: 90, highlights: "Bagging & feature importance" },
        { name: "Gradient Boosting", level: 94, highlights: "Loss functions & boosting theory" },
        { name: "XGBoost", level: 92, highlights: "Extreme gradient boosting optimization" },
        { name: "CatBoost", level: 86, highlights: "Categorical feature handling" },
        { name: "Supervised Learning", level: 95, highlights: "Classification & regression mastery" }
      ]
    },
    {
      name: "Artificial Intelligence",
      categoryKey: "ai",
      description: "Deep neural networks, computer vision, and generative models",
      skills: [
        { name: "Computer Vision", level: 94, highlights: "Siamese networks, feature maps, SSIM" },
        { name: "Deep Learning", level: 93, highlights: "CNNs, Backprop, PyTorch tensors" },
        { name: "Generative AI", level: 90, highlights: "LLM synthesis & multi-modal prompting" },
        { name: "RAG Systems", level: 92, highlights: "Grounding, embeddings & vector retrieval" },
        { name: "Object Detection", level: 95, highlights: "YOLOv8, OBB, VisDrone, DOTA" },
        { name: "Change Detection", level: 92, highlights: "Siamese ResNet, xBD damage mapping" }
      ]
    },
    {
      name: "Tools & Frameworks",
      categoryKey: "tools",
      description: "Development stack, deep learning engines, and databases",
      skills: [
        { name: "PyTorch", level: 94, highlights: "Neural architectures, autograd, GPU acceleration" },
        { name: "Ultralytics YOLO", level: 95, highlights: "v8 detection, segmentation, OBB" },
        { name: "Flask", level: 90, highlights: "Microservice APIs & predictive web backends" },
        { name: "Node.js", level: 88, highlights: "Async backends & microservices" },
        { name: "MongoDB", level: 86, highlights: "NoSQL document storage & aggregations" },
        { name: "Git & GitHub", level: 92, highlights: "Version control, PRs & workflows" }
      ]
    },
    {
      name: "Core Computer Science",
      categoryKey: "core",
      description: "Fundamental computer science foundations",
      skills: [
        { name: "Data Structures & Algorithms", level: 94, highlights: "Trees, graphs, dynamic programming, sorting" }
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
      score: "3-Star",
      subtitle: "Problem Solving Badge",
      profileUrl: "https://www.hackerrank.com/profile/AIML1B_059",
      detail: "Handle: AIML1B_059 • Verified gold proficiency in core data structures and algorithmic complexity.",
      badge: "★★★ Problem Solving"
    }
  ],
  achievements: [
    {
      title: "Participated in Hack with Uttar Pradesh 2025",
      issuer: "Chandigarh University Hackathon",
      date: "2025",
      credentialUrl: "https://github.com/AVIRAL017/CERTIFICATES/blob/main/WhatsApp%20Image%202025-11-27%20at%2023.03.59_5d84796b.jpg",
      category: "Hackathon"
    },
    {
      title: "Finalist at PROTECH 2025 Project Exhibition",
      issuer: "PSIT Kanpur",
      date: "2025",
      credentialUrl: "https://github.com/AVIRAL017/CERTIFICATES/blob/main/PSITKNP23062549.pdf",
      category: "Exhibition"
    },
    {
      title: "Bharatiya Antariksh Hackathon 2026",
      issuer: "ISRO (Indian Space Research Organisation)",
      date: "2026",
      credentialUrl: "https://github.com/AVIRAL017/CERTIFICATES/blob/main/AviralHLP-Certificate1743928473.pdf",
      category: "Hackathon"
    },
    {
      title: "Supervised Machine Learning: Regression and Classification",
      issuer: "DeepLearning.AI & Stanford University (Coursera)",
      credentialUrl: "https://github.com/AVIRAL017/CERTIFICATES/blob/main/1-3b20e916-67e6-4bee-b435-c56da0f22cc7%20(3).pdf",
      category: "Course"
    },
    {
      title: "Advanced Learning Algorithms",
      issuer: "DeepLearning.AI & Stanford University (Coursera)",
      credentialUrl: "https://github.com/AVIRAL017/CERTIFICATES/blob/main/1-7e0e32ba-906e-438d-a876-de72ee660d69.pdf",
      category: "Course"
    },
    {
      title: "Neural Networks and Deep Learning",
      issuer: "DeepLearning.AI (Coursera)",
      credentialUrl: "https://github.com/AVIRAL017/CERTIFICATES/blob/main/1-bb0eea3b-1533-420e-bbb0-3ff902f5730d%20(1).pdf",
      category: "Course"
    },
    {
      title: "Generative AI for Everyone",
      issuer: "DeepLearning.AI (Coursera)",
      credentialUrl: "https://github.com/AVIRAL017/CERTIFICATES/blob/main/1-3b20e916-67e6-4bee-b435-c56da0f22cc7%20(3).pdf",
      category: "Course"
    }
  ],
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    specialization: "Artificial Intelligence & Machine Learning",
    institution: "Pranveer Singh Institute of Technology (PSIT)",
    duration: "2024 – 2028",
    cgpa: "8.03 / 10",
    status: "Second Year Undergraduate"
  }
};
