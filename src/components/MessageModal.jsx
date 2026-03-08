import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, Music, Video } from 'lucide-react';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modal = {
  hidden: { scale: 0.5, opacity: 0, y: 50 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 } 
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

export default function MessageModal({ isOpen, message, onClose }) {
  if (!message) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-lg bg-white overflow-y-auto max-h-[90vh] rounded-[2rem] shadow-2xl p-6 sm:p-10 m-4 scrollbar-hide"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            {/* Background design accents */}
            <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-br ${message.color} opacity-20 blur-3xl`} />
            <div className={`absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-tl ${message.color} opacity-20 blur-3xl`} />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:scale-110 active:scale-90 transition-all z-10 p-2 bg-gray-50/50 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>

            <div className="relative z-10 flex flex-col items-center">
              <motion.div 
                className="text-6xl mb-6 shadow-xl w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-b from-white to-pink-50 border border-white/50"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.6, duration: 1 }}
              >
                {message.emoji}
              </motion.div>
              
              <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-500 mb-6 text-center leading-tight">
                {message.title}
              </h2>
              
              <motion.div 
                className="prose prose-pink text-center max-w-none text-gray-700 text-lg sm:text-lg font-medium leading-relaxed bg-pink-50/50 p-6 rounded-2xl relative shadow-inner border border-pink-100 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="absolute -top-3 -left-3 text-pink-300" size={24} />
                <p className="mb-4 whitespace-pre-line text-left leading-relaxed">{message.content}</p>

                {/* Optional Media Players */}
                {message.audioUrl && (
                  <div className="mt-4 flex flex-col items-center bg-white/60 p-3 rounded-xl border border-pink-100/50">
                    <div className="flex items-center gap-2 mb-2 text-pink-500 font-semibold text-sm">
                      <Music size={16} /> Voice Note
                    </div>
                    <audio controls className="w-full h-10 outline-none rounded-full">
                      <source src={message.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}

                {message.videoUrl && (
                  <div className="mt-4 flex flex-col items-center bg-white/60 p-3 rounded-xl border border-pink-100/50">
                    <div className="flex items-center gap-2 mb-2 text-purple-500 font-semibold text-sm">
                      <Video size={16} /> Memory Video
                    </div>
                    <video controls className="w-full rounded-lg shadow-md border border-white/50">
                      <source src={message.videoUrl} type="video/mp4" />
                      Your browser does not support the video element.
                    </video>
                  </div>
                )}

                <Heart className="absolute -bottom-3 -right-3 text-pink-300 fill-pink-50 transition-colors" size={24} />
              </motion.div>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full mt-8 py-4 px-6 rounded-full font-bold text-white shadow-lg bg-gradient-to-r ${message.color} hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
              >
                Close Message <Heart fill="currentColor" size={18} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
