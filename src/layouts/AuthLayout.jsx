import { Navigation } from '@/components/common/Navigation'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { Toggle } from '@/components/ui/toggle'
import { Moon, Sun } from 'lucide-react'
import Logo from "../assets/InsightBase_Logo2.png"

const AuthLayout = () => {
    const { theme, toggleTheme } = useTheme()
  
  return (
   <div className="flex flex-col h-screen bg-gray-150 dark:bg-slate-950 transition-colors duration-800">

    <header className="relative flex items-center justify-end px-6 z-50">
      {/** Logo Section */}
      <div className="absolute left-6 top-5 flex items-center gap-2">
        <img src={Logo} alt="Logo" className="h-8" />
      </div>
      
      {/* Theme toggle */}
      <Toggle
        variant="outline"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="mr-0"
      >
        <div className="rounded-full w-8 h-8 flex items-center justify-center text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-800 ">
          {theme === 'dark'
            ? <Moon />
            : <Sun />}
        </div>
      </Toggle>

      <Navigation />
    </header>

      <main className="flex-1 px-4 pb-[120px] overflow-hidden overflow-y-auto sidebar-scroll"> 
        <Outlet />
      </main>
   </div>
  )
}

export default AuthLayout