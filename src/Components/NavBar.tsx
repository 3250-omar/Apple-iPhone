import { appleImg, bagImg, searchImg } from "../utiles/index";
import { navLists } from "../constants/index";
const NavBar = () => {
  return (
    <header className=" w-full py-5 px-4 max-sm:px-5">
      <nav className="flex justify-between screen-max-width  ">
        <img src={appleImg} alt="" width={18} height={18} />
        <div className="flex flex-1 justify-center items-center gap-4 max-sm:hidden">
          {navLists.map((nav: string) => (
            <p
              className="cursor-pointer text-gray hover:text-white transition-all duration-300"
              key={nav}
            >
              {nav}
            </p>
          ))}
        </div>
        <div className=" flex gap-4 items-baseline *:cursor-pointer">
          <img src={bagImg} alt="Bag" width={18} height={18} />
          <img src={searchImg} alt="search" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
