import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppleStyleDock } from '@/components/AppleStyleDock'
import { Navigation } from '@/components/Navigation'
import { Toggle } from '@/components/ui/toggle'
import { SunMoon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

//bg-[#0f172a]

const MainLayout = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative h-screen bg-gray-150 dark:bg-slate-950 transition-colors duration-800">

      {/* Theme */}
      <div className="absolute top-4 right-40 z-50">
        <Toggle variant="outline" onClick={toggleTheme} aria-label="Toggle Theme" >
          <SunMoon className="text-gray-700 dark:text-white"/>
        </Toggle>
      </div>

      {/* Navigation */}
      <div className="absolute top-0 right-0 z-50">
        <Navigation />
      </div>


      <AppleStyleDock />
      <Outlet /> 
    </div>
  )
}

export default MainLayout