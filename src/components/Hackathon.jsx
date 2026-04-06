import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Trophy, Users, Code, Stars } from 'lucide-react';
import { useRef } from 'react';

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

const Planet = ({ color, size, top, left, delay, duration, parallaxValue }) => {
    const ref = useRef(null);
    return (
        <motion.div
            ref={ref}
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

const Hackathon = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yPlanets = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section 
            id="hackathon" 
            ref={sectionRef}
            className="relative py-24 flex items-center overflow-hidden bg-black"
        >
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#001020] to-black" />
            
            {/* Stars & Space Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(80)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
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
            <motion.div style={{ y: yPlanets }} className="absolute inset-0 z-0">
                <Planet color="#00AEEF" size="150px" top="10%" left="5%" delay={0} duration={12} />
                <Planet color="#5B21B6" size="80px" top="60%" left="80%" delay={2} duration={15} />
                <Planet color="#F7DF1E" size="40px" top="20%" left="75%" delay={4} duration={8} />
            </motion.div>
            
            {/* Orbit paths (Subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-24 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    
                    {/* Left Side: Cinematic Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 space-y-10"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/20 backdrop-blur-xl text-[#00AEEF] text-[10px] font-black tracking-[0.2em] uppercase">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Trophy size={14} />
                            </motion.div>
                            Hackathon Milestone
                        </div>
                        
                        <div className="space-y-4">
                            <h2 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                                Craftathon <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-purple-500">
                                    2k25
                                </span>
                            </h2>
                        </div>

                        <p className="text-gray-400 text-lg lg:text-xl leading-relaxed max-w-2xl font-light">
                            I participated in Craftathon, a Minecraft-themed hackathon organized at <span className="text-white font-medium">Gandhinagar University (GU)</span>. 
                            This experience helped me enhance my problem-solving skills, teamwork, and creativity. 
                            I collaborated with peers, built innovative solutions, and gained real-world development 
                            experience in a competitive environment.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { icon: Users, title: "Teamwork", desc: "Collaborative building" },
                                { icon: Code, title: "Innovation", desc: "Creative solutions" }
                            ].map((feature, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
                                    className="flex items-center gap-4 bg-white/5 p-5 rounded-[24px] border border-white/10 backdrop-blur-sm transition-all"
                                >
                                    <div className="p-3 bg-[#00AEEF]/20 rounded-xl text-[#00AEEF]">
                                        <feature.icon size={22} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{feature.title}</h4>
                                        <p className="text-gray-500 text-xs">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Cinematic Image Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, x: 60 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="flex-1 relative"
                    >
                        {/* Advanced Ambient Glow */}
                        <div className="absolute -inset-10 bg-[#00AEEF]/10 rounded-full blur-[100px] pointer-events-none" />
                        
                        <div className="relative group perspective-1000">
                            <motion.div 
                                whileHover={{ rotateY: 5, rotateX: -5 }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                className="relative bg-[#0A0A0A] p-3 rounded-[40px] border border-white/10 shadow-2xl overflow-hidden"
                            >
                                <img 
                                    src="/hackathon.jpg" 
                                    alt="Craftathon Hackathon" 
                                    className="w-full h-auto max-h-[550px] object-cover rounded-[32px] transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Image Overlay / Glass Badge */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                                    <div className="px-6 py-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl w-full">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[#00AEEF] text-[10px] font-black uppercase tracking-widest mb-1">Venue</p>
                                                <p className="text-white font-bold">Gandhinagar University</p>
                                            </div>
                                            <Stars size={24} className="text-[#00AEEF] animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
            
            {/* Section Transition */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
};

export default Hackathon;
