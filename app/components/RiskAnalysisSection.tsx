"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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

const RiskAnalysisSection = () => {
  const [formData, setFormData] = useState({
    bloodGlucose: "",
    systolicBP: "",
    diastolicBP: "",
    age: "",
    heartRate: "",
  })

  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high" | null>(null)
  const [pastPredictions, setPastPredictions] = useState<Array<{ date: string; risk: string }>>([])
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Risk Level",
        data: [] as number[],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  })

  useEffect(() => {
    // Load past predictions from localStorage on component mount
    const savedPredictions = localStorage.getItem('riskPredictions')
    if (savedPredictions) {
      const predictions = JSON.parse(savedPredictions)
      setPastPredictions(predictions)
      updateChartData(predictions)
    }
  }, [])

  const calculateRiskScore = (values: typeof formData) => {
    const { bloodGlucose, systolicBP, diastolicBP, age, heartRate } = values
    let score = 0

    // Blood glucose risk (normal range: 70-140 mg/dL)
    const bgValue = Number(bloodGlucose)
    if (bgValue > 200) score += 3
    else if (bgValue > 140) score += 2
    else if (bgValue < 70) score += 2
    else score += 1

    // Blood pressure risk (normal: 120/80)
    const sysValue = Number(systolicBP)
    const diaValue = Number(diastolicBP)
    if (sysValue > 140 || diaValue > 90) score += 3
    else if (sysValue > 120 || diaValue > 80) score += 2
    else score += 1

    // Age risk
    const ageValue = Number(age)
    if (ageValue > 60) score += 3
    else if (ageValue > 40) score += 2
    else score += 1

    // Heart rate risk (normal: 60-100 bpm)
    const hrValue = Number(heartRate)
    if (hrValue > 100 || hrValue < 60) score += 2
    else score += 1

    return score
  }

  const updateChartData = (predictions: Array<{ date: string; risk: string }>) => {
    const last6Predictions = predictions.slice(-6)
    setChartData({
      labels: last6Predictions.map(p => new Date(p.date).toLocaleDateString()),
      datasets: [{
        label: "Risk Level",
        data: last6Predictions.map(p => 
          p.risk === 'high' ? 3 : p.risk === 'medium' ? 2 : 1
        ),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      }],
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const riskScore = calculateRiskScore(formData)
    const newRiskLevel = riskScore > 8 ? "high" : riskScore > 6 ? "medium" : "low"
    setRiskLevel(newRiskLevel)

    const newPrediction = {
      date: new Date().toISOString(),
      risk: newRiskLevel
    }

    const updatedPredictions = [...pastPredictions, newPrediction]
    setPastPredictions(updatedPredictions)
    updateChartData(updatedPredictions)
    
    // Save to localStorage
    localStorage.setItem('riskPredictions', JSON.stringify(updatedPredictions))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Risk Analysis</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="bloodGlucose" className="block text-sm font-medium text-gray-700">
                  Blood Glucose (mg/dL)
                </label>
                <input
                  type="number"
                  id="bloodGlucose"
                  name="bloodGlucose"
                  value={formData.bloodGlucose}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="systolicBP" className="block text-sm font-medium text-gray-700">
                  Systolic Blood Pressure (mmHg)
                </label>
                <input
                  type="number"
                  id="systolicBP"
                  name="systolicBP"
                  value={formData.systolicBP}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="diastolicBP" className="block text-sm font-medium text-gray-700">
                  Diastolic Blood Pressure (mmHg)
                </label>
                <input
                  type="number"
                  id="diastolicBP"
                  name="diastolicBP"
                  value={formData.diastolicBP}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="heartRate" className="block text-sm font-medium text-gray-700">
                  Heart Rate (bpm)
                </label>
                <input
                  type="number"
                  id="heartRate"
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300"
              >
                Analyze Risk
              </button>
            </form>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Risk Level</h3>
              {riskLevel && (
                <div
                  className={`text-2xl font-bold mb-4 ${
                    riskLevel === "low" ? "text-green-500" : riskLevel === "medium" ? "text-yellow-500" : "text-red-500"
                  }`}
                >
                  {riskLevel.toUpperCase()}
                </div>
              )}
              <div className="mb-4">
                <Line data={chartData} />
              </div>
              <h4 className="text-lg font-semibold mb-2">Past Predictions</h4>
              <ul className="space-y-2">
                {pastPredictions.slice(-3).reverse().map((prediction, index) => (
                  <li key={index}>
                    {new Date(prediction.date).toLocaleDateString()} - {prediction.risk.charAt(0).toUpperCase() + prediction.risk.slice(1)} Risk
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default RiskAnalysisSection

