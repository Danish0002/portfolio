// App.js
import { lazy, Suspense } from "react";
import CertificateSection from "./components/Certificate/CertificateSection";
import StatsSection from "./components/statsSection/StatsSection";
import ProjectSection from "./components/projects/ProjectSection";
import EducationSection from "./components/education/EducationSection";
import Contact from "./components/contact/Contact";
import Hero from "./components/hero/Hero";

const App = () => {
  return (
    <div >
      <div >
        <Hero />
        <StatsSection />
        <CertificateSection />
        <ProjectSection />
        <EducationSection />
        <Contact />
      </div>
    </div>
  );
};

export default App;
