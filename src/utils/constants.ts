import { AppState, StageId, AnimalId, InspirationBookmark } from '../types';

export interface AnimalInfo {
  id: AnimalId;
  name: string;
  title: string;
  roleDescription: string;
  voiceName: string;
}

export const ANIMAL_CATALOG: Record<AnimalId, AnimalInfo> = {
  rabbit: {
    id: 'rabbit',
    name: '兔子',
    title: '溫柔行動派',
    roleDescription: '溫柔敏捷，手握懷錶陪伴你珍惜時光、跳出拖延',
    voiceName: '兔子',
  },
  cat: {
    id: 'cat',
    name: '貓咪',
    title: '傲嬌療癒系',
    roleDescription: '戴著皇冠的高雅守護者，提醒你只為自己真正想要的人生閃耀',
    voiceName: '貓咪',
  },
  capybara: {
    id: 'capybara',
    name: '水豚',
    title: '佛系情緒穩定大師',
    roleDescription: '頭頂甜橙心如止水，安撫緊繃內耗、找回平靜呼吸',
    voiceName: '水豚',
  },
  fox: {
    id: 'fox',
    name: '狐狸',
    title: '聰明靈感領航員',
    roleDescription: '抱著尾巴沉思敏銳，在不確定迷霧中為你點亮地圖微光',
    voiceName: '小狐狸',
  },
  shiba: {
    id: 'shiba',
    name: '柴犬',
    title: '熱血忠誠冒險家',
    roleDescription: '叼著藏寶圖搖著捲捲尾巴，熱血忠誠相挺你的人生大冒險',
    voiceName: '柴犬',
  },
  bear: {
    id: 'bear',
    name: '小熊',
    title: '踏實溫暖守護者',
    roleDescription: '厚實可靠，托腮陪你深度覺察現狀、給予最有力的熊抱',
    voiceName: '小熊',
  },
  owl: {
    id: 'owl',
    name: '貓頭鷹',
    title: '冷靜深度思考家',
    roleDescription: '戴著圓框眼鏡拿著放大鏡，客觀梳理策略與智慧足跡',
    voiceName: '貓頭鷹',
  },
  penguin: {
    id: 'penguin',
    name: '企鵝',
    title: '優雅目標執行官',
    roleDescription: '繫著紳士領結眼神堅定，在冰原上向著新身份無畏滑行',
    voiceName: '小企鵝',
  },
};

export const DEFAULT_BOOKMARKS: InspirationBookmark[] = [
  {
    id: 'bm-moco-threads',
    title: 'Threads 精華拆解：用 1 天重啟人生（Moco Lee 整理版）',
    url: 'https://www.threads.com/@mocoo.lee/post/DfmHNdShz8q',
    note: '核心心法：身份認同決定行為（我是誰）｜改變三階段（受不了 → 不確定 → 看清楚）｜早晨正反面筆記 + 白天 4 個鬧鐘 + 人生遊戲六要素。',
    createdAt: '2026-11-12',
  },
];

export function getCompanionStageQuotes(animalId: AnimalId, stage: StageId): string[] {
  const animal = ANIMAL_CATALOG[animalId] || ANIMAL_CATALOG.rabbit;
  const name = animal.voiceName;

  if (stage === 1) {
    // 【受不了】階段
    switch (animalId) {
      case 'rabbit':
        return [
          `${name}抱抱你：對現狀感到受不了，正是內在能量要破繭而出的信號！深呼吸，我們一起把包袱放下，重新啟動步伐。`,
          `${name}看著懷錶說：忍耐是有極限的，對爛攤子受夠了就是改變的開始！今天不自責過去，只要跟著心跳節奏向前跳一步。`,
          `${name}抖抖耳朵：不滿是上天給你的提醒信。既然舊路走不通，那就跟著我往新花園探索吧！`,
        ];
      case 'cat':
        return [
          `${name}蹭蹭你的手心：哼，早就該對那些消耗你的事受不了了！本喵允許你徹底歸零，誠實面對不滿才是最高級的優雅～`,
          `${name}優雅地甩尾巴：受夠了就拍拍屁股走人！你本該是戴著皇冠的主角，何必在別人的劇本裡受委屈？喵～`,
          `${name}端坐著看你：能看清什麼事情讓你窒息，就是你找回主導權的第一步，現在開始只對自己負責！`,
        ];
      case 'capybara':
        return [
          `${name}拍拍你：對現狀感到受不了，代表你的靈魂已經準備好升級了！先深呼吸，不需要自責過去，能誠實看見不滿就是改變的起點。`,
          `${name}頂著橘子說：『受不了』是生命給你的最棒警訊。現在給自己泡一杯溫茶，你不需要立刻解決所有事，只要下定決心不再對不起自己。`,
          `${name}微笑：感到緊繃痛苦時，代表舊的盔甲已經裝不下正在長大的你。別怕，脫下它，我們一步一步溫柔重啟。`,
        ];
      case 'fox':
        return [
          `${name}轉動靈活的大眼睛：對現況受夠了？太好了，這代表舊的迷宮已經困不住你聰慧的靈魂了！`,
          `${name}搖搖尾巴：痛苦是最好的指南針。當你明確知道自己『不要什麼』，通往新天地的出口就已經打開了一半。`,
          `${name}輕聲說：別急著焦慮，受不了代表改變的火種已經點燃。把這股怒氣化為重塑地圖的動力！`,
        ];
      case 'shiba':
        return [
          `${name}大聲汪了一聲：受不了就代表要發動大冒險了！把那些煩人的藉口丟掉，柴柴會叼著藏寶圖一路護送你重啟人生！`,
          `${name}搖著捲捲尾巴：感到氣餒的時候，想想我們還有整座新世界要去探索呢！甩甩毛，跟著我一起朝新目標衝刺！`,
          `${name}把爪子搭在你肩上：不滿現狀證明你心裡還有火！我們一起把這團火燃燒成最棒的冒險旅程！`,
        ];
      case 'bear':
        return [
          `${name}給了你一個大大的熊抱：受夠了就別再硬扛了。能看清讓自己痛苦的事，就是最勇敢的覺察，熊熊陪你一起把舊泥濘清理乾淨。`,
          `${name}踏實地坐下來：感到疲憊的時候，靠著我休息一下。等力氣恢復了，我們再用最沉穩的步伐開闢新路徑。`,
          `${name}托著腮認真看你：誠實面對不滿需要勇氣。你今天已經展現了非凡的勇氣，接下來只會越來越好！`,
        ];
      case 'owl':
        return [
          `${name}推了推金圓框眼鏡：受不了現狀，是高階智慧在發出重構系統的警訊。抽離情緒，這是一次數據歸零、重寫人生架構的最佳契機。`,
          `${name}翻開筆記本：分析顯示，繼續維持舊習慣的成本已遠大於改變的阻力。勇敢按下重啟鍵，理性完全站在你這邊。`,
          `${name}目光澄澈：任何革命都始於對舊體制的忍無可忍。記錄下此刻的警醒，它將是你永不再妥協的基石。`,
        ];
      case 'penguin':
        return [
          `${name}整了整小領結：對現狀受不了，就是吹響了起跑哨！冰原雖然廣闊，但只要你不回頭，前方全是專屬於你的全新舞台！`,
          `${name}眼神無比堅定：舊的遊戲規則既然讓你窒息，那就換上新的戰袍！我們一起重新定義你的人生賽道！`,
          `${name}揮舞小翅膀：別為昨天的妥協難過，今天看清了，明天我們就能踏出最漂亮的一步！`,
        ];
    }
  } else if (stage === 2) {
    // 【不確定】階段
    switch (animalId) {
      case 'rabbit':
        return [
          `${name}抖抖長耳朵：迷霧中前進確實讓人想退縮，但每一步蹦跳都在縮小未知的距離，今天只要專注做好身邊這件小事就好！`,
          `${name}拿出懷錶微笑：時間在走，你也在不知不覺中前進。不確定是成長的陣痛期，放輕鬆，我們一步一步跳！`,
          `${name}輕巧地在身旁引路：不用看清森林的全貌，只要看清腳下下一步落腳的青草就好。`,
        ];
      case 'cat':
        return [
          `${name}瞇著眼趴下：不確定有什麼大不了的？貓在撲向獵物前也都要先盯著看很久呢。放鬆點，伸個懶腰，腳步自然就踩穩了～`,
          `${name}慵懶地伸爪：迷惘就代表你正探索沒去過的屋頂！保持你的好奇心，別被自己嚇退了，喵。`,
          `${name}跳上你腿上打呼嚕：給自己一點耐心嘛，新身份需要時間適應，就像新買的貓抓板一樣，慢慢磨合最舒服。`,
        ];
      case 'capybara':
        return [
          `${name}溫和地陪著你：在舊習慣與新身份之間的『不確定感』是最正常的過渡期！迷惘代表你正離開舒適圈，不用急著看清全貌，先專注做好今天的小事就好。`,
          `${name}頭頂橘子閉著眼：放慢節奏，大自然從不著急，卻無事不成。給那份不確定一點溫柔的空間。`,
          `${name}遞上溫泉熱水：允許自己暫時不知道所有答案，只要每天有 1% 的行動在為新自己投票就足夠了。`,
        ];
      case 'fox':
        return [
          `${name}抱著蓬鬆大尾巴：摸索未來的路就像在森林裡晨霧探險。把腳步放慢一點，每一個微小的探索都在幫你點亮未知地圖。`,
          `${name}托著腮：你不是退步了，你只是在適應『還不熟練的新自己』。給這份不確定多一點耐心，答案會在行動中自然浮現。`,
          `${name}輕聲說：不需要百分之百確定才出發，只要有百分之五十一的微光與好奇，就足以踏出人生重啟的下一步！`,
        ];
      case 'shiba':
        return [
          `${name}豎起尖耳朵點頭：探索新地圖本來就沒有路標！別害怕未知，柴柴嗅覺很靈敏，只要跟著心裡的光，我們一步一步往前走！`,
          `${name}興奮地嗅著前方：不確定代表處處都是驚喜！就算走錯小路也沒關係，都是冒險裡的精彩支線！`,
          `${name}汪汪叫為你打氣：不用把一切都想透才行動，邊走邊玩、邊做邊學才是最有趣的旅途！`,
        ];
      case 'bear':
        return [
          `${name}摸摸肚子溫暖地笑：在森林裡轉彎時都會有一點茫然，這代表你正在長出新的骨骼與力量。慢慢來，最踏實的腳印都是一步步踩出來的。`,
          `${name}為你擋風：迷茫時不必勉強加速。把錨定在今天的呼吸與微小承諾上，大地會承接住你的每一次摸索。`,
          `${name}點點頭：不確定感是舊習慣在告別、新習慣在生根。這正是蛻變最核心的過程！`,
        ];
      case 'owl':
        return [
          `${name}展開雙翼俯瞰：不確定是所有深度學習與認知躍升的必經之路。不用急於得出定論，持續觀察並微調，全景自然展現。`,
          `${name}調整鏡片焦距：現在正是收集數據與探索可能性的階段。減少自我評判，像科學家一樣對每次嘗試保持客觀好奇。`,
          `${name}溫和提醒：模糊是創新的前兆。當舊有的自動導航停止時，你的意識才真正清醒了過來。`,
        ];
      case 'penguin':
        return [
          `${name}在冰面上穩住身形：適應新的冰面難免會打滑，但每一次調整重心都在讓你更敏捷！專注於保持平衡，不用慌張。`,
          `${name}抬起頭望著遠方：風雪遮住視線時，只要相信指南針的方位。堅持今天的小任務，霧氣終會散去！`,
          `${name}自信一笑：每一個傳奇人物在起步時都經歷過迷惘，這正是你的專屬英雄篇章正在開展的證明！`,
        ];
    }
  } else {
    // 【看清楚】階段
    switch (animalId) {
      case 'rabbit':
        return [
          `${name}握緊懷錶歡呼：時鐘的指針已經對準你的夢想！不需要用力硬撐，像那個全新的自己一樣輕盈地往前躍進吧！`,
          `${name}耳朵豎得直直的：清晰的目標自帶光芒！看清楚自己要去哪裡之後，每一步跳躍都無比精準且自信！`,
          `${name}為你遞上金色小旗：太棒了！不用再去懷疑自己的價值，現在就自然而然地活出理想中的一天！`,
        ];
      case 'cat':
        return [
          `${name}扶正頭頂的小金皇冠：太帥氣了！你已經看清目標了對吧？從現在起，帶著高貴自信的眼神，大步走向屬於你的王國！`,
          `${name}興奮地揮動小肉爪：本喵早就知道你可以的！你已經看清了那個閃閃發光的新身份，昂首闊步地前進吧，喵！`,
          `${name}滿足地瞇眼：清晰的靈魂最吸引人。既然看清了，就不需要再浪費時間猶豫，做那個最自在優雅的自己！`,
        ];
      case 'capybara':
        return [
          `${name}露出欣慰的微笑：太棒了，你已經看清楚自己真正要去的地方！現在不需要靠意志力硬撐，只要像那個『新的你』一樣自然地踏出下一步吧！`,
          `${name}頂著橘子為你點頭：心靈澄澈的時候，阻力都變成了助力。保持這份淡定與從容，勝利是水到渠成的結果。`,
          `${name}送上溫暖祝福：你已經找到了自己的節奏。不慌不忙，全世界都會為看清方向的人讓路。`,
        ];
      case 'fox':
        return [
          `${name}眼中閃爍著靈動星芒：指南針已經徹底校準！地圖上的寶藏座標如此清晰，像靈狐一樣輕盈敏捷地奔向終點吧！`,
          `${name}歡快地甩動尾巴：看清楚方向的你，比任何時候都更有魅力！跟隨直覺與智慧，新生活就在眼前展開！`,
          `${name}拍手讚嘆：思維的迷霧全散了！接下來的每一步都是在具現化那個三年後的理想一天！`,
        ];
      case 'shiba':
        return [
          `${name}興奮地原地打轉：汪嗚！看清楚寶藏在哪裡了！現在不需要猶豫，像個真正的勇者一樣，朝著新身份全速奔跑吧！`,
          `${name}高高舉起藏寶圖：目標鎖定！跟著柴柴一起衝，沒有任何障礙能阻擋一個看清道路的冒險家！`,
          `${name}開心地搖尾巴：今天就是新旅程的起跑日！帶著滿滿的熱情，把每一天都活成值得驕傲的勝利！`,
        ];
      case 'bear':
        return [
          `${name}為你摘下最甜的漿果：太好了，心中的迷霧全散開了！像那個踏實又有力量的自己一樣，堅定地邁向新的一天吧！`,
          `${name}拍著胸膛大笑：看到你眼中的堅毅光芒，熊熊打從心底為你高興！大地為你築起最穩定的基石，大步向前吧！`,
          `${name}有力地點頭：方向一旦明確，意志力就成了配角，習慣與身份認同會自然帶你抵達目的地。`,
        ];
      case 'owl':
        return [
          `${name}輕敲放大鏡：清晰度已達 100%！策略已成，座標已定。不再受干擾變數影響，以最冷靜而優雅的姿態執行新版本的人生！`,
          `${name}在星空下展翅：看清全貌的智者是不可阻擋的。將計畫落實為日常肌肉記憶，你正在書寫自己的傳奇日誌。`,
          `${name}微笑道賀：恭喜你突破了舊劇本的重圍。新系統已經上線，啟航吧！`,
        ];
      case 'penguin':
        return [
          `${name}為你歡呼：太棒了，你已經看清楚自己真正要去的地方！現在不需要靠意志力硬撐，只要像那個『新的你』一樣自然地踏出下一步吧！`,
          `${name}挺直胸膛：看清楚目標後，每一步都有了重量與方向。繫上精緻的領結，帶著堅定的眼神，整座冒險大陸都在為你的蛻變讓路！`,
          `${name}揮舞小翅膀：不必猶豫，你心中的指南針已經校準完畢。把焦點放在當下的行動，你正在創造只屬於你的閃耀日誌！`,
        ];
    }
  }
  return [
    `${name}陪伴著你：感受當下的力量，像那個全新的自己一樣，自然而堅定地踏出下一步吧！`,
  ];
}

export const STAGE_CONFIGS: Record<
  StageId,
  {
    title: string;
    stageName: string;
    animalName: string;
    tagline: string;
    accentColor: string;
    badgeBg: string;
  }
> = {
  1: {
    title: '受不了階段',
    stageName: '階段一：【受不了】',
    animalName: '水豚',
    tagline: '誠實看見不滿，覺醒升級的起點',
    accentColor: '#CFA7A7',
    badgeBg: 'bg-[#CFA7A7]/20 text-[#8E5E5E] border-[#CFA7A7]',
  },
  2: {
    title: '不確定階段',
    stageName: '階段二：【不確定】',
    animalName: '小狐狸',
    tagline: '跨出舒適圈的過渡期，在微光中前行',
    accentColor: '#E29272',
    badgeBg: 'bg-[#E29272]/20 text-[#9C5535] border-[#E29272]',
  },
  3: {
    title: '看清楚階段',
    stageName: '階段三：【看清楚】',
    animalName: '小企鵝',
    tagline: '校準指南針，像那個全新的自己自然前進',
    accentColor: '#7D94A8',
    badgeBg: 'bg-[#7D94A8]/20 text-[#435B6F] border-[#7D94A8]',
  },
};

export const INITIAL_ALARMS = [
  {
    id: 'alarm-1',
    time: '11:00',
    question: '我現在正在逃避什麼？',
    subText: '停頓 30 秒，誠實面對眼前最想拖延或感到阻力的那件事。',
    enabled: true,
    todayNote: '',
  },
  {
    id: 'alarm-2',
    time: '13:30',
    question: '如果把過去兩小時拍成影片，看起來我想要什麼？',
    subText: '抽離成第三人稱導演視角，客觀看看剛剛的行為真正傳遞的意圖。',
    enabled: true,
    todayNote: '',
  },
  {
    id: 'alarm-3',
    time: '15:15',
    question: '我目前正在往討厭的人生，還是想要的人生前進？',
    subText: '此時此刻的思緒與選擇，正在把你塑造成哪一種人？',
    enabled: true,
    todayNote: '',
  },
  {
    id: 'alarm-4',
    time: '21:00',
    question: '今天什麼時候最有「活著的感覺」？',
    subText: '捕捉今天哪怕一瞬間的熱忱、平靜、心流或怦然心動的時刻。',
    enabled: true,
    todayNote: '',
  },
];

export const INITIAL_RULES = [
  '充足睡眠 7 小時',
  '每週運動與散步至少 3 次',
  '不把工作負面情緒帶給家人',
  '絕不在疲憊時做重大決定',
];

export const RULE_PRESETS = [
  '每天保留 30 分鐘個人留白時光',
  '睡前 1 小時遠離社群螢幕',
  '只承諾真正認同的事物',
  '每天真誠誇讚自己一次',
  '定期清理不合適的人際關係',
  '健康飲食與充足飲水 2000cc',
];

export const INITIAL_STATE: AppState = {
  currentStage: 1,
  stageQuoteIndex: { 1: 0, 2: 0, 3: 0 },
  primaryCompanion: 'rabbit',   // 預設第一主夥伴：兔子
  secondaryCompanion: 'cat',    // 預設第二副夥伴：貓咪
  exp: 120,
  morningNotes: {
    antiVision: {
      unbearableHabits: '總是把別人的期待擺在第一位，下班後無意識滑手機到半夜，第二天帶著疲憊與自我厭棄醒來。',
      behaviorVsDesire: '看起來像個只求不出錯、甘於現狀的平凡職員，而不是渴望創造自己事業與自由生活的人。',
      fiveYearsTuesday: '依然在同樣無趣的辦公桌前嘆氣，體能更差了，眼裡的光芒徹底熄滅，只剩下麻木的日常。',
      shamefulReason: '害怕別人說我自不量力，害怕失敗後沒有藉口，害怕真正承擔自己人生的全責。',
    },
    newVision: {
      threeYearsIdealDay: '早晨在採光充足的書房從容醒來，做一杯手沖咖啡，做喜愛的深度創作與專案，每週有充裕時間陪伴家人與旅行。',
      identityAnchor: '專注熱情、掌控自己生活節奏且勇敢重啟',
    },
  },
  alarms: INITIAL_ALARMS,
  eveningGame: {
    bottomLine: '麻木妥協、隨波逐流且失去主導權的無力感',
    targetDirection: '清醒自律、充滿創造力與內在豐盛的自由人生',
    stakes: '失去最好的時光，活在懊悔與無力感中，讓原本可以發光的自己變成一個疲憊的影子。',
    winCondition: '每天醒來都對即將做的事情感到好奇與期待，經濟自立且擁有時間自由。',
    mainQuest: '打造個人的核心競爭力作品集，並建立穩定的身心重啟節奏。',
    bossFight: {
      name: '本月魔王：戒斷無意識滑手機，建立晚間 22:30 關機儀式',
      progress: 45,
    },
    dailyQuests: [
      { id: 'dq-1', title: '完成早晨覺察筆記並大聲朗讀新身份宣言', completed: true },
      { id: 'dq-2', title: '專注攻克 90 分鐘核心主線任務，不開社群分頁', completed: false },
      { id: 'dq-3', title: '晚間 21:00 記錄今日最有活著感覺的片刻', completed: false },
    ],
    rules: INITIAL_RULES,
  },
  history: [
    {
      id: 'hist-demo-1',
      date: '2026-11-10',
      savedAt: '2026-11-10T21:30:00.000Z',
      stage: 1,
      identityAnchor: '專注熱情、掌控生活節奏且勇敢重啟',
      alarmNotes: [
        { time: '11:00', question: '我現在正在逃避什麼？', note: '逃避寫難度高的企劃草稿，藉口去收郵件。抓到了！立刻開始 25 分鐘番茄鐘。' },
        { time: '13:30', question: '如果把過去兩小時拍成影片，看起來我想要什麼？', note: '像個忙碌但沒重點的人，需要把焦點拉回到產出核心成果。' },
        { time: '15:15', question: '我目前正在往討厭的人生，還是想要的人生前進？', note: '剛剛放下無意義抱怨，選擇站起來喝水深呼吸，正在往想要的方向修正。' },
        { time: '21:00', question: '今天什麼時候最有「活著的感覺」？', note: '傍晚去河堤快走時，晚霞灑在身上，吹著涼風聽了一首喜歡的歌，感覺內心無比澄澈。' },
      ],
      questStats: { total: 3, completed: 3 },
      aliveMoment: '傍晚去河堤快走時，晚霞灑在身上，吹著涼風聽了一首喜歡的歌，感覺內心無比澄澈。',
      bossName: '戒斷無意識滑手機',
      bossProgress: 35,
    },
  ],
  bookmarks: DEFAULT_BOOKMARKS,
  streak: 3,
  lastActiveDate: '2026-11-11',
};

export const LEVEL_TIERS = [
  { level: 1, name: '啟程見習者', minExp: 0, maxExp: 150 },
  { level: 2, name: '破浪探索家', minExp: 150, maxExp: 350 },
  { level: 3, name: '覺察開拓者', minExp: 350, maxExp: 650 },
  { level: 4, name: '願景鑄造者', minExp: 650, maxExp: 1050 },
  { level: 5, name: '重啟大冒險家', minExp: 1050, maxExp: 1600 },
  { level: 6, name: '自在傳奇大師', minExp: 1600, maxExp: 2500 },
];

export function calculateLevel(exp: number) {
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (exp >= LEVEL_TIERS[i].minExp) {
      const tier = LEVEL_TIERS[i];
      const range = tier.maxExp - tier.minExp;
      const progress = Math.min(100, Math.round(((exp - tier.minExp) / range) * 100));
      return {
        level: tier.level,
        title: tier.name,
        currentInLevel: exp - tier.minExp,
        levelExpNeeded: range,
        progressPercent: progress,
      };
    }
  }
  return {
    level: 1,
    title: LEVEL_TIERS[0].name,
    currentInLevel: exp,
    levelExpNeeded: 150,
    progressPercent: Math.min(100, Math.round((exp / 150) * 100)),
  };
}
