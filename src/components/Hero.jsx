import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { socialLinks } from '../data/socialLinks';

const Hero = ({ onIntroComplete }) => {
    const [animationStep, setAnimationStep] = useState('initial');
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const roles = ['UI/UX Developer', 'Backend Developer', 'Git / GitHub'];

    useEffect(() => {
        // Sequence the animations
        const timer1 = setTimeout(() => {
            setAnimationStep('moving');
        }, 1500); // Wait 1.5s then start moving title

        const timer2 = setTimeout(() => {
            setAnimationStep('complete');
            if (onIntroComplete) onIntroComplete();
        }, 2500); // Complete after 2.5s total

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onIntroComplete]);

    // Typewriter effect
    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseAfterComplete = 1500;
        const pauseAfterDelete = 500;

        let timer;

        if (!isDeleting && displayedText.length < currentRole.length) {
            // Still typing
            timer = setTimeout(() => {
                setDisplayedText(currentRole.substring(0, displayedText.length + 1));
            }, typingSpeed);
        } else if (!isDeleting && displayedText.length === currentRole.length) {
            // Finished typing, pause then start deleting
            timer = setTimeout(() => {
                setIsDeleting(true);
            }, pauseAfterComplete);
        } else if (isDeleting && displayedText.length > 0) {
            // Still deleting
            timer = setTimeout(() => {
                setDisplayedText(displayedText.substring(0, displayedText.length - 1));
            }, deletingSpeed);
        } else if (isDeleting && displayedText.length === 0) {
            // Finished deleting, move to next role
            timer = setTimeout(() => {
                setIsDeleting(false);
                setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            }, pauseAfterDelete);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentRoleIndex]);

    // Memoize star positions and timings to prevent glitches on re-renders
    const stars = useMemo(() => {
        return [...Array(40)].map((_, i) => ({
            id: i,
            top: Math.random() * 100 + "%",
            duration: Math.random() * 20 + 20, // Slower: between 20s and 40s
            delay: Math.random() * 10
        }));
    }, []);

    return (
        <section id="home" className="min-h-screen bg-black text-white relative flex items-center justify-center overflow-hidden px-6">

            {/* 0. Drifting Stars Background (Left to Right) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: "120vw", opacity: [0, 1, 0] }} // Move across screen
                        transition={{
                            duration: star.duration, // Slow drift
                            repeat: Infinity,
                            ease: "linear",
                            delay: star.delay
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_4px_#fff]"
                        style={{ top: star.top }}
                    />
                ))}
            </div>

            {/* 1. Intro Animation: Title Moving */}
            <motion.div
                className="fixed z-50 font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#00AEEF] via-purple-500 to-pink-500"
                initial={{
                    top: "50%",
                    left: "50%",
                    x: "-50%",
                    y: "-50%",
                    fontSize: "4rem"
                }}
                animate={animationStep === 'initial' ?
                    { top: "50%", left: "50%", x: "-50%", y: "-50%", fontSize: "4rem" } :
                    { top: "0.75rem", left: "2rem", x: "0%", y: "0%", fontSize: "1.5rem" }
                }
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                Jay Patel
            </motion.div>

            {/* Main Hero Content - Only visible after intro starts completing */}
            <motion.div
                className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: animationStep === 'complete' ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >

                {/* Left Side: Text Content */}
                <div className="space-y-6 md:pl-12 lg:pl-20 w-full text-left">
                    <h2 className="text-2xl md:text-3xl font-light text-gray-300 flex items-center gap-3">
                        Heyy <motion.span
                            animate={{ rotate: [0, 20, -20, 0] }}
                            transition={{ duration: 0.5, delay: 3, repeat: Infinity, repeatDelay: 1 }}
                            className="inline-block"
                        >👋</motion.span> This is
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                        <span className="text-[#00AEEF]">Jay</span> Patel
                    </h1>

                    {/* Typewriter Role Text */}
                    <p className="text-2xl md:text-3xl font-semibold text-[#00AEEF] h-12">
                        {displayedText}<span className="animate-pulse">|</span>
                    </p>

                    <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                        I am a B.Tech student at Coding Gita, passionate about building scalable web applications.
                        With expertise in both **Frontend and Backend** development, I craft seamless user experiences
                        and robust server-side architectures using modern technologies like React, Node.js, and Cloud services.
                    </p>

                    <div className="flex flex-col items-start gap-8 pt-6">
                        <div className="flex items-center space-x-4">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, rotate: link.hoverRotate, borderColor: link.color }}
                                    className={`p-3 rounded-full border border-transparent transition-all text-white hover:text-[${link.color}] ${index === 0 ? 'bg-[#1A1A1A]' : 'bg-[#111]'}`}
                                    title={link.name}
                                >
                                    <link.icon size={20} />
                                </motion.a>
                            ))}
                        </div>

                        <motion.a
                            href="https://drive.google.com/file/d/1ZgXqEv_n9TzT97vnkEHamUZdh1z9Wamj/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, shadow: "0 0 20px rgba(0, 174, 239, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-[#00AEEF] to-blue-600 text-black font-bold rounded-xl flex items-center gap-3 shadow-lg transition-all"
                        >
                            <FileText size={22} />
                            <span>View Resume</span>
                        </motion.a>
                    </div>
                </div>

                {/* Right Side: Profile Image with Parallax & Depth */}
                <div className="relative flex justify-center md:justify-end lg:pr-12">
                    <div className="relative w-72 h-72 md:w-96 md:h-96 group">

                        {/* 1. Backdrop Square (Depth & Rotation) */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-[#00AEEF] rounded-[2.5rem] opacity-20 transform scale-110"
                        />

                        {/* 2. Main Container with Animated Border/Gradient */}
                        <motion.div
                            className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-[#00AEEF] to-green-400 opacity-60 blur-md"
                            animate={{ opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        {/* 3. Image Container with Increased Border Radius */}
                        <div className="relative h-full w-full bg-black rounded-[2.5rem] overflow-hidden border-2 border-gray-800 z-10">
                            <img
                                src="https://rubber-gold-91bco2ahm3.edgeone.app/ChatGPT%20Image%20Jan%201,%202026,%2002_17_48%20PM.png"
                                alt="Jay Patel"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

            </motion.div>
        </section>
    );
};

export default Hero;
