import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Printer } from 'lucide-react';
import { vocabularyData } from './data/vocabulary';
import { Card } from './components/Card';
import { AddCardForm } from './components/AddCardForm';
import { ImportButton } from './components/ImportButton';
import { ExportButton } from './components/ExportButton';
import { VocabularyCard } from './types/vocabulary';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set());
  const [selectedWordType, setSelectedWordType] = useState<string>('all');
  const [customCards, setCustomCards] = useState<VocabularyCard[]>([]);

  const allCards = [...vocabularyData, ...customCards];
  const filteredCards = selectedWordType === 'all'
    ? allCards
    : allCards.filter(card => card.wordType === selectedWordType);

  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && !reviewedCards.has(currentIndex)) {
      setScore(prev => prev + 1);
      setReviewedCards(prev => new Set(prev).add(currentIndex));
    }
  };

  const handleWordTypeChange = (type: string) => {
    setSelectedWordType(type);
    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewedCards(new Set());
    setScore(0);
  };

  const handleAddCard = (newCard: VocabularyCard) => {
    setCustomCards(prev => [...prev, newCard]);
  };

  const handleImportCards = (importedCards: VocabularyCard[]) => {
    setCustomCards(prev => [...prev, ...importedCards]);
  };

  const handleDeleteCard = () => {
    const isCustomCard = currentIndex >= vocabularyData.length;
    if (isCustomCard) {
      const customCardIndex = currentIndex - vocabularyData.length;
      setCustomCards(prev => {
        const newCards = [...prev];
        newCards.splice(customCardIndex, 1);
        return newCards;
      });
      
      if (currentIndex >= filteredCards.length - 1) {
        setCurrentIndex(prev => Math.max(0, prev - 1));
      }
      
      setIsFlipped(false);
      setReviewedCards(prev => {
        const newReviewed = new Set(prev);
        const adjustedReviewed = new Set<number>();
        newReviewed.forEach(index => {
          if (index < currentIndex) {
            adjustedReviewed.add(index);
          } else if (index > currentIndex) {
            adjustedReviewed.add(index - 1);
          }
        });
        return adjustedReviewed;
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const wordTypes = ['all', 'verb', 'noun', 'adjective', 'adverb'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center py-12">
      <div className="flex flex-col items-center gap-4 mb-8">
        <h1 className="text-4xl font-light tracking-wider text-indigo-400 italic">
          ESL FOR TECH
        </h1>
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-2">
            <AddCardForm onAddCard={handleAddCard} />
            <ExportButton cards={filteredCards} format="xlsx" />
            <ImportButton onImport={handleImportCards} />
            <button
              onClick={handlePrint}
              aria-label="Print vocabulary cards"
              title="Print all vocabulary cards"
              className="print:hidden p-2 bg-amber-500 text-white rounded-full shadow-md hover:bg-amber-600 transition-colors"
            >
              <Printer className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 max-w-md text-center">
            You can export a sample document first to see the correct format for importing your data. Use the exported file as a template for creating your import document.
          </p>
        </div>
      </div>

      <div className="mb-8 flex gap-2 print:hidden">
        {wordTypes.map(type => (
          <button
            key={type}
            onClick={() => handleWordTypeChange(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedWordType === type
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-indigo-50'}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {filteredCards.length > 0 ? (
        <div className="flex items-center gap-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed print:hidden"
            title="Previous card"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <Card
            term={currentCard.term}
            definition={currentCard.definition}
            example={currentCard.example}
            wordType={currentCard.wordType}
            wordFamily={currentCard.wordFamily}
            isFlipped={isFlipped}
            isCustomCard={currentIndex >= vocabularyData.length}
            onClick={handleCardClick}
            onDelete={currentIndex >= vocabularyData.length ? handleDeleteCard : undefined}
          />

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredCards.length - 1}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed print:hidden"
            title="Next card"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          No cards available for this category. Try adding some!
        </div>
      )}

      <div className="mt-8 flex flex-col items-center gap-2 print:hidden">
        <div className="text-lg font-semibold text-gray-700">
          Card {currentIndex + 1} of {filteredCards.length}
        </div>
        <div className="text-sm text-gray-600">
          Cards Reviewed: {reviewedCards.size} | Score: {score}
        </div>
        <div className="text-sm text-gray-600">
          Custom Cards: {customCards.length}
        </div>
      </div>

      <div className="hidden print:block mt-8">
        <div className="grid grid-cols-2 gap-8">
          {filteredCards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-sm font-medium text-indigo-600 uppercase mb-2">{card.wordType}</div>
              <h2 className="text-xl font-bold mb-4">{card.term}</h2>
              <div className="space-y-2">
                <p><span className="font-semibold">Definition:</span> {card.definition}</p>
                <p><span className="font-semibold">Example:</span> {card.example}</p>
                {card.wordFamily && card.wordFamily.length > 0 && (
                  <p><span className="font-semibold">Word Family:</span> {card.wordFamily.join(', ')}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
