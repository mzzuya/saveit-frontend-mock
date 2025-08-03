import { useEffect, useState } from "react";
import { ResponsiveContext } from "./ResponsiveContext";

export function ResponsiveProvider({ children }){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(()=>{
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return()=> window.removeEventListener("resize", handleResize);
    },[]);

    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth <= 1023;
    const isDesktop = windowWidth > 1023;

    return(
        <ResponsiveContext.Provider value={{isMobile, isTablet, isDesktop, windowWidth}}>
            {children}
        </ResponsiveContext.Provider>
    );
}