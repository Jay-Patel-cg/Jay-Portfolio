import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Rocket, Trophy, Users, Code, Stars, Calendar, MapPin, Sparkles, Award, Play, Pause } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const ShootingStar = () => (
    <motion.div
        initial={{ x: "-10vw", y: "10vh", opacity: 1 }}
        animate={{ x: "110vw", y: "110vh", opacity: 0 }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
            ease: "linear"
        }}
        className="absolute w-[100px] h-[2px] bg-gradient-to-r from-[#00AEEF] to-transparent rotate-45 z-0 pointer-events-none"
        style={{ top: Math.random() * 50 + "%", left: 0 }}
    />
);

const Planet = ({ color, size, top, left, delay, duration }) => {
    return (
        <motion.div
            className="absolute rounded-full blur-[1px] pointer-events-none z-0"
            style={{
                width: size,
                height: size,
                top: top,
                left: left,
                background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
                boxShadow: `0 0 40px ${color}33`,
                opacity: 0.4
            }}
            animate={{
                y: [0, -30, 0],
                rotate: 360,
            }}
            transition={{
                y: { duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay },
                rotate: { duration: duration * 10, repeat: Infinity, ease: "linear" }
            }}
        />
    );
};

const hackathonsData = [
    {
        id: 'tic-tech-toe-26',
        title: "Tic Tech Toe '26",
        highlightTitle: "Tic Tech Toe",
        highlightYear: "'26",
        organizer: "IEEE Student Branch DAIICT",
        venue: "DA-IICT (Dhirubhai Ambani University)",
        dates: "10th – 12th April 2026",
        duration: "3 Days Event",
        image: "/tic-tech-toe-26.jpg",
        imageAlt: "Tic Tech Toe '26 Certificate and Team at DA-IICT",
        badge: "IEEE SB DAIICT",
        badgeIcon: Trophy,
        description: "Participated in Tic Tech Toe ’26 Hackathon organized by IEEE Student Branch DAIICT at Dhirubhai Ambani Institute of Information and Communication Technology. Over three amazing days (10th–12th April 2026), I collaborated, innovated, and solved real-world problems alongside talented peers, strengthening technical skills, teamwork, and time management.",
        highlights: [
            { icon: Users, title: "Teamwork & Collaboration", desc: "Collaborated with peers over 3 intense days" },
            { icon: Code, title: "Innovation & Problem Solving", desc: "Built solutions for real-world problems" },
            { icon: Rocket, title: "Skill Enhancement", desc: "Enhanced time management & technical expertise" }
        ],
        tags: ["#IEEE", "#DAIICT", "#Hackathon", "#Innovation", "#Tech", "#Experience"]
    },
    {
        id: 'craftathon-2k25',
        title: "Craftathon 2k25",
        highlightTitle: "Craftathon",
        highlightYear: "2k25",
        organizer: "Gandhinagar University (GU)",
        venue: "Gandhinagar University",
        dates: "2025",
        duration: "24 Hours Hackathon",
        image: "/hackathon.jpg",
        imageAlt: "Craftathon Hackathon",
        badge: "Gandhinagar University",
        badgeIcon: Stars,
        description: "I participated in Craftathon, a Minecraft-themed hackathon organized at Gandhinagar University (GU). This experience helped me enhance my problem-solving skills, teamwork, and creativity. I collaborated with peers, built innovative solutions, and gained real-world development experience in a competitive environment.",
        highlights: [
            { icon: Users, title: "Teamwork", desc: "Collaborative building under deadline" },
            { icon: Code, title: "Innovation", desc: "Creative solutions & prototyping" }
        ],
        tags: ["#MinecraftTheme", "#GandhinagarUniversity", "#Hackathon", "#CreativeCoding"]
    },
    {
        id: 'artpark-codeforge',
        title: "ArtPark CodeForge",
        highlightTitle: "CodeForge",
        highlightYear: "IISc",
        organizer: "Indian Institute of Science (IISc), Bangalore",
        venue: "IISc Bangalore",
        dates: "2025",
        duration: "Prototype Round",
        image: "/hackathon-cert.jpg",
        imageAlt: "ArtPark CodeForge IISc Bangalore Certificate",
        badge: "IISc Bangalore",
        badgeIcon: Award,
        description: "Participated in the Build & Submit Prototype Development Round of ArtPark CodeForge Hackathon organized by Indian Institute of Science (IISc), Bangalore as part of Team CodeX, focusing on rapid prototype creation.",
        highlights: [
            { icon: Code, title: "Prototype Round", desc: "Build & submit development phase" },
            { icon: Users, title: "Team CodeX", desc: "Collaborative research & development" }
        ],
        tags: ["#IIScBangalore", "#ArtPark", "#CodeForge", "#TeamCodeX"]
    },
    {
        id: 'odoo-ld-hackathon',
        title: "Odoo x LD Hackathon",
        highlightTitle: "Musafir AI",
        highlightYear: "Odoo x LD",
        organizer: "Odoo & LD College of Engineering",
        venue: "LD College of Engineering",
        dates: "2026",
        duration: "Hackathon Event",
        image: "/musafir-2.png",
        imageAlt: "Odoo x LD Hackathon Musafir AI Travel Planner",
        badge: "Odoo x LD",
        badgeIcon: Rocket,
        description: "Participated in Odoo x LD Hackathon, building Musafir — an AI-powered travel planning and smart destination exploration platform. Developed intelligent trip itinerary generation, user authentication, and seamless travel UI under competitive hackathon timelines.",
        highlights: [
            { icon: Code, title: "AI Travel Planner", desc: "Smart itinerary & destination discovery" },
            { icon: Users, title: "Hackathon Innovation", desc: "Built full-stack AI web app under tight deadline" }
        ],
        tags: ["#OdooXLD", "#Musafir", "#AITravel", "#Hackathon", "#Innovation"]
    },
    {
        id: 'codinggita-hacksprint-26',
        title: "CodingGita HackSprint '26",
        highlightTitle: "Quantum AI",
        highlightYear: "HackSprint '26",
        organizer: "CodingGita & Swaminarayan University",
        venue: "Swaminarayan University, Gujarat",
        dates: "11th July 2026",
        duration: "Hackathon Event",
        image: "/quantum-1.png",
        imageAlt: "CodingGita HackSprint '26 Quantum AI Project",
        badge: "CodingGita",
        badgeIcon: Award,
        description: "Participated in CodingGita HackSprint ’26 organized at Swaminarayan University. Built Quantum AI — a next-gen web intelligence workspace for AI page summarization, smart reader narration, voice assistant conversation, code lens analysis, and multi-language translation.",
        highlights: [
            { icon: Code, title: "Quantum AI Engine", desc: "Page summarization & voice narration" },
            { icon: Stars, title: "Innovation Showcase", desc: "Demonstrated creativity & AI integration" }
        ],
        tags: ["#CodingGita", "#HackSprint26", "#QuantumAI", "#SwaminarayanUniversity", "#Innovation"]
    }
];

const Hackathon = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yPlanets = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const activeHackathon = hackathonsData[activeTab];

    // Auto-advance hackathon tabs left to right every 5 seconds
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % hackathonsData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    return (
        <section 
            id="hackathon" 
            ref={sectionRef}
            className="relative py-24 flex flex-col justify-center overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-500 min-h-screen"
        >
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-black dark:via-[#001020] dark:to-black" />
            
            {/* Stars & Space Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(80)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-slate-400 dark:bg-white rounded-full"
                        style={{
                            width: Math.random() * 2 + 1 + 'px',
                            height: Math.random() * 2 + 1 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            opacity: Math.random() * 0.5 + 0.2
                        }}
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                    />
                ))}
                <ShootingStar />
                <ShootingStar />
            </div>

            {/* Parallax Planets */}
            <motion.div style={{ y: yPlanets }} className="absolute inset-0 z-0 opacity-70 dark:opacity-100">
                <Planet color="#00AEEF" size="150px" top="10%" left="5%" delay={0} duration={12} />
                <Planet color="#5B21B6" size="80px" top="60%" left="80%" delay={2} duration={15} />
                <Planet color="#F7DF1E" size="40px" top="20%" left="75%" delay={4} duration={8} />
            </motion.div>
            
            {/* Orbit paths (Subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-300/30 dark:border-white/5 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-slate-300/30 dark:border-white/5 rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-24 relative z-10 space-y-12">
                
                {/* Header */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/20 backdrop-blur-xl text-[#00AEEF] text-xs font-black tracking-[0.2em] uppercase"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Trophy size={16} />
                        </motion.div>
                        Hackathon Milestones
                    </motion.div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter"
                    >
                        Innovation & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-purple-500">Hackathons</span>
                    </motion.h2>
                </div>

                {/* CONTINUOUS LEFT-TO-RIGHT ANIMATED HACKATHON MARQUEE STREAM */}
                <div 
                    className="relative overflow-hidden w-full group py-4"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 via-slate-50/80 dark:from-black dark:via-black/80 to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 via-slate-50/80 dark:from-black dark:via-black/80 to-transparent z-20 pointer-events-none" />

                    <motion.div
                        className="flex space-x-6 w-max"
                        animate={{ x: [-1200, 0] }} // Infinite Left-to-Right sliding movement!
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    >
                        {/* Quadruplicate list to make continuous smooth loop from left to right */}
                        {[...hackathonsData, ...hackathonsData, ...hackathonsData, ...hackathonsData, ...hackathonsData].map((hackathon, index) => {
                            const actualIndex = index % hackathonsData.length;
                            const isActive = activeTab === actualIndex;
                            return (
                                <motion.div
                                    key={`${hackathon.id}-${index}`}
                                    onClick={() => setActiveTab(actualIndex)}
                                    whileHover={{ scale: 1.06, y: -5 }}
                                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all duration-300 min-w-[300px] border backdrop-blur-xl ${
                                        isActive
                                            ? 'bg-[#00AEEF]/20 border-[#00AEEF] shadow-[0_0_30px_rgba(0,174,239,0.5)] scale-105'
                                            : 'bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 hover:bg-white dark:hover:bg-white/10 shadow-sm dark:shadow-none'
                                    }`}
                                >
                                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 dark:border-white/20 flex-shrink-0 shadow-lg relative">
                                        <img src={hackathon.image} alt={hackathon.title} className="w-full h-full object-cover" />
                                        {isActive && (
                                            <div className="absolute inset-0 bg-[#00AEEF]/30 backdrop-blur-[1px]" />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-slate-900 dark:text-white font-bold text-sm whitespace-nowrap">{hackathon.title}</h4>
                                            {isActive && (
                                                <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-ping" />
                                            )}
                                        </div>
                                        <p className="text-[#00AEEF] text-xs font-semibold">{hackathon.badge}</p>
                                        <p className="text-slate-500 dark:text-gray-400 text-[10px]">{hackathon.dates}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* FEATURED HACKATHON SHOWCASE CARD (Animates left to right on tab change) */}
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeHackathon.id}
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 60 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 bg-gradient-to-r from-white/90 to-slate-100/80 dark:from-white/[0.03] dark:to-transparent p-8 md:p-12 rounded-[40px] border border-slate-200 dark:border-white/10 backdrop-blur-2xl relative shadow-lg dark:shadow-none"
                    >
                        {/* Active Accent Glow */}
                        <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-[#00AEEF] to-purple-500 rounded-full" />

                        {/* Left Side: Details */}
                        <div className="flex-1 space-y-8">
                            
                            {/* Metadata Badges */}
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 text-xs font-medium">
                                    <Calendar size={14} className="text-[#00AEEF]" />
                                    <span>{activeHackathon.dates}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 text-xs font-medium">
                                    <MapPin size={14} className="text-purple-600 dark:text-purple-400" />
                                    <span>{activeHackathon.venue}</span>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <h3 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">
                                    {activeHackathon.highlightTitle} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-purple-500">
                                        {activeHackathon.highlightYear}
                                    </span>
                                </h3>
                                <p className="text-sm font-semibold text-[#00AEEF] tracking-wide uppercase">
                                    Organized by {activeHackathon.organizer}
                                </p>
                            </div>

                            <p className="text-slate-600 dark:text-gray-300 text-base lg:text-lg leading-relaxed font-light">
                                {activeHackathon.description}
                            </p>

                            {/* Highlights Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {activeHackathon.highlights.map((feature, i) => (
                                    <motion.div 
                                        key={i}
                                        whileHover={{ y: -4, backgroundColor: "rgba(0,174,239,0.08)" }}
                                        className="flex items-center gap-4 bg-slate-100/80 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-sm transition-all"
                                    >
                                        <div className="p-3 bg-[#00AEEF]/20 rounded-xl text-[#00AEEF] flex-shrink-0">
                                            <feature.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-slate-900 dark:text-white font-bold text-sm">{feature.title}</h4>
                                            <p className="text-slate-500 dark:text-gray-400 text-xs mt-0.5">{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Hashtags */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {activeHackathon.tags.map((tag, i) => (
                                    <span key={i} className="text-xs text-[#00AEEF] font-mono bg-[#00AEEF]/10 px-3 py-1 rounded-lg border border-[#00AEEF]/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Showcase Image Card */}
                        <div className="flex-1 w-full relative">
                            {/* Advanced Ambient Glow */}
                            <div className="absolute -inset-10 bg-[#00AEEF]/15 rounded-full blur-[100px] pointer-events-none" />
                            
                            <div className="relative group perspective-1000">
                                <motion.div 
                                    whileHover={{ rotateY: 3, rotateX: -3 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    className="relative bg-white dark:bg-[#0A0A0A] p-3 rounded-[32px] border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden"
                                >
                                    <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[640px] rounded-[28px] overflow-hidden bg-slate-100 dark:bg-black/90 flex items-center justify-center p-3">
                                        {/* Ambient blurred backdrop of image */}
                                        <img 
                                            src={activeHackathon.image} 
                                            alt="" 
                                            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none" 
                                        />
                                        
                                        {/* Crisp, uncropped certificate/photo image */}
                                        <img 
                                            src={activeHackathon.image} 
                                            alt={activeHackathon.imageAlt} 
                                            className="relative z-10 max-w-full max-h-full w-auto h-auto object-contain rounded-[20px] shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                                        />
                                        
                                        {/* Image Overlay / Glass Badge */}
                                        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent dark:from-black/90 dark:via-black/40 p-6 md:p-8 flex items-end">
                                            <div className="px-5 py-3.5 bg-white/80 dark:bg-white/10 backdrop-blur-2xl border border-slate-200 dark:border-white/20 rounded-2xl w-full">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-[#00AEEF] text-[10px] font-black uppercase tracking-widest mb-0.5">Event Venue</p>
                                                        <p className="text-slate-900 dark:text-white font-bold text-sm md:text-base">{activeHackathon.venue}</p>
                                                    </div>
                                                    <Stars size={22} className="text-[#00AEEF] animate-pulse" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                    </motion.div>
                </AnimatePresence>

            </div>
            
            {/* Section Transition */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 dark:from-black to-transparent pointer-events-none" />
        </section>
    );
};

export default Hackathon;

