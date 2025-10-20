import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppleStyleDock } from '@/components/common/AppleStyleDock'
import { Navigation } from '@/components/common/Navigation'
import { Toggle } from '@/components/ui/toggle'
import { SunMoon } from 'lucide-react'
import { Moon } from 'lucide-react'
import { Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'


const MainLayout = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex flex-col h-screen bg-gray-150 dark:bg-slate-950 transition-colors duration-800">

      {/* === TOP BAR === */}
      <header className="relative flex items-center justify-end px-6 z-50">
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

        {/* User Navigation */}
        <Navigation />
      </header>

      {/* === MAIN CONTENT === overflow-y-auto */}
      <main className="flex-1 px-4 pb-[150px]"> 
        <Outlet />
      </main>

      {/* === BOTTOM DOCK === */}
      <footer className="relative bottom-2 left-1/2 -translate-x-1/2 z-40">
        <AppleStyleDock />
      </footer>
    </div>
  )
}

export default MainLayout