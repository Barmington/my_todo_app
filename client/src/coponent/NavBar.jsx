import { IoMenu } from 'react-icons/io5';

function NavBar() {
  function greeting() {
    const now = new Date();
    const hour = now.getHours();

    let sayGreeting;

    if (hour < 12) {
      sayGreeting = 'Good morning';
    } else if (hour < 17) {
      sayGreeting = 'Good afternoon';
    } else {
      sayGreeting = 'Good evening';
    }

    return sayGreeting;
  }

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
        <h3>{greeting()}, User</h3>
      </div>
    </nav>
  );
}

export default NavBar;
