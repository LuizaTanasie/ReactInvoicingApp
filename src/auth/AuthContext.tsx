import { getCookie, removeCookies, setCookies } from "cookies-next";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthAPI } from "../api/auth";

export const enum AuthStates {
    PENDING,
    HAS_USER,
    HAS_NO_USER
}

const AuthContext = createContext<{
    status: AuthStates,
    setUserToken: (token: string) => unknown
    logout: () => unknown
        } | null>(null)

export const useAuthContext = () => {
    const ctx = useContext(AuthContext)

    if (ctx === null) {
        throw new Error(`useAuthContext must be used under a provider`);
    }

    return ctx;
}

export const AuthProvider = (props: { children: ReactNode }) => {
    const [ status, setStatus ] = useState(AuthStates.PENDING)
    const userTokenCookieName: string = 'userToken'

    const logout = () => {
        removeCookies(userTokenCookieName)
        AuthAPI.setAuthToken(null)
        setStatus(AuthStates.HAS_NO_USER)
    }
    
    useEffect(() => {
        const localToken = getCookie(userTokenCookieName)
        if ( localToken ) {
            AuthAPI.setAuthToken(localToken.toString(), logout)
            setStatus(AuthStates.HAS_USER)
        } else {
            setStatus(AuthStates.HAS_NO_USER)
        }
    }, [])


    return (
        <AuthContext.Provider value={{
            status,
            logout,
            setUserToken: (token: string) => {
                setCookies(userTokenCookieName, token)
                setStatus(AuthStates.HAS_USER)
                AuthAPI.setAuthToken(token, logout)
            }
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}