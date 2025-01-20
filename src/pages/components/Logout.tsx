import supabase from '../../helper/superbaseClient'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();
    const logouthandler = async () => {
        const {error} = await supabase.auth.signOut();
        if(error) {
            throw error;    
           
        }
        navigate("/auth/login");
    }

    return (
        <button onClick={logouthandler} className='bg-blue-600 p-2 text-white rounded'>
            Logout
            
        </button>
    )
}

export default Logout
