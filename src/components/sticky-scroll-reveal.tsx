"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";

export const StickyScroll = () => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const titles = [
    "Crafting software that helps people.",
    "This is what I'm up to:",
    "Projects",
    "Contact",
  ];

  const cardLength = titles.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = titles.map((_, index) => index / cardLength);
    cardsBreakpoints.forEach((breakpoint, index) => {
      if (latest > breakpoint - 0.2 && latest <= breakpoint) {
        setActiveCard(() => index);
      }
    });
  });

  const backgroundColors = [
    "rgb(23, 23, 23)",
    "rgb(5, 5, 5)",
    "rgb(15, 23, 42)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, rgb(249, 115, 22), rgb(234, 179, 8))",
    "linear-gradient(to bottom right, rgb(236, 72, 153), rgb(99, 102, 241))",
    "linear-gradient(to bottom right, rgb(6, 182, 212), rgb(16, 185, 129))",
  ];
  // const scales = [0.5, 1];

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[57.465rem] overflow-y-auto flex justify-center relative space-x-48 rounded-md p-10"
      ref={ref}
    >
      <div className="relative flex items-start px-4 div">
        <div className="max-w-4xl lg:ml-32">
          {titles.map((title, index) => (
            <div key={title + index} className="h-screen pt-10 my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                  x: -50,
                }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.5, type: 'spring' }}
                viewport={{ once: true, root: ref }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="font-bold text-5xl lg:text-9xl text-slate-100"
              >
                {title}
              </motion.h2>
              {index === 0 && <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="mt-10 text-3xl lg:text-4xl text-slate-300"
              >
                {`Hi, I'm Dennis Lustre, a software developer with a passion for building beautiful and performant web apps that make an impact.`}
              </motion.p>}
              {index === 1 &&
                <motion.div initial={{
                  opacity: 0,
                }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="mt-10 text-xl  lg:text-4xl text-slate-300"
                >
                  <motion.ul className="flex flex-col gap-4">
                    <motion.li><span className="font-semibold">Software Engineer Intern</span> @ Thaddeus Resource Center</motion.li>
                    <motion.li>
                      <span className="font-semibold">Software Developer</span> for ICSSC (<a href='https://github.com/icssc/ZotMeal' target='_blank' className="font-bold text-sky-400 hover:underline">ZotMeal</a>)
                    </motion.li>
                    <motion.li><span className="font-semibold">Computer Science</span> @ UC Irvine</motion.li>
                  </motion.ul>
                </motion.div>
              }
              {index === 2 && <motion.div initial={{
                opacity: 0,
              }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="mt-10 text-xl lg:text-3xl text-slate-300"
              >
                <motion.ul className="flex flex-col gap-8">
                  <motion.li><a href="https://github.com/UC-Irvine-CS175/final-project-shenanigans" target="_blank" className="font-semibold hover:text-sky-400 hover:underline">NASA Radiation Microscopy Generative Model</a> | Jun 2023</motion.li>
                  <motion.li>
                    <a href="https://github.com/dlustre/aimtrainerv2" target="_blank" className="font-semibold hover:text-sky-400 hover:underline">Aim Trainer Web Game</a> | Aug 2023
                  </motion.li>
                  <motion.li><a href="https://github.com/dlustre/TicTacTwo" target="_blank" className="font-semibold hover:text-sky-400 hover:underline">Tic-Tac-Toe Discord Bot</a> | Sep 2023</motion.li>
                </motion.ul>
              </motion.div>}
              {index === 3 && <motion.div initial={{
                opacity: 0,
              }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="mt-10 text-xl lg:text-4xl text-slate-300"
              >
                <a href="mailto:dennis.lustre@gmail.com" className="font-semibold hover:text-sky-400 hover:underline">dennis.lustre@gmail.com</a>
                <div className="flex gap-8 mt-10">
                  <a href="https://github.com/dlustre" target="_blank">
                    <svg className="transition-all opacity-50 hover:opacity-100" role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path fill="#ffffff" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/dennis-lustre/" target="_blank">
                    <svg className="transition-all opacity-50 hover:opacity-100" role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path fill="#ffffff" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                </div>
              </motion.div>}
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div animate={{
        background: linearGradients[activeCard % linearGradients.length],
        // scale: scales[activeCard % scales.length],
      }}
        className="sticky overflow-hidden hidden min-w-72 h-[45vh] bg-white rounded-md lg:block w-[32vw] top-56 right-20 shadow-lg"
      >
        <div className="relative w-full h-full">
          <motion.div
            className={`${activeCard === 0 ? 'block' : 'hidden'} absolute inset-0 flex flex-col gap-1 p-4 text-[5.7rem] leading-none text-slate-100`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: activeCard === 0 ? 1 : 0,
            }}
          >
            <p className="italic font-bold">Developer</p>
            <p className="italic">Designer</p>
            <p className="italic font-extrabold">Engineer</p>
            <p className="italic font-semibold">Innovator</p>
          </motion.div>
          <motion.div
            className={`${activeCard === 1 ? 'block' : 'hidden'} absolute inset-0 p-4 text-slate-100`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: activeCard === 1 ? 1 : 0,
            }}
          >
            <p className="text-4xl font-bold">The tech I use:</p>
            <div className="flex flex-wrap gap-2 mt-4 drop-shadow-2xl">
              <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
              <img src="https://img.shields.io/badge/next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="next" />
              <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react" />
              <img src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase" alt="firebase" />
              <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="node" />
              <img src="https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220" alt="pnpm" />
              <img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm" />
              <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="docker" />
              <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="prisma" />
              <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="tailwind" />
              <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" alt="react-query" />
              <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white" alt="github-actions" />
              <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="postman" />
            </div>
          </motion.div>
          <motion.div
            className={`${activeCard === 2 ? 'block' : 'hidden'} absolute inset-0 flex flex-col w-full h-full gap-2 p-4 text-slate-100`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: activeCard === 2 ? 1 : 0,
            }}
          >
            <p className="text-7xl font-bold">My <a href="/LaTeX/resume.pdf" target="_blank" className="italic font-extrabold text-[rgb(5,5,5)] hover:text-slate-100 underline transition-all">resume</a>{` has more details`}</p>
          </motion.div>
          <motion.div
            className={`${activeCard === 3 ? 'block' : 'hidden'} absolute inset-0 flex flex-col gap-2 p-4 text-slate-100`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: activeCard === 3 ? 1 : 0,
            }}
          >
            <p className="text-4xl font-bold">Scan for my contact info</p>
            <div className="flex flex-col items-center justify-center bg-white mx-10 p-8 rounded bg-opacity-20">
              <div className="bg-white size-[190px] flex justify-center items-center rounded-lg drop-shadow-xl">
                <Image src="/qr.jpg" alt="qr" width={175} height={175} />
              </div>
              <div className="flex gap-8 mt-8">
                <a href="https://github.com/dlustre" target="_blank">
                  <svg className="transition-all opacity-50 hover:opacity-100" role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/dennis-lustre/" target="_blank">
                  <svg className="transition-all opacity-50 hover:opacity-100" role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div >
  );
};