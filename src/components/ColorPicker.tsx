import { useState } from 'react';

const ColorPicker = ({ onSelectColor }: { onSelectColor: (color: string) => void }) => {
    const [selectedColor, setSelectedColor] = useState<string>('bg-red-500');
    
    // Modern aesthetic color options
    const colorOptions = [
        'bg-[#FF6B6B]', 
        'bg-[#4ECBF6]', 
        'bg-[#556270]', 
        'bg-[#C7F464]', 
        'bg-[#FF9F1C]', 
        'bg-[#2EC4B6]', 
        'bg-[#E71D36]', 
        'bg-[#662E9B]', 
        'bg-[#F9C22E]'
    ];

    return (
        <div className="fixed top-40 -right-7 hover:right-0 flex flex-col gap-2 p-4 bg-white/10 backdrop-blur rounded-lg opacity-30 hover:opacity-100 transition-all duration-500">
            {colorOptions.map((color, index) => (
                <button
                    key={index}
                    className={`w-8 h-8 rounded-full ${color} ${
                        selectedColor === color ? 'ring-2 ring-offset-2 scale-115' : 'hover:scale-110'
                    } transition-transform duration-200 ease-in-out`}
                    onClick={() => {
                        setSelectedColor(color);
                        onSelectColor(color);
                    }}
                />
            ))}
        </div>
    );
};

export default ColorPicker; 