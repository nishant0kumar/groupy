/* import logo from '../assets/react.svg' */
import BatteryPercentage from '../feature/BatteryPercentage';
import WeatherDetails from '../feature/WeatherDetails';
import Logo from './Logo';

function Navigation() {

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
                    <BatteryPercentage />
                    <span className='text-xs'>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </ul>
            </div>

        </>
    );
}

export default Navigation;