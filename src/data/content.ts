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
    focus: "Computer Vision • Deep Learning • Systems Programming",
    status: "B.Tech CSE (AI & ML) @ PSIT Kanpur (2024–2028)",
    summary:
      "Machine Learning & Software Engineer specializing in Computer Vision, Deep Learning, and Systems Programming. Experienced in architecting aerial surveillance pipelines with Siamese Networks and YOLOv8, astrodynamic collision forecasting systems, and full-stack machine learning deployments with PyTorch, Flask, and React.",
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
        "Dual operational modes: post-disaster building structural damage assessment and autonomous border/perimeter tactical surveillance.",
        "Siamese ResNet-18 on benchmark xBD and xView2 datasets, combining feature-difference maps with SSIM to classify damage across severity tiers.",
        "Fine-tuned YOLOv8 on VisDrone for small aerial targets and YOLOv8-OBB for arbitrary-angle orientation; integrated ByteTrack for multi-object tracking.",
        "Triage categorization preserving coordinate provenance, coupled with synthesis for structured intelligence briefs."
      ],
      techStack: [
        "PyTorch",
        "YOLOv8-OBB",
        "OpenCV",
        "FastAPI",
        "Siamese ResNet",
        "ByteTrack",
        "React",
        "TypeScript"
      ],
      githubUrl: "https://github.com/AVIRAL017/AERION",
      liveUrl: "https://github.com/AVIRAL017/AERION",
      metrics: [
        { label: "Vision Models", value: "YOLOv8 + Siamese" },
        { label: "Benchmarks", value: "xBD • VisDrone" },
        { label: "Tracking", value: "ByteTrack Persistent" }
      ],
      visualType: "aerion",
      tags: ["Computer Vision", "PyTorch", "YOLOv8", "Deep Learning"]
    },
    {
      id: "perigee",
      title: "PERIGEE",
      subtitle: "LEO Conjunction Assessment & Satellite Maneuver Platform",
      priority: 2,
      featured: true,
      description:
        "Physics-informed astrodynamic collision avoidance forecasting platform processing Conjunction Data Messages (CDMs) and Two-Line Element sets (TLEs).",
      architectureDetails: [
        "SGP4 state propagation engine propagating TLEs into 3D orbital cartesian coordinates to compute Miss Distance (km) and relative velocity vectors.",
        "XGBoost classification model predicting collision probability tiers aligned with NASA CARA conjunction assessment guidelines.",
        "Explainable AI integration computing feature attribution to identify orbital geometry factors driving collision risk.",
        "Automated collision mitigation synthesis generating maneuver suggestions and alternative orbital slots."
      ],
      techStack: [
        "PyTorch",
        "XGBoost",
        "SGP4",
        "Python",
        "Scikit-Learn",
        "Three.js",
        "React"
      ],
      githubUrl: "https://github.com/AVIRAL017/PERIGEE",
      liveUrl: "https://github.com/AVIRAL017/PERIGEE",
      metrics: [
        { label: "Orbital Engine", value: "SGP4 Propagation" },
        { label: "Predictor", value: "XGBoost Classifier" },
        { label: "Standards", value: "NASA CARA Guidelines" }
      ],
      visualType: "perigee",
      tags: ["Machine Learning", "Astrodynamics", "XGBoost", "Python"]
    },
    {
      id: "rakshak",
      title: "RAKSHAK",
      subtitle: "AI Emergency Disaster Dispatch & Rapid Evacuation Routing",
      priority: 3,
      featured: true,
      description:
        "Dual-model machine learning disaster triage platform predicting multi-hazard severity across 149 Indian cities and computing optimal hospital dispatch routes.",
      architectureDetails: [
        "Dual Gradient Boosting classifiers predicting disaster severity score (0–100) and casualty impact tiers from meteorological telemetry.",
        "Dynamic routing engine calculating fastest paths between affected locations and operational emergency hospitals.",
        "REST API microservices with Flask serving real-time predictions and spatial coordination dashboards."
      ],
      techStack: [
        "Python",
        "Flask",
        "Gradient Boosting",
        "Scikit-Learn",
        "Pandas",
        "NumPy",
        "React"
      ],
      githubUrl: "https://github.com/AVIRAL017/RAKSHAK-MAIN",
      liveUrl: "https://github.com/AVIRAL017/RAKSHAK-MAIN",
      metrics: [
        { label: "Covered Regions", value: "149 Indian Cities" },
        { label: "ML Classifiers", value: "Dual Gradient Boost" },
        { label: "Routing", value: "Emergency Dispatch" }
      ],
      visualType: "rakshak",
      tags: ["Machine Learning", "Flask", "Gradient Boosting", "Python"]
    },
    {
      id: "hazard-ai",
      title: "Hazard_AI",
      subtitle: "Chemical Airborne Dispersion & Evacuation Platform",
      priority: 4,
      featured: false,
      description:
        "Physics-based dispersion modeling predicting airborne hazardous chemical spread through industrial zones and computing civilian evacuation routes.",
      architectureDetails: [
        "Gaussian Plume dispersion modeling incorporating atmospheric stability classes and wind telemetry.",
        "Chemical database integration with verified toxicology thresholds for hazardous industrial compounds.",
        "Geospatial infrastructure intersection mapping affected civilian areas and computing evacuation paths."
      ],
      techStack: [
        "Python",
        "FastAPI",
        "NumPy",
        "SciPy",
        "Scikit-Learn",
        "React",
        "TypeScript"
      ],
      githubUrl: "https://github.com/AVIRAL017/Hazard_AI",
      liveUrl: "https://github.com/AVIRAL017/Hazard_AI",
      metrics: [
        { label: "Dispersion Model", value: "Gaussian Plume" },
        { label: "Evacuation Routing", value: "A* Graph Search" },
        { label: "Tests Passed", value: "234+ Passing" }
      ],
      visualType: "hazard",
      tags: ["Python", "FastAPI", "Scientific Computing", "GIS"]
    },
    {
      id: "civic-portal",
      title: "Kanpur Civic Management Portal",
      subtitle: "Municipal Service & Complaint Intelligence Platform",
      priority: 5,
      featured: false,
      description:
        "Smart civic governance platform enabling citizens to report municipal infractions, track grievances, and schedule appointments.",
      architectureDetails: [
        "Full-Stack architecture built with Node.js, Express, and MongoDB with schema validations.",
        "Complaint status tracking pipeline with interactive maps and departmental triage workflows.",
        "Integrated services for grievance resolution, public safety, and municipal service scheduling."
      ],
      techStack: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "JavaScript",
        "REST APIs"
      ],
      githubUrl: "https://github.com/AVIRAL017/CIVIC-MANAGEMENT-PORTAL-MAIN",
      liveUrl: "https://github.com/AVIRAL017/CIVIC-MANAGEMENT-PORTAL-MAIN",
      metrics: [
        { label: "Backend", value: "Node.js + Express" },
        { label: "Database", value: "MongoDB" },
        { label: "Portal", value: "Kanpur Municipal" }
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
        { name: "Python", iconType: "python", tag: "Primary", highlights: "PyTorch, Scikit-Learn, Scientific Stack (NumPy, SciPy)" },
        { name: "C", iconType: "c", tag: "Systems", highlights: "Low-level memory architecture, pointers, and performance" },
        { name: "C++", iconType: "cpp", tag: "Algorithms", highlights: "Data structures, modern STL, and algorithmic problem solving" },
        { name: "HTML5", iconType: "html5", tag: "Web", highlights: "Semantic structure, responsive layouts, and accessibility" },
        { name: "CSS3", iconType: "css3", tag: "Styling", highlights: "Modern responsive styling, CSS Grid, Flexbox, and UI design" }
      ]
    },
    {
      name: "Machine Learning",
      categoryKey: "ml",
      description: "Supervised predictive modeling, tree ensembles, and regression algorithms",
      skills: [
        { name: "Supervised Learning", iconType: "supervised-learning", tag: "Core ML", highlights: "Classification, regression, cross-validation, and hyperparameter tuning" },
        { name: "Decision Trees", iconType: "decision-tree", tag: "Ensemble", highlights: "Splitting criteria, tree pruning, and decision boundaries" },
        { name: "Random Forest", iconType: "random-forest", tag: "Bagging", highlights: "Bootstrap aggregating, feature importance, and variance reduction" },
        { name: "Gradient Boosting", iconType: "gradient-boost", tag: "Boosting", highlights: "Sequential residual fitting, shrinkage rates, and loss minimization" },
        { name: "XGBoost", iconType: "xgboost", tag: "SOTA", highlights: "Extreme gradient boosting, regularized objective functions, and pruning" },
        { name: "CatBoost", iconType: "catboost", tag: "Categorical", highlights: "Ordered boosting and symmetric tree optimization" }
      ]
    },
    {
      name: "Artificial Intelligence & Vision",
      categoryKey: "ai",
      description: "Computer vision architectures, deep learning neural networks, and generative models",
      skills: [
        { name: "Computer Vision", iconType: "computer-vision", tag: "Vision", highlights: "Image processing, spatial convolutions, and aerial image analysis" },
        { name: "Deep Learning", iconType: "deep-learning", tag: "Neural Nets", highlights: "Convolutional Neural Networks, backpropagation, and PyTorch tensors" },
        { name: "Generative AI", iconType: "generative-ai", tag: "GenAI", highlights: "Foundation models, prompt engineering, and contextual synthesis" },
        { name: "RAG Systems", iconType: "rag", tag: "Retrieval", highlights: "Retrieval-Augmented Generation, document grounding, and embeddings" },
        { name: "Object Detection", iconType: "object-detection", tag: "Detection", highlights: "YOLOv8, Oriented Bounding Boxes (OBB), and target localization" },
        { name: "Change Detection", iconType: "change-detection", tag: "Remote Sensing", highlights: "Siamese neural networks and pre/post disaster feature differences" }
      ]
    },
    {
      name: "Tools & Frameworks",
      categoryKey: "tools",
      description: "Machine learning engines, backend APIs, databases, and version control",
      skills: [
        { name: "PyTorch", iconType: "pytorch", tag: "Framework", highlights: "Model architectures, autograd, custom training loops, and GPU acceleration" },
        { name: "Ultralytics YOLO", iconType: "yolo", tag: "Vision", highlights: "YOLOv8 detection, segmentation, and oriented bounding boxes" },
        { name: "Flask", iconType: "flask", tag: "Backend", highlights: "RESTful microservice APIs and predictive model serving" },
        { name: "Node.js", iconType: "nodejs", tag: "Full-Stack", highlights: "JavaScript server runtimes and asynchronous API workflows" },
        { name: "MongoDB", iconType: "mongodb", tag: "Database", highlights: "NoSQL document storage, schemas, and query optimization" },
        { name: "Git & GitHub", iconType: "git", tag: "DevOps", highlights: "Version control, branching workflows, and open-source collaboration" }
      ]
    },
    {
      name: "Core Computer Science",
      categoryKey: "core",
      description: "Foundational computer science concepts and algorithmic complexity",
      skills: [
        { name: "Data Structures & Algorithms", iconType: "dsa", tag: "Core CS", highlights: "Trees, graphs, dynamic programming, sorting, and time/space complexity" }
      ]
    }
  ],
  competitiveStats: [
    {
      platform: "LeetCode",
      score: "210+",
      subtitle: "Problems Solved",
      profileUrl: "https://leetcode.com/u/AVIRAL_17/",
      detail: "Handle: AVIRAL_17 • Active problem solving across dynamic programming, trees, graph traversal, and arrays.",
      badge: "210+ Solved"
    },
    {
      platform: "HackerRank",
      score: "Problem Solving",
      subtitle: "Algorithms & Data Structures",
      profileUrl: "https://www.hackerrank.com/profile/AIML1B_059",
      detail: "Profile: AIML1B_059 • Verified problem solver in C++ and algorithmic complexity.",
      badge: "Problem Solving"
    }
  ],
  achievements: [
    {
      title: "Bharatiya Antariksh Hackathon 2026",
      issuer: "ISRO (Indian Space Research Organisation)",
      date: "2026",
      credentialUrl: "https://github.com/AVIRAL017/CERTIFICATES/blob/main/AviralHLP-Certificate1743928473.pdf",
      category: "Hackathon"
    },
    {
      title: "Hack with Uttar Pradesh 2025 Participant",
      issuer: "Chandigarh University Hackathon (State-Level Competition)",
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
  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      specialization: "Computer Science & Engineering (AI & ML)",
      institution: "Pranveer Singh Institute of Technology (PSIT)",
      location: "Kanpur, India",
      duration: "2024 – 2028",
      score: "8.03 / 10.0",
      scoreLabel: "Current CGPA",
      status: "Currently Enrolled (2nd Year)"
    }
  ]
};
