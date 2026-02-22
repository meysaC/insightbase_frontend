import React from 'react'
import { MenuItem, MenuContainer } from "@/components/ui/fluid-menu"
import { Menu as MenuIcon, X, Settings, UserRound, LogOut } from "lucide-react" //Home,
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function Navigation() {
  const { isAuthenticated, logout } = useAuth(); //
  const navigate = useNavigate();
  
  const handleLogout = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Çıkış yapmak istediğinize emin misiniz?")
    if(confirmed)
    {
      await logout();
      navigate('/');
    }
  }

  const data = isAuthenticated
  ? [
      {icon: <UserRound size={16} /> , href: '/users'},
      {icon: <Settings size={16} /> , href: '/settings'},
      {icon: <LogOut size={16} /> , href: '/logout', onClick: handleLogout},
  ] : [
      {icon: <Settings size={16} /> , href: '/contact'},
    ]
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 -z-10 rounded-full" />
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

          {data.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.onClick ? (
                  <MenuItem icon={item.icon}  onClick={handleLogout}/>
              ) : (
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