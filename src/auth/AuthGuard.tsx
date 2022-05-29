import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { AuthStates, useAuthContext } from "./AuthContext";

export const AuthGuard = (props: { children?: ReactNode }) => {
    const authCtx = useAuthContext();
    const router = useRouter()
    
    useEffect(() => {
        if ( authCtx.status === AuthStates.HAS_NO_USER ) {
            router.replace('/login')
        } 
    }, [router, authCtx.status])
  
    if ( authCtx.status !== AuthStates.HAS_USER ) {
        return null;
    }
  
    return <>{props.children}</>
}
