import { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import ButtonGrid from './components/ButtonGrid';
import MessageModal from './components/MessageModal';
import { messages } from './data/messages';
import { Heart } from 'lucide-react';

function App() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const handleOpenMessage = (key) => {
    setSelectedMessage(messages[key]);
  };

  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };

  const handleTitleClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen relative w-full flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <FloatingHearts />
      
      <div className="z-10 text-center mb-12 flex flex-col items-center select-none" onClick={handleTitleClick}>
        <div className="flex items-center gap-3 mb-2">
          <Heart className="text-pink-500 fill-pink-500 animate-pulse" size={32} />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-sm cursor-pointer hover:scale-105 transition-transform">
            Open When
          </h1>
          <Heart className="text-pink-500 fill-pink-500 animate-pulse delay-150" size={32} />
        </div>
        <p className="text-pink-400 font-medium text-lg mt-2 tracking-wide font-serif italic text-shadow-sm">A little something for you...</p>
      </div>

      <div className="z-10 w-full max-w-4xl">
        <ButtonGrid onOpen={handleOpenMessage} showHidden={clickCount >= 3} />
      </div>

      <MessageModal
        isOpen={!!selectedMessage}
        message={selectedMessage}
        onClose={handleCloseMessage}
      />
    </div>
  );
}

export default App;
