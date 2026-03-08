import { motion } from 'framer-motion';
import { messages } from '../data/messages';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
};

export default function ButtonGrid({ onOpen, showHidden }) {
  const messageKeys = Object.keys(messages).filter(key => {
    if (messages[key].hidden && !showHidden) return false;
    return true;
  });

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full px-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {messageKeys.map((key) => {
        const msg = messages[key];
        return (
          <motion.button
            key={key}
            variants={item}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpen(key)}
            className={`
              relative overflow-hidden
              group w-full py-8 px-6 rounded-3xl
              bg-white/80 backdrop-blur-md shadow-xl border border-white/40
              flex flex-col items-center justify-center gap-4
              transition-all duration-300
              hover:shadow-2xl hover:bg-white/95
            `}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${msg.color} transition-opacity duration-300`} />
            <div className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">
              {msg.emoji}
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 text-center tracking-tight z-10">
              {msg.title}
            </h2>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
