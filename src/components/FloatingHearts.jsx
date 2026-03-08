import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useMemo } from 'react';

export default function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 15, // slower float
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-10%]"
          initial={{ 
            x: `${heart.x}vw`, 
            y: "0%", 
            opacity: 0,
            scale: heart.size / 20 
          }}
          animate={{
            y: "-120vh",
            opacity: [0, heart.opacity, heart.opacity, 0],
            x: [`${heart.x}vw`, `${heart.x + (Math.random() * 10 - 5)}vw`]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <Heart 
            className="text-pink-300 drop-shadow-sm" 
            fill="currentColor" 
            size={heart.size}
            strokeWidth={1}
          />
        </motion.div>
      ))}
    </div>
  );
}
