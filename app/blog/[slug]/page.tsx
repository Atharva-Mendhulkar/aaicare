"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useParams } from "next/navigation"

const blogPosts = {
  "prenatal-care": {
    title: "Prenatal Care Basics: A Guide for Expecting Moms",
    category: "Prenatal",
    author: "Dr. Sarah Johnson",
    date: "January 20, 2024",
    readTime: "8 min read",
    content: `
      Prenatal care is crucial for ensuring a healthy pregnancy and preparing for the arrival of your baby. This comprehensive guide will walk you through essential practices every expecting mom should follow.

      ## Understanding Prenatal Care
      Prenatal care is the healthcare you receive during pregnancy. It involves regular check-ups, screenings, and lifestyle modifications to ensure both mother and baby remain healthy throughout the pregnancy journey.

      ## Key Practices for a Healthy Pregnancy

      ### 1. Regular Checkups
      - Schedule monthly visits during weeks 4-28
      - Bi-weekly visits during weeks 28-36
      - Weekly visits from week 36 until delivery
      - Track baby's growth and development
      - Monitor maternal health indicators

      ### 2. Balanced Nutrition
      #### Essential Nutrients
      - Folic acid (600 mcg daily)
      - Iron (27 mg daily)
      - Calcium (1,000 mg daily)
      - Vitamin D (600 IU daily)

      #### Dietary Guidelines
      - Eat plenty of fruits and vegetables
      - Choose whole grains
      - Include lean proteins
      - Stay hydrated with 8-10 glasses of water daily
      - Avoid raw or undercooked foods

      ### 3. Physical Activity
      #### Safe Exercises
      - Prenatal yoga
      - Swimming
      - Walking
      - Stationary cycling
      - Light strength training

      #### Exercise Guidelines
      - Aim for 30 minutes of moderate activity daily
      - Listen to your body
      - Avoid high-impact activities
      - Stay cool and hydrated
      - Stop if you feel discomfort

      ### 4. Avoiding Harmful Substances
      - No alcohol consumption
      - Quit smoking and avoid secondhand smoke
      - Limit caffeine to 200mg daily
      - Avoid certain medications (consult your doctor)
      - Be cautious with essential oils

      ### 5. Stress Management
      #### Relaxation Techniques
      - Deep breathing exercises
      - Meditation
      - Prenatal massage
      - Gentle stretching
      - Progressive muscle relaxation

      ## Warning Signs to Watch For
      Contact your healthcare provider immediately if you experience:
      - Severe headaches
      - Vision changes
      - Sudden swelling
      - Decreased fetal movement
      - Vaginal bleeding
      - Severe abdominal pain

      ## Preparing for Labor and Delivery
      ### Birth Plan Considerations
      - Delivery preferences
      - Pain management options
      - Support person choices
      - Immediate postpartum wishes
      - Newborn care preferences

      ## Conclusion
      Remember that every pregnancy is unique, and what works for one person may not work for another. Always consult with your healthcare provider about specific concerns or questions related to your pregnancy.

      ## Additional Resources
      - American College of Obstetricians and Gynecologists
      - March of Dimes
      - World Health Organization Pregnancy Guidelines
      - Local pregnancy support groups
    `,
  },
  "postnatal-recovery": {
    title: "Postnatal Recovery Tips: Healing After Childbirth",
    category: "Postnatal",
    author: "Dr. Emily Chen",
    date: "January 20, 2024",
    readTime: "10 min read",
    content: `
      The postnatal period is a crucial time for healing and bonding with your newborn. This comprehensive guide provides detailed information about recovery, self-care, and adapting to your new role as a mother.

      ## Understanding the Fourth Trimester
      The first 12 weeks after childbirth, known as the fourth trimester, is a period of significant physical and emotional changes. Understanding this phase helps set realistic expectations for recovery.

      ## Physical Recovery

      ### 1. Rest and Sleep
      #### Sleep Strategies
      - Sleep when your baby sleeps
      - Accept help from family and friends
      - Create a sleep-friendly environment
      - Establish a flexible routine
      - Use white noise to improve sleep quality

      ### 2. Nutrition for Recovery
      #### Essential Nutrients
      - Protein for tissue repair
      - Iron to prevent anemia
      - Calcium for bone health
      - Vitamin C for wound healing
      - Omega-3 fatty acids for brain health

      #### Meal Planning Tips
      - Prepare easy-to-eat snacks
      - Stay hydrated
      - Consider meal delivery services
      - Focus on nutrient-dense foods
      - Avoid crash dieting

      ### 3. Physical Activity
      #### Gentle Exercises
      - Pelvic floor exercises
      - Gentle walking
      - Postpartum-specific stretches
      - Breathing exercises
      - Progressive movement patterns

      ## Emotional Well-being

      ### 1. Managing Emotions
      - Recognize baby blues vs. postpartum depression
      - Practice self-compassion
      - Maintain social connections
      - Join support groups
      - Seek professional help when needed

      ### 2. Bonding with Baby
      #### Bonding Activities
      - Skin-to-skin contact
      - Baby massage
      - Talking and singing
      - Reading together
      - Daily routines

      ## Common Concerns and Solutions

      ### 1. Breastfeeding Challenges
      - Proper latch techniques
      - Managing supply issues
      - Dealing with soreness
      - When to seek lactation support
      - Combining breast and bottle feeding

      ### 2. Body Changes
      - Understanding normal healing
      - Caring for C-section wounds
      - Managing perineal care
      - Dealing with hair loss
      - Weight loss expectations

      ## Creating a Support System

      ### 1. Professional Support
      - Postpartum checkups
      - Lactation consultants
      - Mental health professionals
      - Physical therapists
      - Support groups

      ### 2. Family and Friends
      - Communicating needs
      - Accepting help
      - Setting boundaries
      - Organizing support schedules
      - Managing visitors

      ## Self-Care Practices

      ### 1. Daily Routines
      - Basic hygiene
      - Healthy meals
      - Light movement
      - Rest periods
      - Social connection

      ### 2. Mental Health
      - Mindfulness practices
      - Journaling
      - Therapy options
      - Stress management
      - Partner communication

      ## Warning Signs
      Seek medical attention if you experience:
      - Heavy bleeding
      - Severe pain
      - Signs of infection
      - Emotional distress
      - Unusual symptoms

      ## Resources and Support
      - Local postpartum support groups
      - Online communities
      - Professional organizations
      - Healthcare providers
      - Emergency contacts

      ## Conclusion
      Remember that recovery is a journey, not a race. Be patient with yourself and celebrate small victories as you navigate this new chapter of life.
    `,
  },
  // Add more blog posts with detailed content...
}

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug as string
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Blog post not found</h1>
            <Link href="/blog" className="text-indigo-600 hover:text-indigo-700 mt-4 inline-block">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-16"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/blog"
              className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Blog
            </Link>
          </div>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              
              <div className="flex items-center text-gray-600 text-sm mb-8">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>

              <div className="prose prose-lg max-w-none">
                {post.content.split('\n').map((paragraph, index) => {
                  if (paragraph.trim().startsWith('#')) {
                    const level = paragraph.match(/^#+/)?.[0].length || 1
                    const text = paragraph.replace(/^#+\s/, '')
                    const Component = `h${level}` as keyof JSX.IntrinsicElements
                    return <Component key={index} className="text-gray-900 font-bold mt-8 mb-4">{text}</Component>
                  }
                  
                  if (paragraph.trim().startsWith('-')) {
                    return (
                      <ul key={index} className="list-disc pl-6 mb-4">
                        <li className="text-gray-700">{paragraph.replace(/^-\s/, '')}</li>
                      </ul>
                    )
                  }
                  
                  if (paragraph.trim()) {
                    return <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                  }
                  
                  return null
                })}
              </div>
            </div>
          </article>
        </div>
      </div>
    </motion.div>
  )
} 