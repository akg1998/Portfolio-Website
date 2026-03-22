import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Database, Cloud, Terminal, CheckCircle2, Send, MapPin, ChevronRight, Briefcase, Award, BookOpen, Shield, Camera, Map, Activity, FileText, Users, Sun, Moon } from 'lucide-react';
import axios from 'axios';
import clsx from 'clsx';

// --- Shared Animation Variants ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// --- Theme Hook ---
const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') !== 'light';
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark(prev => !prev) };
};

// --- Components ---

const Navbar = ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => (
  <nav className="fixed top-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
        AG.
      </span>
      <div className="hidden md:flex gap-10 text-base font-semibold text-gray-400">
        <a href="#about" className="hover:text-white hover:text-emerald-400 transition-colors">About</a>
        <a href="#experience" className="hover:text-white hover:text-emerald-400 transition-colors">Experience</a>
        <a href="#projects" className="hover:text-white hover:text-emerald-400 transition-colors">Projects</a>
        <a href="#contact" className="hover:text-white hover:text-emerald-400 transition-colors">Contact</a>
      </div>
      <div className="flex gap-4 items-center">
        <button 
          onClick={toggleTheme} 
          className="relative flex items-center w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300"
          style={{ backgroundColor: isDark ? '#1e293b' : '#bfdbfe', border: isDark ? '1px solid #334155' : '1px solid #93c5fd' }}
          aria-label="Toggle theme"
        >
          <Sun className="w-4 h-4 absolute left-1.5 top-1/2 -translate-y-1/2" style={{ color: isDark ? '#475569' : '#f59e0b' }} />
          <Moon className="w-4 h-4 absolute right-1.5 top-1/2 -translate-y-1/2" style={{ color: isDark ? '#94a3b8' : '#93c5fd' }} />
          <motion.div 
            className="w-6 h-6 rounded-full shadow-md"
            style={{ backgroundColor: isDark ? '#e2e8f0' : '#ffffff' }}
            animate={{ x: isDark ? 32 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
        <a href="https://github.com/akg1998" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/akshay-ghavale" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  </nav>
);

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUpVariant}
      className="text-center mb-16 md:mb-24"
    >
      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
        {children}
      </h2>
      {subtitle && <p className="text-xl text-gray-400 font-medium">{subtitle}</p>}
      <div className="w-24 h-1.5 bg-emerald-500 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
    </motion.div>
  );
};

// --- Sections ---

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
    </div>

    <div className="text-center px-6 max-w-5xl relative z-10">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
        <motion.div variants={fadeUpVariant} className="flex justify-center mb-8">
          <div className="relative group cursor-default">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-gray-950/80 shadow-2xl" style={{ backgroundImage: "url('/profile.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#111827' }} />
          </div>
        </motion.div>

        <motion.div variants={fadeUpVariant}>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm md:text-base font-bold mb-8 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)] backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Available for New Opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUpVariant}
          className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-tight"
        >
          Building <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
            Digital Foundations.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUpVariant}
          className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Hello, I'm <span className="text-white font-bold">Akshay Ghavale</span>. A passionate <span className="text-emerald-400">Software Developer</span> architecting robust systems and scalable backends.
        </motion.p>

        <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row justify-center gap-6">
          <a href="#projects" className="group px-10 py-5 rounded-2xl bg-white text-gray-950 text-lg font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-3">
            See My Work
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="mailto:akshayghavale1998@gmail.com" className="group px-10 py-5 rounded-2xl bg-gray-900/80 text-white text-lg font-bold border border-gray-700 hover:bg-gray-800 hover:border-gray-500 backdrop-blur-sm transition-all flex items-center justify-center gap-3">
            Get in touch <Mail className="w-5 h-5 ml-1" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const About = () => {
  return (
    <section id="about" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading subtitle="Behind the code">About Me</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[250px]">
          {/* Big Intro Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
            className="md:col-span-2 rounded-[2rem] bg-gray-900 border border-gray-800 p-10 flex flex-col justify-center relative overflow-hidden group hover:border-blue-500/30 transition-colors shadow-lg"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />
            <h3 className="text-3xl font-black text-white mb-6 z-10 tracking-tight">From concept to production.</h3>
            <p className="text-gray-400 text-lg leading-relaxed z-10 max-w-xl font-medium">
              I am a Backend Developer specializing in Java, Spring Boot, and Google Cloud Platform. I enjoy taking complex architectural requirements and turning them into stable, highly scalable REST APIs that power modern applications.
            </p>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}
            className="rounded-[2rem] bg-gray-900 border border-gray-800 p-8 flex flex-col items-center justify-center text-center group hover:border-blue-500/50 transition-colors shadow-lg"
          >
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-8 h-8" />
            </div>
            <h4 className="text-white font-bold text-xl mb-1">Based in</h4>
            <p className="text-gray-400 font-medium">Frankfurt, Germany</p>
          </motion.div>

          {/* Experience Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}
            className="rounded-[2rem] bg-gray-900 border border-gray-800 p-8 flex flex-col items-center justify-center text-center group hover:border-emerald-500/50 transition-colors shadow-lg"
          >
            <h2 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300">3+</h2>
            <p className="text-gray-400 font-medium text-lg">Years of Experience</p>
          </motion.div>

          {/* Focus Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
            className="md:col-span-2 rounded-[2rem] bg-gray-900 border border-gray-800 p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 group hover:border-gray-600 transition-colors overflow-hidden relative shadow-lg"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            <div className="p-5 rounded-3xl bg-gray-950 border border-gray-800 group-hover:border-gray-600 transition-colors z-10">
              <Terminal className="w-10 h-10 text-emerald-400" />
            </div>
            <div className="z-10 text-center sm:text-left">
              <h4 className="text-2xl font-bold text-white mb-3">Always Learning</h4>
              <p className="text-gray-400 text-lg font-medium leading-relaxed">Currently diving deeper into distributed microservices architectures, event-driven integrations with modern message brokers, and advanced performance testing.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = [
    { name: "Backend Architecture", icon: <Terminal className="w-8 h-8" />, skills: ["Java", "Spring Boot", "Kotlin", "REST & Open APIs", "Python App Dev"] },
    { name: "Cloud & DevOps", icon: <Cloud className="w-8 h-8" />, skills: ["Google Cloud Platform", "Docker Containerization", "CI/CD Pipelines", "GitHub Actions"] },
    { name: "Databases & ORM", icon: <Database className="w-8 h-8" />, skills: ["PostgreSQL", "MySQL", "MongoDB", "JPA / Hibernate"] },
    { name: "Systems Design", icon: <Code2 className="w-8 h-8" />, skills: ["Microservices", "Pub/Sub Messaging", "Scalable Architecture", "Clean Code Principles"] }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading subtitle="The tools and technologies I use to bring ideas to life.">My Expertise</SectionHeading>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariant}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-8 rounded-3xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 hover:border-emerald-500/50 shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-950 border border-gray-800 flex items-center justify-center mb-8 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-all text-gray-300">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">{cat.name}</h3>
              <ul className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <li key={si} className="text-gray-300 text-base font-medium flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Experience = () => {
  const jobs = [
    {
      company: "Meet5 GmbH",
      role: "Software Developer",
      period: "2025 – Present",
      location: "Frankfurt, Germany",
      points: [
        "Architected and shipped highly scalable backend features and REST APIs using Spring Boot.",
        "Drove continuous backend stability and performance optimizations for high-traffic production systems."
      ]
    },
    {
      company: "Meet5 GmbH",
      role: "Working Student Backend Developer",
      period: "2024 – 2025",
      location: "Frankfurt, Germany",
      points: [
        "Spearheaded the migration of core services from Google App Engine to Cloud Run via Docker.",
        "Automated CI/CD pipelines and managed critical environment configurations via GCP Secret Manager."
      ]
    },
    {
      company: "FlowLogix",
      role: "Backend Intern",
      period: "2023",
      location: "Remote",
      points: [
        "Contributed to backend system development and architectural improvements.",
        "Assisted in deploying services and optimizing internal team workflows."
      ]
    },
    {
      company: "EduBrite Systems",
      role: "Full Stack Developer",
      period: "2021 – 2022",
      location: "Fremont, CA (Remote)",
      points: [
        "Developed critical Learning Management System (LMS) modules using Java, Spring Boot, and Hibernate/JPA.",
        "Massively improved system stability, reducing code smells, and optimizing MySQL database queries.",
        "Enforced high code quality standards through rigorous Unit Testing and active participation in peer code reviews."
      ]
    },
    {
      company: "Cognizant",
      role: "Software Engineer",
      period: "2019 – 2021",
      location: "Pune, India",
      points: [
        "Engineered scalable enterprise solutions and modernized legacy Java applications.",
        "Collaborated in Agile sprints to deliver client-facing features on strict deadlines.",
        "Mentored junior developers and actively maintained code documentation."
      ]
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading subtitle="Accelerating engineering across leading tech firms.">Professional Journey</SectionHeading>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="space-y-16"
        >
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariant}
              className="relative grid grid-cols-1 md:grid-cols-4 gap-8 p-8 sm:p-10 rounded-3xl bg-gray-900/40 border border-gray-800 hover:bg-gray-900/80 transition-colors shadow-lg"
            >
              <div className="md:col-span-1">
                <p className="text-emerald-400 font-bold text-lg mb-2 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  {job.period}
                </p>
                <p className="text-gray-400 font-medium text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {job.location}
                </p>
              </div>

              <div className="md:col-span-3">
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{job.role}</h3>
                <h4 className="text-xl text-gray-300 font-semibold mb-6">@ {job.company}</h4>

                <div className="space-y-4">
                  {job.points.map((p, pi) => (
                    <motion.div
                      key={pi}
                      whileHover={{ x: 10 }}
                      className="flex gap-4 items-start p-4 rounded-2xl bg-gray-950/50 border border-gray-800/50 hover:border-blue-500/30 hover:bg-gray-900 transition-all font-medium text-lg text-gray-300"
                    >
                      <ChevronRight className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const API_URL = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:8080';
    axios.get(`${API_URL}/api/projects`)
      .then(res => setProjects(res.data))
      .catch(() => {
        // Static fallback if backend is down
        setProjects([
          {
            title: "CampusFlow",
            description: "Architected a full-stack university management system with admin panel and student dashboard, featuring RDF graph-based data storage and AWS cloud deployment.",
            tech: ["React", "Django", "MySQL", "Blazegraph", "AWS"],
            githubUrl: "https://github.com/akg1998/CampusFlow"
          },
          {
            title: "Redefined Login Security",
            description: "Enhanced login security against shoulder surfing using dynamic alphanumeric PINs across randomized token boxes.",
            tech: ["Java", "Security Architecture", "Algorithms"],
            githubUrl: "https://github.com/akg1998/Revivify"
          },
          {
            title: "Intelligent Surveillance System",
            description: "Architected a real-time violence detection system utilizing CNN and LSTM neural networks via Python and Flask.",
            tech: ["Python", "Flask", "Deep Learning"],
            githubUrl: "https://github.com/akg1998/Intelligent-Surveiilance-System"
          },
          {
            title: "Blood Bank Sync",
            description: "Built a centralized inventory platform linking donors with hospitals to accelerate emergency medical responses.",
            tech: ["Android", "Java", "SQLite"]
          },
          {
            title: "NoticeBoy Digital Portal",
            description: "Created a digital submission portal enabling seamless academic grading and real-time inline instructor feedback.",
            tech: ["Android", "Java", "Firebase"]
          },
          {
            title: "Entity Management System",
            description: "Programmed a high-integrity student reporting backend utilizing custom Linked Lists and rigorous Data Structures.",
            tech: ["C++", "Data Structures", "Algorithms"]
          }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getProjectIcon = (title: string) => {
    if (title.includes("Campus")) return <Users className="w-7 h-7" />;
    if (title.includes("Login")) return <Shield className="w-7 h-7" />;
    if (title.includes("Surveillance")) return <Camera className="w-7 h-7" />;
    if (title.includes("Trip")) return <Map className="w-7 h-7" />;
    if (title.includes("Blood")) return <Activity className="w-7 h-7" />;
    if (title.includes("NoticeBoy")) return <FileText className="w-7 h-7" />;
    if (title.includes("Entity") || title.includes("Management")) return <Users className="w-7 h-7" />;
    return <Code2 className="w-7 h-7" />;
  };

  return (
    <section id="projects" className="py-32 bg-gray-950 relative overflow-hidden">
      <div className="absolute top-[20%] right-[0%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading subtitle="Architecting solutions that solve real-world problems.">Featured Engineering</SectionHeading>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-80 rounded-[2rem] bg-gray-900 animate-pulse border border-gray-800" />
            ))
          ) : (
            projects.map((proj, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariant}
                className="group relative sm:h-80 rounded-[2rem] bg-gray-900/80 backdrop-blur-md border border-gray-800 overflow-hidden shadow-xl flex flex-col"
              >
                {/* Default Visible State */}
                <div className="p-8 flex flex-col justify-center items-center text-center transition-all duration-500 lg:group-hover:opacity-0 lg:group-hover:scale-95 flex-grow">
                  <div className="w-20 h-20 shrink-0 rounded-3xl bg-gray-950 border border-gray-800 flex items-center justify-center text-emerald-400 mb-6 shadow-lg lg:group-hover:border-emerald-500/30 transition-colors">
                    {getProjectIcon(proj.title)}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 leading-tight">{proj.title}</h3>

                  {/* Mobile Only Persistent Description */}
                  <p className="text-gray-400 text-sm mb-6 lg:hidden font-medium leading-relaxed">{proj.description}</p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {proj.tech.map((t: string, ti: number) => (
                      <span key={ti} className="px-3 py-1 text-xs rounded-lg bg-gray-950 border border-gray-800 text-gray-400 font-bold">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Mobile Only GitHub Button or Description */}
                  {proj.githubUrl ? (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="mt-8 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold flex gap-3 items-center lg:hidden shadow-lg w-full justify-center">
                      <Github className="w-5 h-5" /> View on GitHub
                    </a>
                  ) : null}
                </div>

                {/* Desktop Only Hover Reveal State */}
                <div className="hidden lg:flex absolute inset-0 bg-gray-950/95 backdrop-blur-xl flex-col justify-center items-center p-8 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out border-t-4 border-emerald-500">
                  <h3 className="text-xl font-bold text-white mb-4">{proj.title}</h3>
                  <p className="text-gray-400 text-base mb-8 font-medium leading-relaxed">{proj.description}</p>
                  {proj.githubUrl ? (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold flex gap-3 items-center hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <Github className="w-5 h-5" /> View on GitHub
                    </a>
                  ) : null}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Achievements = () => {
  const items = [
    {
      icon: <Award className="w-8 h-8 text-yellow-400" />,
      title: "Hackathon Winner",
      description: "Led the backend team to victory by developing a hyper-scalable data aggregation service within 48 hours."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-400" />,
      title: "Publication (ICINC 2020)",
      description: "\"Review of Violence Detection System using Deep Learning\" — Published extensive research evaluating predictive analytics in security."
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading subtitle="Recognitions and Contributions.">Achievements & Publications</SectionHeading>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariant}
              className="flex gap-6 p-8 rounded-3xl bg-gray-900 border border-gray-800 hover:border-gray-600 transition-colors shadow-lg"
            >
              <div className="shrink-0 p-4 bg-gray-950 rounded-2xl border border-gray-800 h-fit">
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState<any>({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const rawUrl = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:8080';
      const API_URL = rawUrl.replace(/\/+$/, '');
      await axios.post(`${API_URL}/api/contact`, data);
      setStatus({ type: 'success', msg: 'Message securely transmitted. I will be in touch!' });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus({ type: 'error', msg: 'System offline. Please contact me via LinkedIn or Email directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading subtitle="Ready to build something amazing? Reach out.">Let's Collaborate</SectionHeading>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariant}
          className="p-6 sm:p-10 md:p-14 rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 relative shadow-2xl overflow-hidden"
        >
          <div className="absolute top-[-20px] sm:top-[-50px] right-[-20px] sm:right-[-50px] p-4 opacity-5 pointer-events-none">
            <Send className="w-64 h-64 text-emerald-500" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Name</label>
                <input required name="name" type="text" className="w-full px-6 py-5 rounded-2xl bg-gray-950 border border-gray-800 text-lg text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all placeholder-gray-600 font-medium" placeholder="Jane Doe" />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                <input required name="email" type="email" className="w-full px-6 py-5 rounded-2xl bg-gray-950 border border-gray-800 text-lg text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all placeholder-gray-600 font-medium" placeholder="jane@example.com" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Project Inquiry</label>
              <textarea required name="message" rows={5} className="w-full px-6 py-5 rounded-2xl bg-gray-950 border border-gray-800 text-lg text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all resize-none placeholder-gray-600 font-medium" placeholder="Describe what you want to build..."></textarea>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full md:w-auto px-12 py-5 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-black text-xl transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              {loading ? 'Transmitting Request...' : 'Initialize Contact'}
              {!loading && <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
            </button>
            {status.msg && (
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={clsx("text-lg font-bold p-4 rounded-xl", status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20')}
              >
                {status.msg}
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-16 border-t border-gray-900 bg-gray-950 text-center text-gray-500 text-base">
    <div className="flex justify-center gap-8 mb-8">
      <a href="https://github.com/akg1998" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-gray-900 hover:bg-gray-800 hover:text-white transition-all text-gray-400 shadow-lg">
        <Github className="w-6 h-6" />
      </a>
      <a href="https://www.linkedin.com/in/akshay-ghavale" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-gray-900 hover:bg-blue-600 hover:text-white transition-all text-gray-400 shadow-lg">
        <Linkedin className="w-6 h-6" />
      </a>
      <a href="mailto:akshayghavale@example.com" className="p-4 rounded-full bg-gray-900 hover:bg-emerald-600 hover:text-white transition-all text-gray-400 shadow-lg">
        <Mail className="w-6 h-6" />
      </a>
    </div>
    <p className="font-semibold text-gray-600 tracking-wide">© {new Date().getFullYear()} Akshay Ghavale</p>
  </footer>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const { isDark, toggle: toggleTheme } = useTheme();

  return (
    <div className="bg-gray-950 text-gray-100 selection:bg-emerald-500/40 selection:text-white min-h-screen border-t-4 border-emerald-500 font-sans">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 z-[100] origin-left shadow-[0_0_15px_rgba(59,130,246,0.8)]" style={{ scaleX }} />
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
