import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { socialLinks } from '../data/socialLinks';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black py-12 border-t border-slate-200 dark:border-gray-900 text-center relative z-10 transition-colors duration-500">
            <div className="flex justify-center space-x-6 mb-6">
                {socialLinks.map((link) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, color: link.color }}
                        className="text-slate-500 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                        title={link.name}
                        aria-label={`Jay Patel on ${link.name}`}
                    >
                        <link.icon size={20} />
                    </motion.a>
                ))}
            </div>
            <p className="text-slate-600 dark:text-gray-400 font-medium flex items-center justify-center gap-2">
                Designed & Built with <Heart size={16} className="text-red-500 fill-red-500" /> by <span className="text-[#00AEEF] font-bold">Jay Patel</span>
            </p>
            <p className="text-slate-400 dark:text-gray-600 text-xs mt-2">
                Jay Patel | Software Developer Portfolio &copy; {new Date().getFullYear()} All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
