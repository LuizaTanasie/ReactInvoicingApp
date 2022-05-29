import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuthContext, AuthStates } from "./AuthContext";

export const NonAuthGuard = (props: { children?: ReactNode }) => {
    const authCtx = useAuthContext();
    const router = useRouter()

    useEffect(() => {
        if ( authCtx.status === AuthStates.HAS_USER ) {
            router.replace('/')
        } 
    }, [router, authCtx.status])
  
    if ( authCtx.status !== AuthStates.HAS_NO_USER ) {
        return null;
    }
  
    return <>{props.children}</>
}
