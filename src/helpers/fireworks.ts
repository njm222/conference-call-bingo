// A helper function to handle the fireworks on win

import confetti from 'canvas-confetti';

const duration = 2000;
const defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 0 };
let interval: NodeJS.Timeout;

// return random number in the range min - max
const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const firework = () => {
  // reset animation
  const animationEnd = Date.now() + duration;
  clearInterval(interval);

  // animate
  interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    // end animation
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 75 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 150);
};

export default firework;
