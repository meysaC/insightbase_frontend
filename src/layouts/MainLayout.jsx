import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppleStyleDock } from '@/components/AppleStyleDock'
import { Navigation } from '@/components/Navigation'
import { Toggle } from '@/components/ui/toggle'
import { SunMoon } from 'lucide-react'
import { Moon } from 'lucide-react'
import { Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

//bg-[#0f172a]

const MainLayout = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative h-screen bg-gray-150 dark:bg-slate-950 transition-colors duration-800">

      {/* Theme */}
      <div className="absolute top-4 right-20 z-50 ">
        <Toggle variant="outline" onClick={toggleTheme} aria-label="Toggle Theme" className="" >
          <div className="rounded-full bg-gray-100 dark:bg-gray-800 w-8 h-8 px-[7px] py-[6px]">
            {
              theme === "dark" ?  <Moon className="text-gray-700 dark:text-white"/>  :  <Sun className="text-gray-700 dark:text-white"/>
            }
            {/* <SunMoon className="text-gray-700 dark:text-white"/> */}
          </div>
        </Toggle>
      </div>

      {/* User/Settings Navigation */}
      <div className="absolute top-0 right-0 z-50">
        <Navigation />
      </div>

      {/* Pages Navigation */}
      <AppleStyleDock />


      <Outlet /> 
    </div>
  )
}

export default MainLayout