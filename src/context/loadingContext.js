import React, { createContext, useState } from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = ({children}) =>{

    const [open,setOpen] =useState(false)

    const showLoading = () =>{
        setOpen(true)
     }

    const hideLoading = ()=>{
        setOpen(false)
    }

    return(
            <LoadingContext.Provider
              value={{
                open,
                showLoading,
                hideLoading,
              }}
            >
              {children}
            </LoadingContext.Provider>
          );
} 