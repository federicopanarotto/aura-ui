export interface SpeakerEmotion {
  emotion: string;
  intensity: number;
  confidence: number;
}

export interface Topic {
  name: string;
  relevance: number;
  keywords: string[];
}

export interface Summary {
  short: string;
  detailed: string;
}

export interface Review {
  id: string;
  summary: Summary;
  topics: Topic[];
  emotionalTone: SpeakerEmotion[];
  overallSentiment: 'positive' | 'neutral' | 'negative';
  keyPhrases: string[];
  language: string;
  confidence: number;
  createdAt?: Date;
  updatedAt?: Date;
}