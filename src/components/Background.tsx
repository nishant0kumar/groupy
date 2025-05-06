import background from '../assets/macwall.jpg'

function Background({ color = 'bg-lineat-to-bl from-violet-500 to-fuchsia-500' }: { color?: string }) {
    return (
        <div className={`${color} blur-none object-cover fixed h-screen w-full top-0 left-0 z-[-1] transition-colors duration-300`}>
            <img src={background} className='h-screen w-screen object-cover' />
        </div>
    )
}

export default Background;