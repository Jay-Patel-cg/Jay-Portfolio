import { motion } from 'framer-motion';
import { Rocket, Trophy, Users, Code, Stars } from 'lucide-react';

const StarField = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full opacity-20"
                    style={{
                        width: Math.random() * 3 + 1 + 'px',
                        height: Math.random() * 3 + 1 + 'px',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                    }}
                    animate={{
                        opacity: [0.1, 0.4, 0.1],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

const Planet = ({ color, size, top, left, delay, duration }) => (
    <motion.div
        className={`absolute rounded-full blur-[2px] opacity-30 pointer-events-none`}
        style={{
            width: size,
            height: size,
            top: top,
            left: left,
            background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
            boxShadow: `0 0 20px ${color}44`,
        }}
        animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: 360,
        }}
        transition={{
            y: { duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay },
            x: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut", delay: delay },
            rotate: { duration: duration * 5, repeat: Infinity, ease: "linear" }
        }}
    />
);

const Hackathon = () => {
    return (
        <section id="hackathon" className="relative py-16 flex items-center overflow-hidden bg-[#050505]">
            {/* Background Solar System Theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a1a] to-black" />
            <StarField />
            
            <Planet color="#00AEEF" size="100px" top="15%" left="10%" delay={0} duration={8} />
            <Planet color="#FF00A2" size="60px" top="70%" left="85%" delay={2} duration={10} />
            <Planet color="#F7DF1E" size="40px" top="40%" left="80%" delay={1} duration={12} />
            
            {/* Orbit paths (Subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full pointer-events-none" />

            <div className="container mx-auto px-12 lg:px-24 relative z-10">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
                >
                    {/* Left Side: Description */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/30 text-[#00AEEF] text-sm font-bold tracking-widest uppercase mb-4">
                            <Trophy size={16} />
                            Hackathon Experience
                        </div>
                        
                        <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                            Craftathon <span className="text-[#00AEEF]">Hackathon</span>
                        </h2>

                        <p className="text-gray-400 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
                            I participated in Craftathon, a Minecraft-themed hackathon organized at Gandhinagar University (GU). 
                            This experience helped me enhance my problem-solving skills, teamwork, and creativity. 
                            I collaborated with peers, built innovative solutions, and gained real-world development 
                            experience in a competitive environment.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                                <div className="p-3 bg-[#00AEEF]/20 rounded-xl text-[#00AEEF]">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Teamwork</h4>
                                    <p className="text-gray-500 text-sm">Collaboration</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                                <div className="p-3 bg-[#00AEEF]/20 rounded-xl text-[#00AEEF]">
                                    <Code size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Innovation</h4>
                                    <p className="text-gray-500 text-sm">Creative Solutions</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Image */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, x: 50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex-1 relative group"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00AEEF] to-[#FF00A2] rounded-[30px] opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500" />
                        
                        <div className="relative bg-[#0A0A0A] p-2 rounded-[30px] border border-white/10 shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_50px_rgba(0,174,239,0.3)] max-w-lg lg:max-w-2xl mx-auto">
                            <img 
                                src="/hackathon.jpg" 
                                alt="Craftathon Hackathon" 
                                className="w-full h-auto max-h-[600px] object-contain rounded-[24px]"
                            />
                            
                            {/* Overlay Badge */}
                            <div className="absolute bottom-6 right-6 px-6 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <p className="text-white font-bold flex items-center gap-2">
                                    <Stars size={18} className="text-[#00AEEF]" />
                                    Gandhinagar University
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            
            {/* Visual bottom transition */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
};

export default Hackathon;
