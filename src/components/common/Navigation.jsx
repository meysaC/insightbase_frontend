import React from 'react'
import { MenuItem, MenuContainer } from "@/components/ui/fluid-menu"
import { Menu as MenuIcon, X, Mail, Settings, UserRound, LogOut } from "lucide-react" //Home,
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function Navigation() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate('/');
  }

  const data = isAuthenticated
  ? [
      {icon: <UserRound size={16} /> , href: '/users'}, //strokeWidth={1.5}
      {icon: <Settings size={16} /> , href: '/settings'},
      {icon: <LogOut size={16} /> , href: '/logout', onClick: handleLogout},
  ]
  : [
    {icon: <Settings size={16} /> , href: '/settings'}
  ]
  return (
    <div className="flex flex-col items-center gap-8 p-4">
      
      <div className="relative">
        <div className="absolute inset-0 -z-10 rounded-full" /> {/* bg-gradient-to-b from-gray-900/10 to-transparent dark:from-gray-100/10 blur-3xl  */}
        <MenuContainer>
          <MenuItem 
            icon={
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180">
                  <MenuIcon size={16} />
                </div>
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0">
                  <X size={16} />
                </div>
              </div>
            } 
          />
            {/* { data.map((item, idx) => (
                <Link to={item.href} key={idx} >
                    <MenuItem icon={item.icon} />
                </Link>
            ))
            } */}

          {data.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.onClick ? (
                // Logout için custom handler
                <button onClick={item.onClick} className="appearance-none">
                  <MenuItem icon={item.icon} />
                </button>
              ) : (
                // Normal link
                <Link to={item.href}>
                  <MenuItem icon={item.icon} />
                </Link>
              )}
            </React.Fragment>
          ))}

        </MenuContainer>
      </div>
    </div>
  )
}