import React from "react";
import config from "../index.json";


const Header = () => {
  const navigation = config.navigation;
  return (
    <div className="sticky top-0 z-10 bg-gray-100 bg-opacity-50 shadow-md h-14 backdrop-blur-md">
      <div className="header__menu">
        <ul className="flex content-center h-0 px-8 lg:px-32 gap-x-20 leading-0">
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