import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { socialLinks } from '../data/socialLinks';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // NOTE TO USER: Replace placeholders with your actual EmailJS credentials
        // You can get these from https://dashboard.emailjs.com/
        const SERVICE_ID = "service_rl74rhe"; 
        const TEMPLATE_ID = "template_y8su0ay";
        const PUBLIC_KEY = "-nIzrCDmQ7bfwaV3x";

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setSubmitStatus('success');
                form.current.reset();
            }, (error) => {
                console.log(error.text);
                setSubmitStatus('error');
            })
            .finally(() => {
                setIsSubmitting(false);
                setTimeout(() => setSubmitStatus(null), 5000);
            });
    };

    return (
        <section id="contact" className="min-h-screen py-20 relative bg-black overflow-hidden flex items-center">

            {/* 1. Diagonal Falling White Shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            y: -100,
                            x: Math.random() * 100 + "%",
                            opacity: 0
                        }}
                        animate={{
                            y: '120vh',
                            x: `calc(${Math.random() * 100}% + 200px)`, // Move right/diagonal
                            opacity: [0, 0.3, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: Math.random() * 5
                        }}
                        className="absolute bg-white/10 rounded-[30%] backdrop-blur-sm"
                        style={{
                            width: Math.random() * 100 + 50 + "px",
                            height: Math.random() * 100 + 50 + "px",
                            left: Math.random() * 100 + "%"
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-12 md:px-20 lg:px-32 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-16 text-center text-white"
                >
                    Get in <span className="text-[#00AEEF]">Touch</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* LEFT: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h3 className="text-3xl font-bold text-white">Let's build something <br /> <span className="text-[#00AEEF]">amazing together.</span></h3>
                        <p className="text-gray-400 leading-relaxed">
                            I'm currently available for freelance work and internships.
                            If you have a project that needs some creative touch,
                            feel free to ping me!
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4 text-gray-300 hover:text-[#00AEEF] transition-colors">
                                <div className="p-3 bg-[#111] rounded-full border border-gray-800">
                                    <Mail size={20} />
                                </div>
                                <span>jay.patel.a.cg@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-4 text-gray-300 hover:text-[#00AEEF] transition-colors">
                                <div className="p-3 bg-[#111] rounded-full border border-gray-800">
                                    <Phone size={20} />
                                </div>
                                <span>+91 81405 04496</span>
                            </div>
                            <div className="flex items-center space-x-4 text-gray-300 hover:text-[#00AEEF] transition-colors">
                                <div className="p-3 bg-[#111] rounded-full border border-gray-800">
                                    <MapPin size={20} />
                                </div>
                                <span>Gujarat, India</span>
                            </div>
                        </div>

                        <div className="pt-8 flex flex-wrap gap-4">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, color: link.color }}
                                    className={`p-3 bg-[#111] rounded-lg border border-gray-800 text-gray-400 transition-colors flex items-center gap-2 ${link.name === 'Resume' ? 'pr-4' : ''}`}
                                    title={link.name}
                                >
                                    <link.icon size={24} />
                                    {link.name === 'Resume' && <span className="text-sm font-bold uppercase tracking-wider">Resume</span>}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT: Animated Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#111]/80 backdrop-blur-md p-8 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden group"
                    >
                        {/* Form Glow Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00AEEF]/10 rounded-full blur-3xl -z-10 transition-all duration-500 group-hover:bg-[#00AEEF]/20" />

                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Your Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    required
                                    placeholder="John Doe"
                                    className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    placeholder="john@example.com"
                                    className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    placeholder="Tell me about your project..."
                                    className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all resize-none"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                                    submitStatus === 'success' 
                                    ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                                    : submitStatus === 'error'
                                    ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                                    : 'bg-[#00AEEF] text-black shadow-[0_0_20px_rgba(0,174,239,0.4)] hover:shadow-[0_0_30px_rgba(0,174,239,0.6)]'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        Sending...
                                        <Loader2 size={18} className="animate-spin" />
                                    </>
                                ) : submitStatus === 'success' ? (
                                    <>
                                        Message Sent!
                                        <CheckCircle2 size={18} />
                                    </>
                                ) : submitStatus === 'error' ? (
                                    <>
                                        Failed to Send
                                        <AlertCircle size={18} />
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;

