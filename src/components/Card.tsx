import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface CardProps {
  term: string;
  definition: string;
  example: string;
  wordType: string;
  wordFamily?: string[];
  isFlipped: boolean;
  isCustomCard?: boolean;
  onClick: () => void;
  onDelete?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  term, 
  definition, 
  example, 
  wordType, 
  wordFamily, 
  isFlipped,
  isCustomCard,
  onClick,
  onDelete
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      const confirmDelete = window.confirm(`Are you sure you want to delete the card "${term}"? This action cannot be undone.`);
      if (confirmDelete) {
        onDelete();
      }
    }
  };

  return (
    <motion.div
      className="w-96 h-64 cursor-pointer perspective-1000 relative group"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isCustomCard && onDelete && (
        <motion.button
          onClick={handleDelete}
          className="absolute -top-3 -right-3 z-20 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      )}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className={`absolute w-full h-full bg-white rounded-xl shadow-lg p-6 backface-hidden
          ${!isFlipped ? 'z-10' : 'invisible'}`}>
          <div className="flex flex-col h-full justify-between">
            <span className="text-sm font-medium text-indigo-600 uppercase">{wordType}</span>
            <h2 className="text-2xl font-bold text-center text-gray-800">{term}</h2>
            <div className="text-sm text-gray-500 text-center">Click to flip</div>
          </div>
        </div>
        
        <div className={`absolute w-full h-full bg-indigo-50 rounded-xl shadow-lg p-6 backface-hidden
          ${isFlipped ? 'z-10' : 'invisible'}`}
          style={{ transform: 'rotateY(180deg)' }}>
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-3">
              <p className="text-gray-700"><span className="font-semibold">Definition:</span> {definition}</p>
              <p className="text-gray-700"><span className="font-semibold">Example:</span> {example}</p>
              {wordFamily && wordFamily.length > 0 && (
                <p className="text-gray-700">
                  <span className="font-semibold">Word Family:</span> {wordFamily.join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
