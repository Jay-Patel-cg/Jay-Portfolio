import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const skillsData = {
    frontend: [
        { name: 'HTML', icon: '🌐' },
        { name: 'CSS', icon: '🎨' },
        { name: 'JavaScript', icon: '📜' },
        { name: 'React', icon: '⚛️' },
        { name: 'Tailwind CSS', icon: '💅' },
        { name: 'UI/UX (Figma)', icon: '🖌️' },
    ],
    backend: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Express.js', icon: '🚂' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'REST API', icon: '🔌' },
    ],
    other: [
        { name: 'Git', icon: '🌿' },
        { name: 'GitHub', icon: '🐙' },
        { name: 'Postman', icon: '🚀' },
        { name: 'Netlify', icon: '☁️' },
        { name: 'Vercel', icon: '▲' },
        { name: 'Communication', icon: '🗣️' },
    ],
};

const Skills = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section id="skills" ref={containerRef} className="min-h-screen relative bg-black overflow-hidden py-20">

            {/* 1. Animated Blue Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,174,239,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.25)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] animate-grid-pan pointer-events-none" />

            {/* 2. Star Particle Background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
                        initial={{
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                            opacity: Math.random() * 0.5 + 0.2,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }}
                        style={{
                            width: Math.random() * 2 + 1 + "px",
                            height: Math.random() * 2 + 1 + "px"
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-20 text-center"
                >
                    My <span className="text-[#00AEEF]">Skills</span> & Journey
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-16">

                    {/* LEFT: Journey / Timeline */}
                    <div>
                        <h3 className="text-2xl font-bold mb-10 text-white flex items-center gap-2">
                            <span className="w-8 h-1 bg-[#00AEEF] rounded-full"></span>
                            My Journey
                        </h3>

                        <div className="relative border-l-2 border-gray-800 ml-4 space-y-12">
                            {[
                                { role: 'Frontend Development', year: '2024', desc: 'Started with HTML, CSS, & Component Logic.' },
                                { role: 'Backend Development', year: '2025', desc: 'Mastered Node.js, Express & Database Designs.' },
                                { role: 'Full Stack Engineer', year: 'Present', desc: 'Building scalable, high-performance web apps.' }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="relative pl-8 group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-[#00AEEF] rounded-full group-hover:scale-125 group-hover:bg-[#00AEEF] transition-all duration-300 shadow-[0_0_10px_#00AEEF]" />

                                    <span className="text-[#00AEEF] font-mono text-sm tracking-widest">{item.year}</span>
                                    <h4 className="text-xl font-bold text-white mt-1 group-hover:text-[#00AEEF] transition-colors">{item.role}</h4>
                                    <p className="text-gray-400 mt-2 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Skills Marquee (Running Animation) */}
                    <div className="relative overflow-hidden w-full space-y-12 mask-linear">
                        {Object.entries(skillsData).map(([category, skills], catIndex) => (
                            <div key={category} className="relative">
                                <h3 className="text-xl font-bold text-gray-400 capitalize mb-6 px-4 border-l-4 border-[#00AEEF] inline-block">
                                    {category}
                                </h3>

                                {/* Marquee Row */}
                                <div className="flex overflow-hidden relative w-full group">
                                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
                                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />

                                    <motion.div
                                        className="flex space-x-6 w-max"
                                        animate={{ x: catIndex % 2 === 0 ? [0, -1000] : [-1000, 0] }} // Alternate direction
                                        transition={{
                                            duration: 25,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatType: "loop"
                                        }}
                                    >
                                        {/* Duplicate list 3 times to ensure smooth infinite scroll */}
                                        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
                                            <motion.div
                                                key={`${skill.name}-${index}`}
                                                whileHover={{
                                                    scale: 1.1,
                                                    backgroundColor: "rgba(0, 174, 239, 0.2)",
                                                    borderColor: "#00AEEF",
                                                    boxShadow: "0 0 15px rgba(0, 174, 239, 0.4)"
                                                }}
                                                className="flex items-center gap-3 px-6 py-3 bg-[#111] border border-gray-800 rounded-full cursor-pointer transition-all min-w-max"
                                            >
                                                <span className="text-2xl">{skill.icon}</span>
                                                <span className="text-sm font-bold text-gray-300 whitespace-nowrap">{skill.name}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <style>{`
        @keyframes gridPan {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .animate-grid-pan {
          animation: gridPan 4s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default Skills;
