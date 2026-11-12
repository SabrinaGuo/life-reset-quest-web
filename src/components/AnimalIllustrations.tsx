import React from 'react';
import { AnimalId } from '../types';

interface AnimalProps {
  className?: string;
  size?: number;
}

// ==========================================
// 1. 兔子 (Rabbit) - 預設第一主夥伴
// 奶霜白圓滾滾大頭 + 圓角長兔耳 (內耳莫蘭迪粉) + 三瓣嘴 + 耳旁莫蘭迪藍小花
// ==========================================
export const RabbitIllustration: React.FC<AnimalProps> = ({ className = '', size = 100 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      {/* 貼紙圓形底盤與白邊 */}
      <circle cx="50" cy="50" r="47" fill="#F4EFEB" stroke="#FFFFFF" strokeWidth="3" />

      {/* 兔耳朵 (左耳 & 右耳) */}
      <path
        d="M34 46C30 30 30 14 38 14C45 14 44 30 42 46"
        fill="#FAF7F2"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 38C34 26 34 18 38 18C41 18 41 26 39 38"
        fill="#DFB6B6"
      />

      <path
        d="M58 46C56 30 55 14 62 14C70 14 70 30 66 46"
        fill="#FAF7F2"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M61 38C59 26 59 18 62 18C66 18 66 26 64 38"
        fill="#DFB6B6"
      />

      {/* 奶霜白圓滾滾大頭 */}
      <circle
        cx="50"
        cy="56"
        r="28"
        fill="#FAF7F2"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 耳旁別著的莫蘭迪藍小花 */}
      <g transform="translate(64, 30)">
        <circle cx="0" cy="-4" r="3" fill="#7D94A8" />
        <circle cx="4" cy="0" r="3" fill="#7D94A8" />
        <circle cx="0" cy="4" r="3" fill="#7D94A8" />
        <circle cx="-4" cy="0" r="3" fill="#7D94A8" />
        <circle cx="0" cy="0" r="2.5" fill="#E8C872" stroke="#4A4238" strokeWidth="1.2" />
      </g>

      {/* 寬眼距黑豆眼 + 左上角白色反光小亮點 */}
      <circle cx="37" cy="54" r="3.5" fill="#4A4238" />
      <circle cx="35.8" cy="52.8" r="1.5" fill="#FFFFFF" />

      <circle cx="63" cy="54" r="3.5" fill="#4A4238" />
      <circle cx="61.8" cy="52.8" r="1.5" fill="#FFFFFF" />

      {/* 莫蘭迪乾燥玫瑰粉腮紅 */}
      <ellipse cx="28" cy="60" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />
      <ellipse cx="72" cy="60" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />

      {/* 小粉鼻與三瓣嘴 */}
      <ellipse cx="50" cy="59" rx="2" ry="1.5" fill="#DFB6B6" />
      <path d="M50 60.5V63" stroke="#4A4238" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M46 64C48 65 50 65 50 63C50 65 52 65 54 64" stroke="#4A4238" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
};

// ==========================================
// 2. 貓咪 (Cat) - 預設第二副夥伴
// 奶油米白大頭 + 圓角三角貓耳 + 額頭虎斑紋 + 臉頰短鬍鬚 + 粉紅鼻
// ==========================================
export const CatIllustration: React.FC<AnimalProps> = ({ className = '', size = 100 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      {/* 貼紙圓形底盤與白邊 */}
      <circle cx="50" cy="50" r="47" fill="#F4EFEB" stroke="#FFFFFF" strokeWidth="3" />

      {/* 圓角三角貓耳 */}
      <path
        d="M26 44L24 24C32 26 40 33 42 40"
        fill="#FDF9F3"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M28 38L27 28C32 30 36 34 38 38" fill="#F2D2D2" />

      <path
        d="M74 44L76 24C68 26 60 33 58 40"
        fill="#FDF9F3"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M72 38L73 28C68 30 64 34 62 38" fill="#F2D2D2" />

      {/* 奶油米白圓滾滾大頭 */}
      <circle
        cx="50"
        cy="55"
        r="28"
        fill="#FDF9F3"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 額頭三條短短的莫蘭迪灰褐斑紋 */}
      <path d="M50 33V39" stroke="#9B8EA9" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M45 35L46 40" stroke="#9B8EA9" strokeWidth="2" strokeLinecap="round" />
      <path d="M55 35L54 40" stroke="#9B8EA9" strokeWidth="2" strokeLinecap="round" />

      {/* 寬眼距黑豆眼 + 左上角亮點 */}
      <circle cx="37" cy="54" r="3.5" fill="#4A4238" />
      <circle cx="35.8" cy="52.8" r="1.5" fill="#FFFFFF" />

      <circle cx="63" cy="54" r="3.5" fill="#4A4238" />
      <circle cx="61.8" cy="52.8" r="1.5" fill="#FFFFFF" />

      {/* 臉頰兩側各兩根短短的圓頭鬍鬚 */}
      <path d="M22 55H31" stroke="#4A4238" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 60H30" stroke="#4A4238" strokeWidth="2" strokeLinecap="round" />
      <path d="M78 55H69" stroke="#4A4238" strokeWidth="2" strokeLinecap="round" />
      <path d="M79 60H70" stroke="#4A4238" strokeWidth="2" strokeLinecap="round" />

      {/* 莫蘭迪乾燥玫瑰粉腮紅 */}
      <ellipse cx="28" cy="61" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />
      <ellipse cx="72" cy="61" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />

      {/* 小粉紅鼻 + 傲嬌可愛貓咪小嘴 */}
      <polygon points="48.5,58 51.5,58 50,60" fill="#E5A9A9" />
      <path d="M46 63C48 64.5 50 64.5 50 62C50 64.5 52 64.5 54 63" stroke="#4A4238" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
};

// ==========================================
// 3. 水豚 (Capybara) - 佛系情緒穩定大師
// 溫潤焦糖棕方圓大頭 + 半圓小耳 + 水平直線瞇瞇眼 + 頭頂小橘子配小綠葉
// ==========================================
export const CapybaraIllustration: React.FC<AnimalProps> = ({ className = '', size = 100 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      {/* 貼紙圓形底盤與白邊 */}
      <circle cx="50" cy="50" r="47" fill="#F4EFEB" stroke="#FFFFFF" strokeWidth="3" />

      {/* 兩側半圓小耳朵 */}
      <circle cx="26" cy="44" r="6" fill="#B29B85" stroke="#4A4238" strokeWidth="2.5" />
      <circle cx="74" cy="44" r="6" fill="#B29B85" stroke="#4A4238" strokeWidth="2.5" />

      {/* 溫潤焦糖棕圓角方圓形大頭 */}
      <rect
        x="24"
        y="35"
        width="52"
        height="44"
        rx="22"
        fill="#CDB69E"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 頭頂正中央小橘子 (圓形 + 小綠葉) */}
      <g transform="translate(50, 24)">
        <circle cx="0" cy="0" r="9" fill="#E89B53" stroke="#4A4238" strokeWidth="2.4" />
        {/* 橘子頂部小綠葉 */}
        <path d="M0 -9C2 -14 7 -13 6 -9C4 -7 2 -8 0 -9Z" fill="#7BA082" stroke="#4A4238" strokeWidth="1.5" />
        <circle cx="0" cy="-9" r="1" fill="#4A4238" />
        {/* 橘子白色微高光 */}
        <path d="M-3 -3C-1 -5 3 -5 4 -3" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.8" />
      </g>

      {/* 兩條水平直線瞇瞇眼 (極致淡定佛系表情) */}
      <path d="M34 53H42" stroke="#4A4238" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 53H66" stroke="#4A4238" strokeWidth="3" strokeLinecap="round" />

      {/* 莫蘭迪乾燥玫瑰粉腮紅 */}
      <ellipse cx="28" cy="62" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />
      <ellipse cx="72" cy="62" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />

      {/* 水豚大鼻子與憨厚嘴巴 */}
      <ellipse cx="50" cy="63" rx="7" ry="5" fill="#B8A087" />
      <path d="M47 62H53" stroke="#4A4238" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M50 63V68" stroke="#4A4238" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M46 69C48 70 52 70 54 69" stroke="#4A4238" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
};

// ==========================================
// 4. 狐狸 (Fox) - 聰明靈感領航員
// 莫蘭迪赤陶橘圓頭 + 兩頰白絨毛區塊 + 圓角尖耳 + 微笑彎月眼
// ==========================================
export const FoxIllustration: React.FC<AnimalProps> = ({ className = '', size = 100 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      {/* 貼紙圓形底盤與白邊 */}
      <circle cx="50" cy="50" r="47" fill="#F4EFEB" stroke="#FFFFFF" strokeWidth="3" />

      {/* 大大的圓角尖耳 */}
      <path
        d="M26 44L20 20C28 22 38 30 40 38"
        fill="#D98263"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M26 36L23 25C27 27 33 32 35 36" fill="#F3C9BA" />

      <path
        d="M74 44L80 20C72 22 62 30 60 38"
        fill="#D98263"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M74 36L77 25C73 27 67 32 65 36" fill="#F3C9BA" />

      {/* 莫蘭迪赤陶橘圓頭 */}
      <circle
        cx="50"
        cy="55"
        r="28"
        fill="#D98263"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 兩頰白色弧形絨毛區塊 */}
      <path
        d="M23 57C26 69 36 78 50 78C64 78 74 69 77 57C74 53 66 52 59 55C54 57 46 57 41 55C34 52 26 53 23 57Z"
        fill="#FFFDF9"
      />

      {/* 微笑彎月眼 (笑瞇瞇狐狸眼) */}
      <path d="M34 53C36 49 41 49 43 53" stroke="#4A4238" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M57 53C59 49 64 49 66 53" stroke="#4A4238" strokeWidth="2.8" strokeLinecap="round" />

      {/* 莫蘭迪乾燥玫瑰粉腮紅 */}
      <ellipse cx="28" cy="61" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />
      <ellipse cx="72" cy="61" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />

      {/* 黑色小尖鼻與靈動微笑嘴 */}
      <polygon points="48,63 52,63 50,65.5" fill="#4A4238" />
      <path d="M50 65.5V68" stroke="#4A4238" strokeWidth="2" strokeLinecap="round" />
      <path d="M47 68C48.5 69.5 51.5 69.5 53 68" stroke="#4A4238" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

// ==========================================
// 5. 柴犬 (Shiba Inu) - 熱血忠誠冒險家
// 暖杏黃圓頭 + 立耳 + 眉上兩顆白色豆豆眉 + 吐出粉紅小圓舌頭
// ==========================================
export const ShibaIllustration: React.FC<AnimalProps> = ({ className = '', size = 100 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      {/* 貼紙圓形底盤與白邊 */}
      <circle cx="50" cy="50" r="47" fill="#F4EFEB" stroke="#FFFFFF" strokeWidth="3" />

      {/* 兩隻立起來的三角形耳朵 */}
      <polygon
        points="24,42 22,22 38,36"
        fill="#DEAA79"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <polygon points="26,38 25,26 34,35" fill="#F4D3C6" />

      <polygon
        points="76,42 78,22 62,36"
        fill="#DEAA79"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <polygon points="74,38 75,26 66,35" fill="#F4D3C6" />

      {/* 暖杏黃圓頭 */}
      <circle
        cx="50"
        cy="55"
        r="28"
        fill="#DEAA79"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 臉頰與嘴巴白色大區塊 */}
      <path
        d="M24 58C24 72 35 80 50 80C65 80 76 72 76 58C70 54 64 62 50 62C36 62 30 54 24 58Z"
        fill="#FFFDF8"
      />

      {/* 眉毛上方兩顆柴犬招牌白色豆豆眉 */}
      <ellipse cx="38" cy="44" rx="3.5" ry="2.5" fill="#FFFDF8" />
      <ellipse cx="62" cy="44" rx="3.5" ry="2.5" fill="#FFFDF8" />

      {/* 寬眼距黑豆眼 + 左上角白色亮點 */}
      <circle cx="37" cy="53" r="3.5" fill="#4A4238" />
      <circle cx="35.8" cy="51.8" r="1.5" fill="#FFFFFF" />

      <circle cx="63" cy="53" r="3.5" fill="#4A4238" />
      <circle cx="61.8" cy="51.8" r="1.5" fill="#FFFFFF" />

      {/* 莫蘭迪乾燥玫瑰粉腮紅 */}
      <ellipse cx="28" cy="62" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />
      <ellipse cx="72" cy="62" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />

      {/* 黑色小倒三角鼻子 */}
      <polygon points="47,60 53,60 50,63.5" fill="#4A4238" />

      {/* 嘴巴吐出一小截粉紅色圓舌頭 */}
      <path d="M47 65C48 66 50 66 50 64C50 66 52 66 53 65" stroke="#4A4238" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M48 65C48 70 52 70 52 65Z"
        fill="#EFA7A7"
        stroke="#4A4238"
        strokeWidth="1.8"
      />
    </svg>
  );
};

// ==========================================
// 6. 小熊 (Bear) - 踏實溫暖守護者
// 可可拿鐵棕正圓大頭 + 半圓小耳 + 淺米色圓吻部 + 呆萌黑豆眼
// ==========================================
export const BearIllustration: React.FC<AnimalProps> = ({ className = '', size = 100 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      {/* 貼紙圓形底盤與白邊 */}
      <circle cx="50" cy="50" r="47" fill="#F4EFEB" stroke="#FFFFFF" strokeWidth="3" />

      {/* 頭頂兩隻半圓形小耳朵 */}
      <circle cx="28" cy="34" r="9" fill="#BAA594" stroke="#4A4238" strokeWidth="2.8" />
      <circle cx="28" cy="34" r="5" fill="#E6DAD0" />

      <circle cx="72" cy="34" r="9" fill="#BAA594" stroke="#4A4238" strokeWidth="2.8" />
      <circle cx="72" cy="34" r="5" fill="#E6DAD0" />

      {/* 可可拿鐵棕正圓形大頭 */}
      <circle
        cx="50"
        cy="55"
        r="28"
        fill="#BAA594"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 淺米色圓形吻部 (嘴巴周圍) */}
      <ellipse cx="50" cy="62" rx="14" ry="11" fill="#F3ECE4" />

      {/* 呆萌黑豆眼 + 左上角白色亮點 */}
      <circle cx="37" cy="52" r="3.5" fill="#4A4238" />
      <circle cx="35.8" cy="50.8" r="1.5" fill="#FFFFFF" />

      <circle cx="63" cy="52" r="3.5" fill="#4A4238" />
      <circle cx="61.8" cy="50.8" r="1.5" fill="#FFFFFF" />

      {/* 莫蘭迪乾燥玫瑰粉腮紅 */}
      <ellipse cx="28" cy="60" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />
      <ellipse cx="72" cy="60" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />

      {/* 倒三角形黑鼻子與憨厚嘴角 */}
      <polygon points="46.5,58 53.5,58 50,62.5" fill="#4A4238" />
      <path d="M50 62.5V67" stroke="#4A4238" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M46 68C48 69.5 52 69.5 54 68" stroke="#4A4238" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
};

// ==========================================
// 7. 貓頭鷹 (Owl) - 冷靜深度思考家
// 莫蘭迪霧霾藍大頭 + 淺米心形臉盤 + 圓框眼鏡大眼 + 鵝黃菱形嘴
// ==========================================
export const OwlIllustration: React.FC<AnimalProps> = ({ className = '', size = 100 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      {/* 貼紙圓形底盤與白邊 */}
      <circle cx="50" cy="50" r="47" fill="#F4EFEB" stroke="#FFFFFF" strokeWidth="3" />

      {/* 頭頂兩側小羽角 */}
      <polygon points="26,38 20,24 35,32" fill="#698296" stroke="#4A4238" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="74,38 80,24 65,32" fill="#698296" stroke="#4A4238" strokeWidth="2.5" strokeLinejoin="round" />

      {/* 莫蘭迪霧霾藍圓圓大頭 */}
      <circle
        cx="50"
        cy="55"
        r="28"
        fill="#7D94A8"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 淺米色心形臉盤 */}
      <path
        d="M50 44C44 38 30 38 28 50C26 62 42 74 50 76C58 74 74 62 72 50C70 38 56 38 50 44Z"
        fill="#FAF7F2"
      />

      {/* 戴著金色圓框眼鏡的超大圓眼睛 */}
      {/* 左鏡框 & 眼睛 */}
      <circle cx="39" cy="53" r="10" fill="#FFFFFF" stroke="#D1A858" strokeWidth="2.4" />
      <circle cx="39" cy="53" r="4" fill="#4A4238" />
      <circle cx="37.8" cy="51.8" r="1.5" fill="#FFFFFF" />

      {/* 右鏡框 & 眼睛 */}
      <circle cx="61" cy="53" r="10" fill="#FFFFFF" stroke="#D1A858" strokeWidth="2.4" />
      <circle cx="61" cy="53" r="4" fill="#4A4238" />
      <circle cx="59.8" cy="51.8" r="1.5" fill="#FFFFFF" />

      {/* 眼鏡中間鼻梁橫桿 */}
      <line x1="49" y1="53" x2="51" y2="53" stroke="#D1A858" strokeWidth="2.6" strokeLinecap="round" />

      {/* 莫蘭迪乾燥玫瑰粉腮紅 */}
      <ellipse cx="26" cy="62" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />
      <ellipse cx="74" cy="62" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />

      {/* 鵝黃色小菱形鳥嘴 */}
      <polygon points="50,57 53.5,62 50,67 46.5,62" fill="#E8B854" stroke="#4A4238" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
};

// ==========================================
// 8. 企鵝 (Penguin) - 優雅目標執行官
// 莫蘭迪深灰藍大頭 + 白色愛心臉 + 鵝黃扁圓小嘴 + 迷你紫毛線帽
// ==========================================
export const PenguinIllustration: React.FC<AnimalProps> = ({ className = '', size = 100 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      {/* 貼紙圓形底盤與白邊 */}
      <circle cx="50" cy="50" r="47" fill="#F4EFEB" stroke="#FFFFFF" strokeWidth="3" />

      {/* 莫蘭迪深灰藍圓滾滾大頭 */}
      <circle
        cx="50"
        cy="55"
        r="28"
        fill="#506173"
        stroke="#4A4238"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 白色愛心形狀臉部區塊 */}
      <path
        d="M50 45C44 38 31 40 30 52C29 64 42 74 50 75C58 74 71 64 70 52C69 40 56 38 50 45Z"
        fill="#FAF8F5"
      />

      {/* 頭頂迷你莫蘭迪紫毛線帽 (附帽頂毛球) */}
      <g transform="translate(50, 27)">
        {/* 帽頂圓球 */}
        <circle cx="0" cy="-6" r="4" fill="#CFA7A7" stroke="#4A4238" strokeWidth="2" />
        {/* 毛線帽主體 */}
        <path
          d="M-11 5C-11 -3 11 -3 11 5Z"
          fill="#9B8EA9"
          stroke="#4A4238"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* 帽子下緣織紋邊 */}
        <rect x="-12" y="3" width="24" height="4.5" rx="2" fill="#EADCEE" stroke="#4A4238" strokeWidth="2" />
      </g>

      {/* 寬眼距黑豆眼 + 左上角白色亮點 */}
      <circle cx="38" cy="54" r="3.5" fill="#4A4238" />
      <circle cx="36.8" cy="52.8" r="1.5" fill="#FFFFFF" />

      <circle cx="62" cy="54" r="3.5" fill="#4A4238" />
      <circle cx="60.8" cy="52.8" r="1.5" fill="#FFFFFF" />

      {/* 莫蘭迪乾燥玫瑰粉腮紅 */}
      <ellipse cx="28" cy="61" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />
      <ellipse cx="72" cy="61" rx="4.5" ry="3" fill="#E5A9A9" opacity="0.75" />

      {/* 鵝黃色扁圓形小嘴巴 */}
      <ellipse
        cx="50"
        cy="61"
        rx="5.5"
        ry="3.5"
        fill="#E8A84A"
        stroke="#4A4238"
        strokeWidth="2"
      />
    </svg>
  );
};

// ==========================================
// 統一動物插圖組件調用函數
// ==========================================
export const getAnimalIllustration = (
  id: AnimalId,
  size = 100,
  className = ''
): React.ReactElement => {
  switch (id) {
    case 'capybara':
      return <CapybaraIllustration size={size} className={className} />;
    case 'fox':
      return <FoxIllustration size={size} className={className} />;
    case 'penguin':
      return <PenguinIllustration size={size} className={className} />;
    case 'bear':
      return <BearIllustration size={size} className={className} />;
    case 'cat':
      return <CatIllustration size={size} className={className} />;
    case 'rabbit':
      return <RabbitIllustration size={size} className={className} />;
    case 'shiba':
      return <ShibaIllustration size={size} className={className} />;
    case 'owl':
      return <OwlIllustration size={size} className={className} />;
    default:
      return <RabbitIllustration size={size} className={className} />;
  }
};

// ==========================================
// 圓形大頭頭像徽章組件
// ==========================================
interface AnimalAvatarProps {
  id: AnimalId;
  size?: number;
  className?: string;
  badge?: string;
  onClick?: () => void;
  title?: string;
  ringColor?: string;
}

export const AnimalAvatar: React.FC<AnimalAvatarProps> = ({
  id,
  size = 40,
  className = '',
  badge,
  onClick,
  title,
  ringColor = 'ring-stone-200',
}) => {
  return (
    <div
      onClick={onClick}
      title={title}
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 border border-stone-200/90 shadow-2xs ${ringColor} ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="flex items-center justify-center w-full h-full">
        {getAnimalIllustration(id, size)}
      </div>
      {badge && (
        <span className="absolute bottom-0 right-0 rounded-full bg-[#7D94A8] text-white text-[9px] font-bold px-1 leading-tight border border-white">
          {badge}
        </span>
      )}
    </div>
  );
};
