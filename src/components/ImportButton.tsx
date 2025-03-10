import React, { useRef } from 'react';
import { FileUp } from 'lucide-react';
import { read, utils } from 'xlsx';
import { VocabularyCard } from '../types/vocabulary';

interface ImportButtonProps {
  onImport: (cards: VocabularyCard[]) => void;
}

export const ImportButton: React.FC<ImportButtonProps> = ({ onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json<any>(worksheet);

      const cards: VocabularyCard[] = jsonData.map(row => ({
        term: row.term || '',
        definition: row.definition || '',
        example: row.example || '',
        wordType: (row.wordType?.toLowerCase() || 'noun') as VocabularyCard['wordType'],
        wordFamily: row.wordFamily ? row.wordFamily.split(',').map((w: string) => w.trim()) : [],
      }));

      if (cards.length > 0) {
        onImport(cards);
        // Show success message
        alert(`Successfully imported ${cards.length} vocabulary cards!`);
      } else {
        alert('No valid vocabulary cards found in the file. Please check the format.');
      }
    } catch (error) {
      console.error('Error importing file:', error);
      alert('Error importing file. Please make sure it\'s a valid CSV or Excel file with the correct format.');
    }

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv,.xlsx,.xls"
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="print:hidden p-2 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition-colors"
        aria-label="Import vocabulary cards from file"
        title="Import vocabulary cards from CSV or Excel file"
      >
        <FileUp className="w-5 h-5" />
      </button>
    </div>
  );
};
