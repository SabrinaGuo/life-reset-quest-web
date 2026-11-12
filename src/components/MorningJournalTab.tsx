import React, { useState } from 'react';
import { MorningNotes } from '../types';
import { BearIllustration, CatIllustration } from './AnimalIllustrations';
import { RotateCw, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface MorningJournalTabProps {
  notes: MorningNotes;
  onUpdateNotes: (updated: Partial<MorningNotes>) => void;
  onSyncToEveningStakes?: () => void;
}

export const MorningJournalTab: React.FC<MorningJournalTabProps> = ({
  notes,
  onUpdateNotes,
  onSyncToEveningStakes,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [syncedNotice, setSyncedNotice] = useState(false);

  const handleAntiVisionChange = (
    field: keyof MorningNotes['antiVision'],
    value: string
  ) => {
    onUpdateNotes({
      antiVision: {
        ...notes.antiVision,
        [field]: value,
      },
    });
  };

  const handleNewVisionChange = (
    field: keyof MorningNotes['newVision'],
    value: string
  ) => {
    onUpdateNotes({
      newVision: {
        ...notes.newVision,
        [field]: value,
      },
    });
  };

  const handleSync = () => {
    if (onSyncToEveningStakes) {
      onSyncToEveningStakes();
      setSyncedNotice(true);
      setTimeout(() => setSyncedNotice(false), 2500);
    }
  };

  return (
    <div className="space-y-6">
      {/* 導言提示與翻轉控制按鈕 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#7D94A8]/20 shadow-xs">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#7D94A8]">
            晨間定錨儀式 · 雙面手帳
          </div>
          <p className="text-sm text-stone-600 font-medium">
            用【正面反願景】刺醒麻木，用【背面新願景】錨定真正渴望的身份。
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onSyncToEveningStakes && (
            <button
              onClick={handleSync}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-[#9B8EA9]/40 text-[#6B5A7E] hover:bg-[#9B8EA9]/10 transition-colors shadow-2xs"
            >
              {syncedNotice ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>已帶入晚上地圖</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-[#9B8EA9]" />
                  <span>同步至晚上地圖</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-[#7D94A8] text-white hover:bg-[#688195] transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <RotateCw className={`h-4 w-4 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
            <span>{isFlipped ? '翻回正面【反願景】' : '翻到背面【新願景】'}</span>
          </button>
        </div>
      </div>

      {/* 3D 翻轉卡片容器 */}
      <div className="perspective-1000 w-full min-h-[640px]">
        <div
          className={`relative w-full transition-transform duration-700 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ======================= 正面：【反願景】喚醒現狀 ======================= */}
          <div
            className={`w-full rounded-2xl bg-[#FFFDFB] border-2 border-[#CFA7A7]/40 shadow-sm p-6 md:p-8 backface-hidden ${
              isFlipped ? 'pointer-events-none invisible absolute top-0 left-0' : 'relative'
            }`}
          >
            {/* 卡片標題區 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#CFA7A7]/30">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#CFA7A7]/15 rounded-2xl border border-[#CFA7A7]/30 shrink-0">
                  <BearIllustration size={72} />
                </div>
                <div>
                  <div className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md bg-[#CFA7A7]/20 text-[#8E5E5E] border border-[#CFA7A7]/40 mb-1">
                    正面 · 覺醒區
                  </div>
                  <h3 className="text-xl font-bold text-[#3D444D] font-handwriting">
                    【反願景】喚醒現狀：如果不改變，我會墜向何處？
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    小熊陪你誠實面對當下的逃避與麻木，痛楚是喚醒你的第一記警鐘。
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFlipped(true)}
                className="self-end md:self-center flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#8E5E5E] bg-[#CFA7A7]/15 hover:bg-[#CFA7A7]/25 rounded-lg transition-colors"
              >
                <span>前往背面（新願景）</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* 4 個反願景問題區塊 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* 問題 1 */}
              <div className="space-y-2 p-4 rounded-xl bg-white/80 border border-stone-200">
                <label className="block text-sm font-bold text-[#3D444D] font-handwriting">
                  1. 習慣了的不滿
                </label>
                <p className="text-xs text-stone-500">
                  有哪些事情你明明每天都在抱怨、難受，卻已經麻木習慣去忍受？
                </p>
                <textarea
                  rows={4}
                  value={notes.antiVision.unbearableHabits}
                  onChange={(e) =>
                    handleAntiVisionChange('unbearableHabits', e.target.value)
                  }
                  placeholder="例如：忍受無意義的推諉、每天睡前帶著罪惡感滑手機到半夜、體力越來越差..."
                  className="w-full journal-textarea rounded-xl border border-stone-200/90 p-3 text-sm text-[#3D444D] placeholder-stone-400 focus:border-[#CFA7A7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CFA7A7]/30 transition-all resize-none leading-relaxed tracking-wide"
                />
              </div>

              {/* 問題 2 */}
              <div className="space-y-2 p-4 rounded-xl bg-white/80 border border-stone-200">
                <label className="block text-sm font-bold text-[#3D444D] font-handwriting">
                  2. 只看我做的事，別人以為我想要什麼？
                </label>
                <p className="text-xs text-stone-500">
                  抽離語言與藉口，光憑你一整天的實際行動，在外人看來你像在追求什麼？
                </p>
                <textarea
                  rows={4}
                  value={notes.antiVision.behaviorVsDesire}
                  onChange={(e) =>
                    handleAntiVisionChange('behaviorVsDesire', e.target.value)
                  }
                  placeholder="例如：看起來像個只想平安度過今天、害怕被看見、把精力浪費在雜訊上的疲憊人..."
                  className="w-full journal-textarea rounded-xl border border-stone-200/90 p-3 text-sm text-[#3D444D] placeholder-stone-400 focus:border-[#CFA7A7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CFA7A7]/30 transition-all resize-none leading-relaxed tracking-wide"
                />
              </div>

              {/* 問題 3 */}
              <div className="space-y-2 p-4 rounded-xl bg-white/80 border border-stone-200">
                <label className="block text-sm font-bold text-[#3D444D] font-handwriting">
                  3. 五年後的普通星期二會怎麼過？
                </label>
                <p className="text-xs text-stone-500">
                  如果完全不做出改變，五年後一個毫不起眼的週二下午，你在哪裡？心情如何？
                </p>
                <textarea
                  rows={4}
                  value={notes.antiVision.fiveYearsTuesday}
                  onChange={(e) =>
                    handleAntiVisionChange('fiveYearsTuesday', e.target.value)
                  }
                  placeholder="例如：在相同的狹小格子間嘆氣，頭髮變稀疏，對生活失去所有熱情與期待..."
                  className="w-full journal-textarea rounded-xl border border-stone-200/90 p-3 text-sm text-[#3D444D] placeholder-stone-400 focus:border-[#CFA7A7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CFA7A7]/30 transition-all resize-none leading-relaxed tracking-wide"
                />
              </div>

              {/* 問題 4 */}
              <div className="space-y-2 p-4 rounded-xl bg-white/80 border border-stone-200">
                <label className="block text-sm font-bold text-[#3D444D] font-handwriting">
                  4. 都不改變最丟臉的理由是什麼？
                </label>
                <p className="text-xs text-stone-500">
                  撕開所有包裝好的客觀藉口，最深層、最難啟齒的膽怯是什麼？
                </p>
                <textarea
                  rows={4}
                  value={notes.antiVision.shamefulReason}
                  onChange={(e) =>
                    handleAntiVisionChange('shamefulReason', e.target.value)
                  }
                  placeholder="例如：害怕一旦認真卻依然平凡，所以寧可假裝自己根本沒努力過..."
                  className="w-full journal-textarea rounded-xl border border-stone-200/90 p-3 text-sm text-[#3D444D] placeholder-stone-400 focus:border-[#CFA7A7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CFA7A7]/30 transition-all resize-none leading-relaxed tracking-wide"
                />
              </div>
            </div>

            {/* 底部翻頁提示 */}
            <div className="mt-6 pt-4 border-t border-[#CFA7A7]/25 flex items-center justify-between text-xs text-stone-500">
              <span>已記錄的反願景會作為防禦底線，提醒你永不再妥協。</span>
              <button
                onClick={() => setIsFlipped(true)}
                className="font-bold text-[#8E5E5E] hover:underline"
              >
                反願景寫完了，翻到背面寫【新願景】
              </button>
            </div>
          </div>

          {/* ======================= 背面：【新願景】身份重塑 ======================= */}
          <div
            className={`w-full rounded-2xl bg-[#FCFBFE] border-2 border-[#9B8EA9]/40 shadow-sm p-6 md:p-8 backface-hidden ${
              !isFlipped ? 'pointer-events-none invisible absolute top-0 left-0' : 'relative rotate-y-180'
            }`}
          >
            {/* 卡片標題區 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#9B8EA9]/30">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#9B8EA9]/15 rounded-2xl border border-[#9B8EA9]/30 shrink-0">
                  <CatIllustration size={72} />
                </div>
                <div>
                  <div className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md bg-[#9B8EA9]/20 text-[#6B5A7E] border border-[#9B8EA9]/40 mb-1">
                    背面 · 渴望區
                  </div>
                  <h3 className="text-xl font-bold text-[#3D444D] font-handwriting">
                    【新願景】身份重塑：三年後，誰在過著我渴望的生活？
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    小貓戴著皇冠為你喝采！錨定新的身份，你不需要靠意志力苦撐，而是自然成為他。
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFlipped(false)}
                className="self-end md:self-center flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6B5A7E] bg-[#9B8EA9]/15 hover:bg-[#9B8EA9]/25 rounded-lg transition-colors"
              >
                <span>翻回正面（反願景）</span>
                <RotateCw className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-6 mt-6">
              {/* 核心身份定錨卡（莫蘭迪紫高亮區塊） */}
              <div className="rounded-2xl bg-gradient-to-r from-[#9B8EA9]/20 via-[#9B8EA9]/10 to-[#7D94A8]/15 border-2 border-[#9B8EA9]/60 p-5 md:p-6 shadow-xs relative overflow-hidden">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-[#6B5A7E]" />
                  <span className="text-xs font-bold tracking-wider uppercase text-[#6B5A7E]">
                    核心身份定錨卡（即時同步全站頂部狀態）
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-base md:text-lg font-bold text-[#3D444D]">
                  <span className="shrink-0 font-handwriting">我是那種</span>
                  <input
                    type="text"
                    value={notes.newVision.identityAnchor}
                    onChange={(e) =>
                      handleNewVisionChange('identityAnchor', e.target.value)
                    }
                    placeholder="專注熱情、掌控自己生活節奏且勇敢重啟"
                    className="flex-1 rounded-xl border border-[#9B8EA9] bg-white px-4 py-2 text-base text-[#3D444D] font-bold font-handwriting shadow-2xs focus:border-[#6B5A7E] focus:outline-none focus:ring-2 focus:ring-[#9B8EA9]/50 transition-all"
                  />
                  <span className="shrink-0 font-handwriting">的人。</span>
                </div>
                <p className="text-xs text-stone-500 mt-2">
                  當面臨選擇與誘惑時，問自己：「那種人現在會怎麼做？」答案便不言自明。
                </p>
              </div>

              {/* 三年後，我理想的一天 */}
              <div className="space-y-2 p-5 rounded-xl bg-white border border-stone-200">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-[#3D444D] font-handwriting">
                    三年後，我理想的一天
                  </label>
                  <span className="text-xs text-[#9B8EA9] font-medium">具體細緻的五感描寫</span>
                </div>
                <p className="text-xs text-stone-500">
                  從清晨醒來、工作節奏、周遭環境、與誰相處，到晚上的放鬆時光，越具體大腦越能信以為真。
                </p>
                <textarea
                  rows={6}
                  value={notes.newVision.threeYearsIdealDay}
                  onChange={(e) =>
                    handleNewVisionChange('threeYearsIdealDay', e.target.value)
                  }
                  placeholder="例如：在灑滿陽光的明亮書房醒來，悠閒手沖一杯深焙咖啡。上午全神貫注沉浸在核心創作中，下午與默契夥伴討論專案，傍晚去森林小徑跑步，晚間與家人共享溫馨晚餐..."
                  className="w-full journal-textarea rounded-xl border border-stone-200/90 p-4 text-sm text-[#3D444D] placeholder-stone-400 focus:border-[#9B8EA9] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9B8EA9]/30 transition-all resize-none leading-relaxed tracking-wide"
                />
              </div>
            </div>

            {/* 底部翻頁與操作提示 */}
            <div className="mt-6 pt-4 border-t border-[#9B8EA9]/25 flex items-center justify-between text-xs text-stone-500">
              <span>每天早晨花 3 分鐘複習新願景，為大腦下載全新作業系統。</span>
              <button
                onClick={() => setIsFlipped(false)}
                className="font-bold text-[#6B5A7E] hover:underline"
              >
                翻回正面檢視反願景
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
