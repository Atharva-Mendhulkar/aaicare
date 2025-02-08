"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SOSFeature = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contacts, setContacts] = useState([
    { name: "Emergency Services", number: "108" },
    { name: "Dr. Jain", number: "+91 9192988969" },
  ])

  const [newContact, setNewContact] = useState({ name: "", number: "" })

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (newContact.name && newContact.number) {
      setContacts([...contacts, newContact])
      setNewContact({ name: "", number: "" })
    }
  }

  return (
    <>
      <motion.button
        className="fixed bottom-8 left-8 bg-red-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl font-bold z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
      >
        SOS
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white p-8 rounded-lg w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4">Emergency Contacts</h2>
              <ul className="mb-4">
                {contacts.map((contact, index) => (
                  <li key={index} className="flex justify-between items-center mb-2">
                    <span>{contact.name}</span>
                    <a href={`tel:${contact.number}`} className="text-blue-500 hover:underline">
                      {contact.number}
                    </a>
                  </li>
                ))}
              </ul>
              <form onSubmit={handleAddContact} className="mb-4">
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="tel"
                  placeholder="Contact Number"
                  value={newContact.number}
                  onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-300"
                >
                  Add Contact
                </button>
              </form>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SOSFeature

