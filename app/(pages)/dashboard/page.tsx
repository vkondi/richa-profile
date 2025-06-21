"use client";
import React, { useState } from "react";
import Popup from "@/components/Popup";
import Image from "next/image";

const welcomeTitle = "Welcome to the World of Numerology with Richa Sharma";
const welcomeDescription =
  "Embark on a transformative journey with Richa Sharma, a renowned Certified Numerologist. With a deep understanding of the mystical relationship between numbers and life events, Richa offers personalised guidance and empowers you to live a vibrant and meaningful life.";
const aboutTitle = "About Numerology";
const aboutDescription =
  "Numerology is the ancient study of numbers and their influence on human life. It is based on the idea that everything in the universe is interconnected and that numbers hold a special significance. As a Certified Numerologist, Richa Sharma uses this sacred knowledge to provide clarity and direction, helping individuals make informed decisions about their personal and professional lives.";
const servicesTitle = "Numerology Services";
const services = [
  {
    title: "Personal Numerology",
    description:
      "Gain insights into your personality, strengths, and challenges.",
  },
  {
    title: "Life Path Analysis",
    description:
      "Discover your life's purpose and the opportunities that lie ahead.",
  },
  {
    title: "Compatibility Analysis",
    description:
      "Understand the dynamics of your relationships with friends, family, and partners.",
  },
  {
    title: "Career Guidance",
    description:
      "Align your career choices with your numerological profile for success and fulfillment.",
  },
  {
    title: "Name and Date Correction",
    description:
      "Optimize your name and important dates to enhance your life's energy.",
  },
];
const insightsTitle = "Explore Numerology Insights";
const insights = [
  {
    title: "The Power of Numbers",
    description:
      "Numbers are not just mathematical symbols; they carry vibrational energy that influences our lives.",
  },
  {
    title: "Personalized Readings",
    description:
      "Each numerology reading is tailored to your unique numerical profile, providing personalized insights and guidance.",
  },
  {
    title: "Life Path Number",
    description:
      "Your Life Path Number reveals your life's purpose and the journey you are destined to take.",
  },
  {
    title: "Career and Numerology",
    description:
      "Align your career with your numerological profile to achieve success and satisfaction in your professional life.",
  },
];
const socialLinks = [
  {
    label: "Facebook",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.81.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.059 1.278.353 2.451 1.32 3.418.967.967 2.14 1.261 3.418 1.32C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.278-.059 2.451-.353 3.418-1.32.967-.967 1.261-2.14 1.32-3.418.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.278-.353-2.451-1.32-3.418-.967-.967-2.14-1.261-3.418-1.32C15.668.013 15.259 0 12 0z" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="18.406" cy="5.594" r="1.44" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.458 3.5 12 3.5 12 3.5s-7.458 0-9.386.574a2.994 2.994 0 0 0-2.112 2.112C0 8.114 0 12 0 12s0 3.886.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.542 20.5 12 20.5 12 20.5s7.458 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.886 24 12 24 12s0-3.886-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.11.55 4.162 1.59 5.98L0 24l6.26-1.64A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.72.98.99-3.62-.25-.38A9.96 9.96 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.28.7.9.86 1.08.16.18.32.2.6.07.28.14-1.18.44-2.25 1.4-.83.74-1.39 1.65-1.55 1.93-.16.28.02.43.12.57.13.13.28.34.42.51.14.17.18.29.28.48.09.19.05.36.02.5-.07.14.61 1.47.84 2.01.22.53.45.46.61.47.16.01.35.01.54.01.19 0 .5-.07.76-.34.26-.27 1-1 .97 2.43.03 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 5.02 4.22.7.24 1.25.38 1.68.49.71.18 1.36.15 1.87.09.57-.07 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
      </svg>
    ),
  },
];
const copyright = `Copyright © ${new Date().getFullYear()} Richa Sharma. All Rights Reserved`;

const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 px-2 sm:px-4 py-8 max-w-6xl mx-auto pt-[120px]">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row gap-6 items-start md:items-stretch">
        {/* Profile Picture: On mobile, show first; on desktop, show right and take at least 40% width */}
        <div className="order-1 md:order-2 w-full md:w-1/4 flex justify-center items-center">
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-full md:h-auto flex items-center justify-center mx-auto md:mx-0">
            <Image
              src="/images/richa_sharma.jpg"
              alt="Richa Sharma"
              width={500}
              height={500}
              className="object-cover w-40 h-40 sm:w-48 sm:h-48 md:w-full md:h-auto rounded-full md:rounded-lg"
            />
          </div>
        </div>
        {/* Description: On mobile, show after picture; on desktop, show left */}
        <div className="order-2 md:order-1 flex-1 rounded-lg shadow p-6 bg-background">
          <div className="font-bold text-xl md:text-2xl text-foreground mb-4 leading-8">
            {welcomeTitle}
          </div>
          <p className="text-s text-muted-foreground leading-7">
            {welcomeDescription}
          </p>
        </div>
      </section>

      {/* About Numerology */}
      <section className="rounded-lg shadow p-6 bg-background">
        <h3 className="font-semibold mb-2 text-foreground">{aboutTitle}</h3>
        <p className="text-sm text-muted-foreground">{aboutDescription}</p>
      </section>

      {/* Numerology Services */}
      <section className="rounded-lg shadow p-6 bg-background">
        <h3 className="font-semibold mb-4 text-foreground">{servicesTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="border rounded p-4 flex flex-col gap-2 bg-background border-gray-200 dark:border-gray-700"
            >
              <div className="font-semibold text-foreground">
                {service.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {service.description}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 px-6 py-2 rounded shadow hover:bg-gray-700 dark:hover:bg-gray-300 transition"
            onClick={() => setIsPopupOpen(true)}
          >
            BOOK SERVICE
          </button>
        </div>
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          title="Book Service"
        >
          <div className="text-center">
            [Booking form or details placeholder]
          </div>
        </Popup>
      </section>

      {/* Explore Numerology Insights */}
      <section className="rounded-lg shadow p-6 bg-background">
        <h3 className="font-semibold mb-4 text-foreground">{insightsTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {insights.map((insight) => (
            <div
              key={insight.title}
              className="border rounded p-4 flex flex-col gap-2 bg-background border-gray-200 dark:border-gray-700"
            >
              <div className="font-semibold text-foreground">
                {insight.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {insight.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Richa */}
      <section className="rounded-lg shadow p-6 bg-background">
        <h3 className="font-semibold mb-4 text-foreground">Contact Richa</h3>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 items-center">
          {socialLinks.map((item) => (
            <div
              key={item.label}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 shadow hover:scale-110 transition text-gray-600 dark:text-gray-200"
              title={item.label}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground mt-8">
        {copyright}
      </footer>
    </div>
  );
};

export default Dashboard;
