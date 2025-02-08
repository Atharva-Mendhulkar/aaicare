import AashaChatbot from "../components/AashaChatbot"

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Chat with Aasha</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <AashaChatbot fullScreen={true} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage
