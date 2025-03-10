import React from 'react';
import { FileDown } from 'lucide-react';
import { utils, writeFile } from 'xlsx';
import { VocabularyCard } from '../types/vocabulary';

interface ExportButtonProps {
  cards: VocabularyCard[];
  format: 'csv' | 'xlsx';
}

export const ExportButton: React.FC<ExportButtonProps> = ({ cards, format }) => {
  const handleExport = () => {
    // Convert cards to worksheet data
    const wsData = cards.map(card => ({
      term: card.term,
      definition: card.definition,
      example: card.example,
      wordType: card.wordType,
      wordFamily: card.wordFamily?.join(', ') || ''
    }));

    // Create worksheet
    const ws = utils.json_to_sheet(wsData);

    // Create workbook
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Vocabulary Cards');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `vocabulary-cards-${timestamp}.${format}`;

    // Write file
    writeFile(wb, filename);
  };

  return (
    <button
      onClick={handleExport}
      className="print:hidden p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
      aria-label={`Export vocabulary cards as ${format.toUpperCase()}`}
      title={`Export vocabulary cards as ${format.toUpperCase()} file`}
    >
      <FileDown className="w-5 h-5" />
    </button>
  );
};
