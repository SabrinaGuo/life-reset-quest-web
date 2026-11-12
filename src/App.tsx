import React, { useState, useEffect, useRef } from 'react';
import {
  AppState,
  StageId,
  AnimalId,
  MorningNotes,
  AlarmItem,
  EveningGame,
  InspirationBookmark,
} from './types';
import { INITIAL_STATE, INITIAL_ALARMS, DEFAULT_BOOKMARKS } from './utils/constants';
import { CompactHeader } from './components/CompactHeader';
import { CompanionModal } from './components/CompanionModal';
import { MorningJournalTab } from './components/MorningJournalTab';
import { AlarmsTab } from './components/AlarmsTab';
import { EveningGameTab } from './components/EveningGameTab';
import { HistoryReviewTab } from './components/HistoryReviewTab';
import {
  Sun,
  Clock,
  Compass,
  History,
  Sparkles,
  BookOpen,
} from 'lucide-react';

const STORAGE_KEY = 'life_reset_quest_v1';

export default function App() {
  // 1. 初始化狀態（從 LocalStorage 載入，向下相容新欄位）
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STATE,
          ...parsed,
          primaryCompanion: parsed.primaryCompanion || 'rabbit',
          secondaryCompanion: parsed.secondaryCompanion || 'cat',
          bookmarks:
            parsed.bookmarks && Array.isArray(parsed.bookmarks) && parsed.bookmarks.length > 0
              ? parsed.bookmarks
              : DEFAULT_BOOKMARKS,
          morningNotes: {
            antiVision: {
              ...INITIAL_STATE.morningNotes.antiVision,
              ...parsed.morningNotes?.antiVision,
            },
            newVision: {
              ...INITIAL_STATE.morningNotes.newVision,
              ...parsed.morningNotes?.newVision,
            },
          },
          eveningGame: {
            ...INITIAL_STATE.eveningGame,
            ...parsed.eveningGame,
            bossFight: {
              ...INITIAL_STATE.eveningGame.bossFight,
              ...parsed.eveningGame?.bossFight,
            },
          },
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved state:', e);
    }
    return INITIAL_STATE;
  });

  // 2. 當前分頁（4 大分頁）
  const [activeTab, setActiveTab] = useState<'morning' | 'alarms' | 'evening' | 'history'>('morning');

  // 3. 自動寫入手帳微提示
  const [saveStatus, setSaveStatus] = useState<boolean>(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 4. 浮動 EXP 特效通知
  const [expToast, setExpToast] = useState<{ amount: number; reason: string } | null>(null);

  // 5. 本命動物夥伴選擇彈窗 Modal 狀態
  const [isCompanionModalOpen, setIsCompanionModalOpen] = useState(false);

  // 6. 連續打卡檢查（每天第一次進入時檢查 Streak）
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (state.lastActiveDate !== today) {
      const lastDate = new Date(state.lastActiveDate);
      const currentDate = new Date(today);
      const diffDays = Math.round(
        (currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24)
      );

      let newStreak = state.streak;
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1; // 中斷後重新計算
      }

      setState((prev) => ({
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
      }));
    }
  }, []);

  // 7. 自動即時儲存至 LocalStorage（防抖 400ms）
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        setSaveStatus(true);
        setTimeout(() => setSaveStatus(false), 2000);
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
    }, 400);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [state]);

  // 經驗值獲取
  const handleGainExp = (amount: number, reason: string) => {
    setState((prev) => ({
      ...prev,
      exp: prev.exp + amount,
    }));
    setExpToast({ amount, reason });
    setTimeout(() => setExpToast(null), 2500);
  };

  // 切換本命動物夥伴
  const handleSelectCompanions = (primary: AnimalId, secondary: AnimalId) => {
    setState((prev) => ({
      ...prev,
      primaryCompanion: primary,
      secondaryCompanion: secondary,
    }));
    handleGainExp(15, '更換本命冒險夥伴');
  };

  // 心理狀態階段切換
  const handleChangeStage = (stage: StageId) => {
    setState((prev) => ({
      ...prev,
      currentStage: stage,
    }));
  };

  // 換一句鼓勵語錄
  const handleNextQuote = (stage: StageId) => {
    setState((prev) => {
      const currentIdx = prev.stageQuoteIndex[stage] || 0;
      return {
        ...prev,
        stageQuoteIndex: {
          ...prev.stageQuoteIndex,
          [stage]: currentIdx + 1,
        },
      };
    });
  };

  // 更新身份定錨（全站即時同步）
  const handleUpdateIdentityAnchor = (anchor: string) => {
    setState((prev) => ({
      ...prev,
      morningNotes: {
        ...prev.morningNotes,
        newVision: {
          ...prev.morningNotes.newVision,
          identityAnchor: anchor,
        },
      },
    }));
  };

  // 更新早晨筆記
  const handleUpdateMorningNotes = (updated: Partial<MorningNotes>) => {
    setState((prev) => ({
      ...prev,
      morningNotes: {
        ...prev.morningNotes,
        ...updated,
      },
    }));
  };

  // 一鍵將早晨筆記帶入晚上要素
  const handleSyncMorningToEvening = () => {
    const summary = [
      state.morningNotes.antiVision.unbearableHabits,
      state.morningNotes.antiVision.fiveYearsTuesday,
    ]
      .filter(Boolean)
      .join('；');

    setState((prev) => ({
      ...prev,
      eveningGame: {
        ...prev.eveningGame,
        stakes: summary
          ? `代價：如果輸掉這場遊戲，我將承受——${summary}`
          : prev.eveningGame.stakes,
        winCondition: prev.morningNotes.newVision.threeYearsIdealDay
          ? `理想願景：${prev.morningNotes.newVision.threeYearsIdealDay}`
          : prev.eveningGame.winCondition,
      },
    }));
    handleGainExp(20, '早晨筆記同步至夜間地圖');
  };

  // 更新單一鬧鐘
  const handleUpdateAlarm = (id: string, updated: Partial<AlarmItem>) => {
    setState((prev) => ({
      ...prev,
      alarms: prev.alarms.map((a) => (a.id === id ? { ...a, ...updated } : a)),
    }));
  };

  // 恢復預設鬧鐘
  const handleResetAlarms = () => {
    setState((prev) => ({
      ...prev,
      alarms: INITIAL_ALARMS,
    }));
  };

  // 更新晚上遊戲要素
  const handleUpdateEveningGame = (updated: Partial<EveningGame>) => {
    setState((prev) => ({
      ...prev,
      eveningGame: {
        ...prev.eveningGame,
        ...updated,
      },
    }));
  };

  // 今日結算存檔
  const handleArchiveToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    const alarmNotes = state.alarms
      .filter((a) => a.enabled)
      .map((a) => ({
        time: a.time,
        question: a.question,
        note: a.todayNote,
      }));

    const questTotal = state.eveningGame.dailyQuests.length;
    const questCompleted = state.eveningGame.dailyQuests.filter((q) => q.completed).length;

    // 尋找 21:00 鬧鐘的隨手記作為活著瞬間
    const ninePmAlarm = state.alarms.find((a) => a.time === '21:00');
    const aliveMoment = ninePmAlarm?.todayNote || '';

    const newRecord = {
      id: `archive-${Date.now()}`,
      date: today,
      savedAt: new Date().toISOString(),
      stage: state.currentStage,
      identityAnchor: state.morningNotes.newVision.identityAnchor || '未設定',
      alarmNotes,
      questStats: { total: questTotal, completed: questCompleted },
      aliveMoment,
      bossName: state.eveningGame.bossFight.name,
      bossProgress: state.eveningGame.bossFight.progress,
    };

    // 檢查今天是否已存過，如果存過則更新，否則加到最前
    const existingIndex = state.history.findIndex((h) => h.date === today);
    let updatedHistory = [...state.history];
    if (existingIndex >= 0) {
      updatedHistory[existingIndex] = newRecord;
    } else {
      updatedHistory = [newRecord, ...updatedHistory];
    }

    setState((prev) => ({
      ...prev,
      history: updatedHistory,
      exp: prev.exp + 50,
    }));

    handleGainExp(50, '今日冒險結算封存');
  };

  // 刪除歷史紀錄
  const handleDeleteHistory = (id: string) => {
    setState((prev) => ({
      ...prev,
      history: prev.history.filter((h) => h.id !== id),
    }));
  };

  // 匯入備份檔（確保向下相容）
  const handleImportBackup = (imported: AppState) => {
    setState({
      ...INITIAL_STATE,
      ...imported,
      primaryCompanion: imported.primaryCompanion || 'rabbit',
      secondaryCompanion: imported.secondaryCompanion || 'cat',
      bookmarks: imported.bookmarks || DEFAULT_BOOKMARKS,
    });
    handleGainExp(30, '成功匯入歷史備份');
  };

  // 新增靈感書籤
  const handleAddBookmark = (newBm: Omit<InspirationBookmark, 'id' | 'createdAt'>) => {
    const bookmarkItem: InspirationBookmark = {
      ...newBm,
      id: `bm-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setState((prev) => ({
      ...prev,
      bookmarks: [bookmarkItem, ...(prev.bookmarks || [])],
    }));
    handleGainExp(15, '收藏靈感書籤');
  };

  // 刪除靈感書籤
  const handleDeleteBookmark = (id: string) => {
    setState((prev) => ({
      ...prev,
      bookmarks: (prev.bookmarks || []).filter((b) => b.id !== id),
    }));
  };

  // 頂部書籤小圖示點擊：直接切換至第四分頁並平滑捲動到書籤櫃
  const handleNavigateToBookmarks = () => {
    setActiveTab('history');
    setTimeout(() => {
      const el = document.getElementById('inspiration-vault');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  const navTabs = [
    {
      id: 'morning',
      label: '早晨覺察筆記',
      icon: Sun,
      color: 'text-[#CFA7A7]',
      badge: '3D翻轉卡',
    },
    {
      id: 'alarms',
      label: '白天 4 個鬧鐘',
      icon: Clock,
      color: 'text-[#7D94A8]',
      badge: '行事曆連動',
    },
    {
      id: 'evening',
      label: '晚上收斂六要素',
      icon: Compass,
      color: 'text-[#E29272]',
      badge: '遊戲地圖',
    },
    {
      id: 'history',
      label: '歷史與成長回顧',
      icon: History,
      color: 'text-[#9B8EA9]',
      badge: '精華牆＆書籤',
    },
  ] as const;

  return (
    <div className="min-h-screen pb-20">
      {/* 1. 頂部固定區塊「極簡單行收合設計」（<=60px） */}
      <CompactHeader
        state={state}
        saveStatus={saveStatus}
        onOpenCompanionModal={() => setIsCompanionModalOpen(true)}
        onUpdateIdentityAnchor={handleUpdateIdentityAnchor}
        onChangeStage={handleChangeStage}
        onNextQuote={handleNextQuote}
        onNavigateToBookmarks={handleNavigateToBookmarks}
      />

      {/* 2. 桌面版緊湊分頁導航列 */}
      <div className="hidden md:block max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <div className="flex items-center justify-between p-1.5 rounded-2xl bg-white/70 border border-stone-200/80 shadow-2xs backdrop-blur-xs">
          <div className="flex items-center gap-1.5">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#7D94A8] text-white shadow-xs'
                      : 'text-stone-600 hover:text-[#3D444D] hover:bg-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-stone-100 text-stone-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 pr-2 text-xs text-stone-500 font-medium">
            <span className="font-caveat text-sm font-bold text-[#7D94A8] tracking-wider">
              Life Reset Quest
            </span>
          </div>
        </div>
      </div>

      {/* 手機版底部導航列 (Fixed Bottom Tab Bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-1.5 shadow-lg">
        <div className="grid grid-cols-4 gap-1 items-center">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'text-[#7D94A8] font-bold' : 'text-stone-500 font-medium'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[72px]">
                  {tab.label.replace('筆記', '').replace('六要素', '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* EXP 飄浮增加動效浮窗 */}
      {expToast && (
        <div className="fixed top-16 right-4 sm:right-6 z-50 flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-2.5 shadow-lg border border-[#9B8EA9]/40 text-[#3D444D] animate-bounce">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span className="text-xs font-bold text-[#6B5A7E]">
            +{expToast.amount} EXP！
          </span>
          <span className="text-xs text-stone-500">{expToast.reason}</span>
        </div>
      )}

      {/* 主內容區塊 */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 md:py-6 space-y-6">
        {/* 手機版當前分頁提示標題 */}
        <div className="md:hidden flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-[#3D444D]">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#7D94A8]" />
            當前篇章：{navTabs.find((t) => t.id === activeTab)?.label}
          </span>
          <span className="text-[11px] text-[#7D94A8]">
            {navTabs.find((t) => t.id === activeTab)?.badge}
          </span>
        </div>

        {/* 4 大分頁模組內容 */}
        <div>
          {activeTab === 'morning' && (
            <MorningJournalTab
              notes={state.morningNotes}
              onUpdateNotes={handleUpdateMorningNotes}
              onSyncToEveningStakes={handleSyncMorningToEvening}
            />
          )}

          {activeTab === 'alarms' && (
            <AlarmsTab
              alarms={state.alarms}
              onUpdateAlarm={handleUpdateAlarm}
              onResetAlarms={handleResetAlarms}
            />
          )}

          {activeTab === 'evening' && (
            <EveningGameTab
              game={state.eveningGame}
              morningNotes={state.morningNotes}
              onUpdateGame={handleUpdateEveningGame}
              onGainExp={handleGainExp}
            />
          )}

          {activeTab === 'history' && (
            <HistoryReviewTab
              state={state}
              onArchiveToday={handleArchiveToday}
              onDeleteHistory={handleDeleteHistory}
              onImportBackup={handleImportBackup}
              onGainExp={handleGainExp}
              onAddBookmark={handleAddBookmark}
              onDeleteBookmark={handleDeleteBookmark}
            />
          )}
        </div>
      </main>

      {/* 3. 本命動物夥伴自選系統彈窗 Modal */}
      <CompanionModal
        isOpen={isCompanionModalOpen}
        onClose={() => setIsCompanionModalOpen(false)}
        primaryCompanion={state.primaryCompanion || 'rabbit'}
        secondaryCompanion={state.secondaryCompanion || 'cat'}
        onSelectCompanions={handleSelectCompanions}
      />
    </div>
  );
}
