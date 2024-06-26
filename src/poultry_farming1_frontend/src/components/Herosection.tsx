import React from 'react';
import { motion } from 'framer-motion';
import Logo from "../assets/chickenlogo.jpg";
import Particles from "react-tsparticles";
import type { ISourceOptions } from "tsparticles-engine";
import { CardContainer, CardBody, CardItem } from '../components/ui/3d-card'; 

const HeroSection = () => {
  const particlesOptions: ISourceOptions = {
    background: {
      color: {
        value: "#100D28",
      },
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
        },
      },
    },
    particles: {
      color: {
        value: "#8906E6",
      },
      links: {
        color: "#FFFFFF",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
  };

  return (
    <div className="bg-i3m-dark text-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles id="tsparticles" options={particlesOptions} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="text-left md:w-1/2">
          <h1 className="text-4xl font-bold text-i3m-purple">POULTRY FARMING DAPP</h1>
          <p className="mt-3 text-white text-xl">
            This poultry farming management system uses the Azle library to interact with the Internet Computer (ICP). It sets up data structures and operations for managing poultry records, including broilers, layers, and eggs. Each poultry type (broiler, layer, and egg) has its respective record and payload schemas.
          </p>
          <h2 className="mt-4 text-2xl font-bold text-i3m-purple">Introduction</h2>
          <p className="mt-2 text-white">
            The system uses StableBTreeMap to ensure data persistence and leverages the Principal type for generating unique identifiers. Key operations include tracking the age, breed, availability, and sales of poultry, as well as managing detailed records that can be accessed via NFC tags for transparency and customer engagement.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-4 bg-i3m-pink hover:bg-i3m-purple text-white font-bold py-2 px-4 rounded shadow"
            aria-label="Learn More"
          >
            Learn More
          </motion.button>
        </div>
        <motion.img
          src={Logo}
          alt="Poultry Farming DApp Logo"
          className="w-full md:w-1/2 h-auto rounded-lg shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
      </div>

      {/* 3D Cards Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-center text-i3m-purple">Core Components</h2>
        <CardContainer containerClassName="mt-10 flex flex-wrap justify-center">
          <CardBody>
            <CardItem translateX={20} translateY={20} translateZ={50} rotateX={20} rotateY={20} rotateZ={0}>
              <h3 className="text-xl font-bold text-i3m-purple">Structures</h3>
              <ul className="text-white mt-2 list-disc list-inside">
                <li>PoultryRecord: General information about poultry, including createdAt, typeOfPoultry, age_weeks, feedType, vaccination_weeks, and nfcTagId.</li>
                <li>Broiler: Specific to broilers and includes fields like id, age_weeks, numberOfBroilers, breed, createdAt, available, and sold.</li>
                <li>Layer: Specific to layers and includes fields like id, age_weeks, numberOfLayers, breed, createdAt, available, and sold.</li>
                <li>Egg: Information about eggs, including id, breed, createdAt, available, sold, laidEggs, and damagedEggs.</li>
              </ul>
            </CardItem>
          </CardBody>
          <CardBody>
            <CardItem translateX={10} translateY={10} translateZ={30} rotateX={10} rotateY={10} rotateZ={0}>
              <h3 className="text-xl font-bold text-i3m-purple">Databases</h3>
              <ul className="text-white mt-2 list-disc list-inside">
                <li>PoultryRecords: A StableBTreeMap that stores general poultry records, making it possible to retrieve and update poultry information efficiently.</li>
                <li>Broilers: A StableBTreeMap that stores broiler records, managing data related to broiler chickens.</li>
                <li>Layers: A StableBTreeMap that stores layer records, managing data related to layer chickens.</li>
                <li>Eggs: A StableBTreeMap that stores egg records, managing data related to egg production and sales.</li>
              </ul>
            </CardItem>
          </CardBody>
          <CardBody>
            <CardItem translateX={10} translateY={10} translateZ={30} rotateX={10} rotateY={10} rotateZ={0}>
              <h3 className="text-xl font-bold text-i3m-purple">CRUD Functions</h3>
              <ul className="text-white mt-2 list-disc list-inside">
                <li>createPoultryRecord: Creates a new poultry record with specified details.</li>
                <li>createBroilers: Creates new broiler records.</li>
                <li>enterSoldBroilers: Updates broiler records to reflect sales.</li>
                <li>getAllBroilers: Retrieves all broiler records.</li>
                <li>enterLaidEggs: Adds laid eggs to the records.</li>
                <li>enterSoldEggs: Updates records with sold eggs.</li>
                <li>enterDamagedEggs: Updates records with damaged eggs.</li>
                <li>getAllEggs: Retrieves all egg records.</li>
              </ul>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
};

export default HeroSection;
