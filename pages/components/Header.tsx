import React from "react";
import config from "../index.json";


const Header = () => {
  const navigation = config.navigation;
  return (
    <div className="h-14 bg-gray-100 sticky top-0 shadow-md bg-opacity-50 backdrop-blur-md z-10">
      <div className="header__menu">
        <ul className="flex px-8 lg:px-32 gap-x-20 content-center leading-0 h-0">
          {/* <span className="mt-5 font-semibold">{config.hero.name}</span> */}
          {navigation.map((item) => (
            <li className="mt-4 cursor-pointer" key={item.title}>
              <a href={`#${item.title}`}>
                <span className="text-base font-semibold text-black whitespace-nowrap hover:underline underline-offset-4">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;