"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("riskAnalysis")

  const riskData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Risk Level",
        data: [2, 1, 3, 2, 1, 2],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  const savedArticles = [
    { id: 1, title: "Understanding Prenatal Nutrition", category: "Nutrition" },
    { id: 2, title: "Preparing for Childbirth", category: "Prenatal" },
    { id: 3, title: "Postpartum Recovery Tips", category: "Postnatal" },
  ]

  const upcomingEvents = [
    { id: 1, title: "Prenatal Yoga Class", date: "2025-01-15" },
    { id: 2, title: "Childbirth Preparation Workshop", date: "2024-12-29" },
    { id: 3, title: "Breastfeeding Support Group", date: "2024-12-22" },
  ]

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">User Dashboard</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 focus:outline-none ${activeTab === "riskAnalysis" ? "bg-pink-100 text-pink-600" : "hover:bg-gray-100"}`}
              onClick={() => setActiveTab("riskAnalysis")}
            >
              Risk Analysis History
            </button>
            <button
              className={`flex-1 py-4 px-6 focus:outline-none ${activeTab === "savedArticles" ? "bg-pink-100 text-pink-600" : "hover:bg-gray-100"}`}
              onClick={() => setActiveTab("savedArticles")}
            >
              Saved Articles
            </button>
            <button
              className={`flex-1 py-4 px-6 focus:outline-none ${activeTab === "eventCalendar" ? "bg-pink-100 text-pink-600" : "hover:bg-gray-100"}`}
              onClick={() => setActiveTab("eventCalendar")}
            >
              Event Calendar
            </button>
          </div>
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "riskAnalysis" && (
                <motion.div
                  key="riskAnalysis"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4">Risk Analysis History</h3>
                  <div className="w-full h-64">
                    <Line data={riskData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </motion.div>
              )}
              {activeTab === "savedArticles" && (
                <motion.div
                  key="savedArticles"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4">Saved Articles</h3>
                  <ul className="space-y-2">
                    {savedArticles.map((article) => (
                      <li key={article.id} className="flex justify-between items-center">
                        <span>{article.title}</span>
                        <span className="text-sm text-gray-500">{article.category}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              {activeTab === "eventCalendar" && (
                <motion.div
                  key="eventCalendar"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
                  <ul className="space-y-2">
                    {upcomingEvents.map((event) => (
                      <li key={event.id} className="flex justify-between items-center">
                        <span>{event.title}</span>
                        <span className="text-sm text-gray-500">{event.date}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserDashboard

