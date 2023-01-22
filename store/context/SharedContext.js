import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SharedContext = createContext({

})

function SharedContextProvider({ children }) {
    const [showOverlay, setShowOverlay] = useState(false)
    const [showGlobalLoading, setShowGlobalLoading] = useState(false)
    const [user, setUser] = useState({})
    const [detailScreenTitle, setDetailScreenTitle] = useState()

    function SetUser(user) {
        setUser(user)
        AsyncStorage.setItem('user', JSON.stringify(user))
    }

    function RemoveUser() {
        setUser({})
        AsyncStorage.removeItem("user")
    }

    const value = {
        showOverlay,
        setShowOverlay,
        showGlobalLoading,
        setShowGlobalLoading,
        user,
        SetUser,
        detailScreenTitle,
        setDetailScreenTitle,
        RemoveUser
    }

    return (
        <SharedContext.Provider value={value}>
            {children}
        </SharedContext.Provider>
    )
}

export default SharedContextProvider