import React, { useState } from 'react';
import { Sun, Moon, Book, Briefcase, Award, Code, FileText, User, ChevronDown, ChevronUp } from 'lucide-react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const Section = ({ title, icon, children }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        {React.createElement(icon, { className: "mr-2" })}
        {title}
      </h2>
      {children}
    </div>
  );

  const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="mb-4">
        <button
          className="flex justify-between items-center w-full p-4 bg-gray-200 dark:bg-gray-700 rounded-t"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-semibold">{title}</span>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
        {isOpen && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-b">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">VIVEK THUMU</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </header>

        <Section title="Contact Information" icon={User}>
          <p>Krishna AP | s190783@rguktsklm.ac.in | +91 7032988615 | vivekthumu.me</p>
          <p>linkedin.com/in/vivek-thumu-179162250 | github.com/thumuvivek2003 | thumuvivek2003@gmail.com</p>
        </Section>

        <Section title="Education" icon={Book}>
          <ul className="list-disc list-inside">
            <li>RGUKT Srikakulam, B.Tech in Computer Science Engineering (CGPA: 8.6) Sept 2021 – Present</li>
            <li>RGUKT Srikakulam, Pre-University Course (PUC), MBiPC (CGPA: 9.68) June 2019 – May 2021</li>
            <li>ZPHS Addada, Tenth (Mandal First in all Government Schools, CGPA: 9.8) June 2018 – May 2019</li>
          </ul>
        </Section>

        <Section title="Experience" icon={Briefcase}>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Web Developer, eaZycart</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Remote | Sep 2023 – Present</p>
            <ul className="list-disc list-inside mt-2">
              <li>Developed a comprehensive e-commerce platform like Amazon, flipkart from scratch.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Web Developer, Placement Cell – RGUKT Srikakulam</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Apr 2024 – Present</p>
            <ul className="list-disc list-inside mt-2">
              <li>Created a web application for managing training and placement activities.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Web Team Member, RGUKT Srikakulam</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Dec 2022 – Feb 2024</p>
            <ul className="list-disc list-inside mt-2">
              <li>Developed and maintained static and dynamic web pages for the institute.</li>
              <li>Engaged in both frontend and backend development tasks in Samvedhan Technical fest</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">SGC Coding Club Joint Secretary, SGC Coding Club</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Jan 2023 – Mar 2024</p>
            <ul className="list-disc list-inside mt-2">
              <li>Conducted coding classes, organized exams, and promoted coding culture in campus.</li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Campus Ambassador, Sanfoundry</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Aug 2023 – Mar 2024</p>
            <ul className="list-disc list-inside mt-2">
              <li>Organized and conducted two exams on campus.</li>
            </ul>
          </div>
        </Section>

        <Section title="Projects" icon={Code}>
          <Accordion title="Python Projects">
            <ul className="list-disc list-inside">
              <li><strong>pyAutoQuerier:</strong> Opens multiple web pages simultaneously based on specified topics.</li>
              <li><strong>Birthday Wisher:</strong> Generates Art wishes with pattern generated using symbols.</li>
              <li><strong>Mark Extractor (PyAutoGui):</strong> Automates the extraction of grades of 300+ students, taking approximately 1 hour.</li>
              <li><strong>ISO Certificate Distribution:</strong> Generates QR codes with encryption and handles certificate distribution via email using Google Colab.</li>
            </ul>
          </Accordion>
          <Accordion title="Full Stack Projects">
            <ul className="list-disc list-inside">
              <li><strong>eaZycart:</strong> E-commerce store developed from scratch with user, admin, shopkeeper, and delivery boy interfaces.</li>
              <li><strong>QRIASS:</strong> QR integrated attendance management system for all student batches from PUC to BTech.</li>
              <li><strong>QR Dining System:</strong> Manages food distribution for large-scale events like Yaadein 2024.</li>
              <li><strong>Auction Live Interface:</strong> Provides real-time updates on bid prices and player names during auctions.</li>
              <li><strong>Wage Distributor:</strong> Manages plot details, tracks wages, and handles agricultural work expenses.</li>
              <li><strong>Placement Cell:</strong> Manages training and placement with interfaces for students, admins, recruiters, and coordinators.</li>
              <li><strong>Gate Interface:</strong> Assists GATE aspirants by providing real time GATE interface</li>
              <li><strong>Gate Video Tracker:</strong> Tracks the status of preparation for GATE aspirants.</li>
            </ul>
          </Accordion>
          <Accordion title="Minor Projects">
            <ul className="list-disc list-inside">
              <li><strong>Calculation Improver:</strong> Improves calculations for addition, subtraction, and multiplication.</li>
              <li><strong>Birthday Finder:</strong> Lists students whose birthdays fall on the current day.</li>
              <li><strong>Grade Calc:</strong> Calculates grades from PUC to BTech final year based on input grades.</li>
              <li><strong>Topic Searcher:</strong> Automatically searches Google for topics when list items are clicked.</li>
              <li><strong>Quick Caller:</strong> Facilitates easy calling, messaging, and WhatsApp communication for meetings.</li>
              <li><strong>Call Noter:</strong> Tracks and manages call notes for individuals.</li>
              <li><strong>Workout Timer:</strong> Customizable timer for workout routines.</li>
              <li><strong>FCFS, SJC Visualizers and Solvers:</strong> Visualizes and solves FCFS and SJC algorithms with spot calculations.</li>
              <li><strong>Type Perfector:</strong> Selectable text training tool for improving typing accuracy and speed.</li>
              <li><strong>Pick Revealor:</strong> A childhood game that reveals selections based on four sections.</li>
            </ul>
          </Accordion>
          <Accordion title="Micro Projects">
            <ul className="list-disc list-inside">
              <li><strong>Apple 50+ Calc:</strong> UI/UX design and operations for a calculator application.</li>
              <li><strong>Notification Panel:</strong> UI/UX and front-end design for a notification panel.</li>
              <li><strong>WhatsApp Homepage:</strong> UI/UX and front-end design for a WhatsApp homepage.</li>
              <li><strong>CopyPaste:</strong> Transfers and updates text links across the internet with real-time edits.</li>
            </ul>
          </Accordion>
          <Accordion title="React Projects">
            <ul className="list-disc list-inside">
              <li><strong>Instant QR Generator:</strong> Creates QR codes instantly from entered text.</li>
              <li><strong>Flash Cards:</strong> Easy tool for Quick Revision connected with Backend</li>
            </ul>
          </Accordion>
        </Section>

        <Section title="Skills" icon={Award}>
          <h3 className="font-semibold mb-2">Programming Languages:</h3>
          <p>PHP (5), Python (5), JavaScript (4), C Language (4), Java (3)</p>
          <h3 className="font-semibold mt-4 mb-2">Web Technologies:</h3>
          <p>PHP(5), HTML (5), CSS (5), Bootstrap (5), jQuery (5), MySQL (5), MongoDB (3), Express (3), React (3), Node.js (3)</p>
          <h3 className="font-semibold mt-4 mb-2">Other Skills:</h3>
          <p>Programming (5), Excel & Calc (3)</p>
          <h3 className="font-semibold mt-4 mb-2">Coding Profiles:</h3>
          <p>LeetCode DSA 300+, Leetcode MySQL 50+, Strong Foundation in every topic of DSA</p>
          <h3 className="font-semibold mt-4 mb-2">Soft Skills:</h3>
          <p>Team Spirit, Optimal Decision Making, Public Speaking, Loyalty, Open-mindedness, Sense of Humour</p>
        </Section>

        <Section title="Certifications" icon={FileText}>
          <ul className="list-disc list-inside">
            <li>Software Engineer Intern Certificate, HackerRank (Mar 2024)</li>
            <li>Joint Secretary of Coding Club, SGC CODING CLUB (May 2024)</li>
            <li>Online Campus Ambassador (Python), Sanfoundry (Aug 2023)</li>
            <li>Online Campus Ambassador (C), Sanfoundry (Jun 2023)</li>
            <li>Responsive Web Design, freeCodeCamp (Apr 2023)</li>
            <li>Python Programming Certification Test, Sanfoundry (Mar 2023)</li>
            <li>CSS Basic, HackerRank (Mar 2023)</li>
            <li>Python (Basic), HackerRank (Mar 2023)</li>
            <li>SQL (Basic), HackerRank (Sep 2023)</li>
            <li>SQL (Intermediate), HackerRank (Mar 2023)</li>
          </ul>
        </Section>
      </div>
    </div>
  );
};

export default Portfolio;