
interface LogoProps {
    className?: string;
    width?: number;
    height?: number;
}

function Logo({ className = '', width = 40, height = 40 }: LogoProps) {
    return (
        <svg 
            width={width} 
            height={height} 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Bookmark shape */}
            <path 
                d="M12 8C12 6.89543 12.8954 6 14 6H26C27.1046 6 28 6.89543 28 8V32L20 26L12 32V8Z" 
                fill="#4A90E2"
                stroke="#2171CD"
                strokeWidth="1.5"
            />
            
            {/* Sun circle */}
            <circle 
                cx="20" 
                cy="16" 
                r="5" 
                fill="#FFD700"
                stroke="#FFA500"
                strokeWidth="1.5"
            />
            
            {/* Cloud shape */}
            <path 
                d="M16 19C16 17.3431 17.3431 16 19 16C20.6569 16 22 17.3431 22 19C22 20.6569 20.6569 22 19 22H15C13.8954 22 13 21.1046 13 20C13 18.8954 13.8954 18 15 18C15 16.8954 15.8954 16 17 16"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default Logo; 