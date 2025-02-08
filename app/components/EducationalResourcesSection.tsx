"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Prenatal Care Basics: A Guide for Expecting Moms",
    category: "Prenatal",
    content: `
      Prenatal care is crucial for ensuring a healthy pregnancy and preparing for the arrival of your baby. Here's a guide to essential practices every expecting mom should follow.

      Key Practices:
      1. Regular Checkups: Schedule visits with your healthcare provider to monitor your baby's growth and your health.
      2. Balanced Nutrition: Focus on a diet rich in fruits, vegetables, lean proteins, and prenatal vitamins, especially folic acid.
      3. Stay Active: Engage in light exercises like prenatal yoga or walking, as approved by your doctor.
      4. Avoid Harmful Substances: Steer clear of alcohol, smoking, and excessive caffeine.
      5. Manage Stress: Practice relaxation techniques like deep breathing and meditation.

      Prioritize your health to ensure a smooth journey to motherhood. Remember, every step you take is a step toward a healthy baby!
    `,
  },
  {
    id: 2,
    title: "Postnatal Recovery Tips: Healing After Childbirth",
    category: "Postnatal",
    content: `
      The postnatal period is a time for healing and bonding with your newborn. Here are effective tips to support your recovery.

      Tips for Recovery:
      1. Rest and Relax: Sleep when your baby sleeps to recharge your energy.
      2. Balanced Diet: Include nutrient-rich foods to promote healing and support breastfeeding.
      3. Hydration: Drink plenty of water, especially if you're breastfeeding.
      4. Gentle Movement: Start with light activities to improve circulation and regain strength.
      5. Seek Help: Don't hesitate to ask for support from family, friends, or healthcare providers.

      Give yourself grace during this phase. With time and proper care, your body will heal, and you'll find your rhythm as a new mom.
    `,
  },
  {
    id: 3,
    title: "Breastfeeding 101: Your Guide to Success",
    category: "Breastfeeding",
    content: `
      Breastfeeding can feel overwhelming at first, but with the right approach, it can become a rewarding experience for both you and your baby.

      Breastfeeding Basics:
      1. Latch Techniques: Ensure your baby has a deep latch to avoid discomfort.
      2. Feeding Schedule: Feed your baby on demand, typically every 2–3 hours.
      3. Hydration and Nutrition: Stay hydrated and eat a balanced diet to maintain milk supply.
      4. Seek Support: Consult a lactation specialist for guidance if you face challenges.
      5. Comfort and Care: Use lanolin cream for sore nipples and invest in a comfortable feeding pillow.

      Breastfeeding is a journey, and every mother's experience is unique. Patience and persistence are key to building a successful routine.
    `,
  },
  {
    id: 4,
    title: "Vaccination Schedule: Protecting Your Child's Health",
    category: "Vaccination",
    content: `
      Vaccinations are essential for safeguarding your child's health against preventable diseases. Staying on schedule is crucial.

      General Vaccination Guidelines:
      1. Birth Vaccines: BCG, OPV, and Hepatitis B.
      2. 6–8 Weeks: Pentavalent vaccine, Polio, and Rotavirus.
      3. 9–12 Months: Measles and Vitamin A supplementation.
      4. Routine Checkups: Always check with your pediatrician for country-specific schedules and updates.

      Vaccines are vital for your child's immunity and overall well-being. Keep a vaccination calendar to stay organized and consult your pediatrician for any questions.
    `,
  },
  {
    id: 5,
    title: "Nutrition for New Moms: Postpartum Health Made Easy",
    category: "Nutrition",
    content: `
      Proper nutrition is essential for new moms to recover, support breastfeeding, and maintain energy levels.

      Nutrition Tips:
      1. Protein-Rich Foods: Include eggs, fish, lean meats, and legumes for muscle repair and energy.
      2. Calcium and Iron: Consume dairy products, leafy greens, and fortified cereals to replenish lost nutrients.
      3. Hydration: Drink at least 8–10 glasses of water daily.
      4. Healthy Snacks: Opt for nuts, seeds, and fruits for quick energy boosts.
      5. Avoid Empty Calories: Reduce intake of sugary or processed foods.

      Postpartum nutrition isn't just about recovery—it's about thriving in your new role. Nourish your body so you can care for your baby with vigor and joy.
    `,
  },
]

export default function EducationalResourcesSection() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(
    post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/"
            className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Home
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
            >
              <div className="p-6">
                <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                  {post.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <motion.div
                  initial={false}
                  animate={{ height: selectedPost === post.id ? "auto" : "100px" }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 whitespace-pre-line">{post.content}</p>
                </motion.div>
                <button
                  className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPost(selectedPost === post.id ? null : post.id)
                  }}
                >
                  {selectedPost === post.id ? "Read Less" : "Read More"}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600">No articles found matching your search.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

