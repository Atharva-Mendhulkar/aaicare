import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-pink-100 text-gray-700 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">AaiCare</h3>
            <p className="text-sm">Empowering Maternal Health with AI</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li>
                <a href="#" className="hover:text-pink-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-600">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-pink-600">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-8 text-sm text-center">
          © {new Date().getFullYear()} AaiCare. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

