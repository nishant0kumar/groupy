import background from '../assets/macwall.jpg'

function Background() {
    return (
        <div className='bg-white blur-none h-screen w-fit absolute top-0 left-0 z-[-1] '>
            <img src={background} alt="background" className='object-cover bg-repeat h-auto w-[100vw]' />
        </div>
    )
}

export default Background;