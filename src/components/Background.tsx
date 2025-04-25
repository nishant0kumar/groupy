/* import background from '../assets/macwall.jpg' */

function Background({ color = 'bg-red-500' }: { color?: string }) {
    return (
        <div className={`${color} blur-none h-screen w-screen fixed top-0 left-0 z-[-1] transition-colors duration-300`}>
        </div>
    )
}

export default Background;