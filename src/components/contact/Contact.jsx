import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ContactSvg from "./ContactSvg";

/* ───────── animation variants ───────── */
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
  hidden: { rotate: -5, opacity: 0, scale: 0.9 },
  visible: {
    rotate: 0,
    opacity: 1,
    scale: 1,
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
          form.current.reset();
        },
        (error) => {
          console.error(error);
          setError(true);
          setSuccess(false);
        }
      );
  };

  return (
    <section
      ref={ref}
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center bg-pink-100 px-6 py-16 gap-10"
    >
      {/* Form Column */}
      <motion.form
        ref={form}
        onSubmit={sendEmail}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl p-8 space-y-6"
      >
        <motion.h1
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-bold text-gray-800 text-center"
        >
          Let's keep in touch
        </motion.h1>

        {/* Name */}
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

        {/* Email */}
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

        {/* Message */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Message</label>
          <textarea
            rows={5}
            name="user_message"
            required
            placeholder="Write your message..."
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          />
        </motion.div>

        {/* Submit */}
        <motion.button
          variants={itemVariants}
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Send Message
        </motion.button>

        {/* Feedback */}
        <div className="text-center h-6">
          {success && <p className="text-green-600">Message sent successfully!</p>}
          {error && <p className="text-red-600">Oops, something went wrong.</p>}
        </div>
      </motion.form>

      {/* SVG Column */}
      <motion.div
        variants={svgVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full flex justify-center"
      >
        <ContactSvg className="w-72 h-72 md:w-96 md:h-96" />
      </motion.div>
    </section>
  );
};

export default Contact;
