"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WeeklyUpdates from "./WeeklyUpdates"
import HealthTracker from "./HealthTracker"

const PregnancyTracker = () => {
  const [activeTab, setActiveTab] = useState("weekly")

  return (
    <section className="py-16 bg-white" id="pregnancy-tracker">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">Pregnancy Tracker</h2>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-pink-50 p-1 rounded-full inline-flex">
            <button
              onClick={() => setActiveTab("weekly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "weekly"
                  ? "bg-pink-500 text-white"
                  : "text-pink-600 hover:bg-pink-100"
              }`}
            >
              Weekly Updates
            </button>
            <button
              onClick={() => setActiveTab("health")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "health"
                  ? "bg-pink-500 text-white"
                  : "text-pink-600 hover:bg-pink-100"
              }`}
            >
              Health Tracker
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "weekly" ? <WeeklyUpdates /> : <HealthTracker />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default PregnancyTracker 