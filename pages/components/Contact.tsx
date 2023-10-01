import React from "react";
import config from "../index.json";
import ContactForm from "./ContactForm";

const Contact = () => {
  const contact = config.contact;
  return (
    <div id={contact.title} className="px-8 sm:px-12 md:px-32 pb-32 flex justify-center align-center flex-col bg-gradient-to-r from-green-300 via-teal-500 to-violet-500">
      <h2 className="mt-14 uppercase font-bold text-center text-white text-bold text-4xl">{contact.title}</h2>
      <ContactForm />
    </div>
  );
};

export default Contact;