import React from 'react'
import ProjectSection from './components/projects/ProjectSection';
import EducationSection from './components/education/EducationSection';
import Contact from './components/contact/Contact';
import CertificateSection from './components/Certificate/CertificateSection';
import StatsSection from './components/statsSection/StatsSection';
import Hero from './components/hero/Hero';

const App = () => {
  return (
    <div>
      <Hero/>
      <StatsSection/>
      <ProjectSection/>
      <CertificateSection/>
      <EducationSection/>
      <Contact/>
    </div>
  )
}

export default App
