"use client";
import React from "react";
import { StickyScroll } from "@/components/sticky-scroll-reveal";

const content = [
  {
    title: "Dennis Lustre",
    description:
      "Hi, I'm Dennis, a full-stack developer with a passion for building beautiful and performant web apps. ",
    cardText: "Hi",
  },
  {
    title: "This is what I'm up to:",
    description:
      "",
    cardText: "",
  },
  {
    title: "Projects",
    description:
      "",
    cardText: "",
  },
  {
    title: "Contact",
    description:
      "dennis.lustre@gmail.com",
    cardText: "",
  },
];

export default function StickyScrollRevealDemo() {
  return <StickyScroll content={content} />;
}
