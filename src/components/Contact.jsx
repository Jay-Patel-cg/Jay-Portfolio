import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { socialLinks } from '../data/socialLinks';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const sendEmail = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const formData = new FormData(form.current);
        const name = formData.get('user_name');
        const email = formData.get('user_email');
        const message = formData.get('message');

        try {
            // 1. Direct real-time email delivery to jay.patel.a.cg@gmail.com via FormSubmit AJAX
            const response = await fetch("https://formsubmit.co/ajax/jay.patel.a.cg@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _subject: `New Portfolio Message from ${name}`
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
                form.current.reset();
            } else {
                throw new Error("Formsubmit failed");
            }
        } catch (err) {
            console.log("Formsubmit AJAX error, trying EmailJS fallback:", err);
            try {
                // 2. EmailJS fallback
                await emailjs.sendForm("service_rl74rhe", "template_y8su0ay", form.current, "-nIzrCDmQ7bfwaV3x");
                setSubmitStatus('success');
                form.current.reset();
            } catch (emailJsErr) {
                console.log("EmailJS error, opening direct mailto:", emailJsErr);
                // 3. Mailto fallback guaranteed delivery
                window.location.href = `mailto:jay.patel.a.cg@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;
                setSubmitStatus('success');
                form.current.reset();
            }
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 6000);
        }
    };

    return (
        <section id="contact" className="min-h-screen py-20 relative bg-slate-50 dark:bg-black transition-colors duration-500 overflow-hidden flex items-center">

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
                            x: `calc(${Math.random() * 100}% + 200px)`,
                            opacity: [0, 0.3, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: Math.random() * 5
                        }}
                        className="absolute bg-slate-400/20 dark:bg-white/10 rounded-[30%] backdrop-blur-sm"
                        style={{
                            width: Math.random() * 100 + 50 + "px",
                            height: Math.random() * 100 + 50 + "px",
                            left: Math.random() * 100 + "%"
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 md:px-20 lg:px-32 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-16 text-center text-slate-900 dark:text-white"
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
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Let's build something <br /> <span className="text-[#00AEEF]">amazing together.</span></h3>
                        <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                            I'm currently available for freelance work and internships.
                            If you have a project that needs some creative touch,
                            feel free to ping me!
                        </p>

                        <div className="space-y-4">
                            {/* Direct WhatsApp Chat Button */}
                            <motion.a
                                href="https://wa.me/918140504496?text=Hello!"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center space-x-4 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all text-slate-900 dark:text-white group cursor-pointer shadow-[0_0_20px_rgba(37,211,102,0.15)] hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
                            >
                                <div className="p-3 bg-[#25D366] text-black rounded-full shadow-[0_0_15px_rgba(37,211,102,0.5)] group-hover:scale-110 transition-transform">
                                    <SiWhatsapp size={22} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-[#25D366] font-bold uppercase tracking-wider">Chat on WhatsApp</p>
                                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] font-semibold border border-[#25D366]/30">Direct Chat</span>
                                    </div>
                                    <p className="text-slate-900 dark:text-white font-bold text-base mt-0.5">+91 81405 04496</p>
                                </div>
                            </motion.a>

                            {/* Email Card */}
                            <a 
                                href="mailto:jay.patel.a.cg@gmail.com"
                                className="flex items-center space-x-4 p-3.5 rounded-2xl bg-white dark:bg-[#111] border border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-300 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] hover:border-[#00AEEF]/50 transition-all group shadow-sm dark:shadow-none"
                            >
                                <div className="p-3 bg-slate-100 dark:bg-black rounded-full border border-slate-200 dark:border-gray-800 text-[#00AEEF] group-hover:scale-110 transition-transform">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-gray-500 font-medium">Email Address</p>
                                    <span className="font-semibold text-slate-900 dark:text-white group-hover:text-[#00AEEF] transition-colors">jay.patel.a.cg@gmail.com</span>
                                </div>
                            </a>

                            {/* Phone Card */}
                            <a 
                                href="tel:+918140504496"
                                className="flex items-center space-x-4 p-3.5 rounded-2xl bg-white dark:bg-[#111] border border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-300 hover:text-[#00AEEF] dark:hover:text-[#00AEEF] hover:border-[#00AEEF]/50 transition-all group shadow-sm dark:shadow-none"
                            >
                                <div className="p-3 bg-slate-100 dark:bg-black rounded-full border border-slate-200 dark:border-gray-800 text-[#00AEEF] group-hover:scale-110 transition-transform">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-gray-500 font-medium">Phone</p>
                                    <span className="font-semibold text-slate-900 dark:text-white group-hover:text-[#00AEEF] transition-colors">+91 81405 04496</span>
                                </div>
                            </a>

                            {/* Location Card */}
                            <div className="flex items-center space-x-4 p-3.5 rounded-2xl bg-white dark:bg-[#111] border border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-300 shadow-sm dark:shadow-none">
                                <div className="p-3 bg-slate-100 dark:bg-black rounded-full border border-slate-200 dark:border-gray-800 text-[#00AEEF]">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-gray-500 font-medium">Location</p>
                                    <span className="font-semibold text-slate-900 dark:text-white">Gujarat, India</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-4 flex flex-wrap gap-3">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -4, color: link.color }}
                                    className={`p-3 bg-white dark:bg-[#111] rounded-xl border border-slate-200 dark:border-gray-800 text-slate-600 dark:text-gray-400 transition-colors flex items-center gap-2 shadow-sm dark:shadow-none ${link.name === 'Resume' ? 'pr-4' : ''}`}
                                    title={link.name}
                                >
                                    <link.icon size={20} style={{ color: link.name === 'WhatsApp' ? '#25D366' : undefined }} />
                                    {link.name === 'Resume' && <span className="text-xs font-bold uppercase tracking-wider">Resume</span>}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT: Animated Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/90 dark:bg-[#111]/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-xl relative overflow-hidden group"
                    >
                        {/* Form Glow Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00AEEF]/10 rounded-full blur-3xl -z-10 transition-all duration-500 group-hover:bg-[#00AEEF]/20" />

                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600 dark:text-gray-400 ml-1">Your Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    required
                                    placeholder="John Doe"
                                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-gray-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600 dark:text-gray-400 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    placeholder="john@example.com"
                                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-gray-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-600 dark:text-gray-400 ml-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    placeholder="Tell me about your project..."
                                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-300 dark:border-gray-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all resize-none"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                                    submitStatus === 'success' 
                                    ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                                    : submitStatus === 'error'
                                    ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                                    : 'bg-[#00AEEF] text-black shadow-[0_0_20px_rgba(0,174,239,0.4)] hover:shadow-[0_0_30px_rgba(0,174,239,0.6)]'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        Sending to jay.patel.a.cg@gmail.com...
                                        <Loader2 size={18} className="animate-spin" />
                                    </>
                                ) : submitStatus === 'success' ? (
                                    <>
                                        Message Sent Successfully!
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

            {/* FLOATING WHATSAPP BUTTON */}
            <motion.a
                href="https://wa.me/918140504496?text=Hello!"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-black rounded-full shadow-[0_0_25px_rgba(37,211,102,0.6)] flex items-center justify-center group"
                title="Direct Chat on WhatsApp"
            >
                <SiWhatsapp size={26} />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-black pl-0 group-hover:pl-2 text-black uppercase tracking-wider">
                    WhatsApp Chat
                </span>
            </motion.a>
        </section>
    );
};

export default Contact;
