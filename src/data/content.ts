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
    status: "3rd Year B.Tech CSE (AI & ML) @ PSIT Kanpur",
    summary:
      "Third-year B.Tech Computer Science (AI & ML) student (CGPA: 8.03/10) with experience in Machine Learning, Deep Learning, and AI-powered web applications. Skilled in developing predictive models using Python and Flask with a strong interest in Computer Vision and Generative AI.",
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
      description: "Systems programming, mathematical modeling, and standards-compliant web foundations",
      skills: [
        { name: "Python", iconType: "python", tag: "Primary Language", highlights: "PyTorch, FastAPI, Scientific Stack (NumPy, SciPy)" },
        { name: "C", iconType: "c", tag: "Systems", highlights: "Low-level Memory Architecture & Pointer Mechanics" },
        { name: "C++", iconType: "cpp", tag: "Algorithms", highlights: "High-Performance Data Structures & Modern STL" },
        { name: "HTML5", iconType: "html5", tag: "Web Standards", highlights: "Semantic Architecture, WebGL & Canvas API" },
        { name: "CSS3", iconType: "css3", tag: "Styling Engine", highlights: "Modern Layouts, Glassmorphism & GPU Accelerated Animations" }
      ]
    },
    {
      name: "Machine Learning",
      categoryKey: "ml",
      description: "Supervised and ensemble predictive algorithms with mathematical rigor",
      skills: [
        { name: "Decision Trees", iconType: "decision-tree", tag: "Ensemble Core", highlights: "Entropy/Gini impurity optimization and recursive partitioning" },
        { name: "Random Forest", iconType: "random-forest", tag: "Bagging", highlights: "Bootstrap aggregation, feature subsampling, and out-of-bag scoring" },
        { name: "Gradient Boosting", iconType: "gradient-boost", tag: "Boosting", highlights: "Sequential residual reduction and customized loss optimization" },
        { name: "XGBoost", iconType: "xgboost", tag: "SOTA Boosting", highlights: "Second-order Taylor expansion, regularization, and tree pruning" },
        { name: "CatBoost", iconType: "catboost", tag: "Categorical ML", highlights: "Ordered target encoding and symmetric decision trees" },
        { name: "Supervised Learning", iconType: "supervised-learning", tag: "Theory & Practice", highlights: "Classification, regression, cross-validation, and bias-variance tradeoff" }
      ]
    },
    {
      name: "Artificial Intelligence",
      categoryKey: "ai",
      description: "Deep neural networks, computer vision, and generative foundation models",
      skills: [
        { name: "Computer Vision", iconType: "computer-vision", tag: "Perception", highlights: "Siamese networks, structural similarity index (SSIM), feature pyramids" },
        { name: "Deep Learning", iconType: "deep-learning", tag: "Neural Networks", highlights: "Backpropagation, convolutional layers, activation dynamics, tensor computation" },
        { name: "Generative AI", iconType: "generative-ai", tag: "LLMs & Multimodal", highlights: "Mistral integration, structured synthesis, prompt orchestration" },
        { name: "RAG Systems", iconType: "rag", tag: "Retrieval", highlights: "Evidence grounding, vector embedding search, context windows" },
        { name: "Object Detection", iconType: "object-detection", tag: "Detection", highlights: "YOLOv8s, YOLOv8n OBB, VisDrone, DOTA v1.5 benchmark datasets" },
        { name: "Change Detection", iconType: "change-detection", tag: "Spatial Intelligence", highlights: "Siamese ResNet18, xBD/xView2 damage grading, pre/post alignment" }
      ]
    },
    {
      name: "Tools & Frameworks",
      categoryKey: "tools",
      description: "Deep learning frameworks, backend microservices, and databases",
      skills: [
        { name: "PyTorch", iconType: "pytorch", tag: "DL Framework", highlights: "Autograd, tensor computation, custom architectures, GPU acceleration" },
        { name: "Ultralytics YOLO", iconType: "yolo", tag: "Vision Framework", highlights: "v8 detection, Oriented Bounding Boxes (OBB), ByteTrack tracking" },
        { name: "Flask", iconType: "flask", tag: "Microservices", highlights: "Lightweight inference APIs, telemetry endpoints, micro-services" },
        { name: "Node.js", iconType: "nodejs", tag: "Runtime", highlights: "Asynchronous I/O pipelines, event loops, REST API design" },
        { name: "MongoDB", iconType: "mongodb", tag: "NoSQL DB", highlights: "Document collections, spatial geospatial queries, aggregation pipelines" },
        { name: "Git & GitHub", iconType: "git", tag: "Version Control", highlights: "Git workflows, branch architecture, CI/CD, collaborative engineering" }
      ]
    },
    {
      name: "Core Computer Science",
      categoryKey: "core",
      description: "Algorithmic thinking, complexity analysis, and discrete foundations",
      skills: [
        { name: "Data Structures & Algorithms", iconType: "dsa", tag: "Core CS", highlights: "Graph algorithms (BFS/DFS, Dijkstra, A*), dynamic programming, tree traversals" }
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
    status: "Third Year Undergraduate"
  }
};
