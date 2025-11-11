import React, { useEffect, useState } from 'react'


// TEMA YÖNETİMİ İÇİN HOOK OLUŞTURUYORUZ 
// -> localStorage ye tema kaydeder, <html> etiketine class="dark" ekler siler, toggleTheme() fonk döner
const useClickOutside = () => {
    const [click, setClick] = useState(
        localStorage.getItem("theme") || "light"
    )

    useEffect(() => {
        const root = window.document.documentElement 
        if(click === "dark"){
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
        localStorage.setItem("theme", click)
    }, [click])

    const toggleClick = () => {
        setClick((prev) => (prev === "dark" ? "light" : "dark"))
    }

  return { click, toggleClick }
}

export default useClickOutside

