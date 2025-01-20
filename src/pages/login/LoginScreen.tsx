import React, { useState } from 'react'
import Button from '../components/Button';
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import supabase from '../../helper/superbaseClient';
import PasswordInput from '../components/PasswordInput';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();

    const loginHandler =  async (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        setMessage("");
        setIsLoading(true);
        
        const {data, error} = await supabase.auth.signInWithPassword({
            email:email,
            password: password
        })

        if(error) {
            setMessage(error.message);
            setIsLoading(false);
            return;
        }

        if(data) {
            setEmail("")
            setPassword("")
            navigate("/")
        }

        setIsLoading(false);

    }

    return (
        <div className="w-full h-full flex flex-row items-center justify-center ">
            <form onSubmit={loginHandler} className="flex flex-col p-4 rounded-lg border-2 shadow-sm  w-3/4 md:w-1/2 lg:w-1/3 drop-shadow-sm ">
                <p className="font-bold text-xl text-center">Login</p>
                <div className='h-2'></div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className=" border-2 border-gray-200  rounded-lg p-2"
                />
                <div className='h-2'></div>
                <PasswordInput value={password} setValue={setPassword}/>
                <div className='h-4'></div>
                {message && <p className='text-red-600'>{message}</p>}
                <Button title={"Login"}   disabled={isLoading}/>
                <hr className='m-4 border-gray-400'/>
                <p className='text-center'>Don't have account? <Link to="/auth/signup" className='text-blue-700 font-semibold'>SignIn</Link></p>
            </form>
        </div>
    );
}

export default LoginScreen
