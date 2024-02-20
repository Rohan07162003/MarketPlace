"use client"

import { PRODUCT_CATEGORIES } from "@/app/config";
import NavItem from "./NavItem";
import { useEffect, useRef, useState } from "react"
import { useOnClickOutside } from "@/app/hooks/use-on-click-outside";

const NavItems = () => {
    const [activeIndex, setActiveIndex]=useState<null | number>(null);
    useEffect(()=>{
        const handler = (e:KeyboardEvent)=>{
            if(e.key === "Escape"){
                setActiveIndex(null)
            }
        }
        document.addEventListener("keydown",handler)
        return ()=>{
            document.removeEventListener("keydown",handler)
        }
    },[])
    const isAnyOpen = activeIndex! == null
    const navRef = useRef<HTMLDivElement | null>(null)
    useOnClickOutside(navRef, ()=> setActiveIndex(null))
    return (
        <div className="flex gap-4 h-full" ref={navRef}>
            {PRODUCT_CATEGORIES.map((category,i)=>{
                const handleopen = ()=>{
                    if(activeIndex === i){
                        setActiveIndex(null);
                    }else{
                        setActiveIndex(i);
                    }
                }
                const isopen = i ===activeIndex
                
                return (
                    <NavItem category={category} handleOpen={handleopen} isOpen={isopen} key={category.value} isAnyOpen={isAnyOpen}/>
                );
            })}
        </div>
    )
}

export default NavItems