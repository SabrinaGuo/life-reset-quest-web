import React, { useState } from 'react';
import { AnimalId } from '../types';
import { ANIMAL_CATALOG, AnimalInfo } from '../utils/constants';
import { AnimalAvatar } from './AnimalIllustrations';
import { X, Sparkles, Check, ArrowLeftRight } from 'lucide-react';

interface CompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryCompanion: AnimalId;
  secondaryCompanion: AnimalId;
  onSelectCompanions: (primary: AnimalId, secondary: AnimalId) => void;
}

export const CompanionModal: React.FC<CompanionModalProps> = ({
  isOpen,
  onClose,
  primaryCompanion,
  secondaryCompanion,
  onSelectCompanions,
}) => {
  const [activeSelectType, setActiveSelectType] = useState<'primary' | 'secondary'>('primary');
  const [tempPrimary, setTempPrimary] = useState<AnimalId>(primaryCompanion);
  const [tempSecondary, setTempSecondary] = useState<AnimalId>(secondaryCompanion);

  if (!isOpen) return null;

  const handlePickAnimal = (id: AnimalId) => {
    if (activeSelectType === 'primary') {
      if (id === tempSecondary) {
        // 若與副夥伴相同，則自動對調
        setTempSecondary(tempPrimary);
      }
      setTempPrimary(id);
    } else {
      if (id === tempPrimary) {
        // 若與主夥伴相同，則自動對調
        setTempPrimary(tempSecondary);
      }
      setTempSecondary(id);
    }
  };

  const handleSwap = () => {
    const p = tempPrimary;
    const s = tempSecondary;
    setTempPrimary(s);
    setTempSecondary(p);
  };

  const handleConfirm = () => {
    onSelectCompanions(tempPrimary, tempSecondary);
    onClose();
  };

  const animalList = Object.values(ANIMAL_CATALOG) as AnimalInfo[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-2xs animate-fadeIn">
      <div className="w-full max-w-xl rounded-3xl bg-[#FFFDFB] border border-[#7D94A8]/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* 標題列 */}
        <div className="p-5 pb-4 border-b border-stone-200/80 bg-gradient-to-r from-[#F6F5F2] via-white to-[#F6F5F2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#7D94A8]/15 text-[#7D94A8]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#3D444D]">
                選擇你的本命冒險夥伴
              </h3>
              <p className="text-xs text-stone-500">
                可自由挑選【第一主夥伴】與【第二副夥伴】陪伴你的重啟旅程
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 夥伴設定切換預覽列 */}
        <div className="p-4 bg-stone-50/70 border-b border-stone-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            {/* 主夥伴按鈕 */}
            <button
              onClick={() => setActiveSelectType('primary')}
              className={`flex-1 flex items-center gap-2.5 p-2 rounded-2xl border transition-all text-left ${
                activeSelectType === 'primary'
                  ? 'bg-white border-[#7D94A8] shadow-xs ring-2 ring-[#7D94A8]/20'
                  : 'bg-white/60 border-stone-200 hover:bg-white'
              }`}
            >
              <AnimalAvatar id={tempPrimary} size={36} />
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#7D94A8]">
                  第一主夥伴
                </div>
                <div className="text-xs font-bold text-[#3D444D] truncate">
                  {ANIMAL_CATALOG[tempPrimary].name} · {ANIMAL_CATALOG[tempPrimary].title}
                </div>
              </div>
            </button>

            {/* 互換按鈕 */}
            <button
              onClick={handleSwap}
              title="一鍵互換主副夥伴"
              className="p-2 rounded-xl text-stone-500 hover:text-[#7D94A8] hover:bg-white border border-stone-200 transition-colors shrink-0"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>

            {/* 副夥伴按鈕 */}
            <button
              onClick={() => setActiveSelectType('secondary')}
              className={`flex-1 flex items-center gap-2.5 p-2 rounded-2xl border transition-all text-left ${
                activeSelectType === 'secondary'
                  ? 'bg-white border-[#9B8EA9] shadow-xs ring-2 ring-[#9B8EA9]/20'
                  : 'bg-white/60 border-stone-200 hover:bg-white'
              }`}
            >
              <AnimalAvatar id={tempSecondary} size={36} />
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#9B8EA9]">
                  第二副夥伴
                </div>
                <div className="text-xs font-bold text-[#3D444D] truncate">
                  {ANIMAL_CATALOG[tempSecondary].name} · {ANIMAL_CATALOG[tempSecondary].title}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 提示字眼 */}
        <div className="px-5 py-2 bg-[#F6F5F2] text-[11px] text-stone-600 font-medium border-b border-stone-100 flex items-center justify-between">
          <span>
            目前正在挑選：
            <strong className={activeSelectType === 'primary' ? 'text-[#7D94A8]' : 'text-[#9B8EA9]'}>
              {activeSelectType === 'primary' ? '【第一主夥伴】' : '【第二副夥伴】'}
            </strong>
          </span>
          <span className="text-stone-400">點擊下方任一角色即可指定</span>
        </div>

        {/* 8 隻動物列表 */}
        <div className="p-4 md:p-5 overflow-y-auto space-y-2.5 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {animalList.map((animal) => {
              const isPrimary = tempPrimary === animal.id;
              const isSecondary = tempSecondary === animal.id;
              const isCurrentPickingTarget =
                (activeSelectType === 'primary' && isPrimary) ||
                (activeSelectType === 'secondary' && isSecondary);

              return (
                <div
                  key={animal.id}
                  onClick={() => handlePickAnimal(animal.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 relative ${
                    isCurrentPickingTarget
                      ? 'bg-white border-[#7D94A8] shadow-xs ring-2 ring-[#7D94A8]/20'
                      : isPrimary
                      ? 'bg-[#7D94A8]/10 border-[#7D94A8]/40'
                      : isSecondary
                      ? 'bg-[#9B8EA9]/10 border-[#9B8EA9]/40'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                  }`}
                >
                  <AnimalAvatar id={animal.id} size={46} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#3D444D]">
                        {animal.name}
                      </span>
                      <span className="text-[11px] text-stone-500 font-medium">
                        {animal.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {animal.roleDescription}
                    </p>
                  </div>

                  {/* 標記狀態徽章 */}
                  {isPrimary && (
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#7D94A8] text-white text-[10px] font-bold">
                      主夥伴
                    </span>
                  )}
                  {isSecondary && (
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#9B8EA9] text-white text-[10px] font-bold">
                      副夥伴
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部確認按鈕 */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            更換後，頂部雙頭像、各篇章插圖與心理鼓勵語氣將即時轉換！
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl bg-[#7D94A8] text-white hover:bg-[#688195] transition-colors shadow-xs"
            >
              <Check className="h-4 w-4" />
              <span>確認儲存</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
