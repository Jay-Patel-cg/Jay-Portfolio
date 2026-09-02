import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Figma', href: '#figma' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Hackathon', href: '#hackathon' },
    { name: 'Contact', href: '#contact' },
];


const NavLink = ({ item, isActive, scrollToTop }) => {
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
            className={`relative px-5 py-2 transition-colors duration-300 text-[10px] font-black uppercase tracking-[0.2em] z-10 ${isActive ? 'text-white' : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}
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

const ThemeToggleButton = ({ className = "" }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.15, rotate: theme === 'dark' ? 45 : -45 }}
            whileTap={{ scale: 0.85 }}
            className={`relative p-2.5 rounded-full transition-all duration-300 ${
                theme === 'dark'
                    ? 'bg-white/10 text-yellow-400 border border-white/15 hover:bg-white/20 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                    : 'bg-slate-200 text-slate-800 border border-slate-300 hover:bg-slate-300 hover:shadow-[0_0_15px_rgba(0,174,239,0.3)]'
            } ${className}`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.25 }}
                >
                    {theme === 'dark' ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
                </motion.div>
            </AnimatePresence>
        </motion.button>
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
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50);

                    // Robust section tracking using bounding box
                    const midPoint = window.innerHeight / 2.5;
                    let current = 'home';

                    for (const item of navItems) {
                        const id = item.href.replace('#', '');
                        const element = document.getElementById(id);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            if (rect.top <= midPoint && rect.bottom >= midPoint) {
                                current = id;
                                break;
                            }
                        }
                    }
                    
                    setActiveSection(current);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 dark:bg-black/40 backdrop-blur-2xl py-3 shadow-xl border-b border-slate-200/50 dark:border-white/5' : 'bg-transparent py-6'
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
                <div className="hidden lg:flex items-center gap-3 bg-white/80 dark:bg-white/5 backdrop-blur-3xl rounded-full p-1.5 border border-slate-200/80 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.name} 
                            item={item} 
                            isActive={activeSection === item.href.replace('#', '')}
                            scrollToTop={scrollToTop}
                        />
                    ))}

                    <div className="w-px h-5 bg-slate-300 dark:bg-white/10 mx-1" />

                    {/* Desktop Theme Toggle Button */}
                    <ThemeToggleButton />
                </div>

                {/* Mobile Right Controls: Theme Toggle & Menu Toggle */}
                <div className="flex items-center space-x-3 lg:hidden">
                    <ThemeToggleButton />

                    <button
                        className={`p-3 rounded-2xl border transition-all active:scale-90 ${
                            isMobileMenuOpen 
                                ? 'bg-[#00AEEF] text-black border-[#00AEEF] shadow-[0_0_30px_#00AEEF]' 
                                : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-800 dark:text-white'
                        }`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="lg:hidden absolute top-[calc(100%+16px)] left-6 right-6 bg-white/95 dark:bg-black/90 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-3"
                    >
                        <div className="flex flex-col space-y-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`relative px-6 py-4 rounded-[20px] text-xs font-black uppercase tracking-[0.3em] transition-all duration-300 ${activeSection === item.href.replace('#', '') ? 'bg-[#00AEEF] text-black shadow-[0_10px_20px_#00AEEF44]' : 'text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}
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