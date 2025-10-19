import React, { useState } from "react";
import { ChevronDown } from "lucide-react"

export function Menu({
  trigger,
  children,
  align = "left",
  showChevron = true
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer inline-flex items-center"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}>
        {trigger}
        {showChevron && (
          <ChevronDown
            className="ml-2 -mr-1 h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true" />
        )}
      </div>
      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-9 focus:outline-none z-50`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button">
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export function MenuItem({
  children,
  onClick,
  disabled = false,
  icon,
  isActive = false
}) {
  return (
    <button
      className={`relative block w-full h-16 text-center group
        ${disabled ? "text-gray-400 dark:text-gray-500 cursor-not-allowed" : "text-gray-600 dark:text-gray-300"}
        ${isActive ? "bg-white/10" : ""}
      `}
      role="menuitem"
      onClick={onClick}
      disabled={disabled}>
      <span className="flex items-center justify-center h-full mt-[5%]">
        {icon && (
          <span
            className="h-6 w-6 transition-all duration-200 group-hover:[&_svg]:stroke-[2.5]">
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  );
}

export function MenuContainer({
  children
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = React.Children.toArray(children)
  const totalItems = childrenArray.length

  const handleToggle = () => {
    setIsExpanded((prev) => !prev)
  }

  // Her bir item yüksekliği 48px, ilki zaten container içinde
  const expandedHeight = 54 + (totalItems - 1) * 42 // px cinsinden
  const collapsedHeight = 54


  return (
    <div className="relative max-w-full px-3 py-3 rounded-2xl bg-gray-50 dark:bg-[#0f172aad] shadow-md overflow-hidden transition-all duration-500 ease-in-out" data-expanded={isExpanded}
      style={{ height: isExpanded ? `${expandedHeight}px` : `${collapsedHeight}px`,}}
    >
         {/* w-[64px]     relative flex max-w-full items-center rounded-2xl bg-gray-50 dark:bg-white*   /}
      {/* Container for all items */}
      <div className="relative flex items-center justify-center">
        {/* First item - always visible */}
        <div
          className="relative flex items-center justify-center pt-2 pl-2 w-8 h-8 bg-gray-100 dark:bg-gray-800 cursor-pointer rounded-full group will-change-transform z-50"
          onClick={handleToggle}>
          {childrenArray[0]}
        </div>

        {/* Other items */}
        {childrenArray.slice(1).map((child, index) => (
          <div
            key={index}
            className="absolute flex items-center justify-center pt-2 pl-2 top-0 left-0 w-8 h-8 bg-gray-100 dark:bg-gray-800 will-change-transform"
            style={{
              transform: `translateY(${isExpanded ? (index + 1) * 40 : 0}px)`,
              opacity: isExpanded ? 1 : 0,
              zIndex: 40 - index,
              clipPath: index === childrenArray.length - 2 
                ? "circle(50% at 50% 50%)" 
                : "circle(50% at 50% 55%)",
              transition: `transform ${isExpanded ? '300ms' : '300ms'} cubic-bezier(0.4, 0, 0.2, 1),
                         opacity ${isExpanded ? '300ms' : '350ms'}`,
              backfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitFontSmoothing: 'antialiased'
            }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
