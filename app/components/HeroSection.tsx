"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Link as ScrollLink } from "react-scroll"

const HeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -150])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 to-peach-200">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Medical illustration"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </motion.div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-pink-600 mb-6">Empowering Maternal Health with AI</h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Revolutionizing care for mothers and babies through advanced technology
          </p>
          <ScrollLink to="pregnancy-tracker" smooth={true} duration={500}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition duration-300"
            >
              Get Started
            </motion.button>
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection

