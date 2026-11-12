import React, { useState } from 'react';
import { AlarmItem } from '../types';
import { RabbitIllustration } from './AnimalIllustrations';
import {
  generateGoogleCalendarUrl,
  downloadAlarmsIcsFile,
} from '../utils/calendar';
import {
  Calendar,
  Download,
  ExternalLink,
  Clock,
  Sparkles,
  CheckCircle,
  HelpCircle,
  X,
} from 'lucide-react';

interface AlarmsTabProps {
  alarms: AlarmItem[];
  onUpdateAlarm: (id: string, updated: Partial<AlarmItem>) => void;
  onResetAlarms: () => void;
}

export const AlarmsTab: React.FC<AlarmsTabProps> = ({
  alarms,
  onUpdateAlarm,
  onResetAlarms,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showCalendarHelpModal, setShowCalendarHelpModal] = useState(false);

  const handleDownloadIcs = () => {
    downloadAlarmsIcsFile(alarms);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* 頂部引言與日曆匯出工具列 */}
      <div className="rounded-2xl bg-white border border-[#7D94A8]/25 p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#7D94A8]/15 rounded-2xl border border-[#7D94A8]/30 shrink-0">
              <RabbitIllustration size={76} />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md bg-[#7D94A8]/15 text-[#4A6478] border border-[#7D94A8]/30 mb-1">
                白晝覺察時光 · 兔子懷錶
              </div>
              <h3 className="text-xl font-bold text-[#3D444D] font-handwriting">
                白天 4 個覺察鬧鐘 & 日曆連動
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xl">
                不必隨時緊繃，只要在關鍵的 4 個時刻停頓 30 秒。即使不打字，也能當作對話鏡子；若有感觸，可隨手寫下心靈快照。
              </p>
            </div>
          </div>

          {/* 兩大日曆操作按鈕 */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            <button
              onClick={() => setShowCalendarHelpModal(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-white border border-[#7D94A8] text-[#7D94A8] hover:bg-[#7D94A8]/10 transition-colors shadow-2xs cursor-pointer active:scale-95"
            >
              <Calendar className="h-4 w-4" />
              <span>一鍵加入 Google 日曆</span>
            </button>

            <button
              onClick={handleDownloadIcs}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-[#7D94A8] text-white hover:bg-[#678094] transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle className="h-4 w-4 text-emerald-300" />
                  <span>已下載 .ics 提醒檔！</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>下載全套 .ics 每日提醒檔</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 提示橫條 */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#7D94A8]" />
            <span>
              匯入手機行事曆（Apple / Google / Outlook）後，每天時間到會自動彈出問題提醒！
            </span>
          </div>
          <button
            onClick={onResetAlarms}
            className="text-stone-400 hover:text-stone-600 underline text-right text-[11px]"
          >
            恢復預設 4 個時段
          </button>
        </div>
      </div>

      {/* 4 個鬧鐘卡片網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {alarms.map((alarm, index) => {
          const googleUrl = generateGoogleCalendarUrl(alarm);
          return (
            <div
              key={alarm.id}
              className={`rounded-2xl transition-all border p-5 bg-white shadow-xs ${
                alarm.enabled
                  ? 'border-[#7D94A8]/30 ring-1 ring-[#7D94A8]/15'
                  : 'border-stone-200 opacity-70 bg-stone-50'
              }`}
            >
              {/* 卡片標題、時間與開關 */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7D94A8]/15 text-xs font-bold text-[#4A6478]">
                    {index + 1}
                  </span>
                  <div className="flex items-center gap-1 bg-[#F6F5F2] px-2.5 py-1 rounded-lg border border-stone-200">
                    <Clock className="h-3.5 w-3.5 text-[#7D94A8]" />
                    <input
                      type="time"
                      value={alarm.time}
                      onChange={(e) =>
                        onUpdateAlarm(alarm.id, { time: e.target.value })
                      }
                      className="bg-transparent text-sm font-mono font-bold text-[#3D444D] focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-stone-400 hover:text-[#7D94A8] hover:bg-stone-100 transition-colors"
                    title="在 Google 日曆中設定這個提醒"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  {/* 啟用開關 Toggle */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={alarm.enabled}
                      onChange={(e) =>
                        onUpdateAlarm(alarm.id, { enabled: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#7D94A8]"></div>
                  </label>
                </div>
              </div>

              {/* 問題內容 */}
              <div className="mt-3 space-y-1">
                <h4 className="text-base font-bold text-[#3D444D] font-handwriting">
                  「{alarm.question}」
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {alarm.subText}
                </p>
              </div>

              {/* 今日隨手記（選填） */}
              <div className="mt-4 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                  <span className="font-semibold text-stone-600">
                    今日隨手記（選填）：
                  </span>
                  {alarm.todayNote ? (
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> 已儲存
                    </span>
                  ) : (
                    <span className="text-[11px] text-stone-400">
                      純檢視亦可
                    </span>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={alarm.todayNote}
                  onChange={(e) =>
                    onUpdateAlarm(alarm.id, { todayNote: e.target.value })
                  }
                  placeholder="寫下此刻的心情、發現的逃避、或是剛剛閃爍的美好瞬間..."
                  className="w-full journal-textarea rounded-xl border border-stone-200/90 p-3 text-xs md:text-sm text-[#3D444D] placeholder-stone-400 focus:border-[#7D94A8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7D94A8]/30 transition-all resize-none leading-relaxed tracking-wide"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Google 日曆加入指南彈窗 */}
      {showCalendarHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#7D94A8]/30 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#7D94A8]" />
                <h3 className="font-bold text-[#3D444D] text-lg">
                  一鍵加入 Google 日曆覺察提醒
                </h3>
              </div>
              <button
                onClick={() => setShowCalendarHelpModal(false)}
                className="text-stone-400 hover:text-stone-600 rounded-lg p-1 hover:bg-stone-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              點擊下方任一個時段，會直接為你在 Google 日曆開啟建立視窗，已預先填好活動標題、每日重複規則（RRULE:FREQ=DAILY）與溫馨自省問題：
            </p>

            <div className="space-y-2">
              {alarms.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F6F5F2] border border-stone-200"
                >
                  <div>
                    <span className="font-mono font-bold text-xs text-[#7D94A8] mr-2">
                      {a.time}
                    </span>
                    <span className="text-xs font-bold text-[#3D444D]">
                      {a.question}
                    </span>
                  </div>
                  <a
                    href={generateGoogleCalendarUrl(a)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-[#7D94A8] text-white hover:bg-[#688195] transition-colors"
                  >
                    <span>開啟 Google 日曆</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-[#7D94A8]/10 p-3 text-xs text-[#4A6478] flex items-start gap-2">
              <HelpCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                小撇步：如果想要一次匯入所有時段到 Apple 行事曆或手機行事曆 App，推薦使用
                <strong className="mx-1">「下載全套 .ics 每日提醒檔」</strong>
                ，點開檔案即可整組匯入並開啟通知！
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowCalendarHelpModal(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
