import React, { useState, useRef, useEffect } from 'react';
import { AppState, StageId, AnimalId } from '../types';
import {
  ANIMAL_CATALOG,
  STAGE_CONFIGS,
  calculateLevel,
  getCompanionStageQuotes,
} from '../utils/constants';
import { AnimalAvatar, getAnimalIllustration } from './AnimalIllustrations';
import {
  ChevronDown,
  RefreshCw,
  Bookmark,
  Check,
  Edit2,
  X,
  Flame,
  ArrowLeftRight,
} from 'lucide-react';

interface CompactHeaderProps {
  state: AppState;
  saveStatus: boolean;
  onOpenCompanionModal: () => void;
  onUpdateIdentityAnchor: (anchor: string) => void;
  onChangeStage: (stage: StageId) => void;
  onNextQuote: (stage: StageId) => void;
  onNavigateToBookmarks: () => void;
}

export const CompactHeader: React.FC<CompactHeaderProps> = ({
  state,
  saveStatus,
  onOpenCompanionModal,
  onUpdateIdentityAnchor,
  onChangeStage,
  onNextQuote,
  onNavigateToBookmarks,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditingAnchor, setIsEditingAnchor] = useState(false);
  const [anchorDraft, setAnchorDraft] = useState(
    state.morningNotes.newVision.identityAnchor || ''
  );
  const [speakerCompanion, setSpeakerCompanion] = useState<AnimalId>(
    state.primaryCompanion || 'rabbit'
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // 同步外部 anchor 變更
  useEffect(() => {
    setAnchorDraft(state.morningNotes.newVision.identityAnchor || '');
  }, [state.morningNotes.newVision.identityAnchor]);

  // 預設講話夥伴跟隨主夥伴
  useEffect(() => {
    setSpeakerCompanion(state.primaryCompanion || 'rabbit');
  }, [state.primaryCompanion]);

  // 點擊外部關閉下拉浮卡
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const levelInfo = calculateLevel(state.exp);
  const currentStageConfig = STAGE_CONFIGS[state.currentStage];

  // 取得所選陪伴動物在該階段的專屬語錄
  const activeQuotes = getCompanionStageQuotes(speakerCompanion, state.currentStage);
  const quoteIdx = state.stageQuoteIndex[state.currentStage] || 0;
  const currentQuote = activeQuotes[quoteIdx % activeQuotes.length];

  const handleSaveAnchor = () => {
    onUpdateIdentityAnchor(anchorDraft.trim());
    setIsEditingAnchor(false);
  };

  const stageBadgeColors: Record<StageId, string> = {
    1: 'bg-[#CFA7A7]/20 text-[#8E5E5E] border-[#CFA7A7]/40 hover:bg-[#CFA7A7]/30',
    2: 'bg-[#E29272]/20 text-[#9C5535] border-[#E29272]/40 hover:bg-[#E29272]/30',
    3: 'bg-[#7D94A8]/20 text-[#435B6F] border-[#7D94A8]/40 hover:bg-[#7D94A8]/30',
  };

  return (
    <div className="sticky top-0 z-40 bg-[#F6F5F2]/95 backdrop-blur-md border-b border-[#7D94A8]/25 shadow-2xs">
      {/* 緊湊單行頂部狀態列（高度控制在 60px 以內：h-[56px]） */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-[56px] flex items-center justify-between gap-3">
        {/* 左側：雙重疊頭像 + 可原地編輯的身份宣言 */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {/* 點擊切換夥伴的「主夥伴＋副夥伴雙重疊可愛圓形頭像」 */}
          <div
            onClick={onOpenCompanionModal}
            title="點擊切換本命冒險夥伴（主夥伴/副夥伴）"
            className="relative flex items-center cursor-pointer group shrink-0"
          >
            {/* 主夥伴頭像（左前） */}
            <div className="z-10 group-hover:scale-105 transition-transform">
              <AnimalAvatar
                id={state.primaryCompanion || 'rabbit'}
                size={38}
                ringColor="ring-2 ring-white shadow-xs"
              />
            </div>
            {/* 副夥伴頭像（右後微重疊） */}
            <div className="-ml-3 z-0 opacity-90 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
              <AnimalAvatar
                id={state.secondaryCompanion || 'cat'}
                size={30}
                ringColor="ring-1.5 ring-white/90"
              />
            </div>
            {/* 小懸浮提示點 */}
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#7D94A8] text-white shadow-xs">
              <ArrowLeftRight className="h-2 w-2" />
            </span>
          </div>

          {/* 單行身份宣言 */}
          <div className="min-w-0 flex-1 flex items-center text-xs md:text-sm font-semibold text-[#3D444D]">
            {isEditingAnchor ? (
              <div className="flex items-center gap-1.5 w-full max-w-md">
                <span className="shrink-0 text-stone-500 font-handwriting hidden sm:inline">我是那種</span>
                <input
                  type="text"
                  value={anchorDraft}
                  onChange={(e) => setAnchorDraft(e.target.value)}
                  onBlur={handleSaveAnchor}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveAnchor();
                    if (e.key === 'Escape') setIsEditingAnchor(false);
                  }}
                  autoFocus
                  placeholder="定義你的全新身份定錨..."
                  className="w-full rounded-md border border-[#9B8EA9] bg-white px-2 py-0.5 text-xs md:text-sm font-handwriting font-bold text-[#3D444D] focus:outline-none focus:ring-1 focus:ring-[#9B8EA9]"
                />
                <span className="shrink-0 text-stone-500 font-handwriting hidden sm:inline">的人。</span>
                <button
                  onClick={handleSaveAnchor}
                  className="px-2 py-0.5 rounded bg-[#9B8EA9] text-white text-[11px] font-bold shrink-0 font-body"
                >
                  存
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingAnchor(true)}
                className="flex items-center gap-1 truncate cursor-pointer group py-1"
                title="點擊原地編輯核心身份宣言"
              >
                <span className="text-stone-500 font-handwriting shrink-0 hidden sm:inline">我是那種「</span>
                <span className="font-handwriting font-bold text-sm md:text-[15px] text-[#3D444D] group-hover:text-[#6B5A7E] underline decoration-dashed decoration-[#9B8EA9]/60 underline-offset-2 truncate tracking-wide">
                  {state.morningNotes.newVision.identityAnchor || '設定你的核心新身份'}
                </span>
                <span className="text-stone-500 font-handwriting shrink-0 hidden sm:inline">」的人。</span>
                <Edit2 className="h-3 w-3 text-stone-400 opacity-40 group-hover:opacity-100 transition-opacity shrink-0 ml-0.5" />
              </div>
            )}
          </div>
        </div>

        {/* 右側：書籤櫃快捷 + 心理狀態膠囊 + 迷你 EXP + 自動存檔 */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* 重溫靈感書籤櫃快捷按鈕 */}
          <button
            onClick={onNavigateToBookmarks}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1 text-xs font-semibold rounded-lg text-stone-600 hover:text-[#7D94A8] hover:bg-stone-100/80 transition-colors border border-stone-200/80 shadow-2xs font-body"
            title="開啟重溫靈感書籤櫃"
          >
            <Bookmark className="h-3.5 w-3.5 text-[#7D94A8]" />
            <span className="hidden md:inline text-[11px]">靈感書籤</span>
          </button>

          {/* 迷你經驗值進度條 */}
          <div className="hidden lg:flex items-center gap-2 bg-white/70 px-2.5 py-1 rounded-lg border border-stone-200/80">
            <span className="text-[11px] font-bold text-[#7D94A8] font-body">
              Lv.{levelInfo.level}
            </span>
            <div className="w-16 h-1.5 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7D94A8] to-[#CFA7A7] rounded-full transition-all duration-300"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
            <span className="font-caveat font-bold text-sm text-stone-600 tabular-nums">
              {levelInfo.currentInLevel} EXP
            </span>
          </div>

          {/* 心理狀態膠囊切換按鈕（點擊展開/收合浮動陪伴卡） */}
          <button
            ref={triggerRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
              stageBadgeColors[state.currentStage]
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            <span className="whitespace-nowrap">{currentStageConfig.title.replace('階段', '')}</span>
            <ChevronDown
              className={`h-3 w-3 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* 自動存檔微指示器 */}
          <div
            className={`hidden sm:flex items-center gap-1 text-[11px] transition-opacity duration-300 ${
              saveStatus
                ? 'text-emerald-700 opacity-100'
                : 'text-stone-400 opacity-40'
            }`}
            title="資料已即時寫入瀏覽器 LocalStorage"
          >
            <Check className="h-3 w-3" />
            <span className="hidden xl:inline">已自動儲存</span>
          </div>
        </div>
      </div>

      {/* 點擊展開狀態：平滑向下展開的浮動陪伴小卡（Popover） */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-3 sm:right-6 top-[58px] z-50 w-[94vw] sm:w-[420px] rounded-2xl bg-white border border-[#7D94A8]/30 shadow-xl p-4 space-y-3 animate-fadeIn"
        >
          {/* 卡片標題列 */}
          <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#3D444D]">
              <span>心理狀態切換 · 動物即時陪伴</span>
            </div>
            <button
              onClick={() => setIsDropdownOpen(false)}
              className="p-1 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* 三階段切換按鈕 */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F6F5F2] rounded-xl border border-stone-200">
            {([1, 2, 3] as StageId[]).map((stageId) => {
              const cfg = STAGE_CONFIGS[stageId];
              const isActive = state.currentStage === stageId;
              return (
                <button
                  key={stageId}
                  onClick={() => onChangeStage(stageId)}
                  className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all text-center ${
                    isActive
                      ? 'bg-white text-[#3D444D] shadow-xs border border-stone-200'
                      : 'text-stone-500 hover:text-[#3D444D]'
                  }`}
                >
                  {cfg.title.replace('階段', '')}
                </button>
              );
            })}
          </div>

          {/* 說話夥伴切換器（主夥伴／副夥伴） */}
          <div className="flex items-center justify-between px-1 text-[11px] text-stone-500">
            <span>正在聽誰陪伴安慰：</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSpeakerCompanion(state.primaryCompanion || 'rabbit')}
                className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                  speakerCompanion === state.primaryCompanion
                    ? 'bg-[#7D94A8]/20 text-[#435B6F]'
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                主夥伴 {ANIMAL_CATALOG[state.primaryCompanion || 'rabbit'].name}
              </button>
              <span className="text-stone-300">|</span>
              <button
                onClick={() => setSpeakerCompanion(state.secondaryCompanion || 'cat')}
                className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                  speakerCompanion === state.secondaryCompanion
                    ? 'bg-[#9B8EA9]/20 text-[#6B5A7E]'
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                副夥伴 {ANIMAL_CATALOG[state.secondaryCompanion || 'cat'].name}
              </button>
            </div>
          </div>

          {/* 專屬語錄與動物插圖（日系便箋手寫風） */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl sticky-note-paper border border-[#CFA7A7]/40 shadow-xs relative">
            <div className="shrink-0 p-1 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
              {getAnimalIllustration(speakerCompanion, 54)}
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-[#7D94A8] font-body">
                  {ANIMAL_CATALOG[speakerCompanion].name} · {ANIMAL_CATALOG[speakerCompanion].title}
                </span>
                <span className="text-[10px] text-stone-400 font-caveat font-bold">
                  gentle memo
                </span>
              </div>
              <p className="font-handwriting text-sm md:text-[14.5px] leading-relaxed tracking-wide text-[#3D444D]">
                「{currentQuote}」
              </p>
            </div>
          </div>

          {/* 換一句與更換夥伴按鈕 */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <button
              onClick={onOpenCompanionModal}
              className="text-stone-400 hover:text-[#7D94A8] text-[11px] underline"
            >
              更換本命夥伴庫
            </button>

            <button
              onClick={() => onNextQuote(state.currentStage)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#7D94A8]/40 text-[#7D94A8] hover:bg-[#7D94A8]/10 text-xs font-bold transition-colors shadow-2xs"
            >
              <RefreshCw className="h-3 w-3" />
              <span>換一句鼓勵</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
