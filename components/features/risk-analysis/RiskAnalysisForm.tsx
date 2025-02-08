import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

interface FormData {
  bloodGlucose: number
  systolicBP: number
  diastolicBP: number
  age: number
  heartRate: number
}

interface PredictionResult {
  risk_level: string
  probability: number
  timestamp: string
}

const COLORS = ['#00C49F', '#FFBB28', '#FF8042']

export default function RiskAnalysisForm() {
  const [formData, setFormData] = useState<FormData>({
    bloodGlucose: 0,
    systolicBP: 0,
    diastolicBP: 0,
    age: 0,
    heartRate: 0
  })

  const [predictionHistory, setPredictionHistory] = useState<PredictionResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPrediction, setCurrentPrediction] = useState<PredictionResult | null>(null)

  useEffect(() => {
    fetchPredictionHistory()
    // Fetch history every 5 seconds
    const interval = setInterval(fetchPredictionHistory, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchPredictionHistory = async () => {
    try {
      console.log('Fetching prediction history...')
      const response = await fetch('http://127.0.0.1:8001/history')
      const data = await response.json()
      console.log('Prediction history data:', data)
      setPredictionHistory(data.predictions || [])
    } catch (err) {
      console.error('Error fetching history:', err)
      setError('Failed to fetch prediction history')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      console.log('Submitting prediction request with data:', formData)
      const response = await fetch('http://127.0.0.1:8001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Prediction request failed')
      }

      const result = await response.json()
      console.log('Prediction result:', result)
      setCurrentPrediction(result)
      
      // Update prediction history immediately
      setPredictionHistory(prev => [...prev, result])
      
      // Then fetch the complete history from the server
      await fetchPredictionHistory()
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to get prediction')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }))
  }

  const getChartData = () => {
    console.log('Getting chart data from:', predictionHistory)
    if (!predictionHistory?.length) return []
    
    return predictionHistory
      .slice(-10) // Show only last 10 predictions
      .map(pred => ({
        timestamp: new Date(pred.timestamp).toLocaleTimeString(),
        probability: Math.round(pred.probability * 100),
        risk_level: pred.risk_level,
      }))
  }

  const getRiskDistribution = () => {
    console.log('Getting risk distribution from:', predictionHistory)
    if (!predictionHistory?.length) return []

    const distribution = predictionHistory.reduce((acc: { [key: string]: number }, curr) => {
      acc[curr.risk_level] = (acc[curr.risk_level] || 0) + 1
      return acc
    }, {})

    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
    }))
  }

  const chartData = getChartData()
  const distributionData = getRiskDistribution()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Glucose</label>
            <input
              type="number"
              name="bloodGlucose"
              value={formData.bloodGlucose}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Systolic BP</label>
            <input
              type="number"
              name="systolicBP"
              value={formData.systolicBP}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Diastolic BP</label>
            <input
              type="number"
              name="diastolicBP"
              value={formData.diastolicBP}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Heart Rate</label>
            <input
              type="number"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {loading ? 'Analyzing...' : 'Analyze Risk'}
        </motion.button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {currentPrediction && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Current Prediction</h3>
          <p>Risk Level: {currentPrediction.risk_level}</p>
          <p>Probability: {(currentPrediction.probability * 100).toFixed(2)}%</p>
        </div>
      )}

      {predictionHistory.length > 0 && (
        <div className="space-y-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Risk Analysis History</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="probability" 
                    stroke="#8884d8" 
                    name="Risk Probability %" 
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    isAnimationActive={true}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 