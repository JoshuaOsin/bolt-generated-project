import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddCardFormProps {
  onAddCard: (card: {
    term: string;
    definition: string;
    example: string;
    wordType: 'verb' | 'noun' | 'adjective' | 'adverb';
    wordFamily?: string[];
  }) => void;
}

export const AddCardForm: React.FC<AddCardFormProps> = ({ onAddCard }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [wordType, setWordType] = useState<'verb' | 'noun' | 'adjective' | 'adverb'>('verb');
  const [wordFamily, setWordFamily] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCard({
      term,
      definition,
      example,
      wordType,
      wordFamily: wordFamily.split(',').map(word => word.trim()).filter(Boolean),
    });
    setTerm('');
    setDefinition('');
    setExample('');
    setWordType('verb');
    setWordFamily('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="print:hidden p-2 bg-emerald-500 text-white rounded-full shadow-md hover:bg-emerald-600 transition-colors"
        aria-label="Add new vocabulary card"
        title="Add a new vocabulary card"
      >
        <Plus className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Vocabulary Card</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Term
            </label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Definition
            </label>
            <textarea
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Example
            </label>
            <textarea
              value={example}
              onChange={(e) => setExample(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Word Type
            </label>
            <select
              value={wordType}
              onChange={(e) => setWordType(e.target.value as 'verb' | 'noun' | 'adjective' | 'adverb')}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="verb">Verb</option>
              <option value="noun">Noun</option>
              <option value="adjective">Adjective</option>
              <option value="adverb">Adverb</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Word Family (comma-separated)
            </label>
            <input
              type="text"
              value={wordFamily}
              onChange={(e) => setWordFamily(e.target.value)}
              placeholder="e.g., Achievement (n), Achieve (v)"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
          >
            Add Card
          </button>
        </div>
      </form>
    </div>
  );
};
