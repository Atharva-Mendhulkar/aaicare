"use client"

import { useState, useEffect } from "react"
import { Link } from "react-scroll"
import { motion } from "framer-motion"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="hero" smooth={true} duration={500} className="text-2xl font-bold text-pink-600 cursor-pointer">
          AaiCare
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="risk-analysis" smooth={true} duration={500} className="hover:text-pink-600 cursor-pointer">
              Risk Analysis
            </Link>
          </li>
          <li>
            <Link
              to="educational-resources"
              smooth={true}
              duration={500}
              className="hover:text-pink-600 cursor-pointer"
            >
              Resources
            </Link>
          </li>
          <li>
            <Link to="user-dashboard" smooth={true} duration={500} className="hover:text-pink-600 cursor-pointer">
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  )
}

export default Header

