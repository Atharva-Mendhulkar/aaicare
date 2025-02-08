"use client"

import { motion } from "framer-motion"
import { Element } from "react-scroll"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HeroSection from "./components/HeroSection"
import RiskAnalysisSection from "./components/RiskAnalysisSection"
import EducationalResourcesSection from "./components/EducationalResourcesSection"
import SOSFeature from "./components/SOSFeature"
import UserDashboard from "./components/UserDashboard"
import PregnancyTracker from "./components/PregnancyTracker/PregnancyTracker"
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-peach-100 text-gray-800">
      <Header />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Element name="hero">
          <HeroSection />
        </Element>
        <Element name="pregnancy-tracker">
          <PregnancyTracker />
        </Element>
        <Element name="risk-analysis">
          <RiskAnalysisSection />
        </Element>
        <Element name="educational-resources">
          <EducationalResourcesSection />
        </Element>
        <Element name="user-dashboard">
          <UserDashboard />
        </Element>
      </motion.main>
      <SOSFeature />
      <Footer />
    </div>
  )
}

