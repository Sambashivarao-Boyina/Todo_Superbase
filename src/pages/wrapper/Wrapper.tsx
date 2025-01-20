import React, {useState, useEffect, ReactNode} from "react";
import supabase from "../../helper/superbaseClient";
import { Navigate } from "react-router-dom";

interface WrapperProps {
  children: ReactNode; // ReactNode allows any valid React children (e.g., JSX, strings, null, etc.)
}

const Wrapper:React.FC<WrapperProps> = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getSession = async () => {
            const {
                data: {session}
            } = await supabase.auth.getSession();
            setAuthenticated(!!session);
            setLoading(false);
        }

        getSession()
       
    },[]);

    if(loading) {
        return <div className="w-full h-full flex flex-row items-center justify-center ">
            <div>Loadin...</div>
        </div>
        
    } 
    if (!authenticated) {
        return <Navigate to="/auth/login" />;
    }
    return <>{children}</>;

}
export default Wrapper;