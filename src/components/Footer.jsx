import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { socialLinks } from '../data/socialLinks';

const Footer = () => {
    return (
        <footer className="bg-black py-12 border-t border-gray-900 text-center relative z-10">
            <div className="flex justify-center space-x-6 mb-8">
                {socialLinks.map((link) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, color: link.color }}
                        className="text-gray-500 hover:text-white transition-colors"
                        title={link.name}
                    >
                        <link.icon size={20} />
                    </motion.a>
                ))}
            </div>
            <p className="text-gray-500 flex items-center justify-center gap-2">
                Made with <Heart size={16} className="text-red-500 fill-red-500" /> by Jay Patel
            </p>
            <p className="text-gray-600 text-sm mt-2">
                &copy; {new Date().getFullYear()} All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
