"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    slug: "prenatal-care",
    title: "Prenatal Care Basics: A Guide for Expecting Moms",
    category: "Prenatal",
    excerpt: "A comprehensive guide to essential practices every expecting mom should follow for a healthy pregnancy journey.",
    author: "Dr. Sarah Johnson",
    date: "January 20, 2024",
    readTime: "8 min read",
  },
  {
    id: 2,
    slug: "postnatal-recovery",
    title: "Postnatal Recovery Tips: Healing After Childbirth",
    category: "Postnatal",
    excerpt: "Expert advice on physical recovery, emotional well-being, and adapting to life with your newborn.",
    author: "Dr. Emily Chen",
    date: "January 20, 2024",
    readTime: "10 min read",
  },
  // Add more blog post previews...
]

export default function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(
    post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <Link 
                href="/"
                className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors mb-4"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Home
              </Link>
              <h1 className="text-4xl font-bold text-gray-900">Educational Resources</h1>
              <p className="mt-2 text-gray-600">Expert insights and guidance for your maternal journey</p>
            </div>
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
            className="space-y-8"
          >
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.author}</span>
                      <span className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center">
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
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
      </div>
    </div>
  )
} 