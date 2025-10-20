import { HomeIcon, Files, MessageCircle } from 'lucide-react'
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock'
import { Link } from 'react-router-dom'

const data = [
  { title: 'Home', icon: <HomeIcon />, href: '/' },
  { title: 'Chat', icon: <MessageCircle />, href: '/chats' },
  { title: 'Documents', icon: <Files  />, href: '/documents' },
]

export function AppleStyleDock() {
  return (
    <div className='absolute bottom-2 left-1/2 max-w-full -translate-x-1/2'>
      <Dock className='items-end pb-3'>
        {data.map((item, idx) => (
            <Link to={item.href} key={idx}>
                 <DockItem className='aspect-square rounded-full bg-gray-200 dark:bg-[#1e293b]'> 
                    <DockLabel>{item.title}</DockLabel>
                    <DockIcon>{item.icon}</DockIcon>
                </DockItem>
            </Link>
        ))}
      </Dock>
    </div>
  )
}

