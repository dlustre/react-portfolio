import React from "react";
import config from "../index.json";
import Image from "next/image";

const Hero = () => {
  const hero = config.hero;

  return (
    <section className="h-screen bg-white overflow-x-hidden">
      <div className="px-8 lg:px-32 flex flex-col justify-center text-center items-center gap-4">
        <h1 className="text-6xl mt-64 font-bold tracking-wide">
          <span className="bg-gradient-to-r from-green-500 via-teal-500 to-violet-500 bg-clip-text text-transparent">
            {hero.name}
          </span>
        </h1>
        {/* <div className="mt-7 h-0.5 w-96 bg-gradient-to-r from-green-500 via-teal-500 to-violet-500"></div> */}
        <h1 className="text-6xl font-bold tracking-wide mt-4">{hero.subtitle}</h1>
        <a href="#About" className="text-2xl font-bold p-0.5 mt-6 w-44">
          <div className="bg-white">
            <span className="flex justify-center text-center py-0.5 px-2 bg-gradient-to-r from-green-300 via-teal-500 to-violet-500 hover:shadow-xl hover:-translate-y-2 transition-all hover:animate-pulse">
              <Image width="32" height="32" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/double-down.png" alt="double-down" />
              <Image width="32" height="32" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/double-down.png" alt="double-down" className="absolute animate-pulse" />
            </span>
          </div>
        </a>

      </div>
    </section>
  );
};

export default Hero;