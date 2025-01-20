import React,{useState} from 'react'
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import superbase from '../../helper/superbaseClient';

const SignUpScreen: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();

    const signUpaHandler = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        setIsLoading(false)
        setMessage("");


        const {data, error} = await superbase.auth.signUp({
            email:email,
            password:password
        })

        if(error) {
            setMessage(error.message);
            setIsLoading(false);
            return;
        }

        if(data) {
            setMessage("User Account created");
            
            navigate("/");
        }
        setEmail("");
        setPassword("");
        setIsLoading(false)
        
    }
    return (
        <div className="w-full h-full flex flex-col items-center justify-center  ">
            <form onSubmit={signUpaHandler} className="flex flex-col p-4 rounded-lg border-2 shadow-sm  w-3/4 md:w-1/2 lg:w-1/3 drop-shadow-sm">
                <p className="font-bold text-xl text-center">Sign Up</p>
                <div className='h-2'></div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className=" border-2 border-gray-200  rounded-lg p-2 drop-shadow-sm"
                    required
                />
                <div className='h-2'></div>
                <PasswordInput value={password} setValue={setPassword}/>
                <div className='h-4'></div>
                {message && <p className='text-red-600'>{message}</p>}
                <Button title={"SignUp"}  disabled={isLoading}/>
                <hr className='m-4 border-gray-400'/>
                <p className='text-center'>Already have an account? <Link to="/auth/login" className='text-blue-700 font-semibold'>Login</Link></p>
            </form>
        </div>
    )
}

export default SignUpScreen
