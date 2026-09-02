import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [hoveredRect, setHoveredRect] = useState(null);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, [data-cursor="pointer"]');
            if (target) {
                setIsHovering(true);
                const rect = target.getBoundingClientRect();
                setHoveredRect({
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                });
            } else {
                setIsHovering(false);
                setHoveredRect(null);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const cornerSize = 10;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Main Dot Cursor */}
            <motion.div
                className="absolute w-2 h-2 bg-[#00AEEF] rounded-full mix-blend-difference"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 2 : 1,
                    opacity: isHovering ? 0.8 : 1
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
            />

            {/* Target Reticle / Corner Brackets */}
            <AnimatePresence>
                {isHovering && hoveredRect && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: hoveredRect.left - 5,
                            y: hoveredRect.top - 5,
                            width: hoveredRect.width + 10,
                            height: hoveredRect.height + 10,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        className="absolute pointer-events-none"
                    >
                        {/* Top-Left Corner */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00AEEF] shadow-[0_0_10px_#00AEEF]" />
                        {/* Top-Right Corner */}
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00AEEF] shadow-[0_0_10px_#00AEEF]" />
                        {/* Bottom-Left Corner */}
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00AEEF] shadow-[0_0_10px_#00AEEF]" />
                        {/* Bottom-Right Corner */}
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00AEEF] shadow-[0_0_10px_#00AEEF]" />
                        
                        {/* Center Scanning Dot (optional, matching user request image) */}
                        <motion.div 
                            className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#00AEEF] rounded-full shadow-[0_0_8px_#00AEEF]"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Default Outer Circle (Follower) */}
            {!isHovering && (
                <motion.div
                    className="absolute w-8 h-8 border border-slate-400/40 dark:border-white/20 rounded-full"
                    animate={{
                        x: mousePosition.x - 16,
                        y: mousePosition.y - 16,
                    }}
                    transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
                />
            )}
        </div>
    );
};

export default CustomCursor;
