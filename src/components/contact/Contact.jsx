import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ContactSvg from "./ContactSvg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80 },
  },
};

const svgVariants = {
  hidden: { rotate: -5, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50, delay: 0.5 },
  },
};

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef();
  const form = useRef();
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setSuccess(true);
          setError(false);
          form.current.reset(); // Optional: clear form after submit
        },
        (error) => {
          console.error(error);
          setError(true);
          setSuccess(false);
        }
      );
  };

  return (
    <div
      ref={ref}
      className="min-h-screen flex flex-col md:flex-row-reverse items-center justify-center bg-[rgb(255,192,203)] px-6 py-16 gap-10"
    >
      {/* Right-side SVG */}
      <motion.div
        variants={svgVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full md:w-1/2 flex justify-center"
      >
        <ContactSvg />
      </motion.div>

      {/* Left-side Form */}
      <motion.form
        ref={form}
        onSubmit={sendEmail} 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full md:w-[480px] bg-white border border-gray-200 shadow-xl rounded-2xl px-8 py-10 space-y-6"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold text-gray-800 text-center"
        >
          Let's keep in touch
        </motion.h1>

        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="user_username"
            required
            placeholder="John Doe"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="user_email"
            required
            placeholder="john@gmail.com"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Message</label>
          <textarea
            rows={6}
            name="user_message"
            required
            placeholder="Write your message..."
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          ></textarea>
        </motion.div>

        <motion.button
          variants={itemVariants}
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Send
        </motion.button>

        <div className="text-center">
          {success && (
            <span className="text-green-600 font-medium">
              Your message has been sent!
            </span>
          )}
          {error && (
            <span className="text-red-600 font-medium">
              Something went wrong!
            </span>
          )}
        </div>
      </motion.form>
    </div>
  );
};

export default Contact;
