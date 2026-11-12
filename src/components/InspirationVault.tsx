import React, { useState } from 'react';
import { InspirationBookmark } from '../types';
import {
  Bookmark,
  ExternalLink,
  Plus,
  Trash2,
  BookOpen,
  Sparkles,
  Link as LinkIcon,
} from 'lucide-react';

interface InspirationVaultProps {
  bookmarks: InspirationBookmark[];
  onAddBookmark: (bookmark: Omit<InspirationBookmark, 'id' | 'createdAt'>) => void;
  onDeleteBookmark: (id: string) => void;
}

export const InspirationVault: React.FC<InspirationVaultProps> = ({
  bookmarks,
  onAddBookmark,
  onDeleteBookmark,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    // 自動補齊 https://
    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    onAddBookmark({
      title: title.trim(),
      url: formattedUrl,
      note: note.trim(),
    });

    setTitle('');
    setUrl('');
    setNote('');
    setIsAdding(false);
  };

  return (
    <div
      id="inspiration-vault"
      className="rounded-2xl bg-gradient-to-br from-[#FFFDFB] to-[#F6F5F2] border border-[#7D94A8]/30 p-5 md:p-6 shadow-xs space-y-5"
    >
      {/* 標題與操作欄 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200/80">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#7D94A8]/15 text-[#7D94A8] border border-[#7D94A8]/30">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-[#3D444D] font-handwriting">
                重溫靈感書籤櫃 (Inspiration Vault)
              </h4>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#7D94A8]/15 text-[#4A6478]">
                {bookmarks.length} 篇寶藏
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              隨時點閱啟發你的經典好文、拆解筆記與訪談影片，在低潮時隨時充電重啟。
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-white border border-[#7D94A8] text-[#7D94A8] hover:bg-[#7D94A8]/10 transition-colors shadow-2xs cursor-pointer active:scale-95"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{isAdding ? '取消新增' : '新增重溫影片／文章'}</span>
        </button>
      </div>

      {/* 新增書籤展開表單 */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-2xl bg-white border border-[#7D94A8]/40 shadow-xs space-y-3 animate-fadeIn"
        >
          <div className="text-xs font-bold text-[#3D444D] flex items-center gap-1.5 font-handwriting">
            <Sparkles className="h-3.5 w-3.5 text-[#7D94A8]" />
            <span>收藏新的靈感來源</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                書籤標題 *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例如：詹姆士·克利爾：原子習慣核心架構"
                className="w-full rounded-xl border border-stone-200 bg-[#F6F5F2]/50 px-3 py-1.5 text-xs text-[#3D444D] placeholder-stone-400 focus:border-[#7D94A8] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                網址 URL *
              </label>
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="例如：https://..."
                className="w-full rounded-xl border border-stone-200 bg-[#F6F5F2]/50 px-3 py-1.5 text-xs text-[#3D444D] placeholder-stone-400 focus:border-[#7D94A8] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 mb-1">
              一句話重點備忘／核心心法
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="記錄這篇文章或影片帶給你的最關鍵頓悟，例如：不靠意志力，而是靠身份認同與環境設計..."
              className="w-full journal-textarea rounded-xl border border-stone-200/90 p-2.5 text-xs text-[#3D444D] placeholder-stone-400 focus:border-[#7D94A8] focus:bg-white focus:outline-none resize-none leading-relaxed tracking-wide"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg text-stone-500 hover:bg-stone-100"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#7D94A8] text-white hover:bg-[#688195] transition-colors shadow-2xs"
            >
              加入書籤櫃
            </button>
          </div>
        </form>
      )}

      {/* 書籤卡片清單 */}
      {bookmarks.length === 0 ? (
        <div className="text-center py-8 text-xs text-stone-400 bg-white/70 rounded-2xl border border-dashed border-stone-200">
          書籤櫃目前空空的，點擊上方按鈕新增第一篇啟發你的文章或影片吧！
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {bookmarks.map((bm) => (
            <div
              key={bm.id}
              className="p-4 rounded-2xl bg-white border border-[#7D94A8]/25 shadow-2xs flex flex-col justify-between hover:border-[#7D94A8]/50 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Bookmark className="h-3.5 w-3.5 text-[#7D94A8] shrink-0" />
                    <h5 className="text-xs md:text-sm font-bold text-[#3D444D] line-clamp-2">
                      {bm.title}
                    </h5>
                  </div>
                  <button
                    onClick={() => onDeleteBookmark(bm.id)}
                    className="p-1 text-stone-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors shrink-0"
                    title="刪除書籤"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {bm.note && (
                  <p className="text-xs text-stone-600 leading-relaxed bg-[#F6F5F2]/70 p-2.5 rounded-xl border border-stone-100 font-medium">
                    {bm.note}
                  </p>
                )}
              </div>

              {/* 底部連結與跳轉按鈕 */}
              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-stone-400 font-mono truncate max-w-[180px] sm:max-w-[220px]">
                  {bm.url.replace(/^https?:\/\//i, '')}
                </span>

                <a
                  href={bm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#7D94A8] text-white hover:bg-[#688195] text-xs font-bold transition-all shadow-2xs shrink-0 active:scale-95"
                >
                  <span>前往重溫</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
