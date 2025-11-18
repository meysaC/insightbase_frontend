import React from 'react'
import { useState, useEffect } from 'react';
import { Plus, PanelLeftOpen, PanelLeftClose } from 'lucide-react';


const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if(window.innerWidth < 768) {
            setIsOpen(false);
        }
    }, [])

    const conversations = [
        { id: 1, title: "Conversation Conversation 1", timeStamp: "10:30 AM" },
        { id: 2, title: "Conversation 2", timeStamp: "Yesterday" },
        { id: 3, title: "Conversation 3", timeStamp: "2 days ago" },
        { id: 4, title: "Conversation 4", timeStamp: "2 days ago" },
        { id: 5, title: "Conversation 5", timeStamp: "2 days ago" },
        { id: 6, title: "Conversation 3", timeStamp: "2 days ago" },
        { id: 7, title: "Conversation 3", timeStamp: "2 days ago" },
        { id: 8, title: "Conversation 3", timeStamp: "2 days ago" },
    ]
  return (
    <div className="relative z-40">

        {!isOpen && (
            <button
                onClick={() => setIsOpen(true)}
                className='absolute left-3 top-40 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-full p-3 shadow-lg hover:scale-105 transition-transform'>
                <Plus size={20}/>
            </button>
        )}



        {/* <div className="h-[70vh] w-[300px] flex flex-col pr-8 ponter-events-none left-0 top-40 z-40">    */}
        <div
            className={`fixed top-40 left-0 h-[70vh] transition-all duration-300 ease-in-out
            ${isOpen ? "w-[300px] opacity-100 pr-6 pl-4" : "w-0 opacity-0 pointer-events-none"}
            `}>

            <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg pointer-events-auto overflow-hidden">
                
                <div className="p-4 flex justify-end">
                </div>

                <div className="p-4">
                    
                    <button className='flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors'>
                        <Plus size={16} />
                        <span className="font-medium">Yeni Sohbet</span>
                    </button>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="flex justify-end p-2 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <PanelLeftClose size={20} />
                    </button>

                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-4">
                    <div className="space-y-3">
                        {conversations.map((conv) => (
                            <div key={conv.id} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                <h3 className="font-medium text-gray-900 dark:text-white truncate">{conv.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{conv.timeStamp}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    </div>

  )
}

export default SideBar