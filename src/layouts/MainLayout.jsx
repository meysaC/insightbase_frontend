import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppleStyleDock } from '@/components/common/AppleStyleDock'
import { Navigation } from '@/components/common/Navigation'
import { Toggle } from '@/components/ui/toggle'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { AuthModal } from '@/components/account/AuthModal'
// import Logo from "../assets/InsightBase_Logo2.png"
import Logo_Dark from "../assets/InsightBase_Logo_Dark.png"
import Logo_Light from "../assets/InsightBase_Logo_Light.png"
// import Logo from "../assets/InsightBase_Logo3.jpeg"


const MainLayout = () => {
  const { theme, toggleTheme } = useTheme()
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-gray-150 dark:bg-slate-950 transition-colors duration-800">

      {/* === TOP BAR ===  justify-end px-6 z-50*/}
      <header className=""> 
        
        {/** Logo Section */}
        <div className="absolute left-6 top-5 flex items-center gap-2">
           { theme === 'dark'
            ? <img src={Logo_Dark} alt="Logo" className="h-12" />
            : <img src={Logo_Light} alt="Logo" className="h-14" /> }
      </div>

      <div className="relative flex items-center justify-end px-6">
        {/** Login Button */}
        <button className='mr-2  flex w-fit gap-4 rounded-2xl bg-gray-50 px-4 dark:bg-[#0f172aad] py-4 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300'
          onClick={() => setAuthOpen(true)}
        >
          Giriş Yap
        </button>

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

      </div>
      </header>

      {/* === MAIN CONTENT === */}
      <main className="flex-1 px-4 pb-[120px] overflow-hidden overflow-y-auto sidebar-scroll"> 
        <Outlet />
      </main>

      {/* Auth MODAL */}
      {<AuthModal open={authOpen} onOpenChange={setAuthOpen} />}

      {/* === BOTTOM DOCK === bottom-2*/}
      <footer className="relative bottom-1 left-1/2 -translate-x-1/2 z-40">
        <AppleStyleDock />
      </footer>
    </div>
  )
}

export default MainLayout