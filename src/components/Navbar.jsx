import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Hackathon', href: '#hackathon' },
    { name: 'Contact', href: '#contact' },
];

const NavLink = ({ item, isActive, activeSection, scrollToTop }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const isHome = item.name === 'Home';

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.2;
        const y = (clientY - (top + height / 2)) * 0.2;
        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    return (
        <motion.a
            href={isHome ? '#' : item.href}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: mousePosition.x, y: mousePosition.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            onClick={(e) => {
                if (isHome) {
                    e.preventDefault();
                    scrollToTop();
                }
            }}
            className={`relative px-5 py-2 transition-colors duration-500 text-[10px] font-black uppercase tracking-[0.2em] z-10 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
            <span className="relative z-10">{item.name}</span>
            {isActive && (
                <motion.div 
                    layoutId="activePill"
                    className="absolute inset-0 bg-[#00AEEF] rounded-full shadow-[0_0_20px_#00AEEF66]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                />
            )}
        </motion.a>
    );
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Robust section tracking using bounding box
            const midPoint = window.innerHeight / 2.5;
            let current = 'home';

            for (const item of navItems) {
                const id = item.href.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the midPoint of the screen is within the section's bounds
                    if (rect.top <= midPoint && rect.bottom >= midPoint) {
                        current = id;
                        break;
                    }
                }
            }
            
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Run once on mount to set initial state
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-black/40 backdrop-blur-2xl py-3 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div 
                    className="w-32 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                    onClick={scrollToTop}
                    title="Back to Top"
                >
                    {/* Hero text goes here */}
                </div>

                {/* Desktop Menu - Magnetic & Dynamic Pill */}
                <div className="hidden lg:flex items-center bg-white/5 backdrop-blur-3xl rounded-full p-1 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.name} 
                            item={item} 
                            isActive={activeSection === item.href.replace('#', '')}
                            scrollToTop={scrollToTop}
                        />
                    ))}
                </div>

                {/* Mobile Menu Button - Neon Pulse */}
                <button
                    className={`lg:hidden p-3 rounded-2xl border border-white/10 transition-all active:scale-90 ${isMobileMenuOpen ? 'bg-[#00AEEF] text-black shadow-[0_0_30px_#00AEEF]' : 'bg-white/5 text-white'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
                </button>
            </div>

            {/* Mobile Menu - High Fidelity */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="lg:hidden absolute top-[calc(100%+16px)] left-6 right-6 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-3"
                    >
                        <div className="flex flex-col space-y-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`relative px-6 py-4 rounded-[20px] text-xs font-black uppercase tracking-[0.3em] transition-all duration-300 ${activeSection === item.href.replace('#', '') ? 'bg-[#00AEEF] text-black shadow-[0_10px_20px_#00AEEF44]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                    onClick={(e) => {
                                        if (item.name === 'Home') {
                                            e.preventDefault();
                                            scrollToTop();
                                        } else {
                                            setIsMobileMenuOpen(false);
                                        }
                                    }}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
