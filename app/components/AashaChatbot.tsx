"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: number
  content: string
  role: "user" | "assistant"
}

interface AashaChatbotProps {
  fullScreen?: boolean;
}

const AashaChatbot = ({ fullScreen = false }: AashaChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm Aasha, your maternal health assistant. How can I help you today?",
      role: "assistant",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const newMessage: Message = { id: messages.length + 1, content: input, role: "user" }
      setMessages([...messages, newMessage])
      setInput("")
      setIsLoading(true)

      try {
        const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY
        if (!apiKey) {
          throw new Error('API key is not configured')
        }

        const response = await fetch('https://api.together.xyz/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey.trim()}`
          },
          body: JSON.stringify({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
              {
                role: "system",
                content: "You are Aasha, a friendly maternal health assistant. Provide clear, concise, and easy-to-understand answers about maternal health. Keep responses short and supportive. Always remind users to consult healthcare providers for medical advice."
              },
              {
                role: "user",
                content: input
              }
            ],
            max_tokens: 150,
            temperature: 0.7,
            top_p: 0.7,
            frequency_penalty: 0,
            presence_penalty: 0
          })
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || 'API request failed');
        }

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          throw new Error('Invalid response format from API');
        }

        const botResponse: Message = {
          id: messages.length + 2,
          content: data.choices[0].message.content.trim(),
          role: "assistant",
        }
        setMessages((prev) => [...prev, botResponse])
      } catch (error) {
        console.error('Error:', error);
        const errorMessage: Message = {
          id: messages.length + 2,
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          role: "assistant",
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (fullScreen) {
    return (
      <div className="w-full h-[700px] bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-pink-100 p-4 rounded-t-xl">
          <h3 className="text-lg font-semibold text-pink-800">Chat with Aasha</h3>
          <p className="text-sm text-pink-600">Your maternal health assistant</p>
        </div>
        <div className="h-[580px] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`${message.role === "user" ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block p-3 rounded-xl ${
                  message.role === "user" ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="text-left">
              <span className="inline-block p-3 rounded-xl bg-gray-100 text-gray-800">
                Typing...
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition duration-300"
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-[500px] bg-white rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="bg-pink-100 p-4 rounded-t-xl">
              <h3 className="text-lg font-semibold text-pink-800">Chat with Aasha</h3>
              <p className="text-sm text-pink-600">Your maternal health assistant</p>
            </div>
            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`${message.role === "user" ? "text-right" : "text-left"}`}>
                  <span
                    className={`inline-block p-3 rounded-xl ${
                      message.role === "user" ? "bg-pink-100 text-pink-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="text-left">
                  <span className="inline-block p-3 rounded-xl bg-gray-100 text-gray-800">
                    Typing...
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button
                  type="submit"
                  className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition duration-300"
                  disabled={isLoading}
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AashaChatbot

