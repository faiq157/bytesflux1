"use client";
import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, Engine } from 'tsparticles';
import { useTheme } from 'next-themes';
const ElectricParticles: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Particles loaded callback
  }, []);

  return (
    <Particles
      id="electric-particles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'attract',
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 10,
            },
            attract: {
              distance: 200,
              duration: 0.4,
              factor: 5,
            },
          },
        },
        particles: {
          color: {
            value: [
              isDark ? '#60a5fa' : '#3b82f6',
              isDark ? '#06b6d4' : '#0891b2',
              isDark ? '#8b5cf6' : '#7c3aed',
            ],
          },
          links: {
            color: isDark ? '#60a5fa' : '#3b82f6',
            distance: 100,
            enable: true,
            opacity: isDark ? 0.4 : 0.3,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.1,
            },
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: true,
            speed: 2,
            straight: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 60,
          },
          opacity: {
            value: { min: 0.3, max: 0.8 },
            animation: {
              enable: true,
              speed: 3,
              minimumValue: 0.1,
              sync: false,
            },
          },
          shape: {
            type: ['circle', 'triangle'],
          },
          size: {
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 5,
              minimumValue: 0.5,
              sync: false,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
            },
          },
          life: {
            count: 0,
            delay: {
              random: {
                enable: true,
                minimumValue: 0.5,
              },
              value: 1,
            },
            duration: {
              random: {
                enable: true,
                minimumValue: 5,
              },
              value: 10,
            },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-10 opacity-60"
    />
  );
};

export default ElectricParticles;