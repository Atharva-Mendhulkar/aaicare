"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { ChevronLeft, ChevronRight } from "lucide-react"

type WeekData = {
  size: string
  length: string
  weight: string
  symptoms: string[]
  tips: string[]
}

type WeeklyData = {
  [key: number]: WeekData
}

const weeklyData: WeeklyData = {
  1: {
    size: "poppy seed",
    length: "0.1 cm",
    weight: "< 1 gram",
    symptoms: [
      "Missed period",
      "Fatigue",
      "Mild cramping",
    ],
    tips: [
      "Start taking prenatal vitamins",
      "Avoid alcohol and smoking",
      "Schedule first prenatal visit",
    ],
  },
  2: {
    size: "sesame seed",
    length: "0.2 cm",
    weight: "< 1 gram",
    symptoms: [
      "Light spotting possible",
      "Breast tenderness",
      "Mood changes",
    ],
    tips: [
      "Track your symptoms",
      "Get enough sleep",
      "Stay hydrated",
    ],
  },
  3: {
    size: "lentil",
    length: "0.3 cm",
    weight: "< 1 gram",
    symptoms: [
      "Nausea may begin",
      "Increased urination",
      "Fatigue",
    ],
    tips: [
      "Eat small, frequent meals",
      "Rest when needed",
      "Take folic acid supplements",
    ],
  },
  4: {
    size: "sweet pea",
    length: "0.4 cm",
    weight: "1 gram",
    symptoms: [
      "Morning sickness",
      "Breast tenderness",
      "Frequent urination",
    ],
    tips: [
      "Eat small, frequent meals",
      "Get plenty of rest",
      "Stay hydrated",
    ],
  },
  5: {
    size: "apple seed",
    length: "0.5 cm",
    weight: "2 grams",
    symptoms: [
      "Food aversions",
      "Heightened sense of smell",
      "Emotional changes",
    ],
    tips: [
      "Try ginger for nausea",
      "Avoid trigger smells",
      "Practice relaxation techniques",
    ],
  },
  6: {
    size: "pea",
    length: "0.6 cm",
    weight: "3 grams",
    symptoms: [
      "Morning sickness peaks",
      "Fatigue continues",
      "Mood swings",
    ],
    tips: [
      "Eat protein-rich snacks",
      "Take short walks",
      "Get emotional support",
    ],
  },
  7: {
    size: "blueberry",
    length: "1.3 cm",
    weight: "4 grams",
    symptoms: [
      "Frequent urination",
      "Constipation",
      "Food cravings",
    ],
    tips: [
      "Do Kegel exercises",
      "Eat fiber-rich foods",
      "Stay active",
    ],
  },
  8: {
    size: "raspberry",
    length: "1.6 cm",
    weight: "5 grams",
    symptoms: [
      "Nausea",
      "Food aversions",
      "Heightened sense of smell",
    ],
    tips: [
      "Try ginger tea for nausea",
      "Eat protein-rich snacks",
      "Take short walks",
    ],
  },
  9: {
    size: "grape",
    length: "2.3 cm",
    weight: "7 grams",
    symptoms: [
      "Breast changes",
      "Mild headaches",
      "Digestive issues",
    ],
    tips: [
      "Wear supportive bra",
      "Stay hydrated",
      "Eat regularly",
    ],
  },
  10: {
    size: "kumquat",
    length: "3.1 cm",
    weight: "10 grams",
    symptoms: [
      "Morning sickness may improve",
      "Round ligament pain",
      "Visible veins",
    ],
    tips: [
      "Start pregnancy exercises",
      "Maintain good posture",
      "Get prenatal massage",
    ],
  },
  11: {
    size: "fig",
    length: "4.1 cm",
    weight: "12 grams",
    symptoms: [
      "Energy levels improving",
      "Skin changes",
      "Increased appetite",
    ],
    tips: [
      "Use sunscreen",
      "Eat balanced meals",
      "Start pregnancy yoga",
    ],
  },
  12: {
    size: "lime",
    length: "5.4 cm",
    weight: "14 grams",
    symptoms: [
      "Decreased nausea",
      "Increased energy",
      "Visible bump may appear",
    ],
    tips: [
      "Start pregnancy exercises",
      "Plan maternity wardrobe",
      "Continue prenatal care",
    ],
  },
  13: {
    size: "lemon",
    length: "7.2 cm",
    weight: "23 grams",
    symptoms: [
      "Increased appetite",
      "Nasal congestion",
      "Dental sensitivity",
    ],
    tips: [
      "Eat nutrient-rich foods",
      "Use saline nasal spray",
      "Schedule dental checkup",
    ],
  },
  14: {
    size: "orange",
    length: "8.7 cm",
    weight: "43 grams",
    symptoms: [
      "Round ligament pain",
      "Decreased nausea",
      "Increased energy",
    ],
    tips: [
      "Do gentle stretches",
      "Stay active",
      "Plan maternity leave",
    ],
  },
  15: {
    size: "apple",
    length: "10.1 cm",
    weight: "70 grams",
    symptoms: [
      "Nose bleeds",
      "Heartburn",
      "Dizziness",
    ],
    tips: [
      "Use humidifier",
      "Eat smaller meals",
      "Move slowly when standing",
    ],
  },
  16: {
    size: "avocado",
    length: "11.6 cm",
    weight: "100 grams",
    symptoms: [
      "Round ligament pain",
      "Increased appetite",
      "Constipation",
    ],
    tips: [
      "Do pelvic floor exercises",
      "Eat fiber-rich foods",
      "Stay active safely",
    ],
  },
  17: {
    size: "pomegranate",
    length: "13 cm",
    weight: "140 grams",
    symptoms: [
      "First baby movements",
      "Itchy skin",
      "Increased vaginal discharge",
    ],
    tips: [
      "Moisturize skin",
      "Wear cotton underwear",
      "Note movement patterns",
    ],
  },
  18: {
    size: "sweet potato",
    length: "14.2 cm",
    weight: "190 grams",
    symptoms: [
      "Back pain",
      "Leg cramps",
      "Baby movements",
    ],
    tips: [
      "Practice good posture",
      "Stretch before bed",
      "Stay hydrated",
    ],
  },
  19: {
    size: "mango",
    length: "15.3 cm",
    weight: "240 grams",
    symptoms: [
      "Hip pain",
      "Shortness of breath",
      "Headaches",
    ],
    tips: [
      "Sleep with support pillow",
      "Take deep breaths",
      "Rest when needed",
    ],
  },
  20: {
    size: "banana",
    length: "25.6 cm",
    weight: "300 grams",
    symptoms: [
      "Baby movements",
      "Back pain",
      "Heartburn",
    ],
    tips: [
      "Monitor kick counts",
      "Use pregnancy pillow",
      "Practice good posture",
    ],
  },
  21: {
    size: "carrot",
    length: "26.7 cm",
    weight: "360 grams",
    symptoms: [
      "Braxton Hicks",
      "Stretch marks",
      "Increased appetite",
    ],
    tips: [
      "Moisturize skin",
      "Eat balanced meals",
      "Stay active",
    ],
  },
  22: {
    size: "coconut",
    length: "27.8 cm",
    weight: "430 grams",
    symptoms: [
      "Backache",
      "Leg cramps",
      "Increased vaginal discharge",
    ],
    tips: [
      "Practice pelvic tilts",
      "Stretch regularly",
      "Stay hydrated",
    ],
  },
  23: {
    size: "large mango",
    length: "28.9 cm",
    weight: "500 grams",
    symptoms: [
      "Swollen ankles",
      "Increased hunger",
      "Trouble sleeping",
    ],
    tips: [
      "Elevate feet",
      "Eat protein-rich snacks",
      "Use pregnancy pillow",
    ],
  },
  24: {
    size: "corn",
    length: "30 cm",
    weight: "600 grams",
    symptoms: [
      "Braxton Hicks contractions",
      "Swollen ankles",
      "Leg cramps",
    ],
    tips: [
      "Elevate feet when resting",
      "Stay hydrated",
      "Wear comfortable shoes",
    ],
  },
  25: {
    size: "cauliflower",
    length: "34.6 cm",
    weight: "660 grams",
    symptoms: [
      "Hemorrhoids",
      "Constipation",
      "Back pain",
    ],
    tips: [
      "Do Kegel exercises",
      "Eat fiber-rich foods",
      "Stay active",
    ],
  },
  26: {
    size: "lettuce head",
    length: "35.6 cm",
    weight: "760 grams",
    symptoms: [
      "Trouble sleeping",
      "Frequent urination",
      "Heartburn",
    ],
    tips: [
      "Sleep on left side",
      "Avoid spicy foods",
      "Practice relaxation",
    ],
  },
  27: {
    size: "rutabaga",
    length: "36.6 cm",
    weight: "875 grams",
    symptoms: [
      "Leg cramps",
      "Backache",
      "Fatigue",
    ],
    tips: [
      "Stretch before bed",
      "Use support belt",
      "Rest when needed",
    ],
  },
  28: {
    size: "eggplant",
    length: "37 cm",
    weight: "1 kg",
    symptoms: [
      "Shortness of breath",
      "Lower back pain",
      "Trouble sleeping",
    ],
    tips: [
      "Sleep on left side",
      "Use support belt if needed",
      "Start birth plan",
    ],
  },
  29: {
    size: "butternut squash",
    length: "38.6 cm",
    weight: "1.1 kg",
    symptoms: [
      "Varicose veins",
      "Heartburn",
      "Swelling",
    ],
    tips: [
      "Wear support stockings",
      "Eat small meals",
      "Elevate feet",
    ],
  },
  30: {
    size: "cabbage",
    length: "39.9 cm",
    weight: "1.3 kg",
    symptoms: [
      "Braxton Hicks",
      "Back pain",
      "Trouble sleeping",
    ],
    tips: [
      "Practice breathing exercises",
      "Use support pillow",
      "Stay active",
    ],
  },
  31: {
    size: "coconut",
    length: "41.1 cm",
    weight: "1.5 kg",
    symptoms: [
      "Shortness of breath",
      "Leaky breasts",
      "Insomnia",
    ],
    tips: [
      "Sleep propped up",
      "Wear breast pads",
      "Practice relaxation",
    ],
  },
  32: {
    size: "squash",
    length: "42 cm",
    weight: "1.7 kg",
    symptoms: [
      "Frequent urination",
      "Heartburn",
      "Practice contractions",
    ],
    tips: [
      "Pack hospital bag",
      "Take childbirth classes",
      "Monitor baby movements",
    ],
  },
  33: {
    size: "pineapple",
    length: "43.7 cm",
    weight: "1.9 kg",
    symptoms: [
      "Difficulty breathing",
      "Pelvic pressure",
      "Fatigue",
    ],
    tips: [
      "Practice breathing exercises",
      "Rest frequently",
      "Finish nursery prep",
    ],
  },
  34: {
    size: "cantaloupe",
    length: "45 cm",
    weight: "2.1 kg",
    symptoms: [
      "Swelling",
      "Back pain",
      "Trouble sleeping",
    ],
    tips: [
      "Elevate feet",
      "Use support belt",
      "Sleep with pillows",
    ],
  },
  35: {
    size: "honeydew melon",
    length: "46.2 cm",
    weight: "2.4 kg",
    symptoms: [
      "Frequent urination",
      "Braxton Hicks",
      "Pelvic pressure",
    ],
    tips: [
      "Practice labor positions",
      "Stay near bathroom",
      "Monitor contractions",
    ],
  },
  36: {
    size: "honeydew melon",
    length: "47 cm",
    weight: "2.6 kg",
    symptoms: [
      "Pelvic pressure",
      "Difficulty sleeping",
      "Increased fatigue",
    ],
    tips: [
      "Rest frequently",
      "Prepare for labor",
      "Continue light exercise",
    ],
  },
  37: {
    size: "winter melon",
    length: "48.3 cm",
    weight: "2.9 kg",
    symptoms: [
      "Increased discharge",
      "Pelvic pain",
      "Trouble sleeping",
    ],
    tips: [
      "Watch for labor signs",
      "Pack hospital bag",
      "Rest often",
    ],
  },
  38: {
    size: "swiss chard",
    length: "49.8 cm",
    weight: "3.1 kg",
    symptoms: [
      "Lightning crotch",
      "Nesting urges",
      "Mood swings",
    ],
    tips: [
      "Rest when needed",
      "Stay close to home",
      "Practice breathing",
    ],
  },
  39: {
    size: "watermelon",
    length: "50.7 cm",
    weight: "3.3 kg",
    symptoms: [
      "Strong Braxton Hicks",
      "Difficulty moving",
      "Exhaustion",
    ],
    tips: [
      "Monitor contractions",
      "Rest frequently",
      "Stay hydrated",
    ],
  },
  40: {
    size: "small pumpkin",
    length: "51 cm",
    weight: "3.4 kg",
    symptoms: [
      "Strong Braxton Hicks",
      "Pelvic pressure",
      "Increased discharge",
    ],
    tips: [
      "Watch for labor signs",
      "Rest when needed",
      "Stay close to home",
    ],
  },
}

const WeeklyUpdates = () => {
  const [currentWeek, setCurrentWeek] = useState(20)
  const progress = (currentWeek / 40) * 100

  const handlePrevWeek = () => {
    if (currentWeek > 1) setCurrentWeek(currentWeek - 1)
  }

  const handleNextWeek = () => {
    if (currentWeek < 40) setCurrentWeek(currentWeek + 1)
  }

  const currentData = weeklyData[currentWeek] || {
    size: "loading...",
    length: "N/A",
    weight: "N/A",
    symptoms: [],
    tips: []
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Section */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Week {currentWeek} of your pregnancy!
        </h3>
        <div className="w-32 h-32 mx-auto mb-4">
          <CircularProgressbar
            value={progress}
            text={`${Math.round(progress)}%`}
            styles={buildStyles({
              pathColor: "#EC4899",
              textColor: "#EC4899",
              trailColor: "#FCE7F3",
            })}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={handlePrevWeek}
          disabled={currentWeek <= 1}
          className="p-2 rounded-full bg-pink-100 text-pink-600 disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <span className="text-lg font-medium">Week {currentWeek}</span>
        <button
          onClick={handleNextWeek}
          disabled={currentWeek >= 40}
          className="p-2 rounded-full bg-pink-100 text-pink-600 disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Baby's Growth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-pink-50 p-6 rounded-xl"
        >
          <h4 className="text-lg font-semibold text-pink-600 mb-4">Baby's Growth</h4>
          <div className="space-y-3">
            <p className="text-gray-700">
              Your baby is now the size of a {currentData.size}
            </p>
            <p className="text-gray-700">
              Length: {currentData.length}
            </p>
            <p className="text-gray-700">
              Weight: {currentData.weight}
            </p>
          </div>
        </motion.div>

        {/* Symptoms and Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 p-6 rounded-xl"
        >
          <h4 className="text-lg font-semibold text-blue-600 mb-4">What to Expect</h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-blue-600 mb-2">Common Symptoms</h5>
              <ul className="list-disc list-inside space-y-1">
                {currentData.symptoms.map((symptom: string, index: number) => (
                  <li key={index} className="text-gray-700">{symptom}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-600 mb-2">Health Tips</h5>
              <ul className="list-disc list-inside space-y-1">
                {currentData.tips.map((tip: string, index: number) => (
                  <li key={index} className="text-gray-700">{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WeeklyUpdates 