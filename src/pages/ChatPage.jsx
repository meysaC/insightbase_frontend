import React, { useState, useEffect } from 'react'
import { Plus, Mic, ArrowUp } from 'lucide-react'
import Prompt from '@/components/chats/Prompt'
import Chat from '@/components/chats/Chat'
import SideBar from '@/components/chats/SideBar'
import TopBar from '@/components/chats/TopBar'

const ChatPage = () => {
  // const messages = [
  //   { id: 1, type: 'user', content: 'Hello, how are you?' },
  //   { id: 2, type: 'assistant', content: 'I am fine, thank you! How can I assist you today?' },
  //   { id: 3, type: 'user', content: 'Can you help me with my project?' },
  //   { id: 4, type: 'assistant', content: 'Of course! Please provide more details about your project.' },
  // ]

  // const [sidebarOpen, setSidebarOpen] = useState(true)

  // // Küçük ekranda otomatik kapalı başlasın
  // useEffect(() => {
  //   if (window.innerWidth < 768) {
  //     setSidebarOpen(false)
  //   }
  // }, [])
  
  return (
      // w-screen
    <div className="h-full grid grid-cols-[300px_1fr] pr-10"> 

      <div className="overflow-hidden">
        <SideBar />
      </div>

      <div className="flex flex-col h-full overflow-hidden">

        <div className="shrink-0">
          <TopBar />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">

          <div className="flex-1 overflow-y-auto">
            <Chat />
          </div>

          <div className="shrink-0">
            <Prompt />
          </div>
        </div>

      </div>
    </div>


    // <div className='grid grid-cols-5 grid-rows-5'>
      
    //   <div className="row-span-3 col-start-1 row-start-2">
    //     <SideBar /> 
    //   </div>

    //   <div className="col-span-4 row-span-3 col-start-2 row-start-2">
    //     <Chat />
    //     <Prompt />
    //   </div>

    //   <div className="col-span-4 col-start-2 row-start-1">
    //     <TopBar />
    //   </div>
    // </div>


  )
}

export default ChatPage

    
    // <div className="h-screen bg-gray-50 flex rounded-2xlg">
    //   <div className="flex-1 flex flex-col">
    //     <div className="bg-white border-b border-gray-200 p-4 gap-4">
    //       <button className="px-6 py-2 bg-blue-600 hover text-white font-medium rounded-2xl transation-colors flex items-center gap-2 shodow-sm">
    //         <Plus size={20} />
    //         Doküman Ekle
    //       </button>
    //     </div>
    //   </div>
    // </div>


      {/* <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-950">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl px-6 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 ml-auto'
                      : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-4">
          {/* onSubmit={handleSubmit} */}
          {/* <form  className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 focus-within:border-gray-300 dark:focus-within:border-gray-700 transition-colors"> */}
                
                {/*                   value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                */}
                {/* <textarea
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none resize-none"
                />
              </div>

              <button
                type="button"
                className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Mic size={20} />
              </button> */}

              {/*  disabled={!input.trim()} */}
              {/* <button
                type="submit"
                className="p-3 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </form>
        </div>
    </div>  */}
