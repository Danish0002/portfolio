import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const listVariant = {
  initial: { x: 100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.2 },
  },
};

const ContactForm = ({ isInView }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        { publicKey: import.meta.env.VITE_PUBLIC_KEY }
      )
      .then(() => {
        setSuccess(true);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setSuccess(false);
      });
  };

  return (
    <div className="w-full xl:w-1/2 flex items-center justify-center">
      <motion.form
        ref={form}
        onSubmit={sendEmail}
        variants={listVariant}
        animate={isInView ? "animate" : "initial"}
        className="w-full max-w-xl bg-slate-900 p-10 rounded-[50px] flex flex-col gap-5"
      >
        <motion.h1 variants={listVariant} className="text-3xl font-semibold text-center text-white">
          Let's keep in touch
        </motion.h1>

        {/* Name Input */}
        <motion.div variants={listVariant} className="flex flex-col gap-2">
          <label className="text-sm text-white">Name</label>
          <input
            type="text"
            name="user_username"
            placeholder="John Doe"
            className="p-3 rounded-md bg-white/80 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </motion.div>

        {/* Email Input */}
        <motion.div variants={listVariant} className="flex flex-col gap-2">
          <label className="text-sm text-white">Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="john@gmail.com"
            className="p-3 rounded-md bg-white/80 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </motion.div>

        {/* Message */}
        <motion.div variants={listVariant} className="flex flex-col gap-2">
          <label className="text-sm text-white">Message</label>
          <textarea
            rows={10}
            name="user_message"
            placeholder="Write your message..."
            className="p-3 rounded-md bg-white/80 text-gray-900 placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          variants={listVariant}
          className="bg-[#dd4c62] hover:bg-[#c94055] transition-all text-white py-4 rounded-lg cursor-pointer mt-2 font-semibold"
          type="submit"
        >
          Send
        </motion.button>

        {/* Status */}
        {success && <span className="text-green-400 text-sm">Your message has been sent!</span>}
        {error && <span className="text-red-500 text-sm">Something went wrong!</span>}
      </motion.form>
    </div>
  );
};

export default ContactForm;
