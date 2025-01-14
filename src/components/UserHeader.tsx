import background from '../assets/macwall.jpg'
import userData from '../data/userData';

function UserHeader() {
  var Name = userData.name;
  var userName = userData.username;
  
  
  return (
    <div className='flex justify-between items-center p-5 mt-10'>
      <div className='flex  items-center'>
        <h1 className='text-white text-3xl font-bold font-family: "Helvetica Neue", sans-serif;'>
          {Name}, Get ready for your day!
        </h1>
      </div>
        <div className='flex flex-col items-center backdrop-blur-xl shadow-sm bg-white/30 rounded-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300 hover:cursor-pointer h-30 w-30 '>
            <img src={background} alt="logo" className='bg-transparent w-20 h-20 px-1.5 py-1.5 rounded-xl' />
            <span>{userName}</span>
        </div>
    </div>
  )
}

export default UserHeader;
