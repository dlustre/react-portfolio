"use client";
import React from "react";
import { Transition, Variants, useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";

export const StickyScroll = () => {
  const [activeCard, setActiveCard] = React.useState(0);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [animationEnd, setAnimationEnd] = React.useState(false);
  const bgImageUrl = "/AU-FG-Texture6-8K.jpg";

  React.useEffect(() => {
    const img = new Image();
    img.src = bgImageUrl;
    img.onload = () => setImageLoaded(true);
  }, [bgImageUrl]);

  const transition: Transition = {
    y: {
      type: 'spring',
      stiffness: 100,
      damping: 30,
      mass: 0.5,
    }
    // staggerChildren: 0.5,
  };


  const containerVariants: Variants = {
    hidden: {
    },
    visible: {
      transition: {
        // delayChildren: 0.2, // this will set a delay before the children start animating
        // when: "afterChildren", // this will set the delay before the children start animating
        staggerChildren: 0.4 // this will set the time inbetween children animation
      },
    }
  };

  const svgVariants: Variants = {
    hidden: {
      pathLength: 0,
      fill: "rgba(0,0,0,0)",
      strokeWidth: "0.55",
      stroke: "rgba(0,0,0,0)",
    },
    visible: {
      pathLength: 1,
      fill: "rgba(255, 255, 255, 1)",
      strokeWidth: 0,
      stroke: "rgba(255, 255, 255, 1)",
      transition: {
        pathLength: { type: "spring", duration: 4, bounce: 0 },
        fill: { delay: 1 + 5, duration: 0.5 },
        opacity: { delay: 1, duration: 0.01 },
        strokeWidth: {
          delay: 1 + 5,
          duration: 0.5,
        }
      }
    },
  };


  // const ref = React.useRef<any>(null);
  // const { scrollYProgress } = useScroll({
  //   container: ref,
  //   offset: ["start start", "end start"],
  // });

  // const bgImageWidth = 8000;
  // const bgImageHeight = 5360;

  // const backgroundImages = [
  //   "url(/AU-FG-Texture6-8K.jpg)",
  //   "url(/AU-FG-Texture1-8K.jpg)",
  //   "url(/AU-FG-Texture5-8K.jpg)",
  //   "url(/AU-FG-Texture4-8K.jpg)",
  // ]

  // const cardLength = titles.length;

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   const cardsBreakpoints = titles.map((_, index) => index / cardLength);
  //   cardsBreakpoints.forEach((breakpoint, index) => {
  //     if (latest > breakpoint - 0.2 && latest <= breakpoint) {
  //       setActiveCard(() => index);
  //     }
  //   });
  // });

  const sectionTitles = [
    "ABOUT",
    "WORK",
    "CONTACT",
  ];

  const [startY, setStartY] = React.useState(0);

  function handleScroll(e: React.WheelEvent) {
    if (e.deltaY > 0 && activeCard < sectionTitles.length - 1) {
      setActiveCard(prevCard => prevCard + 1);
    } else if (e.deltaY < 0) {
      setActiveCard(prevCard => prevCard > 0 ? prevCard - 1 : 0);
    }
  }

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setStartY(e.touches[0].clientX);
  }

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const endY = e.changedTouches[0].clientX;
    if (startY > endY + 50 && activeCard < sectionTitles.length - 1) {
      setActiveCard(prevCard => prevCard + 1);
    } else if (startY < endY - 50) {
      setActiveCard(prevCard => prevCard > 0 ? prevCard - 1 : 0);
    }
  }

  if (!imageLoaded || !animationEnd) {
    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 0.5,
          // repeat: 1,
          // repeatType: "reverse",

        }}
        onAnimationComplete={() => setAnimationEnd(true)}
        className="h-screen w-screen flex items-center justify-center dark:text-slate-100 text-neutral-900 font-bold text-[2vw] overflow-hidden bg-none"
        id="loading"
      >
        LOADING
      </motion.div>
    );
  }

  return (
    <motion.div
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="overscroll-none"
    >
      <motion.div
        className={`absolute left-0 h-screen flex flex-col items-center justify-center gap-20 w-[14vw] z-10 hover:backdrop-blur backdrop-brightness-50 hover:opacity-100 transition-all duration-300 ease-linear`}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
            delay: 0.5,
          }
        }}
      >
        {sectionTitles.map((title, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-2 w-full`}
          >
            <motion.div className={`h-[2px] bg-slate-100`}
              initial={{
                width: 40,
              }}
              animate={{
                width: activeCard === index ? 60 : 40,
                transition: {
                  type: 'just',
                }
              }}
            />
            <motion.button
              onClick={() => setActiveCard(index)}
              className={`${activeCard === index ? 'opacity-100' : 'opacity-50'} text-[1.5vw] font-semibold tracking-wide text-slate-100 px-4 transition-all duration-300 ease-linear`}
            >
              {title}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className={`bg-[url(/AU-FG-Texture6-8K.jpg)] bg-contain h-screen w-screen overflow-hidden overscroll-none`}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
            delay: 0.5,
          }
        }}
      >
        <motion.div
          className={`flex flex-col items-center justify-center w-screen h-screen text-slate-100`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: activeCard === 0 ? 1 : 0.3,
            y: activeCard === 0 ? 0 : "-100vh",
            transition,
          }}
        >
          <motion.p className="font-extrabold text-[7vw]">DENNIS LUSTRE</motion.p>
          <motion.p className="font-extrabold text-[1vw] w-1/2 text-slate-300">{`HI, I'M DENNIS`}</motion.p>
          <motion.p className="font-extrabold text-[1vw] w-1/2 text-slate-300 mt-10 underline underline-offset-4 decoration-2">{`I BUILD SOFTWARE THAT HELPS PEOPLE.`}</motion.p>
        </motion.div>
        <motion.div
          className={`flex flex-col items-center justify-center w-screen h-screen text-slate-100`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: activeCard === 1 ? 1 : 0.3,
            y: activeCard === 1 ? "-100vh" : activeCard < 1 ? 0 : "-200vh",
            transition,
          }}
        >
          <p className="font-extrabold text-[3vw] w-1/2 text-slate-100 leading-none">{`THIS IS WHAT I'M UP TO`}</p>
          <p className="font-bold text-[1.1vw] text-slate-300 w-1/2 mb-10 leading-none">
            my <a href="/LaTeX/resume.pdf" target="_blank" className="italic font-extrabold text-[rgb(5,5,5)] transition-all px-1 leading-loose bg-blue-500 hover:bg-slate-100">resume</a>{` has more details`}
          </p>
          <motion.ul className="flex flex-col gap-10 text-[1.5vw] w-1/2 pr-[15vw] mb-10">
            <motion.li>
              <div className="flex justify-between">
                <p className="font-bold">SOFTWARE DEVELOPER</p>
                <p className="font-semibold text-slate-300">NOV 2023</p>
              </div>
              <p className="text-slate-400 italic text-[1.3vw]">ICSSC (<a href='https://github.com/icssc/ZotMeal' target='_blank' className="font-bold text-sky-400 hover:underline">ZOTMEAL</a>)</p>
            </motion.li>
            <motion.li>
              <div className="flex justify-between">
                <p className="font-bold">SOFTWARE ENGINEER INTERN</p>
                <p className="font-semibold text-slate-300">JULY 2023</p>
              </div>
              <p className="text-slate-400 italic text-[1.3vw]">THADDEUS RESOURCE CENTER</p>
            </motion.li>
            <motion.li>
              <div className="flex justify-between">
                <p className="font-bold">COMPUTER SCIENCE</p>
                <p className="font-semibold text-slate-300">SEP 2020</p>
              </div>
              <p className="text-slate-400 italic text-[1.3vw]">UNIVERSITY OF CALIFORNIA, IRVINE</p>
            </motion.li>
          </motion.ul>
          <p className="font-extrabold text-[2vw] w-1/2 mb-4">THIS IS WHAT I USE</p>
          <motion.div
            className="w-1/2 flex gap-4 pr-60"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg">
              <title>TypeScript</title>
              <motion.path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
                variants={svgVariants}
              />
            </svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>React</title><motion.path variants={svgVariants} fill="white" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" /></svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>Next.js</title><motion.path variants={svgVariants} fill="white" d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" /></svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>Docker</title><motion.path variants={svgVariants} fill="white" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" /></svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>PostgreSQL</title><motion.path variants={svgVariants} fill="white" d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z" /></svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>Prisma</title><motion.path variants={svgVariants} fill="white" d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z" /></svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>tRPC</title><motion.path variants={svgVariants} fill="white" d="M24 12c0 6.62-5.38 12-12 12S0 18.62 0 12 5.38 0 12 0s12 5.38 12 12ZM1.21 12A10.78 10.78 0 0 0 12 22.79 10.78 10.78 0 0 0 22.79 12 10.78 10.78 0 0 0 12 1.21 10.78 10.78 0 0 0 1.21 12Zm10.915-6.086 2.162 1.248a.25.25 0 0 1 .125.217v1.103l2.473 1.428a.25.25 0 0 1 .125.217v2.355l.955.551a.25.25 0 0 1 .125.217v2.496a.25.25 0 0 1-.125.217l-2.162 1.248a.25.25 0 0 1-.25 0l-.956-.552-2.472 1.427a.25.25 0 0 1-.25 0l-2.472-1.427-.956.552a.25.25 0 0 1-.25 0l-2.162-1.248a.25.25 0 0 1-.125-.217V13.25a.25.25 0 0 1 .125-.217l.955-.551v-2.355a.25.25 0 0 1 .125-.217l2.473-1.428V7.38a.25.25 0 0 1 .125-.217l2.162-1.248a.25.25 0 0 1 .25 0Zm1.268 10.049a.25.25 0 0 1-.125-.217V13.25a.25.25 0 0 1 .125-.217l2.16-1.248a.25.25 0 0 1 .25 0l.707.408v-1.922l-2.098-1.21v.814a.25.25 0 0 1-.125.217l-2.162 1.248a.25.25 0 0 1-.25 0l-2.162-1.248a.25.25 0 0 1-.125-.217V9.06L7.49 10.271v1.922l.707-.408a.25.25 0 0 1 .25 0l2.16 1.248a.25.25 0 0 1 .125.217v2.496a.25.25 0 0 1-.125.217l-.705.408L12 17.582l2.098-1.211ZM10.088 9.73l1.662.96V8.766l-1.662-.955Zm3.824 0V7.811l-1.662.955v1.924ZM12 6.418l-1.66.96 1.66.954 1.66-.954Zm-5.59 9.184 1.66.958v-1.921l-1.66-.956Zm3.822 0v-1.92l-1.662.957v1.923Zm-1.91-3.311-1.662.96 1.661.955 1.66-.956Zm5.446 3.31 1.66.96v-1.922l-1.66-.956Zm3.822 0v-1.918l-1.662.956v1.922Zm-1.912-3.31-1.66.96 1.66.955 1.66-.956Z" /></svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>Zod</title><motion.path variants={svgVariants} fill="white" d="M19.088 2.477 24 7.606 12.521 20.485l-.925 1.038L0 7.559l5.108-5.082h13.98Zm-17.434 5.2 6.934-4.003H5.601L1.619 7.636l.035.041Zm12.117-4.003L3.333 9.7l2.149 2.588 10.809-6.241-.2-.346 2.851-1.646-.365-.381h-4.806Zm7.52 2.834L8.257 14.034h5.101v-.4h3.667l5.346-5.998-1.08-1.128Zm-7.129 10.338H9.268l2.36 2.843 2.534-2.843Z" /></svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>Firebase</title><motion.path variants={svgVariants} fill="white" d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z" /></svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>Cypress</title><motion.path variants={svgVariants} fill="white" d="M11.998.0195c-.8642 0-1.6816.1101-2.1445.1934v.002C4.1731 1.2283 0 6.1368 0 12.0018c0 1.1265.1573 2.2328.4648 3.3028.0387.1453.0915.2993.1368.4473 1.607 4.865 6.2245 8.226 11.3925 8.2285.0651 0 .2518-.0003.502-.0118.8564-.0353 1.6228-.5734 1.9512-1.369l.4736-1.1544L20.4258 8.043H18.621l-2.3164 5.871-2.334-5.871h-1.9082l3.2734 8.0117c-.8115 1.9702-1.6252 3.9395-2.4355 5.9101-.0808.1945-.2655.3284-.4727.336-.144.005-.285.0098-.4316.0098-4.5848 0-8.6672-3.0695-9.9277-7.4649a10.3058 10.3058 0 0 1-.3985-2.8437c0-5.0887 3.6521-9.3404 8.6035-10.164.2214-.037.8885-.1446 1.7246-.1446 4.4166 0 8.269 2.732 9.7305 6.8476.0558.144.0977.293.1465.4395.299.9746.4531 1.9887.4531 3.0215 0 4.5696-2.9413 8.5326-7.3164 9.8613l.4863 1.5996c5.085-1.546 8.4995-6.1518 8.502-11.459 0-1.5491-.2983-2.8706-.6504-3.8926-.0432-.1212-.0873-.2422-.1309-.3633h-.002C21.4577 3.0954 17.0444.0195 11.998.0195ZM8.4336 7.8906c-1.1999 0-2.1747.3852-2.9805 1.1758-.8007.7856-1.205 1.7736-1.205 2.9356 0 1.1544.4068 2.1368 1.205 2.9199.8058.7906 1.7806 1.1738 2.9805 1.1738 1.705 0 3.1556-.955 3.7871-2.4883l.0332-.082-1.6289-.5547c-.168.4563-.7552 1.4883-2.1914 1.4883-.6745 0-1.2437-.2344-1.6934-.6992-.4572-.4699-.6875-1.0632-.6875-1.7578 0-.6998.2253-1.2809.6875-1.7735.4522-.4648 1.019-.7012 1.6934-.7012 1.438 0 2.0238 1.0815 2.1934 1.4883l1.627-.5527-.0333-.084c-.629-1.5358-2.082-2.4883-3.7871-2.4883Z" /></svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>Vitest</title><motion.path variants={svgVariants} fill="white" d="M13.74024 1.05293a.49504.49504 0 0 0-.1569.02512.49338.49338 0 0 0-.25056.1876L7.59513 9.56159a.4895.4895 0 0 0-.08373.22327.48846.48846 0 0 0 .03163.23629.4893.4893 0 0 0 .13985.19319.4927.4927 0 0 0 .2149.10481l3.70685.78609-.22947 4.58007a.48834.48834 0 0 0 .08466.30017.49205.49205 0 0 0 .24931.18854c.10157.03398.21174.03444.3135.00064a.49387.49387 0 0 0 .25056-.18761l5.73735-8.29594a.4884.4884 0 0 0 .08404-.22327c.009-.08015-.0016-.16137-.03163-.23629a.48835.48835 0 0 0-.13985-.19319.49318.49318 0 0 0-.2149-.1048l-3.70686-.7861.22947-4.58008a.48802.48802 0 0 0-.08466-.30017.4913.4913 0 0 0-.24931-.18853.49439.49439 0 0 0-.1566-.02574zM1.15697 9.78795c-.30647.0012-.60009.12378-.81679.34048a1.16107 1.16107 0 0 0-.34017.81648 1.162 1.162 0 0 0 .33366.81957l10.84241 10.8421a1.15762 1.15762 0 0 0 .37677.25211 1.1583 1.1583 0 0 0 .44467.08838c.00084 0 .0016-.00031.0025-.00031.00073 0 .0014.00031.0022.00031a1.15827 1.15827 0 0 0 .44467-.08838 1.15731 1.15731 0 0 0 .37677-.2521l10.84236-10.8421a1.16272 1.16272 0 0 0 .33397-.81958c-.0013-.30647-.12376-.59976-.34048-.81648a1.1616 1.1616 0 0 0-.81679-.34048 1.16114 1.16114 0 0 0-.81926.33366l-5.4012 5.4009c-.0078.0074-.01718.01255-.02482.02015L12 20.14011l-4.59776-4.59745c-.0074-.0074-.01659-.01238-.02419-.01954l-5.4015-5.40151a1.162 1.162 0 0 0-.81958-.33366Z" /></svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>Jest</title><motion.path variants={svgVariants} fill="white" d="M22.251 11.82a3.117 3.117 0 0 0-2.328-3.01L22.911 0H8.104L11.1 8.838a3.116 3.116 0 0 0-2.244 2.988c0 1.043.52 1.967 1.313 2.536a8.279 8.279 0 0 1-1.084 1.244 8.14 8.14 0 0 1-2.55 1.647c-.834-.563-1.195-1.556-.869-2.446a3.11 3.11 0 0 0-.91-6.08 3.117 3.117 0 0 0-3.113 3.113c0 .848.347 1.626.903 2.182-.048.097-.097.195-.146.299-.465.959-.993 2.043-1.195 3.259-.403 2.432.257 4.384 1.849 5.489A5.093 5.093 0 0 0 5.999 24c1.827 0 3.682-.917 5.475-1.807 1.279-.632 2.599-1.292 3.898-1.612.48-.118.98-.187 1.508-.264 1.07-.153 2.175-.312 3.168-.89a4.482 4.482 0 0 0 2.182-3.091c.174-.994 0-1.994-.444-2.87.298-.48.465-1.042.465-1.647zm-1.355 0c0 .965-.785 1.75-1.75 1.75a1.753 1.753 0 0 1-1.085-3.126l.007-.007c.056-.042.118-.084.18-.125 0 0 .008 0 .008-.007.028-.014.055-.035.083-.05.007 0 .014-.006.021-.006.028-.014.063-.028.097-.042.035-.014.07-.027.098-.041.007 0 .013-.007.02-.007.028-.007.056-.021.084-.028.007 0 .02-.007.028-.007.034-.007.062-.014.097-.02h.007l.104-.022c.007 0 .02 0 .028-.007.028 0 .055-.007.083-.007h.035c.035 0 .07-.007.111-.007h.09c.028 0 .05 0 .077.007h.014c.055.007.111.014.167.028a1.766 1.766 0 0 1 1.396 1.723zM10.043 1.39h10.93l-2.509 7.4c-.104.02-.208.055-.312.09l-2.64-5.385-2.648 5.35c-.104-.034-.216-.055-.327-.076l-2.494-7.38zm4.968 9.825a3.083 3.083 0 0 0-.938-1.668l1.438-2.904 1.452 2.967c-.43.43-.743.98-.868 1.605H15.01zm-3.481-1.098c.034-.007.062-.014.097-.02h.02c.029-.008.056-.008.084-.015h.028c.028 0 .049-.007.076-.007h.271c.028 0 .049.007.07.007.014 0 .02 0 .035.007.027.007.048.007.076.014.007 0 .014 0 .028.007l.097.02h.007c.028.008.056.015.083.029.007 0 .014.007.028.007.021.007.049.014.07.027.007 0 .014.007.02.007.028.014.056.021.084.035h.007a.374.374 0 0 1 .09.049h.007c.028.014.056.034.084.048.007 0 .007.007.013.007.028.014.05.035.077.049l.007.007c.083.062.16.132.236.201l.007.007a1.747 1.747 0 0 1 .48 1.209 1.752 1.752 0 0 1-3.502 0 1.742 1.742 0 0 1 1.32-1.695zm-6.838-.049c.966 0 1.751.786 1.751 1.751s-.785 1.751-1.75 1.751-1.752-.785-1.752-1.75.786-1.752 1.751-1.752zm16.163 6.025a3.07 3.07 0 0 1-1.508 2.133c-.758.438-1.689.577-2.669.716a17.29 17.29 0 0 0-1.64.291c-1.445.355-2.834 1.05-4.182 1.717-1.724.854-3.35 1.66-4.857 1.66a3.645 3.645 0 0 1-2.154-.688c-1.529-1.056-1.453-3.036-1.272-4.12.167-1.015.632-1.966 1.077-2.877.028-.055.049-.104.077-.16.152.056.312.098.479.126-.264 1.473.486 2.994 1.946 3.745l.264.139.284-.104c1.216-.431 2.342-1.133 3.336-2.071a9.334 9.334 0 0 0 1.445-1.716c.16.027.32.034.48.034a3.117 3.117 0 0 0 3.008-2.327h1.167a3.109 3.109 0 0 0 3.01 2.327c.576 0 1.11-.16 1.57-.43.18.52.236 1.063.139 1.605z" /></svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>Postman</title><motion.path variants={svgVariants} fill="white" d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z" /></svg>
            <svg role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>Figma</title><motion.path variants={svgVariants} fill="white" d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" /></svg>
          </motion.div>
        </motion.div>
        <motion.div
          className={`flex flex-col items-center justify-center gap-4 w-screen h-screen text-slate-100`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: activeCard === 2 ? 1 : 0.3,
            y: activeCard === 2 ? "-200vh" : "-100vh",
            transition,
          }}
        >
          <p className="font-extrabold text-[3vw] w-1/2">{`LET'S CONNECT`}</p>
          <div className="text-[1.5vw] w-1/2 flex flex-col gap-4 text-slate-300">
            <a href="mailto:dennis.lustre@gmail.com" className="font-bold hover:text-sky-400 hover:underline">DENNIS.LUSTRE@GMAIL.COM</a>
            <div className="flex gap-8 pl-4">
              <a href="https://github.com/dlustre" target="_blank">
                <svg className="transition-all opacity-50 hover:opacity-100" role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><motion.path fill="#cbd5e1" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/dennis-lustre/" target="_blank">
                <svg className="transition-all opacity-50 hover:opacity-100" role="img" viewBox="0 0 24 24" width={50} height={50} xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><motion.path fill="#cbd5e1" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
          <p className="text-[1vw] font-bold w-1/2 text-slate-300 mt-20">SCAN FOR MY CONTACT</p>
          <div className="w-1/2 h-auto flex">
            <div className="bg-white w-[25%] h-auto flex justify-center items-center rounded-lg drop-shadow-xl">
              <img src='https://www.dennislustre.com/qr.jpg' alt="qr" className="size-[95%]" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};