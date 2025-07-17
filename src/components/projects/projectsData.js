// src/components/Project/projectsData.js
// import tomatoImg from '../../assets/projects/tomato.png';
// import weatherImg from '../../assets/projects/weatherAPP.png';

const projects = [
  {
    title: "Tomato - Food Delivery App",
    description: "A React-based food delivery platform with real-time order tracking and Stripe payments.",
    techStack: "React, Context API, Tailwind, Stripe",
    projectLink: "https://tomato-app.vercel.app",
    image: "weatherAPP.png",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather forecast app using OpenWeatherMap API with animated UI.",
    techStack: "React, Vite, Tailwind, Framer Motion",
    projectLink: "https://weather-app-two-beta-49.vercel.app/",
    image: "weatherAPP.png",
  },
  {
  title: "LlmVerse ",
  description: "An intelligent chatbot platform powered by LangChain, supporting multiple AI providers like Mistral, Groq and Gemini via dynamic API switching.",
  techStack: "React, Node.js, LangChain, Vercel, Mistral API, Groq API, OpenRouter API",
  projectLink: "https://llm-verse.vercel.app/",
  image: "LlmVerse.png",
},

];

export default projects;
