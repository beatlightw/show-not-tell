import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { AdvancedWord, Book, Lesson } from './content/types';

export type Language = 'zh' | 'en';

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const STORAGE_KEY = 'show-not-tell-lang-v2';

const translations = {
  zh: {
    brandName: '跟着大师学描写',
    brandSub: "Show, Don't Tell",
    navHome: '首页',
    navLibrary: '阅读书库',
    navThesaurus: '同义词库',
    startLearning: '开始学习',
    browseLibrary: '浏览书库',
    heroEyebrow: '英语文学写作 · 描写训练',
    heroTitle: '跟着大师学描写',
    heroLead:
      '从经典文学原句出发，对照平淡的 Tell 与生动的 Show，把抽象的评价标准变成逐句可拆、逐课可练的写作能力。',
    enterLibrary: '进入阅读书库',
    firstLesson: '从第一课开始',
    statBooks: '部大师作品',
    statLessons: '节描写课时',
    statTechniques: '条写作技巧',
    curvedMarquee: "Show, Don't Tell · 跟着大师学描写 ·",
    featureOriginal: '大师原句',
    featureOriginalText: '以经典作品里的真实描写为素材，逐句精读。',
    featureCompare: 'Tell / Show 对照',
    featureCompareText: '平淡表达与生动表达放在一起，差异一眼可见。',
    featureTechnique: '技巧提炼',
    featureTechniqueText: '每课拆出可直接练习、直接套用的写作手法。',
    featureUpdate: '持续上新',
    featureUpdateText: '书目与课时持续扩充，总有新的描写素材可读。',
    libraryEyebrow: 'Reading Library',
    libraryTitle: '阅读书库',
    allBooks: '全部书目',
    lessonsEyebrow: 'Featured Lessons',
    lessonsTitle: '精选课时',
    tellShowMini: 'Tell / Show',
    ctaEn: 'Start Writing',
    ctaTitle: '开始你的描写训练',
    ctaText: '从一本书、一个场景、一句原句开始。',
    lessonUnit: '课时',
    lessonsUnit: 'lessons',
    totalLessons: '共 {count} 课时',
    lessonDirectoryEyebrow: 'Lessons',
    lessonDirectoryTitle: '课时目录',
    coverAlt: '封面',
    scenePhotoAlt: '场景照片',
    tellLabel: 'Tell 平铺直叙',
    showLabel: 'Show 大师笔法',
    techniquesEyebrow: 'Techniques',
    techniquesTitle: '写作技巧提炼',
    previousLesson: '上一课',
    nextLesson: '下一课',
    emptyTitle: '书库正在筹备中',
    emptyText: '新书目加入后会出现在这里。',
    photoHint: '待补充照片',
    footerSlogan: '以大师之笔，练描写之功',
    libraryPageTitle: '阅读书库',
    libraryPageText: '选择一本书，进入逐课的描写学习。',
    thesaurusEyebrow: 'Word Power',
    thesaurusTitle: '同义词库',
    thesaurusText: '把平淡的常用词换成有画面的高级词，并知道什么时候用最合适。',
    simpleLabel: '简单词',
    advancedLabel: '高级词',
    whenToUseLabel: '什么时候用',
    exampleLabel: '例句',
    searchLabel: '搜索词汇',
    searchPlaceholder: '搜索简单词，如 run',
    searchEmpty: '没有找到匹配的词组。',
    home: '首页',
    ariaNav: '主导航',
    ariaFooterNav: '页脚导航',
    ariaBreadcrumb: '面包屑',
    ariaCompare: 'Tell 与 Show 对照',
    ariaLessonNav: '课时导航',
    ariaLang: '切换语言',
    documentTitle: "跟着大师学描写 · Show, Don't Tell",
  },
  en: {
    brandName: 'Learn Description from the Masters',
    brandSub: 'English Literature Writing',
    navHome: 'Home',
    navLibrary: 'Library',
    navThesaurus: 'Thesaurus',
    startLearning: 'Start Learning',
    browseLibrary: 'Browse Library',
    heroEyebrow: 'English Literature · Description Practice',
    heroTitle: 'Learn Description from the Masters',
    heroLead:
      'Study real sentences from classic literature, compare flat Tell with vivid Show, and turn abstract feedback into concrete writing skills you can practice lesson by lesson.',
    enterLibrary: 'Enter the Library',
    firstLesson: 'Start Lesson 1',
    statBooks: 'Master Works',
    statLessons: 'Writing Lessons',
    statTechniques: 'Writing Tips',
    curvedMarquee: "Show, Don't Tell · Learn from the Masters ·",
    featureOriginal: 'Master Sentences',
    featureOriginalText:
      'Read and study real descriptions from classic literature.',
    featureCompare: 'Tell / Show Side by Side',
    featureCompareText:
      'See exactly how flat writing differs from vivid writing.',
    featureTechnique: 'Technique Breakdown',
    featureTechniqueText:
      'Extract reusable techniques from every lesson.',
    featureUpdate: 'Always Growing',
    featureUpdateText: 'New books and lessons keep the library fresh.',
    libraryEyebrow: 'Reading Library',
    libraryTitle: 'Reading Library',
    allBooks: 'All Books',
    lessonsEyebrow: 'Featured Lessons',
    lessonsTitle: 'Featured Lessons',
    tellShowMini: 'Tell / Show',
    ctaEn: 'Start Writing',
    ctaTitle: 'Start Your Description Practice',
    ctaText: 'Begin with one book, one scene, one sentence.',
    lessonUnit: 'lessons',
    lessonsUnit: 'lessons',
    totalLessons: '{count} lessons in total',
    lessonDirectoryEyebrow: 'Lessons',
    lessonDirectoryTitle: 'Lesson Directory',
    coverAlt: 'cover',
    scenePhotoAlt: 'scene photo',
    tellLabel: 'Tell Version',
    showLabel: 'Show Version',
    techniquesEyebrow: 'Techniques',
    techniquesTitle: 'Writing Techniques',
    previousLesson: 'Previous Lesson',
    nextLesson: 'Next Lesson',
    emptyTitle: 'The Library Is Being Prepared',
    emptyText: 'New books will appear here as they are added.',
    photoHint: 'Photo coming soon',
    footerSlogan: 'Write with the masters',
    libraryPageTitle: 'Reading Library',
    libraryPageText:
      'Choose a book and start learning description lesson by lesson.',
    thesaurusEyebrow: 'Word Power',
    thesaurusTitle: 'Thesaurus',
    thesaurusText:
      'Trade flat common words for vivid, image-rich alternatives and know exactly when to use them.',
    simpleLabel: 'Simple',
    advancedLabel: 'Advanced',
    whenToUseLabel: 'When to use',
    exampleLabel: 'Example',
    searchLabel: 'Search thesaurus',
    searchPlaceholder: 'Search a simple word, e.g. run',
    searchEmpty: 'No matching words found.',
    home: 'Home',
    ariaNav: 'Main navigation',
    ariaFooterNav: 'Footer navigation',
    ariaBreadcrumb: 'Breadcrumb',
    ariaCompare: 'Tell and Show comparison',
    ariaLessonNav: 'Lesson navigation',
    ariaLang: 'Switch language',
    documentTitle: "Learn Description from the Masters · Show, Don't Tell",
  },
} as const;

export type TranslationKey = keyof typeof translations.zh;

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'zh' ? 'zh' : 'en';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.title = translations[language].documentTitle;
  }, [language]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  const t = (key: TranslationKey) => translations[language][key];

  return (
    <I18nContext.Provider
      value={{ language, setLanguage, toggleLanguage, t }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}

export function bookTitle(book: Book, language: Language) {
  return language === 'en' && book.titleEn ? book.titleEn : book.title;
}

export function bookAuthor(book: Book, language: Language) {
  return language === 'en' && book.authorEn ? book.authorEn : book.author;
}

export function bookIntro(book: Book, language: Language) {
  return language === 'en' && book.introEn ? book.introEn : book.intro;
}

export function lessonTitle(lesson: Lesson, language: Language) {
  return language === 'en' && lesson.titleEn ? lesson.titleEn : lesson.title;
}

export function lessonScene(lesson: Lesson, language: Language) {
  return language === 'en' && lesson.sceneEn ? lesson.sceneEn : lesson.scene;
}

export function lessonTechniques(lesson: Lesson, language: Language) {
  return language === 'en' && lesson.techniquesEn
    ? lesson.techniquesEn
    : lesson.techniques;
}

export function thesaurusMeaning(
  word: AdvancedWord,
  language: Language,
) {
  return language === 'zh' && word.meaningZh ? word.meaningZh : word.meaning;
}

export function thesaurusWhenToUse(
  word: AdvancedWord,
  language: Language,
) {
  return language === 'zh' && word.whenToUseZh
    ? word.whenToUseZh
    : word.whenToUse;
}
