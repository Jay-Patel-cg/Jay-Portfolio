import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Globe, ExternalLink, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import MacbookMockup from './MacbookMockup';

const certificates = [
    { 
        title: 'Introduction to JavaScript', 
        issuer: 'SoloLearn', 
        date: 'March 2026', 
        tag: 'Featured',
        id: 'js-01',
        icon: Code2,
        image: '/javascript-cert.png',
        link: 'https://www.sololearn.com/certificates/CC-TPGJJYAR',
        description: 'Mastery of core JavaScript concepts, including DOM manipulation, asynchronous programming, and ES6+ syntax.',
        color: '#F7DF1E', // JS Yellow
    },
    { 
        title: 'Web Development', 
        issuer: 'SoloLearn', 
        date: 'March 2026', 
        tag: 'Professional',
        id: 'web-02',
        icon: Globe,
        image: '/web-dev-cert.jpg',
        link: 'https://www.sololearn.com/certificates/CC-DOSH4P02',
        description: 'Comprehensive certification in modern web standards, HTML5, CSS3, and responsive design architectures.',
        color: '#00AEEF', // Theme Blue
    },
    { 
        title: 'ArtPark CodeForge Hackathon', 
        issuer: 'IISc, Bangalore', 
        date: 'March 2026', 
        tag: 'Competition',
        id: 'hack-03',
        icon: ShieldCheck,
        image: '/hackathon-cert.jpg',
        link: 'https://unstop.com/certificate-preview/5f7f4690-7bc9-42b0-8c7b-af260211347e',
        description: 'Participated in the Build & Submit - Prototype Development Round of ArtPark CodeForge Hackathon organized by IISc Bangalore.',
        color: '#FF00A2', // Accent Pink
    },
];

const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const columns = Math.floor(width / 20);
        const chars = '01';
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#00AEEF';
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-10 pointer-events-none" />;
};

const Tooltip = ({ content, visible, position }) => (
    <AnimatePresence>
        {visible && (
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="fixed z-[100] pointer-events-none px-4 py-3 bg-[#111] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl w-64"
                style={{ left: position.x + 15, top: position.y + 15 }}
            >
                <h4 className="text-white font-bold mb-1">{content.title}</h4>
                <p className="text-[#00AEEF] text-xs font-black uppercase tracking-widest mb-2">{content.issuer}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{content.description}</p>
            </motion.div>
        )}
    </AnimatePresence>
);

const Certificates = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [tooltip, setTooltip] = useState({ visible: false, content: null, position: { x: 0, y: 0 } });
    const timerRef = useRef(null);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    }, []);

    useEffect(() => {
        if (!isPaused) {
            timerRef.current = setInterval(nextSlide, 3000);
        }
        return () => clearInterval(timerRef.current);
    }, [isPaused, nextSlide]);

    const handleMouseMove = (e, cert) => {
        setTooltip({
            visible: true,
            content: cert,
            position: { x: e.clientX, y: e.clientY }
        });
    };

    return (
        <section id="certificates" className="min-h-screen py-32 relative bg-black overflow-hidden flex flex-col justify-center">
            <MatrixRain />
            
            <Tooltip visible={tooltip.visible} content={tooltip.content} position={tooltip.position} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-white"
                    >
                        Certificates <span className="text-[#00AEEF]">Showcase.......</span>
                    </motion.h2>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Main Featured Container */}
                    <div 
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => {
                            setIsPaused(false);
                            setTooltip({ ...tooltip, visible: false });
                        }}
                        className="relative"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                onMouseMove={(e) => handleMouseMove(e, certificates[currentIndex])}
                                className="bg-[#0A0A0A] rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_100px_-20px_rgba(0,174,239,0.1)] relative"
                            >
                                <div className="flex flex-col lg:flex-row min-h-[500px]">
                                    {/* Content Panel */}
                                    <div className="flex-1 p-8 lg:p-20 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-8">
                                            <span className="px-5 py-1.5 bg-[#00AEEF]/20 border border-[#00AEEF]/40 text-[#00AEEF] text-xs font-black uppercase tracking-[0.25em] rounded-full">
                                                {certificates[currentIndex].tag}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-[1.05]">
                                            {certificates[currentIndex].title}
                                        </h3>
                                        
                                        <p className="text-gray-400 text-xl mb-12 leading-relaxed max-w-2xl font-medium">
                                            {certificates[currentIndex].description}
                                        </p>

                                        <div className="flex items-center gap-6 mb-12">
                                            <div className="flex flex-col">
                                                <span className="text-gray-600 text-xs font-black uppercase tracking-widest mb-2">Issued By</span>
                                                <span className="text-white text-xl font-bold">{certificates[currentIndex].issuer}</span>
                                            </div>
                                            <div className="w-px h-12 bg-white/10" />
                                            <div className="flex flex-col">
                                                <span className="text-gray-600 text-xs font-black uppercase tracking-widest mb-2">Completion</span>
                                                <span className="text-[#00AEEF] text-xl font-bold">Verified ✅</span>
                                            </div>
                                        </div>

                                        <motion.a
                                            href={certificates[currentIndex].link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-fit px-12 py-5 bg-[#00AEEF] text-black font-black uppercase tracking-widest text-sm rounded-2xl flex items-center gap-4 shadow-[0_20px_40px_-10px_rgba(0,174,239,0.5)] transition-all"
                                        >
                                            View Original
                                            <ExternalLink size={20} strokeWidth={3} />
                                        </motion.a>
                                    </div>

                                    {/* Visual Panel - Macbook Mockup Container */}
                                    <div className="lg:w-[55%] bg-[#080808] relative flex items-center justify-center p-6 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/5 to-transparent" />
                                        
                                        <MacbookMockup>
                                            <AnimatePresence mode="wait">
                                                <motion.div 
                                                    key={currentIndex}
                                                    initial={{ opacity: 0, scale: 1.1, blur: '10px' }}
                                                    animate={{ opacity: 1, scale: 1, blur: '0px' }}
                                                    exit={{ opacity: 0, scale: 0.9, blur: '10px' }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                    className="w-full h-full bg-[#050505] flex items-center justify-center p-2"
                                                >
                                                    <img 
                                                        src={certificates[currentIndex].image} 
                                                        alt={certificates[currentIndex].title}
                                                        className="w-full h-full object-contain rounded-sm shadow-inner transition-all duration-700 hover:brightness-110"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                    <div style={{ display: 'none' }} className="flex items-center justify-center w-full h-full">
                                                        {(() => {
                                                            const FallbackIcon = certificates[currentIndex].icon;
                                                            return <FallbackIcon size={120} strokeWidth={0.5} className="text-[#00AEEF]/30" />;
                                                        })()}
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </MacbookMockup>
                                        
                                        {/* Background Decoration */}
                                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#00AEEF]/10 blur-[120px] rounded-full pointer-events-none" />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Arrows */}
                        <div className="absolute top-1/2 -translate-y-1/2 -left-6 lg:-left-12 flex gap-4 flex-col">
                            <button onClick={prevSlide} className="p-4 bg-white/5 hover:bg-[#00AEEF] text-white hover:text-black rounded-full border border-white/10 backdrop-blur-md transition-all">
                                <ChevronLeft size={24} strokeWidth={3} />
                            </button>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 -right-6 lg:-right-12">
                            <button onClick={nextSlide} className="p-4 bg-white/5 hover:bg-[#00AEEF] text-white hover:text-black rounded-full border border-white/10 backdrop-blur-md transition-all">
                                <ChevronRight size={24} strokeWidth={3} />
                            </button>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/5 overflow-hidden">
                            <motion.div
                                key={currentIndex + isPaused}
                                initial={{ width: "0%" }}
                                animate={{ width: isPaused ? "0%" : "100%" }}
                                transition={{ duration: 3, ease: "linear" }}
                                className="h-full bg-[#00AEEF]"
                            />
                        </div>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="mt-16 flex flex-wrap justify-center gap-6">
                        {certificates.map((cert, idx) => (
                            <motion.button
                                key={cert.id}
                                onClick={() => setCurrentIndex(idx)}
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                                onMouseMove={(e) => handleMouseMove(e, cert)}
                                whileHover={{ y: -5 }}
                                className={`relative p-1 rounded-2xl transition-all duration-500 ${
                                    currentIndex === idx ? 'bg-[#00AEEF] shadow-[0_10px_30px_rgba(0,174,239,0.3)]' : 'bg-white/5 hover:bg-white/10'
                                }`}
                            >
                                <div className="bg-[#0A0A0A] p-4 pr-8 rounded-[14px] flex items-center gap-4 min-w-[240px]">
                                    <div className={`p-3 rounded-xl ${currentIndex === idx ? 'bg-[#00AEEF]/10 text-[#00AEEF]' : 'bg-white/5 text-gray-500'}`}>
                                        {(() => {
                                            const ThumbIcon = cert.icon;
                                            return <ThumbIcon size={24} strokeWidth={1.5} />;
                                        })()}
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-sm font-black uppercase tracking-widest ${currentIndex === idx ? 'text-white' : 'text-gray-500'}`}>
                                            {cert.issuer}
                                        </p>
                                        <p className="text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px]">
                                            {cert.title}
                                        </p>
                                    </div>
                                </div>
                                {currentIndex === idx && (
                                    <motion.div 
                                        layoutId="activeThumb" 
                                        className="absolute -inset-1 border-2 border-[#00AEEF] rounded-2xl pointer-events-none" 
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Footer Decor */}
                <div className="mt-32 flex flex-col items-center opacity-20">
                    <p className="text-[#00AEEF] text-[10px] font-black uppercase tracking-[0.5em] mb-4">Interactive Showcase</p>
                    <div className="flex gap-2">
                        {certificates.map((_, i) => (
                            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${currentIndex === i ? 'w-8 bg-[#00AEEF]' : 'w-2 bg-white/20'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certificates;
