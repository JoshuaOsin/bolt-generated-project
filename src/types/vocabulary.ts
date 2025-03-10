export type WordType = 'verb' | 'noun' | 'adjective' | 'adverb';

export interface VocabularyCard {
  term: string;
  definition: string;
  example: string;
  wordType: WordType;
  wordFamily?: string[];
}
