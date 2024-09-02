import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowLeft, Camera, BarChart2, User,MailCheck } from 'lucide-react';
import { MdDeveloperMode } from "react-icons/md";    // Material Design Icons
import { GrTest } from "react-icons/gr";             // Grommet Icons
import { PiStudentLight } from "react-icons/pi";     // Phosphor Icons (Light variant)
import { SiAzuredevops } from "react-icons/si";      // Simple Icons
import { BsCreditCard2Front } from "react-icons/bs"; // Bootstrap Icons
import { FaDatabase } from "react-icons/fa";         // Font Awesome Icons

const categories = [
  { name: 'Developers', icon:<MdDeveloperMode />, gradient: 'from-[#4fc3f7] to-[#2196f3]' },
  { name: 'Testers', icon:<GrTest />, gradient: 'from-[#b39ddb] to-[#673ab7]' },
  { name: 'Interns', icon: <PiStudentLight />, gradient: 'from-[#ff8a80] to-[#ff5252]' },
  { name: 'DevOps engineers', icon:<SiAzuredevops />, gradient: 'from-[#ffcc80] to-[#ff9800]' },
  { name: 'Front End Developers', icon:<BsCreditCard2Front />, gradient: 'from-[#81d4fa] to-[#03a9f4]' },
  { name: 'Back End Developers', icon:<FaDatabase />, gradient: 'from-[#a5d6a7] to-[#4caf50]' },
];

const Header = () => (
  <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-3xl p-6 shadow-lg mb-6">
    <div className="flex items-center justify-center space-x-3 mb-3">
      <MailCheck className="text-white w-8 h-8" />
      <h1 className="text-4xl text-bold text-white cedarville-cursive-regular">Email Batch Sender</h1>
    </div>
    <p className="text-white opacity-90 text-center">Collaborate & Connect with Each Other</p>
  </div>
);

const CategoryButton = ({ name, icon, gradient }) => (
  <Link to={`/batch/${ name.toLowerCase().replace(/\s+/g, '-')}`}>
      <button style={{background:'#3E416E'}} className={`w-full backdrop-blur-sm bg-white bg-opacity-20 rounded-2xl p-5 text-center transition transform hover:scale-105`}>
        <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-2xl bg-gradient-to-br ${gradient}`}>
          {icon}
        </div>
        <div className="text-white">{name}</div>
      </button>
    </Link>
);

const Navbar = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-80 flex justify-around p-3">
    <Camera className="text-white" />
    <BarChart2 className="text-white" />
    <User className="text-white" />
  </nav>
);

const Home = () => (
  <div style={{background:'#363465'}} className="bg-gray-900 min-h-screen text-white p-5">
    <div className="max-w-md mx-auto">
      <Header />
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <CategoryButton key={category.name} {...category} />
        ))}
      </div>
    </div>
    {/* <Navbar /> */}
  </div>
);

export default Home;