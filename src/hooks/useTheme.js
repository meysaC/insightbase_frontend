import React, { useEffect, useState } from 'react'


// TEMA YÖNETİMİ İÇİN HOOK OLUŞTURUYORUZ 
// -> localStorage ye tema kaydeder, <html> etiketine class="dark" ekler siler, toggleTheme() fonk döner
export function useTheme() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    )

    useEffect(() => {
        const root = window.document.documentElement 
        if(theme === "dark"){
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"))
    }

  return { theme, toggleTheme }
}

