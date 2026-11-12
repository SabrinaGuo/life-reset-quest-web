import React, { useRef, useState } from 'react';
import { AppState, HistoryArchive, InspirationBookmark } from '../types';
import { OwlIllustration } from './AnimalIllustrations';
import { STAGE_CONFIGS } from '../utils/constants';
import { InspirationVault } from './InspirationVault';
import {
  Archive,
  Sparkles,
  Download,
  Upload,
  Calendar,
  CheckCircle2,
  Trash2,
  Heart,
  Flame,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface HistoryReviewTabProps {
  state: AppState;
  onArchiveToday: () => void;
  onDeleteHistory: (id: string) => void;
  onImportBackup: (importedData: AppState) => void;
  onGainExp: (amount: number, reason: string) => void;
  onAddBookmark: (bookmark: Omit<InspirationBookmark, 'id' | 'createdAt'>) => void;
  onDeleteBookmark: (id: string) => void;
}

export const HistoryReviewTab: React.FC<HistoryReviewTabProps> = ({
  state,
  onArchiveToday,
  onDeleteHistory,
  onImportBackup,
  onGainExp,
  onAddBookmark,
  onDeleteBookmark,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 匯出 JSON 備份檔
  const handleExportJson = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `life-reset-quest-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onGainExp(10, '完成資料備份');
  };

  // 匯入還原 JSON
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.morningNotes && json.alarms && json.eveningGame) {
          onImportBackup(json as AppState);
          setImportStatus('備份還原成功！已讀取所有歷史資料。');
          setTimeout(() => setImportStatus(null), 3500);
        } else {
          setImportStatus('檔案格式不符，請確認是人生重啟手帳的備份檔。');
        }
      } catch (err) {
        setImportStatus('檔案讀取失敗，請確認檔案格式是否正確。');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 彙整過去 21:00「最有活著感覺的時刻」精華牆
  const aliveMoments = state.history
    .filter((h) => h.aliveMoment && h.aliveMoment.trim().length > 0)
    .map((h) => ({
      date: h.date,
      text: h.aliveMoment!,
      id: h.id,
    }));

  return (
    <div className="space-y-6">
      {/* 頂部引言與今日結算封存 */}
      <div className="rounded-2xl bg-white border border-[#7D94A8]/25 p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#7D94A8]/15 rounded-2xl border border-[#7D94A8]/30 shrink-0">
              <OwlIllustration size={76} />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md bg-[#7D94A8]/15 text-[#4A6478] border border-[#7D94A8]/30 mb-1">
                時光檔案館 · 貓頭鷹放大鏡
              </div>
              <h3 className="text-xl font-bold text-[#3D444D] font-handwriting">
                歷史追蹤與成長回顧
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xl">
                每天完成冒險後，點擊「今日結算存檔」封存當天足跡。微小的進步累積起來，就是一座不可撼動的人生奇蹟。
              </p>
            </div>
          </div>

          {/* 今日結算存檔主按鈕 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onArchiveToday}
              className="flex items-center justify-center gap-2 px-5 py-3 text-xs md:text-sm font-bold rounded-xl bg-gradient-to-r from-[#7D94A8] to-[#9B8EA9] text-white hover:opacity-95 transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <Archive className="h-4 w-4" />
              <span>今日結算存檔 (+50 EXP)</span>
            </button>
          </div>
        </div>

        {/* 備份與還原工具列 */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-stone-600">
            <div className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-[#D68666]" />
              <span>
                連續打卡：<strong>{state.streak}</strong> 天
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#7D94A8]" />
              <span>
                累積冒險日誌：<strong>{state.history.length}</strong> 篇
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-[#F6F5F2] hover:bg-white text-stone-700 transition-colors font-medium"
            >
              <Download className="h-3.5 w-3.5" />
              <span>匯出 JSON 備份</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-[#F6F5F2] hover:bg-white text-stone-700 transition-colors font-medium"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>匯入還原</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {importStatus && (
          <div className="mt-3 p-2.5 rounded-xl bg-[#7D94A8]/10 text-xs text-[#3D444D] font-medium border border-[#7D94A8]/30">
            {importStatus}
          </div>
        )}
      </div>

      {/* 「最有活著感覺的時刻」精華牆 */}
      <div className="rounded-2xl bg-gradient-to-br from-[#FFFDFB] to-[#F6F5F2] border border-[#CFA7A7]/30 p-5 md:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-[#CFA7A7] fill-[#CFA7A7]" />
            <h4 className="text-base font-bold text-[#3D444D] font-handwriting">
              「最有活著感覺的時刻」精華牆
            </h4>
          </div>
          <span className="text-xs text-stone-500">
            彙整過去所有在 21:00 鬧鐘寫下的美好瞬間
          </span>
        </div>

        {aliveMoments.length === 0 ? (
          <div className="text-center py-8 text-xs text-stone-400 bg-white/60 rounded-xl border border-dashed border-stone-200">
            尚未有 21:00「最有活著感覺」的紀錄。今晚不妨停下來寫一句話留給未來的自己！
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {aliveMoments.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-xl bg-white border border-[#CFA7A7]/30 shadow-2xs space-y-2 relative"
              >
                <div className="flex items-center justify-between text-[11px] text-[#CFA7A7] font-semibold">
                  <span className="font-mono">{m.date}</span>
                  <span>心流瞬間</span>
                </div>
                <p className="text-xs md:text-sm text-[#3D444D] font-medium leading-relaxed font-handwriting">
                  「{m.text}」
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 歷史冒險日誌列表 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-sm font-bold text-[#3D444D] font-handwriting">歷史冒險日誌封存卡片</h4>
          <span className="text-xs text-stone-400">依日期由新至舊</span>
        </div>

        {state.history.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-white border border-stone-200 text-stone-400 text-xs">
            目前還沒有歷史紀錄。完成今天的手帳後，點擊右上方的「今日結算存檔」吧！
          </div>
        ) : (
          state.history.map((record) => {
            const isExpanded = expandedId === record.id;
            const stageCfg = STAGE_CONFIGS[record.stage || 1];

            return (
              <div
                key={record.id}
                className="rounded-2xl bg-white border border-stone-200 shadow-2xs overflow-hidden transition-all"
              >
                {/* 摺疊標題列 */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : record.id)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm text-[#3D444D]">
                      {record.date}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold border ${stageCfg.badgeBg}`}
                    >
                      {stageCfg.title}
                    </span>
                    <span className="text-xs text-stone-500 hidden sm:inline truncate max-w-xs">
                      {record.identityAnchor}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#7D94A8] bg-[#7D94A8]/10 px-2 py-0.5 rounded-md">
                      任務：{record.questStats.completed}/{record.questStats.total}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteHistory(record.id);
                      }}
                      className="p-1 text-stone-300 hover:text-rose-500 transition-colors"
                      title="刪除這張日誌"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-stone-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-stone-400" />
                    )}
                  </div>
                </div>

                {/* 展開詳情 */}
                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-stone-100 bg-[#F6F5F2]/40 space-y-4">
                    {/* 身份定錨 */}
                    <div className="mt-3 p-3 rounded-xl bg-white border border-stone-200">
                      <div className="text-[11px] font-bold text-[#9B8EA9] uppercase">
                        當日核心身份
                      </div>
                      <div className="text-xs md:text-sm font-bold text-[#3D444D] mt-0.5 font-handwriting">
                        我是那種「{record.identityAnchor}」的人。
                      </div>
                    </div>

                    {/* 4 個鬧鐘隨手筆記 */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-[#7D94A8] uppercase">
                        當日 4 時段覺察筆記
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {record.alarmNotes.map((an, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-white border border-stone-200 text-xs"
                          >
                            <div className="font-mono font-bold text-[#7D94A8] mb-0.5">
                              {an.time} · {an.question}
                            </div>
                            <div className="text-stone-600">
                              {an.note || '（未特別書寫，僅心靈覺察）'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* 重溫靈感書籤櫃 */}
      <InspirationVault
        bookmarks={state.bookmarks || []}
        onAddBookmark={onAddBookmark}
        onDeleteBookmark={onDeleteBookmark}
      />
    </div>
  );
};
