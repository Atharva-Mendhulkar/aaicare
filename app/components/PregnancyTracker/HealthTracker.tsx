"use client"

import { useState, useEffect } from "react"
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type HealthData = {
  date: string
  weight: number
  systolic: number
  diastolic: number
  kicks: number
}

const HealthTracker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [healthData, setHealthData] = useState<HealthData[]>([])
  const [newEntry, setNewEntry] = useState<HealthData>({
    date: new Date().toISOString().split('T')[0],
    weight: 0,
    systolic: 0,
    diastolic: 0,
    kicks: 0,
  })

  useEffect(() => {
    const savedData = localStorage.getItem('healthData')
    if (savedData) {
      setHealthData(JSON.parse(savedData))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedData = [...healthData, newEntry].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    setHealthData(updatedData)
    localStorage.setItem('healthData', JSON.stringify(updatedData))
    setIsModalOpen(false)
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      weight: 0,
      systolic: 0,
      diastolic: 0,
      kicks: 0,
    })
  }

  const weightChartData = {
    labels: healthData.map(d => d.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: healthData.map(d => d.weight),
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.5)',
      },
    ],
  }

  const bpChartData = {
    labels: healthData.map(d => d.date),
    datasets: [
      {
        label: 'Systolic',
        data: healthData.map(d => d.systolic),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
      {
        label: 'Diastolic',
        data: healthData.map(d => d.diastolic),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-800">
          Track Your Health Metrics
        </h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors"
        >
          Add Entry
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Weight Card */}
        <div className="bg-pink-50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-pink-600 mb-2">Weight</h4>
          <p className="text-3xl font-bold text-gray-800">
            {healthData.length > 0 ? `${healthData[healthData.length - 1].weight} kg` : "No data"}
          </p>
          {healthData.length > 1 && (
            <p className="text-sm text-gray-600">
              {`${(healthData[healthData.length - 1].weight - healthData[healthData.length - 2].weight).toFixed(1)} kg change`}
            </p>
          )}
        </div>

        {/* Blood Pressure Card */}
        <div className="bg-red-50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-red-600 mb-2">Blood Pressure</h4>
          <p className="text-3xl font-bold text-gray-800">
            {healthData.length > 0 
              ? `${healthData[healthData.length - 1].systolic}/${healthData[healthData.length - 1].diastolic}`
              : "No data"
            }
          </p>
          <p className="text-sm text-gray-600">Last reading</p>
        </div>

        {/* Kick Counter Card */}
        <div className="bg-blue-50 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-blue-600 mb-2">Kicks Today</h4>
          <p className="text-3xl font-bold text-gray-800">
            {healthData.length > 0 ? healthData[healthData.length - 1].kicks : "0"}
          </p>
          <button
            onClick={() => {
              if (healthData.length > 0) {
                const updatedData = [...healthData]
                updatedData[updatedData.length - 1].kicks += 1
                setHealthData(updatedData)
                localStorage.setItem('healthData', JSON.stringify(updatedData))
              }
            }}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors"
          >
            Record Kick
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Weight Trend</h4>
          <div className="h-64">
            <Line data={weightChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Blood Pressure Trend</h4>
          <div className="h-64">
            <Line data={bpChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Add Entry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white p-6 rounded-xl w-full max-w-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Health Entry</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newEntry.weight || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, weight: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Systolic</label>
                    <input
                      type="number"
                      value={newEntry.systolic || ''}
                      onChange={(e) => setNewEntry({ ...newEntry, systolic: parseInt(e.target.value) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Diastolic</label>
                    <input
                      type="number"
                      value={newEntry.diastolic || ''}
                      onChange={(e) => setNewEntry({ ...newEntry, diastolic: parseInt(e.target.value) })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kicks</label>
                  <input
                    type="number"
                    value={newEntry.kicks || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, kicks: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HealthTracker 