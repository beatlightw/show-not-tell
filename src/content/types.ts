export interface Lesson {
  id: string;
  title: string;
  titleEn?: string;
  scene: string;
  sceneEn?: string;
  photo: string;
  source: string;
  tell: string;
  show: string;
  translation?: string;
  techniques: string[];
  techniquesEn?: string[];
}

export interface Book {
  id: string;
  title: string;
  titleEn?: string;
  author: string;
  authorEn?: string;
  coverImage: string;
  intro: string;
  introEn?: string;
  lessons: Lesson[];
}

export interface AdvancedWord {
  word: string;
  meaning: string;
  meaningZh?: string;
  whenToUse: string;
  whenToUseZh?: string;
  example: string;
}

export interface ThesaurusEntry {
  id: string;
  simple: string;
  advanced: AdvancedWord[];
}
