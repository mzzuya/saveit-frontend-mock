import { useEffect } from "react";

export default function useHandleClickOutside( ref, handler , endabled = true){
    useEffect(()=>{
        function handleClick(event){
            if(ref.current && !ref.current.contains(event.target)){
                handler();
            }
        }

        document.addEventListener('mousedown', handleClick);
        return(()=>{
            document.removeEventListener('mousedown', handleClick);
        });

    },[ref,handler,endabled])
}