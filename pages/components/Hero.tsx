import React from "react";
import config from "../index.json";
import Image from "next/image";

const Hero = () => {
  const hero = config.hero;
  const footer = config.footer;
  const about = config.about;

  return (
    <section className="h-screen bg-white overflow-x-hidden">
      <div className="px-8 lg:px-32 flex flex-col justify-center text-center items-center gap-4">
        <h1 className="text-6xl mt-64 font-bold tracking-wide">
          <div className="drop-shadow-md">
            <span className="bg-gradient-to-r from-green-500 via-teal-500 to-violet-500 bg-clip-text text-transparent hover:brightness-125 transition-all">
              {hero.name}
            </span>
          </div>
        </h1>
        {/* <div className="mt-7 h-0.5 w-96 bg-gradient-to-r from-green-500 via-teal-500 to-violet-500"></div> */}
        <h1 className="text-6xl font-bold tracking-wide mt-4 text-black drop-shadow-md">{hero.subtitle}</h1>
        <div className=" pt-8 text-4xl mb-6 space-x-10 flex justify-center items-center drop-shadow-md">
          <a rel="noreferrer" href={footer.linkedin} target="_blank" className="gradient-text hover:brightness-125 transition-all">
            <i className="devicon-linkedin-plain" />
          </a>
          {/* <a rel="noreferrer" href={about.resume} target="_blank" className="gradient-text hover:brightness-125 transition-all font-bold text-2xl">Resume</a> */}
          <a rel="noreferrer" href={footer.github} target="_blank" className="gradient-text hover:brightness-125 transition-all">
            <i className="devicon-github-original" />
          </a>
        </div>
        <a href="#About" className="text-2xl font-bold p-0.5 mt-6 w-44">
          <div className="bg-white">
            <span className="flex justify-center rounded-sm text-center py-0.5 px-2 bg-gradient-to-r from-green-300 via-teal-500 to-violet-500 hover:shadow-xl hover:-translate-y-2 transition-all hover:brightness-125">
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