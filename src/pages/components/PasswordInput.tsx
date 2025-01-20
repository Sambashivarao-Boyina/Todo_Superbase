import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'

type PasswordInputProps = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({value, setValue}) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    return (
        <div className="w-full border-2 border-gray-200  rounded-lg p-2 flex flex-row hover:border-black ">
            <input
                type={isPasswordVisible ? "text":"password"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Password"
                className='flex-1 focus:outline-none bg-transparent'
                required
            />
            <button onClick={togglePasswordVisibility}>
                {
                    isPasswordVisible ?
                        <EyeSlashIcon className='w-5 h-5'/>
                    : 
                        <EyeIcon className="w-5 h-5" />
                }
            </button>
        </div>
        
    )
}

export default PasswordInput
