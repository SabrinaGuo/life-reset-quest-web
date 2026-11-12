import React, { useState } from 'react';
import { AppState, StageId } from '../types';
import { STAGE_CONFIGS, calculateLevel, getCompanionStageQuotes } from '../utils/constants';
import {
  CapybaraIllustration,
  FoxIllustration,
  PenguinIllustration,
} from './AnimalIllustrations';
import { Sparkles, RefreshCw, Trophy, Flame, Edit2 } from 'lucide-react';

interface TopStatusBarProps {
  state: AppState;
  onChangeStage: (stage: StageId) => void;
  onNextQuote: (stage: StageId) => void;
  onUpdateIdentityAnchor: (anchor: string) => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  state,
  onChangeStage,
  onNextQuote,
  onUpdateIdentityAnchor,
}) => {
  const [isEditingAnchor, setIsEditingAnchor] = useState(false);
  const currentStageConfig = STAGE_CONFIGS[state.currentStage];
  const companionQuotes = getCompanionStageQuotes(
    state.primaryCompanion || 'rabbit',
    state.currentStage
  );
  const quoteIdx = state.stageQuoteIndex[state.currentStage] || 0;
  const currentQuote = companionQuotes[quoteIdx % companionQuotes.length];

  const levelInfo = calculateLevel(state.exp);

  return (
    <div className="space-y-4">
      {/* 頂部個人核心身份橫幅 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#9B8EA9]/15 via-[#F6F5F2] to-[#7D94A8]/15 border border-[#9B8EA9]/30 p-4 md:p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#9B8EA9]/20 text-[#6B5A7E] border border-[#9B8EA9]/40 shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#7A6B8D]">
                冒險者核心身份定錨
              </div>
              {isEditingAnchor ? (
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-medium text-[#3D444D]">我是那種</span>
                  <input
                    type="text"
                    value={state.morningNotes.newVision.identityAnchor}
                    onChange={(e) => onUpdateIdentityAnchor(e.target.value)}
                    onBlur={() => setIsEditingAnchor(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setIsEditingAnchor(false);
                    }}
                    autoFocus
                    placeholder="專注熱情、掌控自己生活節奏且勇敢重啟"
                    className="rounded-lg border border-[#9B8EA9] bg-white px-3 py-1 text-sm text-[#3D444D] font-medium focus:outline-none focus:ring-2 focus:ring-[#9B8EA9]/40"
                  />
                  <span className="text-sm font-medium text-[#3D444D]">的人。</span>
                  <button
                    onClick={() => setIsEditingAnchor(false)}
                    className="text-xs text-[#7A6B8D] hover:underline"
                  >
                    完成
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setIsEditingAnchor(true)}
                  className="mt-1 flex items-center gap-1.5 cursor-pointer group"
                >
                  <span className="text-base md:text-lg font-bold text-[#3D444D]">
                    我是那種「
                    <span className="text-[#6B5A7E] underline decoration-dashed decoration-[#9B8EA9] underline-offset-4 group-hover:text-[#524164] transition-colors">
                      {state.morningNotes.newVision.identityAnchor || '點擊設定你的全新身份定錨'}
                    </span>
                    」的人。
                  </span>
                  <span className="text-xs text-[#9B8EA9] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit2 className="h-3 w-3" />
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 連續打卡與 EXP 經驗條 */}
          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-[#7D94A8]/20 pt-3 md:pt-0 md:pl-5">
            {/* 連續記錄 */}
            <div className="flex items-center gap-1.5 shrink-0 bg-white/70 px-3 py-1.5 rounded-xl border border-[#CFA7A7]/40 shadow-2xs">
              <Flame className="h-4 w-4 text-[#D68666]" />
              <div className="text-xs">
                <span className="text-stone-400">連續</span>
                <span className="font-bold text-[#3D444D] ml-1">{state.streak}</span>
                <span className="text-stone-400 ml-0.5">天</span>
              </div>
            </div>

            {/* EXP 等級進度 */}
            <div className="min-w-[160px] flex-1 md:flex-initial">
              <div className="flex items-center justify-between text-xs font-semibold text-[#3D444D] mb-1">
                <span className="flex items-center gap-1 text-[#7D94A8]">
                  <Trophy className="h-3.5 w-3.5" />
                  Lv.{levelInfo.level} {levelInfo.title}
                </span>
                <span className="text-[11px] text-stone-500 font-mono tabular-nums">
                  {levelInfo.currentInLevel}/{levelInfo.levelExpNeeded} EXP
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200/80">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7D94A8] via-[#9B8EA9] to-[#CFA7A7] transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 改變三階段心理狀態切換器 */}
      <div className="rounded-2xl bg-white border border-[#7D94A8]/25 p-4 md:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#7D94A8]">
              心理狀態切換器 · 動物陪伴指南
            </div>
            <h2 className="text-base font-bold text-[#3D444D]">
              你現在處於改變的哪一個心境階段？
            </h2>
          </div>

          {/* 3個階段按鈕 */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F6F5F2] rounded-xl border border-stone-200">
            {([1, 2, 3] as StageId[]).map((stageId) => {
              const cfg = STAGE_CONFIGS[stageId];
              const isActive = state.currentStage === stageId;
              return (
                <button
                  key={stageId}
                  onClick={() => onChangeStage(stageId)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-[#3D444D] shadow-xs border border-stone-200'
                      : 'text-stone-500 hover:text-[#3D444D] hover:bg-white/50'
                  }`}
                >
                  {cfg.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* 當前階段動物插圖與安慰鼓勵卡 */}
        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl bg-[#F6F5F2]/80 border border-[#7D94A8]/20 p-4 relative overflow-hidden">
          {/* 動物插圖 */}
          <div className="shrink-0 flex items-center justify-center p-2 rounded-2xl bg-white shadow-2xs border border-stone-100">
            {state.currentStage === 1 && <CapybaraIllustration size={88} />}
            {state.currentStage === 2 && <FoxIllustration size={88} />}
            {state.currentStage === 3 && <PenguinIllustration size={88} />}
          </div>

          {/* 語錄內容 */}
          <div className="flex-1 space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span
                className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-md border ${currentStageConfig.badgeBg}`}
              >
                {currentStageConfig.stageName} · {currentStageConfig.animalName}
              </span>
              <span className="text-xs text-stone-500 hidden sm:inline">
                {currentStageConfig.tagline}
              </span>
            </div>

            <p className="text-sm md:text-[15px] font-medium leading-relaxed text-[#3D444D]">
              「{currentQuote}」
            </p>
          </div>

          {/* 換一句鼓勵按鈕 */}
          <button
            onClick={() => onNextQuote(state.currentStage)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-[#7D94A8]/30 text-[#7D94A8] hover:bg-[#7D94A8]/10 hover:border-[#7D94A8] transition-colors shadow-2xs cursor-pointer active:scale-95"
            title="隨機切換安慰鼓勵語錄"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>換一句鼓勵</span>
          </button>
        </div>
      </div>
    </div>
  );
};
