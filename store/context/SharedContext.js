import { createContext, useState } from "react";

export const SharedContext = createContext({

})

function SharedContextProvider({ children }) {
    const [showOverlay, setShowOverlay] = useState(false)
    const [showGlobalLoading, setShowGlobalLoading] = useState(false)

    const value = {
        showOverlay,
        setShowOverlay,
        showGlobalLoading,
        setShowGlobalLoading
    }

    return (
        <SharedContext.Provider value={value}>
            {children}
        </SharedContext.Provider>
    )
}

export default SharedContextProvider