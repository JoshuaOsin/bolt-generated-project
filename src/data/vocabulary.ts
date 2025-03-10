interface VocabularyCard {
  term: string;
  definition: string;
  example: string;
  wordType: 'verb' | 'noun' | 'adjective' | 'adverb';
  wordFamily?: string[];
}

export const vocabularyData: VocabularyCard[] = [
  // Verbs
  {
    term: 'Accomplish',
    definition: 'Achieve, Complete, Fulfill',
    example: 'We will work hard to accomplish our goal.',
    wordType: 'verb',
    wordFamily: ['Accomplishment (n)']
  },
  {
    term: 'Adapt',
    definition: 'Adjust, Modify, Change',
    example: 'Many software companies have adapted popular programs to the new operating system.',
    wordType: 'verb',
    wordFamily: ['Adaptation (n)', 'Adaptable (adj)']
  },
  {
    term: 'Deploy',
    definition: 'Put into use, Implement',
    example: 'Airbags deploy in case of an accident.',
    wordType: 'verb',
    wordFamily: ['Deployment (n)', 'Deployable (adj)']
  },
  // Nouns
  {
    term: 'Accommodation',
    definition: 'Place to stay, Adjustment',
    example: 'The program was not big enough to accommodate all the modules.',
    wordType: 'noun',
    wordFamily: ['Accommodate (v)']
  },
  {
    term: 'Achievement',
    definition: 'Accomplishment, Fulfillment',
    example: 'Finishing the project before its due date was a remarkable achievement.',
    wordType: 'noun',
    wordFamily: ['Achieve (v)', 'Achievable (adj)']
  },
  // Adjectives
  {
    term: 'Achievable',
    definition: 'Possible, Attainable',
    example: 'The goal is achievable within six months.',
    wordType: 'adjective',
    wordFamily: ['Achieve (v)', 'Achievement (n)']
  },
  {
    term: 'Adjustable',
    definition: 'Modifiable, Flexible',
    example: 'The seat is adjustable for comfort.',
    wordType: 'adjective',
    wordFamily: ['Adjust (v)', 'Adjustment (n)']
  },
  // Adverbs
  {
    term: 'Actively',
    definition: 'Energetically, Dynamically',
    example: 'He actively participated in the project.',
    wordType: 'adverb',
    wordFamily: ['Act (v)', 'Action (n)']
  },
  {
    term: 'Simultaneously',
    definition: 'At the same time, Concurrently',
    example: 'The tests were executed simultaneously.',
    wordType: 'adverb',
    wordFamily: ['Simultaneous (adj)']
  }
];
