import { motion } from 'framer-motion';

const MacbookMockup = ({ children }) => {
    return (
        <div className="relative w-full max-w-4xl mx-auto py-12 px-4 group">
            {/* Screen Frame */}
            <motion.div 
                initial={{ rotateX: 60, opacity: 0, y: 50 }}
                whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 rounded-[20px] bg-[#0A0A0A] p-[2px] border border-white/20 shadow-2xl overflow-hidden"
            >
                {/* Bezels */}
                <div className="bg-black p-2 md:p-3 rounded-[18px]">
                    <div className="bg-[#111] rounded-[10px] overflow-hidden aspect-video relative group-hover:shadow-[0_0_50px_rgba(0,174,239,0.2)] transition-shadow duration-500">
                        {children}
                        
                        {/* Camera */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#222] rounded-full border border-white/10 z-20" />
                    </div>
                </div>
            </motion.div>

            {/* Bottom Base */}
            <motion.div 
                initial={{ opacity: 0, scaleX: 0.8 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative -mt-1 h-3 bg-gradient-to-b from-[#1a1a1a] to-[#080808] w-[105%] -left-[2.5%] rounded-b-2xl border-t border-white/10 shadow-2xl z-0"
            />
            
            {/* Trackpad Notch */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-10 w-24 h-1 bg-[#111] rounded-full z-10" 
            />

            {/* Reflection/Glow */}
            <div className="absolute -inset-10 bg-[#00AEEF]/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
        </div>
    );
};

export default MacbookMockup;
