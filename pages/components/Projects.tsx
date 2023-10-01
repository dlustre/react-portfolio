import React from "react";
import config from "../index.json";
import Image from "next/image";
import Head from 'next/head';

const Projects = () => {
  const projects = config.projects;

  return (
    <div id={projects.title} className="px-8 md:px-16 md:px-32 pb-16 bg-white">
      <Head>
        <title>Projects</title>
      </Head>
      <h1 className="pt-14 uppercase font-bold text-center text-black text-bold text-4xl">{projects.title}</h1>
      <div className="projects__menu">
        <ul>
          {projects.projects.map((item) => (
            <li key={item.title} className="flex flex-col lg:flex-row mt-12">
              <div className="lg:w-1/3">
                <h2 className="text-2xl font-bold">
                  {item.title}
                </h2>
                <p className="mt-5 mb-3">
                  {item.description}
                </p>
                <div className="bg-white bg-gradient-to-r from-green-500 via-teal-500 to-violet-500 bg-clip-text text-transparent mt-2 font-bold text-lg">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex mt-4">

                  {item.url && <div className="text-md text-center font-semibold p-0.5 bg-gradient-to-r from-green-500 via-teal-500 to-violet-500">

                    <a href={item.url} target="_blank" rel="noreferrer">
                      <div className="bg-white">
                        <span className="block py-0.5 px-2 bg-white bg-gradient-to-r from-green-500 via-teal-500 to-violet-500 bg-clip-text text-transparent">
                          See Project
                        </span>
                      </div>
                    </a>
                  </div>}
                  <div className="bg-white ml-2 font-semibold">
                    <a href={item.github} target="_blank" rel="noreferrer">
                      <span className="block py-1 px-2 bg-white bg-gradient-to-r from-green-500 via-teal-500 to-violet-500 bg-clip-text text-transparent">
                        Source Code
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="lg:ml-12">
                <a href={item.image}>
                  <Image
                    src={item.image}
                    alt="project image"
                    className="mt-6 md:mt-12 lg:mt-0 w-full shadow-lg max-w-4xl"
                    width={1280}
                    height={720}
                  />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;

