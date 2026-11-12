export type StageId = 1 | 2 | 3;

export interface MorningNotes {
  antiVision: {
    unbearableHabits: string; // 習慣了的不滿
    behaviorVsDesire: string; // 只看我做的事，別人以為我想要什麼？
    fiveYearsTuesday: string; // 五年後的普通星期二會怎麼過？
    shamefulReason: string;   // 都不改變最丟臉的理由是什麼？
  };
  newVision: {
    threeYearsIdealDay: string; // 三年後，我理想的一天
    identityAnchor: string;     // 核心身份定錨：我是那種＿＿＿的人
  };
}

export interface AlarmItem {
  id: string;
  time: string;
  question: string;
  subText: string;
  enabled: boolean;
  todayNote: string;
}

export interface DailyQuestItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface EveningGame {
  bottomLine: string;       // 我不允許我的人生，變成：
  targetDirection: string;  // 我要往：去
  stakes: string;           // 賭注 (Stakes)
  winCondition: string;     // 贏的條件 (Win Condition)
  mainQuest: string;        // 主線任務 (Main Quest - 1 年期)
  bossFight: {
    name: string;           // 階段魔王 (1 個月期目標)
    progress: number;       // 0 ~ 100 進度/血條
  };
  dailyQuests: DailyQuestItem[];
  rules: string[];          // 遊戲規則 (絕對不願意犧牲的底線 tags)
}

export interface HistoryArchive {
  id: string;
  date: string;             // YYYY-MM-DD
  savedAt: string;          // ISO string
  stage: StageId;
  identityAnchor: string;
  alarmNotes: { time: string; question: string; note: string }[];
  questStats: { total: number; completed: number };
  aliveMoment?: string;     // 21:00 記錄
  bossName?: string;
  bossProgress?: number;
}

export type AnimalId =
  | 'rabbit'
  | 'cat'
  | 'capybara'
  | 'fox'
  | 'shiba'
  | 'bear'
  | 'owl'
  | 'penguin';

export interface InspirationBookmark {
  id: string;
  title: string;
  url: string;
  note: string;
  createdAt: string;
}

export interface AppState {
  currentStage: StageId;
  stageQuoteIndex: Record<StageId, number>;
  primaryCompanion: AnimalId;
  secondaryCompanion: AnimalId;
  exp: number;
  morningNotes: MorningNotes;
  alarms: AlarmItem[];
  eveningGame: EveningGame;
  history: HistoryArchive[];
  bookmarks: InspirationBookmark[];
  streak: number;
  lastActiveDate: string;
}
