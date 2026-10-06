import sys
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
import shutil

def generate_resume(output_path):
    # Standard margins: 0.35 in to fit 1 page
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=30,
        rightMargin=30,
        topMargin=24,
        bottomMargin=20
    )

    styles = getSampleStyleSheet()

    # Custom typography matching Computer Modern / Times Roman clean serif
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=18,
        leading=20,
        alignment=1, # Centered
        textColor=colors.black
    )

    contact_style = ParagraphStyle(
        'ContactLine',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.5,
        leading=11,
        alignment=1,
        textColor=colors.black
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9.5,
        leading=11,
        textColor=colors.black,
        spaceBefore=4,
        spaceAfter=1
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.2,
        leading=10.2,
        textColor=colors.HexColor('#111827')
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.0,
        leading=9.9,
        leftIndent=10,
        firstLineIndent=-7,
        spaceBefore=0.8,
        spaceAfter=0.8,
        textColor=colors.HexColor('#1f2937')
    )

    project_title_style = ParagraphStyle(
        'ProjectTitle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=8.6,
        leading=10.5,
        textColor=colors.black
    )

    project_sub_style = ParagraphStyle(
        'ProjectSub',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=8.0,
        leading=9.8,
        textColor=colors.HexColor('#262626')
    )

    story = []

    # Name
    story.append(Paragraph("<b>Aviral</b>", title_style))
    story.append(Spacer(1, 3))

    # Contact line with clickable links
    contact_text = (
        "+91 9528725448 &nbsp;|&nbsp; "
        '<a href="mailto:aviralrajput17@gmail.com"><u>aviralrajput17@gmail.com</u></a> &nbsp;|&nbsp; '
        '<a href="https://linkedin.com/in/aviral-692407312"><u>LinkedIn</u></a> &nbsp;|&nbsp; '
        '<a href="https://github.com/AVIRAL017"><u>GitHub</u></a> &nbsp;|&nbsp; '
        '<a href="https://www.hackerrank.com/profile/AIML1B_059"><u>HackerRank: AIML1B_059</u></a>'
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 4))

    def add_section_header(title):
        story.append(Paragraph(f"<b>{title.upper()}</b>", section_heading))
        story.append(HRFlowable(width="100%", thickness=0.6, color=colors.black, spaceBefore=1, spaceAfter=3))

    # PROFESSIONAL SUMMARY
    add_section_header("Professional Summary")
    summary_text = (
        "Machine Learning &amp; Software Engineer specializing in Computer Vision, Physics-Informed ML, and High-Performance Backend "
        "Systems. Proven track record architecting multi-mode aerial surveillance pipelines (Siamese Networks, YOLOv8-OBB, ByteTrack) and "
        "astrodynamic collision forecasting systems aligned with NASA CARA research guidelines. Proficient in PyTorch, FastAPI, "
        "React/TypeScript, and scalable spatial intelligence full-stack deployments."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))

    # TECHNICAL SKILLS
    add_section_header("Technical Skills")
    skills_lines = [
        "<b>Languages:</b> Python, C++, C, JavaScript, SQL, HTML5, CSS3",
        "<b>AI &amp; Deep Learning:</b> PyTorch, Ultralytics YOLOv8 (Standard &amp; OBB), XGBoost, Siamese Networks, ByteTrack, Scikit-Learn",
        "<b>Vision &amp; Astrodynamics:</b> OpenCV, SSIM, Remote Sensing (xBD, xView2, DOTA v1.5, VisDrone), SGP4 Orbital Mechanics",
        "<b>GenAI &amp; Explainability:</b> SHAP (Feature Attribution), Retrieval-Augmented Generation (RAG), Mistral LLM, Operational Triage",
        "<b>Backend, Web &amp; Cloud:</b> FastAPI, React, Vite, Three.js, REST APIs, SQLite, MongoDB, Azure, Docker, Git"
    ]
    for line in skills_lines:
        story.append(Paragraph(line, body_style))
        story.append(Spacer(1, 1))
    story.append(Spacer(1, 3))

    # PROJECTS
    add_section_header("Projects")

    # Project 1: AERION
    story.append(Paragraph("<b>AERION</b> — <b>AI Satellite &amp; Drone Geospatial Intelligence Platform</b>", project_title_style))
    story.append(Paragraph(
        '<i>Live Demo: <a href="https://aerion.aviral17.me"><u>aerion.aviral17.me</u></a> &nbsp;|&nbsp; '
        'GitHub: <a href="https://github.com/AVIRAL017/AERION"><u>AVIRAL017/AERION</u></a> &nbsp;|&nbsp; '
        'Technologies: PyTorch, YOLOv8-OBB, OpenCV, FastAPI, Azure, Mistral AI</i>',
        project_sub_style
    ))
    story.append(Paragraph("• Engineered an end-to-end aerial intelligence platform with dual operational modes: post-disaster building structural damage assessment and autonomous border/perimeter tactical surveillance.", bullet_style))
    story.append(Paragraph("• Trained a Siamese ResNet-18 on benchmark xBD and xView2 datasets, combining hybrid feature-difference maps with SSIM to classify damage across 4 severity tiers (No Damage, Minor, Major, Destroyed).", bullet_style))
    story.append(Paragraph("• Fine-tuned YOLOv8s on VisDrone for small aerial targets and YOLOv8n-OBB on DOTA v1.5 for arbitrary-angle orientation without overlap ambiguity; integrated ByteTrack for persistent multi-object tracking across flight paths.", bullet_style))
    story.append(Paragraph("• Architected a 3-tier operational triage engine (CRITICAL, HIGH, MEDIUM) preserving raw coordinate provenance, coupled with Mistral RAG synthesis to generate structured tactical intelligence briefs.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 2: Perigee
    story.append(Paragraph("<b>Perigee</b> — <b>Explainable AI Satellite Conjunction &amp; Collision Assessment</b>", project_title_style))
    story.append(Paragraph(
        '<i>GitHub: <a href="https://github.com/AVIRAL017/Perigee"><u>AVIRAL017/Perigee</u></a> &nbsp;|&nbsp; '
        'Technologies: Python, SGP4 Astrodynamics, XGBoost, SHAP, Mistral AI, Three.js, FastAPI</i>',
        project_sub_style
    ))
    story.append(Paragraph("• Developed an explainable astrodynamics AI platform forecasting Low Earth Orbit (LEO) satellite collision risks, directly aligned with research priorities established by NASA’s Conjunction Assessment Risk Analysis (CARA) initiative.", bullet_style))
    story.append(Paragraph("• Constructed a self-throttled ingestion pipeline caching live Conjunction Data Messages (CDMs) and TLEs from Space-Track.org into SQLite with rate-limit exponential backoff, preventing service interruptions.", bullet_style))
    story.append(Paragraph("• Propagated 3D orbital state vectors via SGP4 mechanics to extract 9 astrodynamic features (closing velocity, miss distance, covariance scaling, radar cross-section, radial/in-track/cross-track deltas ΔU, ΔV, ΔW).", bullet_style))
    story.append(Paragraph("• Tuned an XGBoost classifier achieving 79% accuracy across hazard tiers; implemented SHAP feature attributions, automated Mistral maneuver briefings, and an interactive Three.js 3D orbital trajectory viewer.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 3: RAKSHAK
    story.append(Paragraph("<b>RAKSHAK</b> — <b>Predictive Safety &amp; Emergency Dispatch Platform</b>", project_title_style))
    story.append(Paragraph(
        '<i>GitHub: <a href="https://github.com/AVIRAL017/RAKSHAK"><u>AVIRAL017/RAKSHAK</u></a> &nbsp;|&nbsp; '
        'Technologies: Python, Flask, Scikit-Learn, Gradient Boosting, Open-Meteo, Leaflet, REST APIs</i>',
        project_sub_style
    ))
    story.append(Paragraph("• Developed a predictive safety platform leveraging dual Gradient Boosting classifiers to forecast accident probability and severity hotspots across 149 Indian cities.", bullet_style))
    story.append(Paragraph("• Integrated real-time weather, traffic density, and regional seismic telemetry into a multi-factor sensor fusion engine to drive intelligent, proactive ambulance pre-positioning and minimize first-responder transit latency.", bullet_style))
    story.append(Spacer(1, 4))

    # CERTIFICATIONS & ACHIEVEMENTS
    add_section_header("Certifications &amp; Achievements")
    story.append(Paragraph("• <b>ISRO Certification:</b> Participated in ISRO Hackathon.", bullet_style))
    story.append(Paragraph("• <b>Coursera Specializations (DeepLearning.AI):</b> Verified in Neural Networks &amp; Deep Learning, Advanced Learning Algorithms, and Generative AI.", bullet_style))
    story.append(Paragraph("• <b>Hack with Uttar Pradesh 2025 (Chandigarh University):</b> State-level competitive hackathon participant.", bullet_style))
    story.append(Paragraph("• <b>HackerRank Problem Solving:</b> 4-Star Coder in Problem Solving &amp; Algorithms (Profile: AIML1B_059).", bullet_style))
    story.append(Spacer(1, 4))

    # EDUCATION
    add_section_header("Education")
    story.append(Paragraph(
        "<b>Pranveer Singh Institute of Technology (PSIT)</b> — Kanpur, India<br/>"
        "Bachelor of Technology in Computer Science &amp; Engineering (AI &amp; ML) &nbsp;|&nbsp; CGPA: 8.034 / 10.0 &nbsp;|&nbsp; 2024 – 2028",
        body_style
    ))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "<b>Mount Litera Zee School</b> — Etawah, India<br/>"
        "Higher Secondary Certificate (Class XII - PCM) &nbsp;|&nbsp; Aggregate: 80.0% &nbsp;|&nbsp; 2024",
        body_style
    ))

    doc.build(story)
    print(f"Generated resume with {doc.page} pages at: {output_path}")

if __name__ == '__main__':
    generate_resume("public/Resume.pdf")
    shutil.copyfile("public/Resume.pdf", "Resume.pdf")
    print("Copied to ./Resume.pdf")
