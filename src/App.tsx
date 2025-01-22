import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomeScreen from './pages/home/HomeScreen'
import LoginScreen from './pages/login/LoginScreen'
import SignUpScreen from './pages/signup/SignUpScreen'
import Topbar from './pages/components/Topbar'
import Wrapper from './pages/wrapper/Wrapper'

function App() {
   
    return (
       <div className='w-screen h-screen'>
            <Topbar/>
            <div className='w-full h-full' >
                <Routes>
                    <Route path="/" element={
                        <Wrapper>
                            <HomeScreen/>
                        </Wrapper>
                    }/>
                    <Route path="/auth/login" element={<LoginScreen/>}/>
                    <Route path="/auth/signup" element={<SignUpScreen/>}/>
                </Routes>
            </div>
       </div>
    )
}

export default App
