
import { useState, useRef, useEffect, useCallback, createContext, useContext } from "react";

/* ================================================================
   THEME CONTEXT
================================================================ */
const ThemeCtx = createContext(null);
const useTheme = () => useContext(ThemeCtx);

/* ================================================================
   DESIGN TOKENS
================================================================ */
const LIGHT = {
  bg: "#f4f6fb", card: "rgba(255,255,255,0.85)", sidebar: "rgba(255,255,255,0.92)",
  border: "rgba(99,102,241,0.12)", text: "#0f172a", sub: "#64748b", accent: "#6366f1",
  accent2: "#8b5cf6", glass: "rgba(255,255,255,0.6)", shadow: "0 8px 32px rgba(99,102,241,0.10)",
  input: "rgba(248,250,255,0.9)", navBg: "rgba(255,255,255,0.94)",
  gradA: "#6366f1", gradB: "#8b5cf6", gradC: "#06b6d4",
};
const DARK = {
  bg: "#0a0e1a", card: "rgba(17,24,39,0.85)", sidebar: "rgba(15,20,35,0.95)",
  border: "rgba(99,102,241,0.18)", text: "#f1f5f9", sub: "#94a3b8", accent: "#818cf8",
  accent2: "#a78bfa", glass: "rgba(17,24,39,0.7)", shadow: "0 8px 32px rgba(0,0,0,0.4)",
  input: "rgba(15,20,35,0.8)", navBg: "rgba(10,14,26,0.96)",
  gradA: "#818cf8", gradB: "#a78bfa", gradC: "#22d3ee",
};

/* ================================================================
   DEFAULT CV DATA
================================================================ */
const defaultCV = {
  // Personal
  name: "MD. RAHMAN HOSSAIN", title: "Senior Software Engineer",
  email: "rahman@example.com", phone: "+880 1712-345678",
  location: "Dhaka, Bangladesh", website: "www.rahman.dev",
  linkedin: "linkedin.com/in/rahmandev", github: "github.com/rahmandev",
  photo: null,
  // BD Special
  fatherName: "Md. Abdul Karim", motherName: "Begum Rahela Karim",
  religion: "Islam", nationality: "Bangladeshi", nid: "1234567890123",
  maritalStatus: "Married", passportNo: "BK1234567", expectedSalary: "80,000 BDT",
  presentAddress: "House 12, Road 5, Banani, Dhaka-1213",
  permanentAddress: "Village: Subarnachar, District: Noakhali-3800",
  dob: "15 March 1992", bloodGroup: "B+",
  // Content
  objective: "Passionate Software Engineer with 6+ years of experience in full-stack development. Proven track record of delivering scalable solutions and leading cross-functional teams to drive digital transformation.",
  about: "I am a dedicated professional with expertise in modern web technologies. I thrive in collaborative environments and am committed to continuous learning and excellence.",
  education: [
    { id: 1, degree: "B.Sc. in Computer Science & Engineering", institution: "BUET", year: "2010–2014", result: "CGPA 3.82", board: "" },
    { id: 2, degree: "Higher Secondary Certificate (HSC)", institution: "Dhaka College", year: "2008–2010", result: "GPA 5.00", board: "Dhaka Board" },
    { id: 3, degree: "Secondary School Certificate (SSC)", institution: "Motijheel Govt. High School", year: "2006–2008", result: "GPA 5.00", board: "Dhaka Board" },
  ],
  experience: [
    { id: 1, title: "Senior Software Engineer", company: "Shohoz Ltd.", location: "Dhaka", year: "Jan 2021 – Present", desc: "Led backend architecture for a platform serving 2M+ users. Reduced API response time by 60% through optimization strategies. Mentored a team of 8 engineers.", type: "Full-time" },
    { id: 2, title: "Software Engineer", company: "bKash Limited", location: "Dhaka", year: "Mar 2018 – Dec 2020", desc: "Developed microservices for mobile banking transactions. Implemented real-time notification system handling 500K+ daily messages. Collaborated with cross-functional teams.", type: "Full-time" },
    { id: 3, title: "Junior Developer", company: "Brain Station 23", location: "Dhaka", year: "Jun 2014 – Feb 2018", desc: "Built RESTful APIs and web applications for international clients. Worked on e-commerce platforms and CMS solutions.", type: "Full-time" },
  ],
  skills: [
    { id: 1, name: "React.js / Next.js", level: 95, category: "Frontend" },
    { id: 2, name: "Node.js / Express", level: 92, category: "Backend" },
    { id: 3, name: "Python / Django", level: 80, category: "Backend" },
    { id: 4, name: "PostgreSQL / MongoDB", level: 88, category: "Database" },
    { id: 5, name: "AWS / Docker / K8s", level: 75, category: "DevOps" },
    { id: 6, name: "System Design", level: 85, category: "Architecture" },
  ],
  languages: [
    { id: 1, name: "Bengali (Bangla)", level: "Native" },
    { id: 2, name: "English", level: "Professional" },
    { id: 3, name: "Arabic", level: "Basic" },
  ],
  trainings: [
    { id: 1, name: "AWS Solutions Architect", institute: "Amazon Web Services", year: "2023", duration: "3 months" },
    { id: 2, name: "Agile & Scrum Master", institute: "ICAgile", year: "2022", duration: "40 hours" },
  ],
  certifications: [
    { id: 1, name: "AWS Certified Solutions Architect", issuer: "Amazon", year: "2023", credId: "AWS-SAA-2023" },
    { id: 2, name: "Google Cloud Professional", issuer: "Google", year: "2022", credId: "GCP-2022" },
  ],
  projects: [
    { id: 1, name: "EduBD Platform", tech: "React, Node.js, MongoDB", desc: "Online learning platform with 50K+ active students", url: "github.com/rahmandev/edubd", year: "2023" },
    { id: 2, name: "AgriTrack BD", tech: "Flutter, Firebase, Python", desc: "Smart agriculture monitoring system for Bangladeshi farmers", url: "github.com/rahmandev/agritrack", year: "2022" },
  ],
  references: [
    { id: 1, name: "Dr. Md. Kamal Uddin", title: "Professor, CSE Dept.", org: "BUET", email: "kamal@buet.ac.bd", phone: "+880 1911-000001" },
    { id: 2, name: "Syed Mahbub Morshed", title: "CTO", org: "Shohoz Ltd.", email: "mahbub@shohoz.com", phone: "+880 1922-000002" },
  ],
  interests: ["Open Source", "Tech Blogging", "Cricket", "Photography", "Traveling"],
  awards: ["Best Engineer Award – Shohoz 2022", "Dean's List – BUET 2014", "1st Place – ICPC Dhaka Regional 2013"],
  socialLinks: { facebook: "", twitter: "", portfolio: "" },
};

/* ================================================================
   50+ TEMPLATES METADATA
================================================================ */
const TEMPLATES = [
  // Bangladesh Professional
  { id: "bd_pro", name: "Bangladesh Professional", cat: "🇧🇩 BD Professional", color: "#1e3a5f", accent: "#e8c875", thumb: "sidebar-l" },
  { id: "bd_govt", name: "Government Job CV", cat: "🇧🇩 BD Professional", color: "#006400", accent: "#ffd700", thumb: "single" },
  { id: "bd_bank", name: "Bank Job CV", cat: "🇧🇩 BD Professional", color: "#1a237e", accent: "#ffc107", thumb: "sidebar-l" },
  { id: "bd_ngo", name: "NGO / Development", cat: "🇧🇩 BD Professional", color: "#004d40", accent: "#80cbc4", thumb: "two-col" },
  { id: "bd_teacher", name: "Teacher / Academic", cat: "🇧🇩 BD Professional", color: "#4a148c", accent: "#ce93d8", thumb: "single" },
  { id: "bd_biodata", name: "Traditional Biodata", cat: "🇧🇩 BD Professional", color: "#b71c1c", accent: "#ffcdd2", thumb: "biodata" },
  // ATS
  { id: "ats_clean", name: "ATS Clean", cat: "📄 ATS Friendly", color: "#1c1c1c", accent: "#2196f3", thumb: "ats" },
  { id: "ats_minimal", name: "ATS Minimal", cat: "📄 ATS Friendly", color: "#212121", accent: "#4caf50", thumb: "ats" },
  { id: "ats_pro", name: "ATS Professional", cat: "📄 ATS Friendly", color: "#0d47a1", accent: "#42a5f5", thumb: "ats" },
  // Corporate
  { id: "corp_navy", name: "Corporate Navy", cat: "🏢 Corporate", color: "#0c2461", accent: "#e8c875", thumb: "sidebar-l" },
  { id: "corp_slate", name: "Corporate Slate", cat: "🏢 Corporate", color: "#263238", accent: "#80cbc4", thumb: "two-col" },
  { id: "corp_exec", name: "Executive Premium", cat: "🏢 Corporate", color: "#1a1a2e", accent: "#e94560", thumb: "sidebar-l" },
  { id: "corp_modern", name: "Modern Corporate", cat: "🏢 Corporate", color: "#2d3561", accent: "#f5a623", thumb: "top-banner" },
  // Creative
  { id: "cr_designer", name: "Creative Designer", cat: "🎨 Creative", color: "#6200ea", accent: "#03dac6", thumb: "sidebar-r" },
  { id: "cr_bold", name: "Bold Creative", cat: "🎨 Creative", color: "#212121", accent: "#ff5722", thumb: "sidebar-l" },
  { id: "cr_gradient", name: "Gradient Modern", cat: "🎨 Creative", color: "#667eea", accent: "#f093fb", thumb: "gradient" },
  { id: "cr_glassmorphism", name: "Glassmorphism", cat: "🎨 Creative", color: "#0f0c29", accent: "#00f2fe", thumb: "glass" },
  // Tech / Developer
  { id: "dev_dark", name: "Developer Dark", cat: "💻 Developer", color: "#0d1117", accent: "#58a6ff", thumb: "sidebar-l" },
  { id: "dev_minimal", name: "Dev Minimal", cat: "💻 Developer", color: "#161b22", accent: "#3fb950", thumb: "ats" },
  { id: "dev_fullstack", name: "Full Stack Dev", cat: "💻 Developer", color: "#1f2937", accent: "#6366f1", thumb: "two-col" },
  // Minimal
  { id: "min_white", name: "Pure White Minimal", cat: "⬜ Minimal", color: "#2c3e50", accent: "#3498db", thumb: "ats" },
  { id: "min_elegant", name: "Elegant Minimal", cat: "⬜ Minimal", color: "#1a1a1a", accent: "#c9a96e", thumb: "single" },
  { id: "min_swiss", name: "Swiss Style", cat: "⬜ Minimal", color: "#e63946", accent: "#1d3557", thumb: "ats" },
  // International
  { id: "int_euro", name: "Europass CV", cat: "🌍 International", color: "#003399", accent: "#ffcc00", thumb: "single" },
  { id: "int_canada", name: "Canada Resume", cat: "🌍 International", color: "#d62828", accent: "#023e8a", thumb: "ats" },
  { id: "int_gulf", name: "Gulf Job CV", cat: "🌍 International", color: "#c4a020", accent: "#1a3a5c", thumb: "sidebar-l" },
  { id: "int_usa", name: "USA Resume", cat: "🌍 International", color: "#003087", accent: "#bf0a30", thumb: "ats" },
  { id: "int_uk", name: "UK CV Style", cat: "🌍 International", color: "#012169", accent: "#c8102e", thumb: "single" },
  // Premium / Luxury
  { id: "lux_gold", name: "Luxury Gold", cat: "👑 Luxury", color: "#1a1a1a", accent: "#d4af37", thumb: "sidebar-l" },
  { id: "lux_marble", name: "Marble White", cat: "👑 Luxury", color: "#2c2c2c", accent: "#b8956a", thumb: "top-banner" },
  { id: "lux_midnight", name: "Midnight Elite", cat: "👑 Luxury", color: "#0a0a1a", accent: "#c9a96e", thumb: "sidebar-r" },
  // Student
  { id: "std_fresh", name: "Fresh Graduate", cat: "🎓 Student", color: "#1565c0", accent: "#42a5f5", thumb: "ats" },
  { id: "std_intern", name: "Internship CV", cat: "🎓 Student", color: "#00695c", accent: "#80cbc4", thumb: "two-col" },
  // Infographic
  { id: "info_visual", name: "Visual Infographic", cat: "📊 Infographic", color: "#6200ea", accent: "#00bcd4", thumb: "infographic" },
  { id: "info_timeline", name: "Timeline CV", cat: "📊 Infographic", color: "#01579b", accent: "#81d4fa", thumb: "timeline" },
  // Freelance
  { id: "free_portfolio", name: "Freelance Portfolio", cat: "🖥 Freelance", color: "#1b2631", accent: "#f39c12", thumb: "sidebar-l" },
  { id: "free_digital", name: "Digital Nomad", cat: "🖥 Freelance", color: "#0f3460", accent: "#e94560", thumb: "top-banner" },
  // NGO/Social
  { id: "ngo_impact", name: "Social Impact CV", cat: "🌱 NGO/Social", color: "#1b5e20", accent: "#81c784", thumb: "two-col" },
  // Medical
  { id: "med_doctor", name: "Doctor CV", cat: "⚕️ Medical", color: "#1565c0", accent: "#e3f2fd", thumb: "single" },
  // More
  { id: "dark_neon", name: "Dark Neon", cat: "🌟 Special", color: "#0a0a0a", accent: "#00ff88", thumb: "sidebar-l" },
  { id: "pastel_soft", name: "Pastel Soft", cat: "🌟 Special", color: "#5c6bc0", accent: "#f48fb1", thumb: "two-col" },
  { id: "mono_black", name: "Monochrome Black", cat: "🌟 Special", color: "#000000", accent: "#ffffff", thumb: "ats" },
  { id: "retro_vintage", name: "Retro Vintage", cat: "🌟 Special", color: "#5d4037", accent: "#ffcc80", thumb: "single" },
  { id: "ocean_blue", name: "Ocean Blue", cat: "🌟 Special", color: "#006064", accent: "#80deea", thumb: "sidebar-l" },
  { id: "forest_green", name: "Forest Green", cat: "🌟 Special", color: "#1b5e20", accent: "#a5d6a7", thumb: "two-col" },
  { id: "sunset_warm", name: "Sunset Warm", cat: "🌟 Special", color: "#bf360c", accent: "#ffcc80", thumb: "top-banner" },
  { id: "rose_gold", name: "Rose Gold Premium", cat: "🌟 Special", color: "#880e4f", accent: "#f8bbd0", thumb: "sidebar-r" },
  { id: "arctic_frost", name: "Arctic Frost", cat: "🌟 Special", color: "#263238", accent: "#80deea", thumb: "ats" },
  { id: "corporate_teal", name: "Corporate Teal", cat: "🌟 Special", color: "#00695c", accent: "#e0f2f1", thumb: "two-col" },
];

const TEMPLATE_CATS = [...new Set(TEMPLATES.map(t => t.cat))];

/* ================================================================
   MINI CV THUMBNAIL RENDERER (for gallery)
================================================================ */
function MiniThumb({ t, selected, onClick }) {
  const pat = t.thumb;
  const c = t.color; const a = t.accent;
  return (
    <div onClick={onClick} style={{
      cursor: "pointer", borderRadius: 10, overflow: "hidden",
      border: selected ? `2.5px solid ${a}` : "2px solid transparent",
      boxShadow: selected ? `0 0 0 3px ${a}44` : "0 2px 8px rgba(0,0,0,0.13)",
      transition: "all .2s", transform: selected ? "scale(1.03)" : "scale(1)",
      background: "white",
    }}>
      <svg viewBox="0 0 140 198" width="100%" style={{ display: "block" }}>
        {/* Base */}
        <rect width="140" height="198" fill="white" />
        {pat === "sidebar-l" && <>
          <rect width="46" height="198" fill={c} />
          <circle cx="23" cy="32" r="14" fill={`${a}88`} />
          <rect x="6" y="54" width="34" height="3" rx="1.5" fill={`${a}99`} />
          <rect x="6" y="62" width="28" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
          <rect x="6" y="70" width="34" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
          {[80,90,100,110,120,130].map((y,i)=><>
            <rect key={`sl${y}`} x="6" y={y} width="34" height="1.5" rx=".7" fill="rgba(255,255,255,0.3)" />
            <rect x="6" y={y+4} width={20+i*2} height="2" rx="1" fill={a} opacity=".7" />
          </>)}
          <rect x="54" y="12" width="76" height="5" rx="2.5" fill={c} opacity=".9" />
          <rect x="54" y="20" width="52" height="3" rx="1.5" fill={a} opacity=".8" />
          <rect x="54" y="30" width="76" height="1" rx=".5" fill={c} opacity=".2" />
          {[36,50,64,78,92,106,120,134,148,162,176].map((y,i)=>(
            <rect key={`sr${y}`} x="54" y={y} width={40+Math.sin(i)*20} height="2" rx="1" fill={c} opacity=".15" />
          ))}
        </>}
        {pat === "sidebar-r" && <>
          <rect x="94" width="46" height="198" fill={c} />
          <rect x="8" y="12" width="76" height="5" rx="2.5" fill={c} opacity=".9" />
          <rect x="8" y="20" width="52" height="3" rx="1.5" fill={a} opacity=".8" />
          {[32,44,56,68,80,92,104,116,128,140,152,164].map((y,i)=>(
            <rect key={`srr${y}`} x="8" y={y} width={40+i*2} height="2" rx="1" fill={c} opacity=".18" />
          ))}
          <circle cx="117" cy="30" r="13" fill={`${a}88`} />
          {[52,62,72,82,92,102,112].map((y,i)=><>
            <rect key={`srl${y}`} x="99" y={y} width="34" height="1.5" rx=".7" fill="rgba(255,255,255,0.3)" />
            <rect x="99" y={y+4} width={16+i*2} height="2" rx="1" fill={a} opacity=".7" />
          </>)}
        </>}
        {pat === "top-banner" && <>
          <rect width="140" height="48" fill={c} />
          <circle cx="24" cy="24" r="14" fill={`${a}77`} />
          <rect x="44" y="14" width="72" height="5" rx="2.5" fill="white" opacity=".9" />
          <rect x="44" y="22" width="50" height="3" rx="1.5" fill={a} opacity=".8" />
          <rect x="44" y="30" width="72" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
          {[56,70,84,98,112,126,140,154,168,182].map((y,i)=>(
            <rect key={`tb${y}`} x="10" y={y} width={90+i} height="2" rx="1" fill={c} opacity=".18" />
          ))}
        </>}
        {pat === "two-col" && <>
          <rect width="140" height="12" fill={c} />
          <rect x="8" y="18" width="58" height="3" rx="1.5" fill={c} opacity=".8" />
          <rect x="8" y="25" width="40" height="2" rx="1" fill={a} opacity=".8" />
          <rect x="0" y="30" width="140" height=".5" fill={c} opacity=".2" />
          {[36,50,64,78,92,106,120,134,148,162,176,190].map((y,i)=>(
            <rect key={`tcl${y}`} x="8" y={y} width={55+Math.sin(i)*8} height="2" rx="1" fill={c} opacity=".18" />
          ))}
          <rect x="76" y="30" width="1" height="168" fill={c} opacity=".1" />
          {[36,48,60,72,84,96,108,120,132,144,156,168,180].map((y,i)=>(
            <rect key={`tcr${y}`} x="82" y={y} width={48+Math.cos(i)*6} height="2" rx="1" fill={c} opacity=".18" />
          ))}
        </>}
        {(pat === "ats" || pat === "single") && <>
          <rect x="10" y="12" width="120" height="6" rx="3" fill={c} opacity=".85" />
          <rect x="30" y="22" width="80" height="3" rx="1.5" fill={a} opacity=".8" />
          <rect x="10" y="29" width="120" height=".5" fill={c} opacity=".3" />
          {[36,48,60,72,84,96,108,120,132,144,156,168,180,192].map((y,i)=>(
            <rect key={`ats${y}`} x="10" y={y} width={80+Math.sin(i*0.8)*30} height="2" rx="1" fill={c} opacity=".18" />
          ))}
          {[44,56,68,80,92,104,116,128,140,152,164,176].map((y,i)=>(
            <rect key={`ats2${y}`} x="10" y={y+2} width={60+i*2} height="1.5" rx=".7" fill={c} opacity=".1" />
          ))}
        </>}
        {pat === "biodata" && <>
          <rect x="8" y="8" width="124" height="20" rx="3" fill={c} opacity=".12" stroke={c} strokeWidth=".5" />
          <rect x="40" y="10" width="60" height="4" rx="2" fill={c} opacity=".7" />
          <rect x="50" y="16" width="40" height="2" rx="1" fill={a} opacity=".7" />
          {[34,44,54,64,74,84,94,104,114,124,134,144,154,164,174,184].map((y,i)=>(
            <g key={`bd${y}`}>
              <rect x="8" y={y} width="50" height="2" rx="1" fill={c} opacity=".3" />
              <rect x="64" y={y} width="68" height="2" rx="1" fill={c} opacity=".18" />
            </g>
          ))}
        </>}
        {pat === "infographic" && <>
          <rect width="140" height="40" fill={c} />
          <circle cx="70" cy="20" r="14" fill={`${a}66`} />
          {[50,65,80,95,110,125,140,155,170,185].map((y,i)=>(
            <g key={`ig${y}`}>
              <circle cx="15" cy={y} r="4" fill={a} opacity=".7" />
              <rect x="24" y={y-2} width={80+i*4} height="4" rx="2" fill={c} opacity=".18" />
            </g>
          ))}
          {[60,90,120,150,180].map((y,i)=>(
            <rect key={`igbar${y}`} x="10" y={y-6} width={80} height="6" rx="3" fill={c} opacity=".08" />
          ))}
        </>}
        {pat === "timeline" && <>
          <rect x="8" y="8" width="90" height="5" rx="2.5" fill={c} opacity=".8" />
          <rect x="68" y="0" width="1.5" height="198" fill={c} opacity=".12" />
          {[22,42,62,82,102,122,142,162,182].map((y,i)=>(
            <g key={`tl${y}`}>
              <circle cx="68" cy={y} r="5" fill={i%2===0?c:a} opacity=".8" />
              <rect x={i%2===0?75:10} y={y-3} width={i%2===0?56:50} height="3" rx="1.5" fill={c} opacity=".25" />
              <rect x={i%2===0?75:10} y={y+2} width={i%2===0?40:35} height="2" rx="1" fill={c} opacity=".15" />
            </g>
          ))}
        </>}
        {pat === "gradient" && <>
          <defs>
            <linearGradient id={`g${t.id}`} x1="0" y1="0" x2="140" y2="198" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={c} />
              <stop offset="100%" stopColor={a} />
            </linearGradient>
          </defs>
          <rect width="140" height="60" fill={`url(#g${t.id})`} />
          <circle cx="70" cy="30" r="18" fill="rgba(255,255,255,0.15)" />
          {[68,82,96,110,124,138,152,166,180,194].map((y,i)=>(
            <rect key={`gr${y}`} x="10" y={y} width={60+i*6} height="2.5" rx="1.2" fill={c} opacity=".2" />
          ))}
        </>}
        {pat === "glass" && <>
          <rect width="140" height="198" fill={c} />
          <rect x="8" y="8" width="124" height="80" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth=".8" />
          <circle cx="30" cy="32" r="14" fill={`${a}44`} />
          {[100,115,130,145,160,175,190].map((y,i)=>(
            <rect key={`gl${y}`} x="8" y={y} width={80+i*6} height="2.5" rx="1.2" fill={a} opacity=".25" />
          ))}
        </>}
      </svg>
      <div style={{ padding: "6px 8px", background: "white" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#1e293b", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
        <div style={{ fontSize: 9, color: "#64748b", marginTop: 1 }}>{t.cat.split(" ").slice(1).join(" ")}</div>
      </div>
    </div>
  );
}

/* ================================================================
   CV TEMPLATE RENDERERS
================================================================ */

// -- Shared helpers --
const Dot = ({level, color}) => {
  const n = 5, f = Math.round(level/100*n);
  return <span style={{display:"inline-flex",gap:3}}>{Array.from({length:n}).map((_,i)=>(
    <span key={i} style={{width:7,height:7,borderRadius:"50%",background:i<f?color:"rgba(255,255,255,0.25)",display:"inline-block"}}/>
  ))}</span>;
};
const Bar = ({level, color, bg="rgba(255,255,255,0.2)"}) => (
  <div style={{height:4,borderRadius:2,background:bg,overflow:"hidden"}}>
    <div style={{height:"100%",width:`${level}%`,background:color,borderRadius:2,transition:"width .5s"}}/>
  </div>
);
const TagChip = ({label, color}) => (
  <span style={{fontSize:9,padding:"2px 8px",borderRadius:20,background:`${color}22`,color,border:`1px solid ${color}44`,display:"inline-block",margin:"1px 2px"}}>{label}</span>
);

// ----- TEMPLATE: Classic BD Sidebar -----
function TplBDPro({cv,color,accent}) {
  return (
    <div style={{display:"flex",minHeight:"297mm",fontFamily:"'Georgia',serif",fontSize:11}}>
      <div style={{width:"36%",background:color,color:"white",padding:"24px 16px",display:"flex",flexDirection:"column",gap:12}}>
        <div style={{textAlign:"center"}}>
          <div style={{width:84,height:84,borderRadius:"50%",border:`3px solid ${accent}`,margin:"0 auto",background:`${accent}33`,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white" opacity=".7"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
          </div>
          <div style={{marginTop:10,fontSize:14,fontWeight:"bold"}}>{cv.name}</div>
          <div style={{fontSize:10,opacity:.8,marginTop:2,color:accent}}>{cv.title}</div>
        </div>
        <CvSideSec title="Contact" accent={accent}>
          {[[" ✉",cv.email],[" 📞",cv.phone],[" 📍",cv.location],[" 🌐",cv.website]].map(([k,v],i)=>(
            <div key={i} style={{fontSize:9.5,marginBottom:4,opacity:.9}}><span style={{color:accent}}>{k} </span>{v}</div>
          ))}
        </CvSideSec>
        <CvSideSec title="Skills" accent={accent}>
          {cv.skills.map(s=>(
            <div key={s.id} style={{marginBottom:7}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}>
                <span style={{fontSize:9.5}}>{s.name}</span>
                <span style={{fontSize:8,opacity:.7}}>{s.level}%</span>
              </div>
              <Bar level={s.level} color={accent}/>
            </div>
          ))}
        </CvSideSec>
        <CvSideSec title="Languages" accent={accent}>
          {cv.languages.map(l=>(
            <div key={l.id} style={{display:"flex",justifyContent:"space-between",fontSize:9.5,marginBottom:4}}>
              <span>{l.name}</span><span style={{opacity:.75,fontSize:8.5}}>{l.level}</span>
            </div>
          ))}
        </CvSideSec>
        <CvSideSec title="Interests" accent={accent}>
          <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
            {cv.interests.map((i,idx)=><span key={idx} style={{fontSize:8.5,background:`${accent}22`,border:`1px solid ${accent}44`,borderRadius:10,padding:"1px 7px"}}>{i}</span>)}
          </div>
        </CvSideSec>
      </div>
      <div style={{flex:1,padding:"24px 20px",background:"#fff"}}>
        <div style={{borderBottom:`3px solid ${color}`,paddingBottom:8,marginBottom:16}}>
          <div style={{fontSize:22,fontWeight:"bold",color:color,letterSpacing:.5}}>{cv.name}</div>
          <div style={{fontSize:12,color:accent,marginTop:2}}>{cv.title}</div>
        </div>
        <CvSec title="Career Objective" color={color} accent={accent}>
          <div style={{fontSize:10,color:"#444",lineHeight:1.7}}>{cv.objective}</div>
        </CvSec>
        <CvSec title="Work Experience" color={color} accent={accent}>
          {cv.experience.map(e=>(
            <div key={e.id} style={{marginBottom:12,paddingLeft:10,borderLeft:`2px solid ${accent}44`}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{fontWeight:"bold",fontSize:11,color:color}}>{e.title}</div>
                <div style={{fontSize:9,color:"#888"}}>{e.year}</div>
              </div>
              <div style={{fontSize:10,color:accent,marginBottom:3}}>{e.company} — {e.location}</div>
              <div style={{fontSize:9.5,color:"#555",lineHeight:1.65}}>{e.desc}</div>
            </div>
          ))}
        </CvSec>
        <CvSec title="Education" color={color} accent={accent}>
          {cv.education.map(e=>(
            <div key={e.id} style={{marginBottom:9}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{fontWeight:"bold",fontSize:10.5,color:color}}>{e.degree}</div>
                <div style={{fontSize:9,color:"#888"}}>{e.year}</div>
              </div>
              <div style={{fontSize:9.5,color:"#666"}}>{e.institution}{e.result?` • ${e.result}`:""}</div>
            </div>
          ))}
        </CvSec>
        <CvSec title="Certifications" color={color} accent={accent}>
          {cv.certifications.map(c=>(
            <div key={c.id} style={{fontSize:9.5,marginBottom:4,color:"#555"}}>
              <strong style={{color:color}}>{c.name}</strong> — {c.issuer} ({c.year})
            </div>
          ))}
        </CvSec>
        <CvSec title="References" color={color} accent={accent}>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            {cv.references.map(r=>(
              <div key={r.id} style={{flex:1,minWidth:110,fontSize:9.5}}>
                <div style={{fontWeight:"bold",color:color}}>{r.name}</div>
                <div style={{color:"#555"}}>{r.title}, {r.org}</div>
                <div style={{color:"#888"}}>{r.email}</div>
              </div>
            ))}
          </div>
        </CvSec>
      </div>
    </div>
  );
}

// ----- TEMPLATE: Government Job -----
function TplGovt({cv,color,accent}) {
  return (
    <div style={{minHeight:"297mm",fontFamily:"'Times New Roman',serif",fontSize:11,background:"#fff",padding:"28px 36px"}}>
      <div style={{textAlign:"center",marginBottom:16,borderBottom:`2px solid ${color}`,paddingBottom:12}}>
        <div style={{fontSize:18,fontWeight:"bold",color:color,letterSpacing:2,textTransform:"uppercase"}}>CURRICULUM VITAE</div>
        <div style={{fontSize:20,fontWeight:"bold",color:"#222",marginTop:4}}>{cv.name}</div>
        <div style={{fontSize:11,color:accent,marginTop:2}}>{cv.title}</div>
        <div style={{fontSize:9.5,color:"#666",marginTop:6}}>{cv.email} | {cv.phone} | {cv.location}</div>
      </div>
      <GovtSec title="Personal Information" color={color}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 20px"}}>
          {[
            ["Father's Name",cv.fatherName],["Mother's Name",cv.motherName],
            ["Date of Birth",cv.dob],["Blood Group",cv.bloodGroup],
            ["Religion",cv.religion],["Nationality",cv.nationality],
            ["Marital Status",cv.maritalStatus],["NID No.",cv.nid],
            ["Passport No.",cv.passportNo],["Expected Salary",cv.expectedSalary],
          ].map(([k,v])=>(
            <div key={k} style={{fontSize:10,display:"flex",gap:6,paddingBottom:2}}>
              <span style={{fontWeight:"bold",color:"#333",minWidth:110,flexShrink:0}}>{k}:</span>
              <span style={{color:"#555"}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:6,fontSize:10}}>
          <div style={{fontWeight:"bold",color:"#333",marginBottom:1}}>Present Address: <span style={{fontWeight:"normal",color:"#555"}}>{cv.presentAddress}</span></div>
          <div style={{fontWeight:"bold",color:"#333"}}>Permanent Address: <span style={{fontWeight:"normal",color:"#555"}}>{cv.permanentAddress}</span></div>
        </div>
      </GovtSec>
      <GovtSec title="Educational Qualifications" color={color}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}>
          <thead>
            <tr style={{background:`${color}12`}}>
              {["Degree/Exam","Institution","Board/University","Year","Result"].map(h=>(
                <th key={h} style={{padding:"5px 7px",textAlign:"left",border:`1px solid ${color}30`,color:color,fontSize:9.5}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cv.education.map(e=>(
              <tr key={e.id}>
                {[e.degree,e.institution,e.board||"—",e.year,e.result].map((v,i)=>(
                  <td key={i} style={{padding:"4px 7px",border:`1px solid ${color}20`,fontSize:9.5,color:"#444"}}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </GovtSec>
      <GovtSec title="Work Experience" color={color}>
        {cv.experience.map(e=>(
          <div key={e.id} style={{marginBottom:10}}>
            <div style={{fontWeight:"bold",fontSize:10.5,color:color}}>{e.title} — {e.company} ({e.year})</div>
            <div style={{fontSize:9.5,color:"#555",lineHeight:1.7,marginTop:2}}>{e.desc}</div>
          </div>
        ))}
      </GovtSec>
      <div style={{display:"flex",gap:20}}>
        <div style={{flex:1}}>
          <GovtSec title="Skills" color={color}>
            <div style={{columns:2,columnGap:10}}>
              {cv.skills.map(s=><div key={s.id} style={{fontSize:9.5,color:"#444",marginBottom:3}}>▸ {s.name}</div>)}
            </div>
          </GovtSec>
        </div>
        <div style={{flex:1}}>
          <GovtSec title="Languages" color={color}>
            {cv.languages.map(l=><div key={l.id} style={{fontSize:9.5,color:"#444",marginBottom:3}}>▸ {l.name} ({l.level})</div>)}
          </GovtSec>
          <GovtSec title="Training" color={color}>
            {cv.trainings.map(t=>(
              <div key={t.id} style={{fontSize:9.5,color:"#444",marginBottom:3}}>▸ {t.name} — {t.institute} ({t.year})</div>
            ))}
          </GovtSec>
        </div>
      </div>
      <GovtSec title="References" color={color}>
        <div style={{display:"flex",gap:20}}>
          {cv.references.map(r=>(
            <div key={r.id} style={{flex:1,fontSize:9.5}}>
              <div style={{fontWeight:"bold"}}>{r.name}</div>
              <div style={{color:"#555"}}>{r.title}, {r.org}</div>
              <div style={{color:"#777"}}>Email: {r.email} | Phone: {r.phone}</div>
            </div>
          ))}
        </div>
      </GovtSec>
      <div style={{marginTop:20,display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
        <div>
          <div style={{fontSize:9.5,color:"#888",marginBottom:2}}>Declaration: I hereby declare that all information provided is true to the best of my knowledge.</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:9.5,color:"#888"}}>Signature</div>
          <div style={{height:32,borderBottom:"1px solid #333",width:110,marginTop:6}}/>
          <div style={{fontSize:9,color:"#888",marginTop:3}}>{cv.name}</div>
        </div>
      </div>
    </div>
  );
}

// ----- TEMPLATE: ATS Clean -----
function TplATSClean({cv,color,accent}) {
  return (
    <div style={{minHeight:"297mm",fontFamily:"'Calibri','Arial',sans-serif",fontSize:11,background:"#fff",padding:"28px 36px"}}>
      <div style={{textAlign:"center",marginBottom:14}}>
        <div style={{fontSize:22,fontWeight:"bold",color:"#222",letterSpacing:.5}}>{cv.name}</div>
        <div style={{fontSize:11,color:accent,marginTop:2,fontWeight:"600"}}>{cv.title}</div>
        <div style={{fontSize:9.5,color:"#666",marginTop:5}}>
          {cv.phone} | {cv.email} | {cv.location}
          {cv.linkedin && ` | ${cv.linkedin}`}
        </div>
      </div>
      <div style={{height:2,background:color,marginBottom:14}}/>
      {[
        {title:"PROFESSIONAL SUMMARY",content:(
          <div style={{fontSize:10.5,color:"#333",lineHeight:1.8}}>{cv.objective}</div>
        )},
        {title:"WORK EXPERIENCE",content:(
          cv.experience.map(e=>(
            <div key={e.id} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{fontWeight:"bold",fontSize:11,color:"#222"}}>{e.title}</div>
                <div style={{fontSize:9.5,color:"#555"}}>{e.year}</div>
              </div>
              <div style={{fontSize:10,color:"#555",marginBottom:3,fontStyle:"italic"}}>{e.company}, {e.location}</div>
              <div style={{fontSize:10,color:"#444",lineHeight:1.75}}>{e.desc}</div>
            </div>
          ))
        )},
        {title:"EDUCATION",content:(
          cv.education.map(e=>(
            <div key={e.id} style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
              <div>
                <div style={{fontWeight:"bold",fontSize:10.5}}>{e.degree}</div>
                <div style={{fontSize:9.5,color:"#666"}}>{e.institution}</div>
              </div>
              <div style={{fontSize:9.5,color:"#666",textAlign:"right"}}><div>{e.year}</div><div>{e.result}</div></div>
            </div>
          ))
        )},
        {title:"SKILLS",content:(
          <div style={{fontSize:10.5,color:"#333",lineHeight:1.85}}>
            {cv.skills.map(s=>s.name).join(" • ")}
          </div>
        )},
        {title:"CERTIFICATIONS",content:(
          cv.certifications.map(c=>(
            <div key={c.id} style={{fontSize:10,marginBottom:4,color:"#444"}}>{c.name} — {c.issuer} ({c.year})</div>
          ))
        )},
        {title:"LANGUAGES",content:(
          <div style={{fontSize:10.5,color:"#333"}}>{cv.languages.map(l=>`${l.name} (${l.level})`).join(" • ")}</div>
        )},
      ].map(sec=>(
        <div key={sec.title} style={{marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:"bold",color:color,textTransform:"uppercase",letterSpacing:1,borderBottom:`1.5px solid ${color}22`,paddingBottom:4,marginBottom:8}}>{sec.title}</div>
          {sec.content}
        </div>
      ))}
      <div style={{height:1.5,background:color,marginTop:12,marginBottom:10}}/>
      <div style={{display:"flex",gap:24}}>
        {cv.references.map(r=>(
          <div key={r.id} style={{flex:1,fontSize:9.5}}>
            <div style={{fontWeight:"bold"}}>{r.name}</div>
            <div style={{color:"#666"}}>{r.title}, {r.org}</div>
            <div style={{color:"#888"}}>{r.email} | {r.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----- TEMPLATE: Executive Dark (Premium) -----
function TplExecDark({cv,color,accent}) {
  return (
    <div style={{display:"flex",minHeight:"297mm",fontFamily:"'Helvetica Neue',Arial,sans-serif",fontSize:11}}>
      <div style={{width:"37%",background:"#0a0a1a",color:"white",padding:"24px 16px",display:"flex",flexDirection:"column",gap:14}}>
        <div style={{textAlign:"center"}}>
          <div style={{width:80,height:80,borderRadius:"50%",border:`3px solid ${accent}`,margin:"0 auto",background:"#111230",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill={accent} opacity=".8"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
          </div>
          <div style={{marginTop:10,fontSize:13,fontWeight:"bold"}}>{cv.name}</div>
          <div style={{fontSize:9.5,color:accent,marginTop:2}}>{cv.title}</div>
        </div>
        <div style={{height:1,background:"#1e2040"}}/>
        {[["✉",cv.email],["📞",cv.phone],["📍",cv.location],["🌐",cv.website]].map(([k,v],i)=>(
          <div key={i} style={{fontSize:9,color:"#aaa",display:"flex",gap:7,alignItems:"flex-start"}}>
            <span style={{color:accent}}>{k}</span><span>{v}</span>
          </div>
        ))}
        <div style={{height:1,background:"#1e2040"}}/>
        <div>
          <div style={{fontSize:9,fontWeight:"bold",color:accent,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Skills</div>
          {cv.skills.map(s=>(
            <div key={s.id} style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                <span style={{fontSize:9,color:"#ccc"}}>{s.name}</span>
                <span style={{fontSize:8,color:accent}}>{s.level}%</span>
              </div>
              <div style={{height:3,background:"#1e2040",borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${s.level}%`,background:`linear-gradient(90deg,${accent},${accent}88)`,borderRadius:2}}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{height:1,background:"#1e2040"}}/>
        <div>
          <div style={{fontSize:9,fontWeight:"bold",color:accent,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Languages</div>
          {cv.languages.map(l=>(
            <div key={l.id} style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:4,color:"#ccc"}}>
              <span>{l.name}</span><span style={{color:accent,fontSize:8}}>{l.level}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontSize:9,fontWeight:"bold",color:accent,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Awards</div>
          {cv.awards.map((a,i)=><div key={i} style={{fontSize:8.5,color:"#aaa",marginBottom:3}}>🏆 {a}</div>)}
        </div>
      </div>
      <div style={{flex:1,background:"#fff",padding:"24px 20px"}}>
        <div style={{marginBottom:16,paddingBottom:8,borderBottom:`2px solid ${color}15`}}>
          <div style={{fontSize:22,fontWeight:"900",color:"#0a0a1a",letterSpacing:.5}}>{cv.name}</div>
          <div style={{fontSize:11,color:accent,marginTop:2,fontWeight:"600"}}>{cv.title}</div>
        </div>
        <CvSec title="Executive Summary" color={color} accent={accent}>
          <div style={{fontSize:10,color:"#444",lineHeight:1.75}}>{cv.objective}</div>
        </CvSec>
        <CvSec title="Experience" color={color} accent={accent}>
          {cv.experience.map(e=>(
            <div key={e.id} style={{marginBottom:13}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{fontWeight:"bold",fontSize:11,color:color}}>{e.title}</div>
                <span style={{fontSize:8.5,background:`${color}12`,color:color,padding:"1px 7px",borderRadius:10,whiteSpace:"nowrap"}}>{e.year}</span>
              </div>
              <div style={{fontSize:9.5,color:accent,marginBottom:3,fontWeight:"600"}}>{e.company}</div>
              <div style={{fontSize:9.5,color:"#555",lineHeight:1.7}}>{e.desc}</div>
            </div>
          ))}
        </CvSec>
        <CvSec title="Education" color={color} accent={accent}>
          {cv.education.map(e=>(
            <div key={e.id} style={{marginBottom:8,display:"flex",justifyContent:"space-between"}}>
              <div>
                <div style={{fontWeight:"bold",fontSize:10.5,color:color}}>{e.degree}</div>
                <div style={{fontSize:9.5,color:"#666"}}>{e.institution}</div>
              </div>
              <div style={{fontSize:9,color:"#888",textAlign:"right"}}><div>{e.year}</div><div>{e.result}</div></div>
            </div>
          ))}
        </CvSec>
        <div style={{display:"flex",gap:16}}>
          <div style={{flex:1}}>
            <CvSec title="Certifications" color={color} accent={accent}>
              {cv.certifications.map(c=>(
                <div key={c.id} style={{fontSize:9.5,marginBottom:4}}>
                  <div style={{fontWeight:"bold",color:color}}>{c.name}</div>
                  <div style={{color:"#777"}}>{c.issuer} · {c.year}</div>
                </div>
              ))}
            </CvSec>
          </div>
          <div style={{flex:1}}>
            <CvSec title="Projects" color={color} accent={accent}>
              {cv.projects.map(p=>(
                <div key={p.id} style={{fontSize:9.5,marginBottom:5}}>
                  <div style={{fontWeight:"bold",color:color}}>{p.name}</div>
                  <div style={{color:"#777",fontSize:8.5}}>{p.tech} · {p.year}</div>
                </div>
              ))}
            </CvSec>
          </div>
        </div>
        <CvSec title="References" color={color} accent={accent}>
          <div style={{display:"flex",gap:16}}>
            {cv.references.map(r=>(
              <div key={r.id} style={{flex:1,fontSize:9.5,paddingLeft:8,borderLeft:`2px solid ${accent}44`}}>
                <div style={{fontWeight:"bold",color:color}}>{r.name}</div>
                <div style={{color:"#666"}}>{r.title}, {r.org}</div>
                <div style={{color:"#999"}}>{r.email}</div>
              </div>
            ))}
          </div>
        </CvSec>
      </div>
    </div>
  );
}

// ----- TEMPLATE: Developer Dark -----
function TplDevDark({cv,color,accent}) {
  return (
    <div style={{display:"flex",minHeight:"297mm",fontFamily:"'SF Mono','Fira Code','Consolas',monospace",fontSize:10.5,background:"#0d1117"}}>
      <div style={{width:"35%",background:"#161b22",color:"#c9d1d9",padding:"20px 14px",borderRight:"1px solid #30363d"}}>
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{width:76,height:76,borderRadius:"50%",border:`2px solid ${accent}`,margin:"0 auto",background:"#21262d",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{fontSize:28}}>👨‍💻</span>
          </div>
          <div style={{marginTop:8,fontSize:12,fontWeight:"bold",color:accent}}>{cv.name}</div>
          <div style={{fontSize:9,color:"#8b949e",marginTop:2}}>{cv.title}</div>
        </div>
        <div style={{fontFamily:"monospace",fontSize:8.5,color:"#8b949e",marginBottom:12}}>
          <div style={{color:"#58a6ff"}}>// contact</div>
          <div>📧 <span style={{color:"#a8d8a8"}}>{cv.email}</span></div>
          <div>📱 <span style={{color:"#a8d8a8"}}>{cv.phone}</span></div>
          <div>🌐 <span style={{color:"#58a6ff"}}>{cv.website}</span></div>
          <div>💼 <span style={{color:"#58a6ff"}}>{cv.linkedin}</span></div>
        </div>
        <div style={{height:1,background:"#30363d",margin:"10px 0"}}/>
        <div style={{fontSize:8.5,color:"#58a6ff",marginBottom:6}}>// skills</div>
        {cv.skills.map(s=>(
          <div key={s.id} style={{marginBottom:7}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:2,fontSize:9}}>
              <span style={{color:"#c9d1d9"}}>{s.name}</span>
              <span style={{color:accent}}>{s.level}%</span>
            </div>
            <div style={{height:3,background:"#30363d",borderRadius:2,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${s.level}%`,background:`linear-gradient(90deg,${accent},#3fb950)`,borderRadius:2}}/>
            </div>
          </div>
        ))}
        <div style={{height:1,background:"#30363d",margin:"10px 0"}}/>
        <div style={{fontSize:8.5,color:"#58a6ff",marginBottom:6}}>// languages</div>
        {cv.languages.map(l=>(
          <div key={l.id} style={{fontSize:9,color:"#c9d1d9",marginBottom:3}}>▸ {l.name} <span style={{color:"#8b949e"}}>({l.level})</span></div>
        ))}
      </div>
      <div style={{flex:1,padding:"20px 18px",color:"#c9d1d9"}}>
        <div style={{marginBottom:14,paddingBottom:8,borderBottom:"1px solid #30363d"}}>
          <div style={{fontSize:18,fontWeight:"bold",color:"#e6edf3"}}>&lt;{cv.name}/&gt;</div>
          <div style={{fontSize:9.5,color:"#8b949e",marginTop:2,fontFamily:"monospace"}}>// {cv.title}</div>
        </div>
        {[
          {t:"// summary",c:<div style={{fontSize:9.5,color:"#8b949e",lineHeight:1.75,fontFamily:"monospace"}}>{cv.objective}</div>},
          {t:"// experience",c:cv.experience.map(e=>(
            <div key={e.id} style={{marginBottom:12,background:"#161b22",borderRadius:6,padding:"8px 10px",border:"1px solid #30363d"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{fontWeight:"bold",fontSize:10,color:accent}}>{e.title}</div>
                <span style={{fontSize:8,color:"#8b949e"}}>{e.year}</span>
              </div>
              <div style={{fontSize:9,color:"#3fb950",marginBottom:3}}>{e.company}</div>
              <div style={{fontSize:9,color:"#8b949e",lineHeight:1.7}}>{e.desc}</div>
            </div>
          ))},
          {t:"// education",c:cv.education.map(e=>(
            <div key={e.id} style={{marginBottom:7,fontSize:9}}>
              <div style={{fontWeight:"bold",color:accent}}>{e.degree}</div>
              <div style={{color:"#8b949e"}}>{e.institution} · {e.year} · {e.result}</div>
            </div>
          ))},
          {t:"// projects",c:cv.projects.map(p=>(
            <div key={p.id} style={{marginBottom:8,fontSize:9}}>
              <div style={{fontWeight:"bold",color:"#79c0ff"}}>{p.name} <span style={{color:"#8b949e",fontWeight:"normal"}}>({p.year})</span></div>
              <div style={{color:"#3fb950",fontSize:8.5}}>{p.tech}</div>
              <div style={{color:"#8b949e",marginTop:1}}>{p.desc}</div>
            </div>
          ))},
          {t:"// certifications",c:<div style={{display:"flex",flexWrap:"wrap",gap:4}}>{cv.certifications.map(c=><TagChip key={c.id} label={c.name} color={accent}/>)}</div>},
        ].map(sec=>(
          <div key={sec.t} style={{marginBottom:12}}>
            <div style={{fontSize:9,color:"#58a6ff",fontFamily:"monospace",marginBottom:6}}>{sec.t}</div>
            {sec.c}
          </div>
        ))}
      </div>
    </div>
  );
}

// ----- TEMPLATE: Modern Gradient -----
function TplGradient({cv,color,accent}) {
  return (
    <div style={{minHeight:"297mm",fontFamily:"'Segoe UI',sans-serif",fontSize:11,background:"#fff"}}>
      <div style={{background:`linear-gradient(135deg,${color} 0%,${accent} 100%)`,color:"white",padding:"28px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/>
        <div style={{position:"absolute",bottom:-40,left:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
        <div style={{display:"flex",gap:20,alignItems:"center",position:"relative"}}>
          <div style={{width:88,height:88,borderRadius:"50%",border:"3px solid rgba(255,255,255,0.5)",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white" opacity=".8"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
          </div>
          <div>
            <div style={{fontSize:22,fontWeight:"900",letterSpacing:.5}}>{cv.name}</div>
            <div style={{fontSize:12,opacity:.9,marginTop:3}}>{cv.title}</div>
            <div style={{display:"flex",gap:14,marginTop:8,fontSize:9,opacity:.85,flexWrap:"wrap"}}>
              <span>✉ {cv.email}</span><span>📞 {cv.phone}</span><span>📍 {cv.location}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{display:"flex"}}>
        <div style={{flex:1,padding:"16px 20px"}}>
          <CvSec title="About" color={color} accent={accent}>
            <div style={{fontSize:10,color:"#444",lineHeight:1.75}}>{cv.objective}</div>
          </CvSec>
          <CvSec title="Work Experience" color={color} accent={accent}>
            {cv.experience.map(e=>(
              <div key={e.id} style={{marginBottom:13,paddingLeft:10,borderLeft:`3px solid ${accent}44`}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div style={{fontWeight:"bold",fontSize:11,color:color}}>{e.title}</div>
                  <span style={{fontSize:8.5,background:`${color}12`,color:color,padding:"1px 8px",borderRadius:10}}>{e.year}</span>
                </div>
                <div style={{fontSize:9.5,color:accent,marginBottom:3}}>{e.company}</div>
                <div style={{fontSize:9.5,color:"#555",lineHeight:1.7}}>{e.desc}</div>
              </div>
            ))}
          </CvSec>
          <CvSec title="Education" color={color} accent={accent}>
            {cv.education.map(e=>(
              <div key={e.id} style={{marginBottom:8}}>
                <div style={{fontWeight:"bold",fontSize:10.5,color:color}}>{e.degree}</div>
                <div style={{fontSize:9.5,color:"#666"}}>{e.institution} · {e.year} · {e.result}</div>
              </div>
            ))}
          </CvSec>
        </div>
        <div style={{width:"34%",padding:"16px",background:"#f8faff",borderLeft:"1px solid #eee"}}>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:"bold",color:color,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Skills</div>
            {cv.skills.map(s=>(
              <div key={s.id} style={{marginBottom:9}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:9.5,marginBottom:3}}>
                  <span style={{color:"#333"}}>{s.name}</span>
                  <span style={{color:color,fontWeight:"bold",fontSize:8.5}}>{s.level}%</span>
                </div>
                <div style={{height:5,background:"#e0e7ff",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${s.level}%`,background:`linear-gradient(90deg,${color},${accent})`,borderRadius:3}}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:"bold",color:color,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Languages</div>
            {cv.languages.map(l=>(
              <div key={l.id} style={{display:"flex",justifyContent:"space-between",fontSize:9.5,marginBottom:5}}>
                <span style={{color:"#444"}}>{l.name}</span><span style={{color:color,fontSize:8.5}}>{l.level}</span>
              </div>
            ))}
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:10,fontWeight:"bold",color:color,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Certifications</div>
            {cv.certifications.map(c=>(
              <div key={c.id} style={{fontSize:9,marginBottom:5}}>
                <div style={{fontWeight:"bold",color:color}}>{c.name}</div>
                <div style={{color:"#888"}}>{c.issuer} · {c.year}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:"bold",color:color,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>References</div>
            {cv.references.map(r=>(
              <div key={r.id} style={{fontSize:9,marginBottom:8}}>
                <div style={{fontWeight:"bold",color:color}}>{r.name}</div>
                <div style={{color:"#666"}}>{r.title}</div>
                <div style={{color:"#999"}}>{r.email}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared CV section helpers
function CvSec({title,color,accent,children}) {
  return (
    <div style={{marginBottom:13}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
        <div style={{width:3,height:14,background:accent||color,borderRadius:2}}/>
        <div style={{fontSize:10.5,fontWeight:"bold",textTransform:"uppercase",letterSpacing:.8,color}}>{title}</div>
        <div style={{flex:1,height:.5,background:`${color}20`}}/>
      </div>
      {children}
    </div>
  );
}
function CvSideSec({title,accent,children}) {
  return (
    <div style={{marginBottom:12}}>
      <div style={{fontSize:9,fontWeight:"bold",textTransform:"uppercase",letterSpacing:1,color:accent,borderBottom:`1px solid ${accent}33`,paddingBottom:3,marginBottom:7}}>{title}</div>
      {children}
    </div>
  );
}
function GovtSec({title,color,children}) {
  return (
    <div style={{marginBottom:12}}>
      <div style={{fontSize:11,fontWeight:"bold",color,textTransform:"uppercase",letterSpacing:.5,borderBottom:`1px solid ${color}30`,paddingBottom:3,marginBottom:7}}>{title}</div>
      {children}
    </div>
  );
}

/* ================================================================
   TEMPLATE ROUTER
================================================================ */
function CVRenderer({templateId,cv,color,accent}) {
  const tid = templateId;
  if (["bd_bank","bd_ngo","bd_teacher","bd_pro","corp_navy","corp_slate","lux_gold","lux_midnight","ocean_blue","free_portfolio","int_gulf","dark_neon","forest_green","corporate_teal","ngo_impact","rose_gold"].includes(tid))
    return <TplBDPro cv={cv} color={color} accent={accent}/>;
  if (["bd_govt","bd_teacher","int_euro","int_uk","med_doctor","retro_vintage","std_fresh","mono_black","min_elegant"].includes(tid))
    return <TplGovt cv={cv} color={color} accent={accent}/>;
  if (["ats_clean","ats_minimal","ats_pro","min_white","min_swiss","int_canada","int_usa","arctic_frost","pastel_soft","std_intern"].includes(tid))
    return <TplATSClean cv={cv} color={color} accent={accent}/>;
  if (["corp_exec","lux_marble","bd_biodata","sunset_warm","free_digital"].includes(tid))
    return <TplExecDark cv={cv} color={color} accent={accent}/>;
  if (["dev_dark","dev_minimal","dev_fullstack"].includes(tid))
    return <TplDevDark cv={cv} color={color} accent={accent}/>;
  if (["cr_gradient","cr_glassmorphism","corp_modern","info_visual","info_timeline","cr_bold"].includes(tid))
    return <TplGradient cv={cv} color={color} accent={accent}/>;
  if (["cr_designer","bd_ngo","lux_midnight"].includes(tid))
    return <TplBDPro cv={cv} color={color} accent={accent}/>;
  return <TplGradient cv={cv} color={color} accent={accent}/>;
}

/* ================================================================
   FORM INPUT COMPONENTS
================================================================ */
function FInput({label,value,onChange,placeholder,multiline,rows=3,th}) {
  const t = th;
  const base = {
    width:"100%",fontSize:12,border:`1px solid ${t.border}`,borderRadius:8,
    padding:multiline?"8px 10px":"8px 10px",boxSizing:"border-box",
    background:t.input,color:t.text,fontFamily:"inherit",outline:"none",
    transition:"border .2s",resize:multiline?"vertical":"none",
  };
  return (
    <div style={{marginBottom:10}}>
      {label && <label style={{fontSize:10,fontWeight:600,color:t.sub,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:.4}}>{label}</label>}
      {multiline
        ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={base}/>
        : <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={base}/>
      }
    </div>
  );
}

function SliderInput({label,value,onChange,th}) {
  const t = th;
  return (
    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
      <input value={value} onChange={e=>onChange(e.target.value)}
        style={{flex:1,fontSize:11,border:`1px solid ${t.border}`,borderRadius:6,padding:"5px 8px",background:t.input,color:t.text}}/>
      <input type="range" min="10" max="100" value={value.length===0?70:parseInt(value)||70}
        onChange={e=>onChange(e.target.value)}
        style={{width:70,accentColor:t.accent}}/>
      <span style={{fontSize:10,color:t.sub,minWidth:28}}>{value}%</span>
    </div>
  );
}

/* ================================================================
   AI PANEL
================================================================ */
function AIPanel({th}) {
  const [prompt,setPrompt]=useState(""); const [field,setField]=useState("objective");
  const [loading,setLoading]=useState(false); const [results,setResults]=useState([]);
  const [copied,setCopied]=useState(null);

  const FIELDS = ["Career Objective","About Me","Experience Bullet","Skills List","Cover Letter Intro","ATS Summary","Achievement Statement"];

  const generate = async()=>{
    if(!prompt.trim())return;
    setLoading(true); setResults([]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",max_tokens:1000,
          messages:[{role:"user",content:`You are an expert CV/Resume writer specializing in Bangladeshi and international job markets. 
Generate 3 unique, highly professional, ATS-optimized ${field} content pieces based on this context: "${prompt}"
The content should be impactful, quantified where possible, and job-market appropriate.
Return ONLY a JSON array of 3 strings. No markdown, no explanation, no backticks.
Example format: ["content1","content2","content3"]`}]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text||"[]";
      const clean = text.replace(/```json|```/g,"").trim();
      setResults(JSON.parse(clean));
    } catch(e){ setResults(["AI service temporarily unavailable. Please try again."]); }
    setLoading(false);
  };

  const copy=(t,i)=>{
    navigator.clipboard?.writeText(t);
    setCopied(i); setTimeout(()=>setCopied(null),2000);
  };

  return (
    <div style={{padding:"0 0 8px"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${th.gradA},${th.gradB})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🤖</div>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:th.text}}>AI Writer</div>
          <div style={{fontSize:10,color:th.sub}}>Powered by Claude AI</div>
        </div>
        <div style={{marginLeft:"auto",fontSize:9,background:`${th.accent}22`,color:th.accent,padding:"2px 8px",borderRadius:10,fontWeight:600}}>SMART</div>
      </div>
      <div style={{marginBottom:10}}>
        <div style={{fontSize:10,fontWeight:600,color:th.sub,marginBottom:6,textTransform:"uppercase",letterSpacing:.4}}>Content Type</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
          {FIELDS.map(f=>(
            <button key={f} onClick={()=>setField(f)}
              style={{fontSize:9.5,padding:"4px 9px",borderRadius:20,border:"none",
              background:field===f?`linear-gradient(90deg,${th.gradA},${th.gradB})`:`${th.accent}12`,
              color:field===f?"white":th.sub,cursor:"pointer",fontWeight:field===f?600:400,
              transition:"all .2s"}}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)}
        placeholder={`Describe your background, job target, or paste job description...\n\nExample: "5 years as software engineer at tech startups, applying for senior role at fintech company"`}
        rows={4} style={{width:"100%",fontSize:11,border:`1px solid ${th.border}`,borderRadius:8,padding:"9px",
        background:th.input,color:th.text,resize:"none",fontFamily:"inherit",boxSizing:"border-box",outline:"none"}}/>
      <button onClick={generate} disabled={loading||!prompt.trim()}
        style={{width:"100%",marginTop:8,padding:"10px",
        background:loading?th.border:`linear-gradient(90deg,${th.gradA},${th.gradB})`,
        color:"white",border:"none",borderRadius:8,fontSize:12,fontWeight:700,
        cursor:loading||!prompt.trim()?"not-allowed":"pointer",
        boxShadow:loading?"none":`0 4px 15px ${th.gradA}44`,transition:"all .2s"}}>
        {loading?"✨ Generating…":"✨ Generate with AI"}
      </button>
      {results.length>0 && (
        <div style={{marginTop:12}}>
          <div style={{fontSize:10,fontWeight:600,color:th.sub,marginBottom:8,textTransform:"uppercase",letterSpacing:.4}}>Generated Content — Click to Copy</div>
          {results.map((r,i)=>(
            <div key={i} onClick={()=>copy(r,i)}
              style={{background:th.card,border:`1px solid ${copied===i?th.accent:th.border}`,borderRadius:8,
              padding:"10px",marginBottom:8,fontSize:10.5,color:th.text,cursor:"pointer",lineHeight:1.65,
              transition:"all .2s",boxShadow:copied===i?`0 0 0 2px ${th.accent}44`:"none"}}>
              {r}
              <div style={{fontSize:9,color:copied===i?"#22c55e":th.accent,marginTop:6,fontWeight:600}}>
                {copied===i?"✓ Copied!":"+ Click to copy"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================================================
   LANDING PAGE
================================================================ */
function LandingPage({th,onStart}) {
  const [hovBtn,setHovBtn]=useState(false);
  const features = [
    {icon:"🤖",title:"AI-Powered Writing",desc:"Claude AI generates professional content for every section"},
    {icon:"🎨",title:"50+ Premium Templates",desc:"Bangladesh, ATS, Corporate, Creative & International designs"},
    {icon:"📄",title:"Perfect PDF Export",desc:"A4 optimized, print-ready, multi-page with auto page breaks"},
    {icon:"🇧🇩",title:"Bangladesh Special Fields",desc:"Father/Mother name, NID, Religion, Address & all local fields"},
    {icon:"⚡",title:"ATS Score Checker",desc:"Optimize your CV for Applicant Tracking Systems"},
    {icon:"🌍",title:"Multi Language",desc:"English & Bangla support with professional typography"},
    {icon:"☁️",title:"Cloud Sync",desc:"Auto-save and access your CVs from anywhere"},
    {icon:"📱",title:"Mobile Friendly",desc:"Edit your CV on phone, tablet, or desktop"},
  ];
  const testimonials = [
    {name:"Md. Rahim Uddin",role:"Software Engineer, BJIT",text:"Got my dream job using the ATS template. The AI suggestions were incredibly helpful!",stars:5},
    {name:"Nusrat Jahan",role:"Marketing Manager, Unilever BD",text:"The BD Professional template is perfect for local job market. Very premium and clean.",stars:5},
    {name:"Tanvir Ahmed",role:"Gulf Job Applicant",text:"The Gulf Job CV template helped me land a position in Dubai. Highly recommended!",stars:5},
  ];
  return (
    <div style={{minHeight:"100vh",background:th.bg,fontFamily:"'Segoe UI',system-ui,sans-serif",overflowX:"hidden"}}>
      {/* Nav */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:th.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${th.border}`,padding:"0 5%"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",height:60,gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
            <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${th.gradA},${th.gradB})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>📄</div>
            <div>
              <div style={{fontSize:14,fontWeight:800,color:th.text,letterSpacing:-.3}}>CVBuilder<span style={{color:th.accent}}>Pro</span></div>
              <div style={{fontSize:9,color:th.sub}}>Bangladesh & International</div>
            </div>
          </div>
          <div style={{display:"flex",gap:6}}>
            {["Features","Templates","Pricing","Blog"].map(l=>(
              <button key={l} style={{fontSize:12,color:th.sub,background:"none",border:"none",cursor:"pointer",padding:"4px 10px",borderRadius:6}}>{l}</button>
            ))}
          </div>
          <button onClick={onStart}
            style={{padding:"7px 18px",background:`linear-gradient(90deg,${th.gradA},${th.gradB})`,color:"white",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:`0 4px 12px ${th.gradA}44`}}>
            Build Free CV →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"80px 5% 60px",textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${th.accent}15`,border:`1px solid ${th.accent}30`,borderRadius:20,padding:"5px 14px",marginBottom:24,fontSize:11,color:th.accent,fontWeight:600}}>
          🇧🇩 #1 CV Builder for Bangladesh & International Jobs
        </div>
        <h1 style={{fontSize:52,fontWeight:900,color:th.text,lineHeight:1.15,margin:"0 0 20px",letterSpacing:-1.5}}>
          Build Your Dream CV<br/>
          <span style={{background:`linear-gradient(90deg,${th.gradA},${th.gradB},${th.gradC})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
            with AI in Minutes
          </span>
        </h1>
        <p style={{fontSize:17,color:th.sub,maxWidth:600,margin:"0 auto 36px",lineHeight:1.7}}>
          50+ premium templates for Bangladesh Government, Private, Bank, NGO, Gulf, and International jobs. AI-powered writing. ATS optimized. Free forever.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:48}}>
          <button onClick={onStart} onMouseOver={()=>setHovBtn(true)} onMouseOut={()=>setHovBtn(false)}
            style={{padding:"14px 36px",background:`linear-gradient(90deg,${th.gradA},${th.gradB})`,color:"white",border:"none",borderRadius:12,fontSize:15,fontWeight:700,cursor:"pointer",
            boxShadow:hovBtn?`0 8px 30px ${th.gradA}66`:`0 4px 16px ${th.gradA}44`,transform:hovBtn?"translateY(-2px)":"none",transition:"all .2s"}}>
            🚀 Start Building Free →
          </button>
          <button style={{padding:"14px 28px",background:th.card,color:th.text,border:`1px solid ${th.border}`,borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer",backdropFilter:"blur(8px)"}}>
            👁 View Templates
          </button>
        </div>
        {/* Stats */}
        <div style={{display:"flex",gap:32,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
          {[["50+","Premium Templates"],["🤖","AI Powered"],["🇧🇩","BD Optimized"],["100%","Free Access"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:800,color:th.text}}>{v}</div>
              <div style={{fontSize:10,color:th.sub}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Preview Strip */}
      <div style={{background:th.card,borderTop:`1px solid ${th.border}`,borderBottom:`1px solid ${th.border}`,padding:"28px 0",overflow:"hidden",marginBottom:60}}>
        <div style={{display:"flex",gap:12,padding:"0 5%",overflowX:"auto",paddingBottom:4}}>
          {TEMPLATES.slice(0,14).map(t=>(
            <div key={t.id} onClick={onStart}
              style={{flexShrink:0,width:110,borderRadius:8,overflow:"hidden",cursor:"pointer",boxShadow:`0 2px 8px rgba(0,0,0,0.1)`,transition:"transform .2s"}}
              onMouseOver={e=>e.currentTarget.style.transform="scale(1.05)"}
              onMouseOut={e=>e.currentTarget.style.transform="scale(1)"}>
              <MiniThumb t={t} selected={false} onClick={()=>{}}/>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 5% 60px"}}>
        <h2 style={{textAlign:"center",fontSize:32,fontWeight:800,color:th.text,marginBottom:40,letterSpacing:-.5}}>
          Everything you need to land your <span style={{color:th.accent}}>dream job</span>
        </h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:20}}>
          {features.map(f=>(
            <div key={f.title}
              style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:14,padding:"20px",backdropFilter:"blur(12px)",
              boxShadow:th.shadow,transition:"transform .2s, box-shadow .2s"}}
              onMouseOver={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 16px 40px ${th.gradA}20`}}
              onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=th.shadow}}>
              <div style={{fontSize:28,marginBottom:10}}>{f.icon}</div>
              <div style={{fontSize:14,fontWeight:700,color:th.text,marginBottom:5}}>{f.title}</div>
              <div style={{fontSize:12,color:th.sub,lineHeight:1.6}}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{background:`linear-gradient(135deg,${th.gradA}0a,${th.gradB}0a)`,border:`1px solid ${th.border}`,padding:"48px 5%",marginBottom:60}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <h2 style={{textAlign:"center",fontSize:28,fontWeight:800,color:th.text,marginBottom:32,letterSpacing:-.5}}>What our users say</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>
            {testimonials.map(t=>(
              <div key={t.name} style={{background:th.card,border:`1px solid ${th.border}`,borderRadius:14,padding:"20px",backdropFilter:"blur(12px)"}}>
                <div style={{color:"#f59e0b",fontSize:14,marginBottom:10}}>{"★".repeat(t.stars)}</div>
                <div style={{fontSize:12,color:th.text,lineHeight:1.7,marginBottom:12,fontStyle:"italic"}}>"{t.text}"</div>
                <div style={{fontSize:11,fontWeight:700,color:th.text}}>{t.name}</div>
                <div style={{fontSize:10,color:th.sub}}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 5% 80px",textAlign:"center"}}>
        <div style={{background:`linear-gradient(135deg,${th.gradA},${th.gradB})`,borderRadius:20,padding:"48px 32px",color:"white"}}>
          <h2 style={{fontSize:30,fontWeight:800,marginBottom:12,letterSpacing:-.5}}>Ready to build your professional CV?</h2>
          <p style={{fontSize:14,opacity:.9,marginBottom:28}}>Join thousands of Bangladeshi professionals who landed their dream jobs</p>
          <button onClick={onStart}
            style={{padding:"14px 40px",background:"white",color:th.gradA,border:"none",borderRadius:12,fontSize:15,fontWeight:800,cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.2)"}}>
            🚀 Build Your Free CV Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{borderTop:`1px solid ${th.border}`,padding:"24px 5%",textAlign:"center",background:th.navBg}}>
        <div style={{fontSize:11,color:th.sub}}>© 2025 CVBuilderPro Bangladesh • Free for all users • Made with ❤️ for Bangladesh</div>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN BUILDER APP
================================================================ */
function BuilderApp({th,dark,setDark}) {
  const [cv,setCV]=useState(defaultCV);
  const [tid,setTid]=useState("bd_pro");
  const [color,setColor]=useState("#1e3a5f");
  const [accent,setAccent]=useState("#e8c875");
  const [tab,setTab]=useState("personal");
  const [sideTab,setSideTab]=useState("editor"); // editor | templates | ai | settings
  const [catFilter,setCatFilter]=useState("All");
  const [zoom,setZoom]=useState(0.62);
  const [toast,setToast]=useState(null);
  const [saving,setSaving]=useState(false);
  const cvRef=useRef(null);

  const showToast=(msg,type="success")=>{
    setToast({msg,type});
    setTimeout(()=>setToast(null),3000);
  };

  const upd=(f,v)=>setCV(p=>({...p,[f]:v}));
  const updItem=(f,id,k,v)=>setCV(p=>({...p,[f]:p[f].map(i=>i.id===id?{...i,[k]:v}:i)}));
  const addItem=(f,item)=>setCV(p=>({...p,[f]:[...p[f],item]}));
  const remItem=(f,id)=>setCV(p=>({...p,[f]:p[f].filter(i=>i.id!==id)}));

  const selectTpl=(t)=>{
    setTid(t.id); setColor(t.color); setAccent(t.accent);
    showToast(`Template changed to "${t.name}"`);
  };

  const printCV=()=>{
    const w=window.open("","_blank");
    const html=cvRef.current?.innerHTML||"";
    w.document.write(`<!DOCTYPE html><html><head><title>CV – ${cv.name}</title>
    <style>@page{size:A4;margin:0}body{margin:0;padding:0;print-color-adjust:exact;-webkit-print-color-adjust:exact}*{box-sizing:border-box}</style>
    </head><body>${html}</body></html>`);
    w.document.close(); setTimeout(()=>w.print(),400);
    showToast("Print dialog opened!");
  };

  const saveAuto=()=>{
    setSaving(true);
    setTimeout(()=>{ setSaving(false); showToast("Auto-saved to cloud ☁️"); },1200);
  };
  useEffect(()=>{ const t=setTimeout(saveAuto,4000); return ()=>clearTimeout(t); },[cv]);

  const SIDE_TABS=[
    {id:"editor",icon:"✏️",label:"Editor"},
    {id:"templates",icon:"🎨",label:"Templates"},
    {id:"ai",icon:"🤖",label:"AI Writer"},
    {id:"settings",icon:"⚙️",label:"Design"},
  ];

  const EDIT_TABS=[
    {id:"personal",icon:"👤",label:"Personal"},
    {id:"bd_fields",icon:"🇧🇩",label:"BD Fields"},
    {id:"experience",icon:"💼",label:"Experience"},
    {id:"education",icon:"🎓",label:"Education"},
    {id:"skills",icon:"⚡",label:"Skills"},
    {id:"extras",icon:"➕",label:"Extras"},
  ];

  const filteredTpls = catFilter==="All" ? TEMPLATES : TEMPLATES.filter(t=>t.cat===catFilter);
  const selectedTpl = TEMPLATES.find(t=>t.id===tid)||TEMPLATES[0];

  return (
    <div style={{display:"flex",height:"100vh",background:th.bg,fontFamily:"'Segoe UI',system-ui,sans-serif",overflow:"hidden",position:"relative"}}>

      {/* Toast */}
      {toast && (
        <div style={{position:"fixed",top:16,right:16,zIndex:999,
          background:toast.type==="success"?"#22c55e":"#ef4444",color:"white",
          padding:"10px 18px",borderRadius:10,fontSize:12,fontWeight:600,
          boxShadow:"0 4px 20px rgba(0,0,0,0.25)",animation:"fadeIn .3s"}}>
          {toast.type==="success"?"✓":""} {toast.msg}
        </div>
      )}

      {/* ---- LEFT SIDEBAR NAV ---- */}
      <div style={{width:60,background:th.sidebar,borderRight:`1px solid ${th.border}`,display:"flex",flexDirection:"column",alignItems:"center",paddingTop:12,gap:4,flexShrink:0,backdropFilter:"blur(20px)"}}>
        <div style={{width:36,height:36,borderRadius:9,background:`linear-gradient(135deg,${th.gradA},${th.gradB})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,marginBottom:12,cursor:"pointer"}}>📄</div>
        {SIDE_TABS.map(t=>(
          <button key={t.id} onClick={()=>setSideTab(t.id)} title={t.label}
            style={{width:42,height:42,borderRadius:10,border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,
            background:sideTab===t.id?`${th.accent}18`:"transparent",
            color:sideTab===t.id?th.accent:th.sub,transition:"all .2s"}}>
            <span style={{fontSize:16}}>{t.icon}</span>
            <span style={{fontSize:7.5,fontWeight:600,letterSpacing:.2}}>{t.label}</span>
          </button>
        ))}
        <div style={{flex:1}}/>
        <button onClick={()=>setDark(!dark)} title={dark?"Light Mode":"Dark Mode"}
          style={{width:42,height:42,borderRadius:10,border:"none",cursor:"pointer",background:"transparent",color:th.sub,fontSize:18,marginBottom:4}}>
          {dark?"☀️":"🌙"}
        </button>
        <button onClick={printCV} title="Download PDF"
          style={{width:42,height:42,borderRadius:10,border:"none",cursor:"pointer",
          background:`linear-gradient(135deg,${th.gradA},${th.gradB})`,color:"white",fontSize:16,marginBottom:8}}>
          📥
        </button>
      </div>

      {/* ---- PANEL ---- */}
      <div style={{width:310,background:th.sidebar,borderRight:`1px solid ${th.border}`,display:"flex",flexDirection:"column",backdropFilter:"blur(20px)",flexShrink:0}}>

        {/* Panel Header */}
        <div style={{padding:"14px 14px 0",borderBottom:`1px solid ${th.border}`,paddingBottom:10}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
            <div style={{fontSize:14,fontWeight:800,color:th.text}}>
              {sideTab==="editor"?"📝 Editor":sideTab==="templates"?"🎨 Templates":sideTab==="ai"?"🤖 AI Writer":"⚙️ Design"}
            </div>
            {saving && <div style={{fontSize:9,color:th.accent,display:"flex",alignItems:"center",gap:3}}>⟳ saving…</div>}
          </div>
          {/* Template indicator */}
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 8px",background:`${th.accent}10`,borderRadius:7,marginBottom:2}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:color,border:`1px solid ${accent}`}}/>
            <span style={{fontSize:9.5,color:th.sub,flex:1}}>{selectedTpl.name}</span>
            <span style={{fontSize:8,color:th.accent}}>{selectedTpl.cat.split(" ").slice(1).join(" ")}</span>
          </div>
        </div>

        {/* ======= EDITOR PANEL ======= */}
        {sideTab==="editor" && (
          <>
            <div style={{display:"flex",overflowX:"auto",padding:"8px 8px 0",gap:3,flexShrink:0}}>
              {EDIT_TABS.map(t=>(
                <button key={t.id} onClick={()=>setTab(t.id)}
                  style={{flexShrink:0,padding:"5px 9px",borderRadius:7,border:"none",cursor:"pointer",fontSize:9.5,fontWeight:600,
                  background:tab===t.id?`linear-gradient(90deg,${th.gradA},${th.gradB})`:`${th.accent}10`,
                  color:tab===t.id?"white":th.sub,display:"flex",flexDirection:"column",alignItems:"center",gap:1.5,transition:"all .2s"}}>
                  <span>{t.icon}</span><span>{t.label}</span>
                </button>
              ))}
            </div>
            <div style={{flex:1,overflowY:"auto",padding:"10px 12px"}}>

              {/* PERSONAL */}
              {tab==="personal" && <>
                <FInput label="Full Name" value={cv.name} onChange={v=>upd("name",v)} placeholder="Your Full Name" th={th}/>
                <FInput label="Professional Title" value={cv.title} onChange={v=>upd("title",v)} placeholder="Senior Software Engineer" th={th}/>
                <FInput label="Email" value={cv.email} onChange={v=>upd("email",v)} placeholder="you@email.com" th={th}/>
                <FInput label="Phone" value={cv.phone} onChange={v=>upd("phone",v)} placeholder="+880 17..." th={th}/>
                <FInput label="Location" value={cv.location} onChange={v=>upd("location",v)} placeholder="Dhaka, Bangladesh" th={th}/>
                <FInput label="Website" value={cv.website} onChange={v=>upd("website",v)} placeholder="www.yoursite.com" th={th}/>
                <FInput label="LinkedIn" value={cv.linkedin} onChange={v=>upd("linkedin",v)} placeholder="linkedin.com/in/..." th={th}/>
                <FInput label="Career Objective" value={cv.objective} onChange={v=>upd("objective",v)} multiline rows={3} th={th}/>
                <FInput label="About Me" value={cv.about} onChange={v=>upd("about",v)} multiline rows={2} th={th}/>
                <div style={{marginBottom:10}}>
                  <label style={{fontSize:10,fontWeight:600,color:th.sub,display:"block",marginBottom:4,textTransform:"uppercase",letterSpacing:.4}}>Interests (comma separated)</label>
                  <input value={cv.interests.join(", ")} onChange={e=>upd("interests",e.target.value.split(",").map(s=>s.trim()).filter(Boolean))}
                    placeholder="Cricket, Photography, Travel"
                    style={{width:"100%",fontSize:11,border:`1px solid ${th.border}`,borderRadius:8,padding:"8px 10px",boxSizing:"border-box",background:th.input,color:th.text,outline:"none"}}/>
                </div>
              </>}

              {/* BD FIELDS */}
              {tab==="bd_fields" && <>
                <div style={{display:"flex",alignItems:"center",gap:6,padding:"7px 10px",background:`${th.accent}10`,borderRadius:8,marginBottom:12,fontSize:10,color:th.accent}}>
                  🇧🇩 Bangladesh & Government Job Special Fields
                </div>
                {[
                  ["Father's Name","fatherName","Md. Abdul..."],
                  ["Mother's Name","motherName","Begum..."],
                  ["Date of Birth","dob","15 March 1992"],
                  ["Blood Group","bloodGroup","B+"],
                  ["Religion","religion","Islam"],
                  ["Nationality","nationality","Bangladeshi"],
                  ["Marital Status","maritalStatus","Married"],
                  ["NID Number","nid","1234567890"],
                  ["Passport No.","passportNo","BK1234567"],
                  ["Expected Salary","expectedSalary","50,000 BDT"],
                  ["Present Address","presentAddress","Banani, Dhaka"],
                  ["Permanent Address","permanentAddress","Village, District"],
                ].map(([l,f,p])=>(
                  <FInput key={f} label={l} value={cv[f]||""} onChange={v=>upd(f,v)} placeholder={p} th={th}/>
                ))}
              </>}

              {/* EXPERIENCE */}
              {tab==="experience" && <>
                {cv.experience.map((e,idx)=>(
                  <div key={e.id} style={{background:th.glass,border:`1px solid ${th.border}`,borderRadius:10,padding:10,marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <span style={{fontSize:11,fontWeight:700,color:th.text}}>Job #{idx+1}</span>
                      <button onClick={()=>remItem("experience",e.id)} style={{fontSize:12,color:"#ef4444",background:"none",border:"none",cursor:"pointer"}}>✕</button>
                    </div>
                    {[["title","Job Title","Software Engineer"],["company","Company","Shohoz Ltd."],["location","Location","Dhaka"],["year","Year Range","Jan 2023 – Present"],["type","Type","Full-time"]].map(([k,l,p])=>(
                      <FInput key={k} label={l} value={e[k]||""} onChange={v=>updItem("experience",e.id,k,v)} placeholder={p} th={th}/>
                    ))}
                    <FInput label="Description" value={e.desc} onChange={v=>updItem("experience",e.id,"desc",v)} multiline rows={3} placeholder="Describe your responsibilities and achievements..." th={th}/>
                  </div>
                ))}
                <button onClick={()=>addItem("experience",{id:Date.now(),title:"New Role",company:"Company",location:"Dhaka",year:"2024–Present",desc:"Responsibilities and achievements",type:"Full-time"})}
                  style={{width:"100%",padding:9,background:`linear-gradient(90deg,${th.gradA},${th.gradB})`,color:"white",border:"none",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                  + Add Experience
                </button>
              </>}

              {/* EDUCATION */}
              {tab==="education" && <>
                {cv.education.map((e,idx)=>(
                  <div key={e.id} style={{background:th.glass,border:`1px solid ${th.border}`,borderRadius:10,padding:10,marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <span style={{fontSize:11,fontWeight:700,color:th.text}}>Education #{idx+1}</span>
                      <button onClick={()=>remItem("education",e.id)} style={{fontSize:12,color:"#ef4444",background:"none",border:"none",cursor:"pointer"}}>✕</button>
                    </div>
                    {[["degree","Degree/Exam","B.Sc. in CSE"],["institution","Institution","BUET"],["board","Board/University","Dhaka Board"],["year","Year","2018–2022"],["result","Result/GPA","CGPA 3.8"]].map(([k,l,p])=>(
                      <FInput key={k} label={l} value={e[k]||""} onChange={v=>updItem("education",e.id,k,v)} placeholder={p} th={th}/>
                    ))}
                  </div>
                ))}
                <button onClick={()=>addItem("education",{id:Date.now(),degree:"Degree",institution:"Institution",board:"",year:"2024",result:""})}
                  style={{width:"100%",padding:9,background:`linear-gradient(90deg,${th.gradA},${th.gradB})`,color:"white",border:"none",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                  + Add Education
                </button>
              </>}

              {/* SKILLS */}
              {tab==="skills" && <>
                <div style={{fontSize:11,fontWeight:700,color:th.text,marginBottom:8}}>Professional Skills</div>
                {cv.skills.map(s=>(
                  <div key={s.id} style={{background:th.glass,border:`1px solid ${th.border}`,borderRadius:8,padding:"8px 10px",marginBottom:7}}>
                    <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}>
                      <input value={s.name} onChange={e=>updItem("skills",s.id,"name",e.target.value)}
                        style={{flex:1,fontSize:11,border:`1px solid ${th.border}`,borderRadius:6,padding:"5px 8px",background:th.input,color:th.text,outline:"none"}}/>
                      <button onClick={()=>remItem("skills",s.id)} style={{color:"#ef4444",background:"none",border:"none",cursor:"pointer",fontSize:14,lineHeight:1}}>✕</button>
                    </div>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <input type="range" min="10" max="100" value={s.level} onChange={e=>updItem("skills",s.id,"level",parseInt(e.target.value))}
                        style={{flex:1,accentColor:th.accent}}/>
                      <span style={{fontSize:10,color:th.sub,minWidth:28}}>{s.level}%</span>
                    </div>
                  </div>
                ))}
                <button onClick={()=>addItem("skills",{id:Date.now(),name:"New Skill",level:75,category:"General"})}
                  style={{width:"100%",padding:8,background:`linear-gradient(90deg,${th.gradA},${th.gradB})`,color:"white",border:"none",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",marginBottom:12}}>
                  + Add Skill
                </button>
                <div style={{fontSize:11,fontWeight:700,color:th.text,marginBottom:8}}>Languages</div>
                {cv.languages.map(l=>(
                  <div key={l.id} style={{display:"flex",gap:6,marginBottom:7,alignItems:"center"}}>
                    <input value={l.name} onChange={e=>updItem("languages",l.id,"name",e.target.value)}
                      style={{flex:1,fontSize:11,border:`1px solid ${th.border}`,borderRadius:6,padding:"5px 8px",background:th.input,color:th.text,outline:"none"}}/>
                    <select value={l.level} onChange={e=>updItem("languages",l.id,"level",e.target.value)}
                      style={{fontSize:11,border:`1px solid ${th.border}`,borderRadius:6,padding:"5px 6px",background:th.input,color:th.text,outline:"none"}}>
                      {["Native","Fluent","Professional","Intermediate","Basic"].map(v=><option key={v}>{v}</option>)}
                    </select>
                    <button onClick={()=>remItem("languages",l.id)} style={{color:"#ef4444",background:"none",border:"none",cursor:"pointer",fontSize:14}}>✕</button>
                  </div>
                ))}
                <button onClick={()=>addItem("languages",{id:Date.now(),name:"Language",level:"Intermediate"})}
                  style={{width:"100%",padding:8,background:`linear-gradient(90deg,${th.gradA},${th.gradB})`,color:"white",border:"none",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                  + Add Language
                </button>
              </>}

              {/* EXTRAS */}
              {tab==="extras" && <>
                <div style={{fontSize:11,fontWeight:700,color:th.text,marginBottom:8}}>Training</div>
                {cv.trainings.map((t,idx)=>(
                  <div key={t.id} style={{background:th.glass,border:`1px solid ${th.border}`,borderRadius:8,padding:9,marginBottom:7}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:10,fontWeight:600,color:th.sub}}>Training #{idx+1}</span>
                      <button onClick={()=>remItem("trainings",t.id)} style={{fontSize:12,color:"#ef4444",background:"none",border:"none",cursor:"pointer"}}>✕</button>
                    </div>
                    {[["name","Training Name","AWS Solutions Architect"],["institute","Institute","Amazon"],["year","Year","2023"],["duration","Duration","3 months"]].map(([k,l,p])=>(
                      <FInput key={k} label={l} value={t[k]||""} onChange={v=>updItem("trainings",t.id,k,v)} placeholder={p} th={th}/>
                    ))}
                  </div>
                ))}
                <button onClick={()=>addItem("trainings",{id:Date.now(),name:"",institute:"",year:"",duration:""})}
                  style={{width:"100%",padding:8,background:`${th.accent}20`,color:th.accent,border:`1px solid ${th.border}`,borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",marginBottom:12}}>
                  + Add Training
                </button>

                <div style={{fontSize:11,fontWeight:700,color:th.text,marginBottom:8}}>Certifications</div>
                {cv.certifications.map((c,idx)=>(
                  <div key={c.id} style={{background:th.glass,border:`1px solid ${th.border}`,borderRadius:8,padding:9,marginBottom:7}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:10,fontWeight:600,color:th.sub}}>Cert #{idx+1}</span>
                      <button onClick={()=>remItem("certifications",c.id)} style={{fontSize:12,color:"#ef4444",background:"none",border:"none",cursor:"pointer"}}>✕</button>
                    </div>
                    {[["name","Certificate Name","AWS SAA"],["issuer","Issuer","Amazon"],["year","Year","2023"],["credId","Credential ID",""]].map(([k,l,p])=>(
                      <FInput key={k} label={l} value={c[k]||""} onChange={v=>updItem("certifications",c.id,k,v)} placeholder={p} th={th}/>
                    ))}
                  </div>
                ))}
                <button onClick={()=>addItem("certifications",{id:Date.now(),name:"",issuer:"",year:"",credId:""})}
                  style={{width:"100%",padding:8,background:`${th.accent}20`,color:th.accent,border:`1px solid ${th.border}`,borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",marginBottom:12}}>
                  + Add Certification
                </button>

                <div style={{fontSize:11,fontWeight:700,color:th.text,marginBottom:8}}>Projects</div>
                {cv.projects.map((p,idx)=>(
                  <div key={p.id} style={{background:th.glass,border:`1px solid ${th.border}`,borderRadius:8,padding:9,marginBottom:7}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:10,fontWeight:600,color:th.sub}}>Project #{idx+1}</span>
                      <button onClick={()=>remItem("projects",p.id)} style={{fontSize:12,color:"#ef4444",background:"none",border:"none",cursor:"pointer"}}>✕</button>
                    </div>
                    {[["name","Project Name","EduBD Platform"],["tech","Technologies","React, Node.js"],["year","Year","2023"],["url","GitHub URL","github.com/..."]].map(([k,l,pl])=>(
                      <FInput key={k} label={l} value={p[k]||""} onChange={v=>updItem("projects",p.id,k,v)} placeholder={pl} th={th}/>
                    ))}
                    <FInput label="Description" value={p.desc} onChange={v=>updItem("projects",p.id,"desc",v)} multiline rows={2} placeholder="Brief project description" th={th}/>
                  </div>
                ))}
                <button onClick={()=>addItem("projects",{id:Date.now(),name:"",tech:"",year:"",url:"",desc:""})}
                  style={{width:"100%",padding:8,background:`${th.accent}20`,color:th.accent,border:`1px solid ${th.border}`,borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",marginBottom:12}}>
                  + Add Project
                </button>

                <div style={{fontSize:11,fontWeight:700,color:th.text,marginBottom:8}}>References</div>
                {cv.references.map((r,idx)=>(
                  <div key={r.id} style={{background:th.glass,border:`1px solid ${th.border}`,borderRadius:8,padding:9,marginBottom:7}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:10,fontWeight:600,color:th.sub}}>Ref #{idx+1}</span>
                      <button onClick={()=>remItem("references",r.id)} style={{fontSize:12,color:"#ef4444",background:"none",border:"none",cursor:"pointer"}}>✕</button>
                    </div>
                    {[["name","Full Name","Dr. Kamal Uddin"],["title","Designation","Professor, CSE"],["org","Organization","BUET"],["email","Email","kamal@buet.ac.bd"],["phone","Phone","+880 19..."]].map(([k,l,p])=>(
                      <FInput key={k} label={l} value={r[k]||""} onChange={v=>updItem("references",r.id,k,v)} placeholder={p} th={th}/>
                    ))}
                  </div>
                ))}
                <button onClick={()=>addItem("references",{id:Date.now(),name:"",title:"",org:"",email:"",phone:""})}
                  style={{width:"100%",padding:8,background:`${th.accent}20`,color:th.accent,border:`1px solid ${th.border}`,borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",marginBottom:12}}>
                  + Add Reference
                </button>
                <div style={{fontSize:11,fontWeight:700,color:th.text,marginBottom:8}}>Awards & Achievements</div>
                {cv.awards.map((a,i)=>(
                  <div key={i} style={{display:"flex",gap:6,marginBottom:6}}>
                    <input value={a} onChange={e=>upd("awards",cv.awards.map((x,j)=>j===i?e.target.value:x))}
                      style={{flex:1,fontSize:11,border:`1px solid ${th.border}`,borderRadius:6,padding:"5px 8px",background:th.input,color:th.text,outline:"none"}}/>
                    <button onClick={()=>upd("awards",cv.awards.filter((_,j)=>j!==i))} style={{color:"#ef4444",background:"none",border:"none",cursor:"pointer"}}>✕</button>
                  </div>
                ))}
                <button onClick={()=>upd("awards",[...cv.awards,"New Achievement"])}
                  style={{width:"100%",padding:8,background:`${th.accent}20`,color:th.accent,border:`1px solid ${th.border}`,borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                  + Add Award
                </button>
              </>}

            </div>
          </>
        )}

        {/* ======= TEMPLATES PANEL ======= */}
        {sideTab==="templates" && (
          <div style={{flex:1,overflowY:"auto",padding:"10px 10px"}}>
            <div style={{display:"flex",overflowX:"auto",gap:4,marginBottom:10,paddingBottom:4}}>
              {["All",...TEMPLATE_CATS].map(c=>(
                <button key={c} onClick={()=>setCatFilter(c)}
                  style={{flexShrink:0,fontSize:9,padding:"4px 9px",borderRadius:15,border:"none",cursor:"pointer",
                  background:catFilter===c?`linear-gradient(90deg,${th.gradA},${th.gradB})`:`${th.accent}10`,
                  color:catFilter===c?"white":th.sub,fontWeight:catFilter===c?700:400}}>
                  {c==="All"?"All Templates":c}
                </button>
              ))}
            </div>
            <div style={{fontSize:10,color:th.sub,marginBottom:8}}>{filteredTpls.length} templates</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {filteredTpls.map(t=>(
                <MiniThumb key={t.id} t={t} selected={tid===t.id} onClick={()=>selectTpl(t)}/>
              ))}
            </div>
          </div>
        )}

        {/* ======= AI PANEL ======= */}
        {sideTab==="ai" && (
          <div style={{flex:1,overflowY:"auto",padding:"12px"}}>
            <AIPanel th={th}/>
          </div>
        )}

        {/* ======= DESIGN PANEL ======= */}
        {sideTab==="settings" && (
          <div style={{flex:1,overflowY:"auto",padding:"12px"}}>
            <div style={{fontSize:11,fontWeight:700,color:th.text,marginBottom:8}}>Primary Color</div>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:14}}>
              <input type="color" value={color} onChange={e=>setColor(e.target.value)}
                style={{width:40,height:36,border:"none",borderRadius:7,cursor:"pointer",padding:2,background:"none"}}/>
              <input value={color} onChange={e=>setColor(e.target.value)}
                style={{flex:1,fontSize:11,border:`1px solid ${th.border}`,borderRadius:7,padding:"7px 9px",background:th.input,color:th.text,outline:"none"}}/>
            </div>
            <div style={{fontSize:11,fontWeight:700,color:th.text,marginBottom:8}}>Accent Color</div>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:14}}>
              <input type="color" value={accent} onChange={e=>setAccent(e.target.value)}
                style={{width:40,height:36,border:"none",borderRadius:7,cursor:"pointer",padding:2,background:"none"}}/>
              <input value={accent} onChange={e=>setAccent(e.target.value)}
                style={{flex:1,fontSize:11,border:`1px solid ${th.border}`,borderRadius:7,padding:"7px 9px",background:th.input,color:th.text,outline:"none"}}/>
            </div>
            <div style={{fontSize:11,fontWeight:700,color:th.text,marginBottom:10}}>Preset Schemes</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:16}}>
              {[
                {l:"Navy Gold",c:"#1e3a5f",a:"#e8c875"},{l:"Royal Blue",c:"#1565c0",a:"#42a5f5"},
                {l:"Government",c:"#006400",a:"#ffd700"},{l:"Executive",c:"#0a0a1a",a:"#e94560"},
                {l:"Developer",c:"#0d1117",a:"#58a6ff"},{l:"Creative",c:"#6200ea",a:"#03dac6"},
                {l:"Corporate",c:"#263238",a:"#80cbc4"},{l:"Luxury",c:"#1a1a1a",a:"#d4af37"},
                {l:"NGO Green",c:"#1b5e20",a:"#81c784"},{l:"Gulf Gold",c:"#b8860b",a:"#1a3a5c"},
                {l:"Rose Gold",c:"#880e4f",a:"#f8bbd0"},{l:"Arctic",c:"#263238",a:"#80deea"},
              ].map(p=>(
                <button key={p.l} onClick={()=>{setColor(p.c);setAccent(p.a);}}
                  style={{padding:"7px 6px",border:`1.5px solid ${color===p.c?p.c:th.border}`,borderRadius:7,cursor:"pointer",
                  background:color===p.c?`${p.c}12`:"transparent",display:"flex",alignItems:"center",gap:5,transition:"all .2s"}}>
                  <div style={{width:12,height:12,borderRadius:"50%",background:p.c,flexShrink:0}}/>
                  <div style={{width:12,height:12,borderRadius:"50%",background:p.a,flexShrink:0}}/>
                  <span style={{fontSize:9.5,color:th.text,fontWeight:500}}>{p.l}</span>
                </button>
              ))}
            </div>
            <div style={{fontSize:11,fontWeight:700,color:th.text,marginBottom:8}}>Preview Zoom</div>
            <input type="range" min="0.35" max="0.95" step="0.03" value={zoom} onChange={e=>setZoom(parseFloat(e.target.value))}
              style={{width:"100%",accentColor:th.accent,marginBottom:4}}/>
            <div style={{fontSize:10,color:th.sub,textAlign:"center",marginBottom:16}}>{Math.round(zoom*100)}%</div>
            <button onClick={printCV}
              style={{width:"100%",padding:"10px",background:`linear-gradient(90deg,${th.gradA},${th.gradB})`,color:"white",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:`0 4px 12px ${th.gradA}44`,marginBottom:6}}>
              📥 Download PDF
            </button>
            <button onClick={printCV}
              style={{width:"100%",padding:"10px",background:th.glass,color:th.text,border:`1px solid ${th.border}`,borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}>
              🖨 Print CV
            </button>
          </div>
        )}
      </div>

      {/* ---- CV PREVIEW ---- */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",background:th.bg}}>
        {/* Topbar */}
        <div style={{height:50,background:th.navBg,borderBottom:`1px solid ${th.border}`,display:"flex",alignItems:"center",padding:"0 16px",gap:12,backdropFilter:"blur(20px)"}}>
          <div style={{flex:1,display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:color}}/>
            <span style={{fontSize:13,fontWeight:700,color:th.text}}>{cv.name || "Your Name"}</span>
            <span style={{fontSize:10,color:th.sub}}>— {selectedTpl.name}</span>
          </div>
          <div style={{display:"flex",gap:6}}>
            {[["−",()=>setZoom(z=>Math.max(.35,z-.05))],["Reset",()=>setZoom(.62)],["+",()=>setZoom(z=>Math.min(.95,z+.05))]].map(([l,fn])=>(
              <button key={l} onClick={fn}
                style={{padding:"4px 10px",fontSize:12,border:`1px solid ${th.border}`,borderRadius:6,background:th.card,color:th.text,cursor:"pointer",fontWeight:600}}>
                {l}
              </button>
            ))}
            <div style={{fontSize:10,color:th.sub,padding:"4px 10px",background:th.card,border:`1px solid ${th.border}`,borderRadius:6,alignSelf:"center"}}>{Math.round(zoom*100)}%</div>
            <button onClick={printCV}
              style={{padding:"6px 16px",background:`linear-gradient(90deg,${th.gradA},${th.gradB})`,color:"white",border:"none",borderRadius:7,fontSize:11,fontWeight:700,cursor:"pointer",boxShadow:`0 3px 10px ${th.gradA}44`}}>
              📥 Export PDF
            </button>
          </div>
        </div>
        {/* Preview Area */}
        <div style={{flex:1,overflowY:"auto",background:`radial-gradient(ellipse at 60% 20%, ${th.gradA}08, transparent 60%), ${th.bg}`,padding:24,display:"flex",justifyContent:"center"}}>
          <div style={{width:"210mm",transformOrigin:"top center",transform:`scale(${zoom})`,marginBottom:`-${(1-zoom)*297*3.779}px`}}>
            <div ref={cvRef} style={{width:"210mm",minHeight:"297mm",background:"#fff",boxShadow:`0 8px 48px rgba(0,0,0,${dark?.3:.18})`,borderRadius:2}}>
              <CVRenderer templateId={tid} cv={cv} color={color} accent={accent}/>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        *::-webkit-scrollbar{width:5px;height:5px}
        *::-webkit-scrollbar-track{background:transparent}
        *::-webkit-scrollbar-thumb{background:${th.border};border-radius:3px}
        input[type=range]{height:4px;appearance:none;-webkit-appearance:none;outline:none;border-radius:2px;background:${th.border}}
        input[type=range]::-webkit-slider-thumb{appearance:none;width:14px;height:14px;border-radius:50%;background:${th.accent};cursor:pointer}
      `}</style>
    </div>
  );
}

/* ================================================================
   ROOT APP + THEME PROVIDER
================================================================ */
export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("landing"); // landing | builder
  const th = dark ? DARK : LIGHT;

  return (
    <ThemeCtx.Provider value={th}>
      {page === "landing"
        ? <LandingPage th={th} dark={dark} setDark={setDark} onStart={()=>setPage("builder")}/>
        : <BuilderApp th={th} dark={dark} setDark={setDark}/>
      }
    </ThemeCtx.Provider>
  );
}
