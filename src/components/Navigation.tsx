/* import logo from '../assets/react.svg' */
import BatteryPercentage from '../feature/BatteryPercentage';
import WeatherDetails from '../feature/WeatherDetails';
import Logo from './Logo';
import { useState } from 'react';
import AuthModal from './AuthModal';

function Navigation() {
    const [showAuth, setShowAuth] = useState(false);
    const [authType, setAuthType] = useState<'login' | 'signup'>('login');

    const handleAuthClick = (type: 'login' | 'signup') => {
        setAuthType(type);
        setShowAuth(true);
    };

    return (
        <>
            <div className='fixed top-0 z-40 flex items-center gap-10 w-full bg-black/10 backdrop-blur-xl shadow-sm px-4 text-sm text-black/90'>
                <div className='flex items-center gap-10 w-full'>
                    <div className='flex items-center gap-2'>
                        <Logo />
                        <span className='text-lg font-bold'>LinkDock</span>
                    </div>
                    <WeatherDetails />
                </div>
                <ul className='flex justify-end items-center gap-10 w-full'>
                    <li 
                        onClick={() => handleAuthClick('login')}
                        className='hover:cursor-pointer hover:-translate-y-1 hover:text-black transition-all duration-300'
                    >
                        Login
                    </li>
                    <li 
                        onClick={() => handleAuthClick('signup')}
                        className='hover:cursor-pointer hover:-translate-y-1 hover:text-black transition-all duration-300'
                    >
                        Signup
                    </li>
                    <BatteryPercentage />
                    <span className='text-xs'>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </ul>
            </div>

            <AuthModal 
                isOpen={showAuth}
                type={authType}
                onClose={() => setShowAuth(false)}
            />
        </>
    );
}

export default Navigation;