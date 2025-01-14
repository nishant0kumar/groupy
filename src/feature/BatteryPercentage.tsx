import { useEffect, useState } from 'react';

function BatteryPercentage() {

    const getBatteryPercentage = async (): Promise<number | null> => {
        try {
            const battery = await (navigator as any).getBattery();
            
            const percentage = Math.floor(battery.level*100);
            
            // Add event listener for battery level changes
            battery.addEventListener('levelchange', () => {
                const updatedPercentage = Math.floor(battery.level*100);
                console.log(`Battery Level Updated: ${updatedPercentage}%`);
            });
            
            return percentage;
        } catch (error) {
            console.error('Error getting battery status:', error);
            return null;
        }
    };

    
    const [batteryLevel, setBatteryLevel] = useState<number | null>(0);

    useEffect(() => {
        const getBatteryLevel = async () => {
            const percentage = await getBatteryPercentage();
            setBatteryLevel(percentage);
        };
        
        getBatteryLevel();
    }, []);
    
    return (
        <div className='text-black/80 text-xs bg-white/80 rounded-lg h-5 w-10 flex items-center justify-center hover:cursor-default'>
            <p className='hover:cursor-default'>{batteryLevel}</p>
        </div>
    )
}

export default BatteryPercentage;
