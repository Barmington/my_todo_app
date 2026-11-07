import { IoMenu } from 'react-icons/io5';
function NavBar() {
  return (
    <nav>
      <div className="mb-5">
        <div className="flex justify-between items-center">
          <div>
            <IoMenu size={30} />
          </div>

          <img
            className="h-10 w-10 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6rgrgoiWJCJKcYiL_CyM-Rqlnl-_h9vdwBumKZxgzCqDkrBGPNH5I30I&s"
            alt="User image"
          />
        </div>
        <h3>Good morning, User</h3>
      </div>

      <div>
        <p>User you have xxx todos left</p>
        <div className="h-auto w-full px-1 rounded-lg">
          <div className="flex space-y-2 justify-between w-full items-center">
            {/* <div className="space-y-2"> */}
            <div className="custom-box">All</div>
            <div className="custom-box">Work</div>
            {/* </div> */}
            <div className="flex items-center justify-center font-bold text-blue-700 rounded-full bg-white h-20 w-20 shadow-2xl md:hidden md:justify-between md:items-center">
              All
            </div>
            {/* <div className="space-y-2"> */}
            <div className="custom-box ">Personal</div>
            <div className="custom-box ">Shopping</div>
            {/* </div> */}
          </div>
        </div>
        <div className="flex justify-between my-2 font-light p-2 ">
          <p>Today</p>
          <p>xxx todos remaining</p>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
