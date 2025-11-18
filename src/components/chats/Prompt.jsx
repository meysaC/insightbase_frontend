import React from 'react'
import { Mic, ArrowUp } from 'lucide-react'
import { PromptBox } from "@/components/ui/chatgpt-prompt-input"
 {/* <PromptBox /> */}
const Prompt = () => {
  return (
    <div className="rounded-2xl bg-gray-200 dark:bg-gray-900 p-1.5">
            {/* onSubmit={handleSubmit} */}
      <form  className=" mx-auto">
        <div className="flex items-end gap-1 pr-2 sidebar-scroll">
            
            {/* value={input}
              onChange={(e) => setInput(e.target.value)}
           */}
            <textarea
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                // handleSubmit(e);
              }
            }}
              placeholder="Yazınız..."
              rows={2}
              className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none resize-none"
            />

          <button type="button"
            className="p-2 mb-2 rounded-2xl text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Mic className='w-5 h-5 sm:w-5 sm:h-5' />
          </button> 

          {/*  disabled={!input.trim()} */}
          <button type="submit"
            className="p-1 mb-3 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <ArrowUp className='w-5 h-5 sm:w-5 sm:h-5' />
          </button>
          
        </div>
      </form>
    </div> 
  )
}

export default Prompt