import { motion } from 'framer-motion';
import { ExternalLink, Figma, Layout, PieChart } from 'lucide-react';

const figmaData = [
    {
        title: 'AdPrecision SaaS Landing Page',
        desc: 'A high-converting landing page design for an AI-powered ad budget optimization platform. Features clean typography, intuitive CTA placement, and a modern professional aesthetic.',
        image: '/figma-1.png',
        link: 'https://www.figma.com/design/Ot6ldPu7CGMMBDPYmHP7xR/Untitled?node-id=3-5805&t=GbA7tfqKErUDheZT-1',
        icon: Layout
    },
    {
        title: 'BudgetOptima Analytics Dashboard',
        desc: 'A complex data visualization dashboard focusing on budget allocation, ROI tracking, and market saturation metrics. Designed for clarity and rapid decision-making.',
        image: '/figma-2.png',
        link: 'https://www.figma.com/design/Ot6ldPu7CGMMBDPYmHP7xR/Untitled?node-id=3-5805&t=GbA7tfqKErUDheZT-1',
        icon: PieChart
    }
];


const FigmaDesigns = () => {
    return (
        <section id="figma" className="min-h-screen py-20 relative bg-slate-50 dark:bg-black transition-colors duration-500 overflow-hidden">
            <div className="container mx-auto px-12 md:px-24 lg:px-32 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-16 text-center text-slate-900 dark:text-white"
                >
                    Figma <span className="text-[#00AEEF]">Designs</span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {figmaData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="group relative bg-white dark:bg-[#111] rounded-[40px] overflow-hidden border border-slate-200 dark:border-white/5 flex flex-col transition-all duration-500 hover:border-[#00AEEF]/50 shadow-md dark:shadow-2xl"
                        >
                            {/* Full-width Image Container with Hover Effect */}
                            <div className="relative h-[400px] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105 group-hover:translate-y-[-10%]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#111] via-transparent to-transparent opacity-60" />
                                
                                {/* Floating Badge */}
                                <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
                                    <item.icon className="text-[#00AEEF]" size={16} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#00AEEF]">Design Showcase</span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-10 flex flex-col flex-1">
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-[#00AEEF] transition-colors tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 dark:text-gray-400 text-base leading-relaxed mb-8 flex-1">
                                    {item.desc}
                                </p>
                                
                                <motion.a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#00AEEF] text-black font-extrabold rounded-2xl shadow-[0_10px_20px_rgba(0,174,239,0.3)] transition-all group/btn"
                                >
                                    View Prototype
                                    <Figma size={20} className="transition-transform group-hover/btn:rotate-12" />
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default FigmaDesigns;
