"use client";
import React, { useCallback } from 'react';
// Temporarily disabled to avoid build issues
// import Particles from '@tsparticles/react';
// import { loadSlim } from '@tsparticles/slim';
// import type { Container, Engine } from '@tsparticles/engine';
// import { useTheme } from 'next-themes';

const ElectricParticles: React.FC = () => {
  // Temporarily disabled
  return null;
  
  // const { theme } = useTheme();
  // const particlesInit = useCallback(async (engine: Engine) => {
  //   await loadSlim(engine);
  // }, []);

  // const particlesLoaded = useCallback(async (container: Container | undefined) => {
  //   // console.log(container);
  // }, []);

  // return (
  //   <Particles
  //     id="electric-particles"
  //     init={particlesInit}
  //     loaded={particlesLoaded}
  //     options={{
  //       background: {
  //         color: {
  //           value: theme === 'dark' ? '#0f172a' : '#ffffff',
  //         },
  //       },
  //       fpsLimit: 120,
  //       interactivity: {
  //         events: {
  //           onClick: {
  //             enable: true,
  //             mode: 'push',
  //           },
  //           onHover: {
  //             enable: true,
  //             mode: 'repulse',
  //           },
  //           resize: {
  //             enable: true,
  //           },
  //         },
  //         modes: {
  //           push: {
  //             quantity: 4,
  //           },
  //           repulse: {
  //             distance: 200,
  //             duration: 0.4,
  //           },
  //         },
  //       },
  //       particles: {
  //         color: {
  //           value: theme === 'dark' ? '#3b82f6' : '#1e40af',
  //         },
  //         links: {
  //           color: theme === 'dark' ? '#3b82f6' : '#1e40af',
  //           distance: 150,
  //           enable: true,
  //           opacity: 0.5,
  //           width: 1,
  //         },
  //         move: {
  //           direction: 'none',
  //           enable: true,
  //           outModes: {
  //             default: 'bounce',
  //           },
  //           random: false,
  //           speed: 2,
  //           straight: false,
  //         },
  //         number: {
  //           density: {
  //             enable: true,
  //             area: 800,
  //           },
  //           value: 80,
  //         },
  //         opacity: {
  //           value: 0.5,
  //         },
  //         shape: {
  //           type: 'circle',
  //         },
  //         size: {
  //           value: { min: 1, max: 5 },
  //         },
  //       },
  //       detectRetina: true,
  //     }}
  //   />
  // );
};

export default ElectricParticles;