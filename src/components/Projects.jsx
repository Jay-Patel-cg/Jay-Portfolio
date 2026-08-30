import { motion } from 'framer-motion';
import { Github, ExternalLink, Youtube, Code } from 'lucide-react';
import { useState } from 'react';

const projectsData = [
    { 
        title: 'Gen-Z', 
        category: 'Frontend',
        desc: 'A modern landing page designed with Tailwind CSS focus.', 
        tech: ['Tailwind CSS', 'React', 'Vite'],
        image: '/project-1.png',
        github: 'https://github.com/Jay-Patel-cg/Tailwind-Pratice',
        live: 'https://tailwind-pratice-gmkm.vercel.app/',
        youtube: 'https://youtu.be/pGUj6V39Ivk?si=jsQt7tQMW-o2oUln'
    },
    { 
        title: 'KrishiSetu (CraftCore)', 
        category: 'AgriTech AI',
        desc: 'AI-powered smart farming & soil intelligence platform with real-time crop health monitoring, market intelligence dashboard, and yield profit forecasting.', 
        tech: ['React', 'Tailwind CSS', 'AgriTech AI', 'Vite'],
        image: '/craftcore-1.png',
        github: 'https://github.com/AnshPatel191207/CraftCore',
        live: 'https://craft-core-sage.vercel.app/',
        youtube: 'https://www.youtube.com/@JayPatel-j5e9n'
    },
    { 
        title: 'Feel Flow (Transvora UI)', 
        category: 'Full Stack',
        desc: 'Fleet intelligence platform for smarter driving.', 
        tech: ['Odoo', 'React', 'Node.js', 'Leaflet'],
        image: '/project-3.png',
        github: 'https://github.com/AnshPatel191207/Odoo_x_Gujarat_Vidhyapith_Hackathon_2026',
        live: 'https://transvora-fleetflow.netlify.app/',
        youtube: 'https://youtu.be/utgCTkVCNMI?si=g8XwY-7SFgOYR16H'
    },
    { 
        title: 'adPrecision', 
        category: 'Ad Analytics',
        desc: 'High-precision ad intelligence & creative upload suite featuring campaign ROAS analytics, active spend tracking, and multi-format video distribution.', 
        tech: ['React', 'Vite', 'Tailwind CSS', 'Analytics'],
        image: '/adprecision-1.png',
        github: 'https://github.com/Jay-Patel-cg/adPrecision',
        live: 'https://adprecision-app.netlify.app/',
        youtube: 'https://www.youtube.com/@JayPatel-j5e9n'
    },
    { 
        title: 'Musafir (AI Travel Planner)', 
        category: 'AI Travel',
        desc: 'AI-powered travel planning platform built for Odoo x LD Hackathon, featuring intelligent trip itinerary generation, destination discovery, and user authentication.', 
        tech: ['React', 'Vite', 'Tailwind CSS', 'AI Travel API'],
        image: '/musafir-2.png',
        github: 'https://github.com/Jay-Patel-cg/OddoXLD-Hackathon-',
        live: 'https://oddo-xld-hackathon-xr63.vercel.app/',
        youtube: 'https://www.youtube.com/@JayPatel-j5e9n'
    },
    { 
        title: 'Quantum AI (Page Intelligence)', 
        category: 'AI Web Suite',
        desc: 'Next-gen web intelligence workspace featuring AI page summarization, smart reader narration, voice assistant conversation, code lens analysis, and translation.', 
        tech: ['React', 'Vite', 'Tailwind CSS', 'AI Engine'],
        image: '/quantum-1.png',
        github: 'https://github.com/ShahArpanPratikkumar/quantum_coders',
        live: 'https://quantum-coders-two.vercel.app/',
        youtube: 'https://www.youtube.com/@JayPatel-j5e9n'
    },
];

const ProjectCard = ({ project, index }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ 
                y: -12,
                scale: 1.03,
                transition: { duration: 0.3 }
            }}
            className="group relative bg-[#111] rounded-[20px] overflow-hidden border border-white/5 shadow-xl hover:shadow-[#00AEEF]/20 hover:border-[#00AEEF]/50 transition-all duration-500 flex flex-col h-full"
        >
            {/* Category Badge */}
            <div className="absolute top-4 right-4 z-30">
                <span className="px-3 py-1 bg-[#00AEEF]/20 backdrop-blur-md border border-[#00AEEF]/30 rounded-full text-[10px] font-bold text-[#00AEEF] uppercase tracking-wider">
                    {project.category}
                </span>
            </div>

            {/* Thumbnail Section */}

            <div 
                className="relative h-64 overflow-hidden cursor-pointer bg-gray-900"
                onClick={() => window.open(project.live, '_blank')}
            >
                {/* Skeleton Loader */}
                {!imageLoaded && !hasError && (
                    <div className="absolute inset-0 animate-pulse bg-white/5 flex items-center justify-center">
                        <Code className="text-white/20" size={32} />
                    </div>
                )}
                
                <img
                    src={hasError ? '/project-thumb.png' : project.image}
                    alt={project.title}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setHasError(true);
                        setImageLoaded(true);
                    }}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
                
                {/* Advanced Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-bold text-[#00AEEF] mb-1">
                            {project.title}
                        </h3>
                        <p className="text-gray-200 text-sm leading-relaxed max-w-xs">
                            {project.desc}
                        </p>
                        
                        {project.tech && (
                            <div className="flex flex-wrap justify-center gap-2 mt-2">
                                {project.tech.map((t) => (
                                    <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-white/10 rounded-md text-gray-300 border border-white/5">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="mt-4 px-6 py-2 bg-[#00AEEF] text-black font-bold rounded-full shadow-lg flex items-center gap-2 mx-auto"
                        >
                            View Project
                            <ExternalLink size={16} />
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Simple Info Section (Below Image) */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00AEEF] transition-colors leading-tight">
                    {project.title}
                </h3>
                
                {/* Buttons Grid */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2 rounded-xl border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 font-medium text-sm"
                    >
                        <Github size={16} />
                        <span>GitHub</span>
                    </a>
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2 rounded-xl bg-[#00AEEF] text-black hover:bg-[#0088bb] transition-all duration-300 font-bold text-sm"
                    >
                        <span>Live</span>
                        <ExternalLink size={16} />
                    </a>
                    
                    {project.youtube && (
                        <a
                            href={project.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="col-span-2 flex items-center justify-center gap-2 py-2 rounded-xl border border-red-500/30 text-white hover:bg-red-500 hover:text-white transition-all duration-300 font-medium text-sm group/yt"
                        >
                            <Youtube size={16} className="text-red-500 group-hover/yt:text-white transition-colors" />
                            <span>YouTube Demo</span>
                        </a>
                    )}
                </div>
            </div>

            {/* Accent Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00AEEF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="min-h-screen py-20 relative bg-black overflow-hidden">
            <div className="container mx-auto px-12 md:px-24 lg:px-32 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-16 text-center text-white"
                >
                    Selected <span className="text-[#00AEEF]">Projects</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
                    {projectsData.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <motion.a
                        href="https://github.com/Jay-Patel-cg"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-8 py-3 rounded-full border border-gray-700 text-gray-300 hover:border-[#00AEEF] hover:text-[#00AEEF] transition-all hover:shadow-[0_0_20px_rgba(0,174,239,0.2)]"
                    >
                        View More on GitHub
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
