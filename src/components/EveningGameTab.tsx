import React, { useState } from 'react';
import { EveningGame, MorningNotes } from '../types';
import { ShibaIllustration } from './AnimalIllustrations';
import { generateGoogleTaskCalendarUrl } from '../utils/calendar';
import { RULE_PRESETS } from '../utils/constants';
import {
  Compass,
  Swords,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  Heart,
  ShieldAlert,
  Target,
  Trophy,
  Scroll,
  CheckCircle2,
  ArrowDownToDot,
} from 'lucide-react';

interface EveningGameTabProps {
  game: EveningGame;
  morningNotes: MorningNotes;
  onUpdateGame: (updated: Partial<EveningGame>) => void;
  onGainExp: (amount: number, reason: string) => void;
}

export const EveningGameTab: React.FC<EveningGameTabProps> = ({
  game,
  morningNotes,
  onUpdateGame,
  onGainExp,
}) => {
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [newRuleTag, setNewRuleTag] = useState('');
  const [celebratingQuestId, setCelebratingQuestId] = useState<string | null>(null);

  // 1. 底線與方向
  const handleDeclarationChange = (
    field: 'bottomLine' | 'targetDirection',
    value: string
  ) => {
    onUpdateGame({ [field]: value });
  };

  // 2. 六要素編輯
  const handleFieldChange = (field: keyof EveningGame, value: any) => {
    onUpdateGame({ [field]: value });
  };

  // 一鍵從早晨反願景帶入賭注 (Stakes)
  const handleImportStakesFromMorning = () => {
    const summary = [
      morningNotes.antiVision.unbearableHabits,
      morningNotes.antiVision.fiveYearsTuesday,
    ]
      .filter(Boolean)
      .join('；');

    if (summary) {
      onUpdateGame({
        stakes: `代價：如果輸掉這場遊戲，我將承受——${summary}`,
      });
      onGainExp(10, '一鍵同步早晨反願景');
    }
  };

  // 一鍵從早晨新願景帶入贏的條件 (Win Condition)
  const handleImportWinFromMorning = () => {
    if (morningNotes.newVision.threeYearsIdealDay) {
      onUpdateGame({
        winCondition: `理想願景：${morningNotes.newVision.threeYearsIdealDay}`,
      });
      onGainExp(10, '一鍵同步早晨新願景');
    }
  };

  // 每日任務：新增
  const handleAddQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestTitle.trim()) return;

    const newQuest = {
      id: `quest-${Date.now()}`,
      title: newQuestTitle.trim(),
      completed: false,
    };

    onUpdateGame({
      dailyQuests: [...game.dailyQuests, newQuest],
    });
    setNewQuestTitle('');
  };

  // 每日任務：切換完成
  const handleToggleQuest = (id: string) => {
    const target = game.dailyQuests.find((q) => q.id === id);
    const willComplete = !target?.completed;

    if (willComplete) {
      setCelebratingQuestId(id);
      onGainExp(20, '完成每日任務');
      setTimeout(() => setCelebratingQuestId(null), 1500);
    }

    const updated = game.dailyQuests.map((q) =>
      q.id === id ? { ...q, completed: willComplete } : q
    );
    onUpdateGame({ dailyQuests: updated });
  };

  // 每日任務：刪除
  const handleDeleteQuest = (id: string) => {
    onUpdateGame({
      dailyQuests: game.dailyQuests.filter((q) => q.id !== id),
    });
  };

  // 遊戲規則標籤：新增
  const handleAddRule = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || game.rules.includes(trimmed)) return;
    onUpdateGame({ rules: [...game.rules, trimmed] });
    setNewRuleTag('');
  };

  // 遊戲規則標籤：移除
  const handleRemoveRule = (tag: string) => {
    onUpdateGame({ rules: game.rules.filter((r) => r !== tag) });
  };

  // 魔王戰況文字
  const getBossStatus = (progress: number) => {
    if (progress === 0) return { label: '魔王氣勢洶洶（尚未開戰）', color: 'text-rose-600' };
    if (progress < 40) return { label: '你已打落魔王護盾（進展順暢）', color: 'text-amber-600' };
    if (progress < 80) return { label: '魔王陷入苦戰，節節敗退！', color: 'text-sky-600' };
    if (progress < 100) return { label: '最後一擊！即將攻克魔王目標', color: 'text-purple-600' };
    return { label: '魔王已被徹底攻克！榮耀大勝！', color: 'text-emerald-600 font-bold' };
  };

  const bossStatus = getBossStatus(game.bossFight.progress);

  return (
    <div className="space-y-6">
      {/* 頂部引導與柴犬藏寶圖 */}
      <div className="rounded-2xl bg-white border border-[#7D94A8]/25 p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#E29272]/15 rounded-2xl border border-[#E29272]/30 shrink-0">
              <ShibaIllustration size={76} />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md bg-[#DEAA79]/20 text-[#8C5223] border border-[#DEAA79]/40 mb-1">
                夜間收斂 · 柴犬藏寶圖
              </div>
              <h3 className="text-xl font-bold text-[#3D444D] font-handwriting">
                晚上收斂 & 人生遊戲六要素
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xl">
                把人生當作一場值得全心投入的大型 RPG 遊戲：明確賭注、制定勝出條件、攻克階段魔王，並規劃好明天最關鍵的 2~3 個行動！
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#F6F5F2] px-3.5 py-2 rounded-xl border border-stone-200">
            <Compass className="h-4 w-4 text-[#7D94A8]" />
            <div className="text-xs font-semibold text-[#3D444D]">
              遊戲進度：
              <span className="text-[#7D94A8] font-bold ml-1 font-mono">
                {game.dailyQuests.filter((q) => q.completed).length}/
                {game.dailyQuests.length} 任務完成
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 底線與方向宣言卡 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 底線宣言 */}
        <div className="rounded-2xl bg-gradient-to-br from-[#CFA7A7]/20 to-[#FFFDFB] border-2 border-[#CFA7A7]/50 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="h-4 w-4 text-[#9C5A5A]" />
            <span className="text-xs font-bold tracking-wider text-[#9C5A5A] uppercase">
              絕對不可觸碰的底線
            </span>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#3D444D] font-handwriting">
              我不允許我的人生，變成：
            </label>
            <textarea
              rows={2}
              value={game.bottomLine}
              onChange={(e) =>
                handleDeclarationChange('bottomLine', e.target.value)
              }
              placeholder="例如：麻木妥協、隨波逐流且失去主導權的無力感..."
              className="w-full journal-textarea rounded-xl border border-[#CFA7A7]/40 bg-white p-3 text-sm font-handwriting font-bold text-[#3D444D] placeholder-stone-400 focus:border-[#CFA7A7] focus:outline-none focus:ring-2 focus:ring-[#CFA7A7]/30 resize-none transition-all leading-relaxed tracking-wide"
            />
          </div>
        </div>

        {/* 方向宣言 */}
        <div className="rounded-2xl bg-gradient-to-br from-[#7D94A8]/20 to-[#FFFDFB] border-2 border-[#7D94A8]/50 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-[#4A6478]" />
            <span className="text-xs font-bold tracking-wider text-[#4A6478] uppercase">
              靈魂渴望的方向
            </span>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#3D444D] font-handwriting">
              我要往：
            </label>
            <textarea
              rows={2}
              value={game.targetDirection}
              onChange={(e) =>
                handleDeclarationChange('targetDirection', e.target.value)
              }
              placeholder="例如：清醒自律、充滿創造力與內在豐盛的自由人生..."
              className="w-full journal-textarea rounded-xl border border-[#7D94A8]/40 bg-white p-3 text-sm font-handwriting font-bold text-[#3D444D] placeholder-stone-400 focus:border-[#7D94A8] focus:outline-none focus:ring-2 focus:ring-[#7D94A8]/30 resize-none transition-all leading-relaxed tracking-wide"
            />
          </div>
        </div>
      </div>

      {/* 人生遊戲地圖（六大可愛卡片網格） */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. 賭注 (Stakes) */}
        <div className="rounded-2xl bg-white border border-[#CFA7A7]/35 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CFA7A7]/20 text-xs font-bold text-[#8E5E5E]">
                  1
                </span>
                <h4 className="text-base font-bold text-[#3D444D] font-handwriting">賭注 (Stakes)</h4>
              </div>
              <button
                onClick={handleImportStakesFromMorning}
                className="text-[11px] font-semibold text-[#8E5E5E] hover:underline flex items-center gap-1"
                title="帶入早晨反願景"
              >
                <ArrowDownToDot className="h-3 w-3" />
                帶入反願景
              </button>
            </div>
            <p className="text-xs text-stone-500 mb-2">輸掉這場遊戲的慘痛代價是什麼？</p>
            <textarea
              rows={4}
              value={game.stakes}
              onChange={(e) => handleFieldChange('stakes', e.target.value)}
              placeholder="失去最好的時光，活在懊悔與無力感中..."
              className="w-full journal-textarea rounded-xl border border-stone-200/90 p-3 text-xs md:text-sm text-[#3D444D] placeholder-stone-400 focus:border-[#CFA7A7] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CFA7A7] resize-none leading-relaxed tracking-wide"
            />
          </div>
        </div>

        {/* 2. 贏的條件 (Win Condition) */}
        <div className="rounded-2xl bg-white border border-[#7D94A8]/35 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7D94A8]/20 text-xs font-bold text-[#4A6478]">
                  2
                </span>
                <h4 className="text-base font-bold text-[#3D444D] font-handwriting">
                  贏的條件 (Win Condition)
                </h4>
              </div>
              <button
                onClick={handleImportWinFromMorning}
                className="text-[11px] font-semibold text-[#4A6478] hover:underline flex items-center gap-1"
                title="帶入三年後理想"
              >
                <ArrowDownToDot className="h-3 w-3" />
                帶入新願景
              </button>
            </div>
            <p className="text-xs text-stone-500 mb-2">怎樣才算真正通關、活出理想願景？</p>
            <textarea
              rows={4}
              value={game.winCondition}
              onChange={(e) => handleFieldChange('winCondition', e.target.value)}
              placeholder="每天醒來都對即將做的事情感到好奇與期待..."
              className="w-full journal-textarea rounded-xl border border-stone-200/90 p-3 text-xs md:text-sm text-[#3D444D] placeholder-stone-400 focus:border-[#7D94A8] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#7D94A8] resize-none leading-relaxed tracking-wide"
            />
          </div>
        </div>

        {/* 3. 主線任務 (Main Quest - 1 年期) */}
        <div className="rounded-2xl bg-white border border-[#9B8EA9]/35 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#9B8EA9]/20 text-xs font-bold text-[#6B5A7E]">
                3
              </span>
              <h4 className="text-base font-bold text-[#3D444D] font-handwriting">
                主線任務 (Main Quest)
              </h4>
            </div>
            <p className="text-xs text-stone-500 mb-2">
              一年後要變成什麼樣的成果，才算徹底改掉舊的自己？
            </p>
            <textarea
              rows={4}
              value={game.mainQuest}
              onChange={(e) => handleFieldChange('mainQuest', e.target.value)}
              placeholder="打造個人的核心競爭力作品集，並建立穩定的身心重啟節奏..."
              className="w-full journal-textarea rounded-xl border border-stone-200/90 p-3 text-xs md:text-sm text-[#3D444D] placeholder-stone-400 focus:border-[#9B8EA9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#9B8EA9] resize-none leading-relaxed tracking-wide"
            />
          </div>
        </div>

        {/* 4. 階段魔王 (Boss Fight - 1 個月期) */}
        <div className="rounded-2xl bg-white border border-[#CFA7A7]/40 p-5 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CFA7A7]/20 text-xs font-bold text-[#8E5E5E]">
                  4
                </span>
                <h4 className="text-base font-bold text-[#3D444D] font-handwriting">
                  階段魔王 (Boss Fight)
                </h4>
              </div>
              <Swords className="h-4 w-4 text-[#CFA7A7]" />
            </div>
            <p className="text-xs text-stone-500 mb-2">這個月必須攻克的具體主要目標：</p>
            <input
              type="text"
              value={game.bossFight.name}
              onChange={(e) =>
                handleFieldChange('bossFight', {
                  ...game.bossFight,
                  name: e.target.value,
                })
              }
              placeholder="例如：本月戒斷無意識滑手機..."
              className="w-full rounded-xl border border-stone-200 bg-[#F6F5F2]/50 p-2.5 text-xs md:text-sm font-semibold text-[#3D444D] placeholder-stone-400 focus:border-[#CFA7A7] focus:bg-white focus:outline-none mb-3"
            />

            {/* 魔王血條／進度條 */}
            <div className="space-y-1.5 p-3 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-600">魔王生命值進度：</span>
                <span className="font-mono font-bold text-[#CFA7A7] tabular-nums">
                  {game.bossFight.progress}%
                </span>
              </div>

              {/* 滑桿與血條 */}
              <div className="space-y-2">
                <div className="h-3 w-full overflow-hidden rounded-full bg-stone-200 relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#CFA7A7] via-[#D68666] to-emerald-400 transition-all duration-300"
                    style={{ width: `${game.bossFight.progress}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={game.bossFight.progress}
                  onChange={(e) =>
                    handleFieldChange('bossFight', {
                      ...game.bossFight,
                      progress: Number(e.target.value),
                    })
                  }
                  className="w-full accent-[#CFA7A7] cursor-pointer"
                />
              </div>

              <div className={`text-[11px] text-center pt-1 font-medium ${bossStatus.color}`}>
                {bossStatus.label}
              </div>
            </div>
          </div>
        </div>

        {/* 5. 每日任務 (Daily Quests - 明天 2~3 件事) */}
        <div className="rounded-2xl bg-white border border-[#7D94A8]/35 p-5 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7D94A8]/20 text-xs font-bold text-[#4A6478]">
                  5
                </span>
                <h4 className="text-base font-bold text-[#3D444D] font-handwriting">
                  每日任務 (Daily Quests · 明天 2~3 件事)
                </h4>
              </div>
              <span className="text-xs text-stone-500 font-medium">勾選獲取 +20 EXP</span>
            </div>
            <p className="text-xs text-stone-500 mb-3">
              明天只要搞定這幾件事，你就在往「新願景中的自己」扎實前進。
            </p>

            {/* 任務清單 */}
            <div className="space-y-2 mb-3">
              {game.dailyQuests.map((quest) => {
                const isCelebrating = celebratingQuestId === quest.id;
                const calUrl = generateGoogleTaskCalendarUrl(quest.title);
                return (
                  <div
                    key={quest.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      quest.completed
                        ? 'bg-stone-50/80 border-stone-200 opacity-80'
                        : 'bg-[#F6F5F2]/40 border-stone-200 hover:border-[#7D94A8]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                      <button
                        onClick={() => handleToggleQuest(quest.id)}
                        className={`h-5 w-5 shrink-0 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                          quest.completed
                            ? 'bg-[#7D94A8] border-[#7D94A8] text-white'
                            : 'border-stone-300 hover:border-[#7D94A8] bg-white'
                        }`}
                      >
                        {quest.completed && <CheckCircle2 className="h-4 w-4" />}
                      </button>

                      <span
                        className={`text-xs md:text-sm font-medium truncate ${
                          quest.completed
                            ? 'line-through text-stone-400'
                            : 'text-[#3D444D]'
                        }`}
                      >
                        {quest.title}
                      </span>

                      {/* 勾選時飄出的星星愛心動效 */}
                      {isCelebrating && (
                        <span className="inline-flex items-center gap-1 text-xs text-[#9B8EA9] font-bold animate-bounce">
                          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                          <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400" />
                          +20 EXP!
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={calUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-stone-400 hover:text-[#7D94A8] hover:bg-stone-100 rounded-lg transition-colors"
                        title="加到 Google 日曆待辦提醒"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                      </a>
                      <button
                        onClick={() => handleDeleteQuest(quest.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="刪除任務"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 新增任務輸入 */}
            <form onSubmit={handleAddQuest} className="flex gap-2">
              <input
                type="text"
                value={newQuestTitle}
                onChange={(e) => setNewQuestTitle(e.target.value)}
                placeholder="輸入明天要攻克的關鍵行動..."
                className="flex-1 rounded-xl border border-stone-200 bg-[#F6F5F2]/40 px-3 py-2 text-xs md:text-sm text-[#3D444D] placeholder-stone-400 focus:border-[#7D94A8] focus:bg-white focus:outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-xl bg-[#7D94A8] text-white hover:bg-[#688195] transition-colors shadow-2xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>新增</span>
              </button>
            </form>
          </div>
        </div>

        {/* 6. 遊戲規則 (Rules) - 絕對不願犧牲的底線 */}
        <div className="rounded-2xl bg-white border border-[#9B8EA9]/35 p-5 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#9B8EA9]/20 text-xs font-bold text-[#6B5A7E]">
                  6
                </span>
                <h4 className="text-base font-bold text-[#3D444D] font-handwriting">
                  遊戲規則 (Rules · 絕對不願意犧牲的底線)
                </h4>
              </div>
              <Scroll className="h-4 w-4 text-[#9B8EA9]" />
            </div>
            <p className="text-xs text-stone-500 mb-3">
              在追逐勝出的過程中，哪些核心價值（如身心健康、家人時光、道德準則）是永遠不可交換的基石？
            </p>

            {/* 當前標籤列表 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {game.rules.map((rule, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#9B8EA9]/15 text-[#5F4E72] border border-[#9B8EA9]/30"
                >
                  <span>{rule}</span>
                  <button
                    onClick={() => handleRemoveRule(rule)}
                    className="hover:text-rose-500 font-bold ml-0.5"
                    title="移除"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* 新增自訂規則標籤 */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-2 flex-1 max-w-sm">
                <input
                  type="text"
                  value={newRuleTag}
                  onChange={(e) => setNewRuleTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddRule(newRuleTag);
                    }
                  }}
                  placeholder="輸入自訂規則標籤..."
                  className="w-full rounded-xl border border-stone-200 bg-[#F6F5F2]/40 px-3 py-1.5 text-xs text-[#3D444D] placeholder-stone-400 focus:border-[#9B8EA9] focus:bg-white focus:outline-none"
                />
                <button
                  onClick={() => handleAddRule(newRuleTag)}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[#9B8EA9] text-white hover:bg-[#857694] transition-colors shrink-0"
                >
                  添加
                </button>
              </div>

              {/* 常用推薦底線快速點選 */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs text-stone-500">
                <span className="text-[11px] text-stone-400">快速推薦：</span>
                {RULE_PRESETS.filter((p) => !game.rules.includes(p))
                  .slice(0, 3)
                  .map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => handleAddRule(preset)}
                      className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-stone-100 text-stone-600 hover:bg-[#9B8EA9]/15 hover:text-[#5F4E72] transition-colors"
                    >
                      + {preset}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
