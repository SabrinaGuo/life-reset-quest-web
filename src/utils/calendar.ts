import { AlarmItem } from '../types';

/**
 * 產生 Google 日曆單一事件網址（支援每日重複提醒）
 */
export function generateGoogleCalendarUrl(alarm: AlarmItem): string {
  const [hours, minutes] = alarm.time.split(':').map(Number);
  const now = new Date();
  
  // 設定今天或明天的對應時間
  const eventDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
  const endDate = new Date(eventDate.getTime() + 15 * 60 * 1000); // 15 分鐘覺察時間

  // 格式化為 YYYYMMDDTHHmmss
  const pad = (n: number) => String(n).padStart(2, '0');
  const formatIsoDate = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  const dateParam = `${formatIsoDate(eventDate)}/${formatIsoDate(endDate)}`;
  const title = `【人生重啟覺察】${alarm.question}`;
  const details = `${alarm.subText}\n\n人生重啟指南：停下來深呼吸三次，誠實回答這個問題，記錄在手帳中。\n建議在 Google 日曆勾選「每天重複」。`;

  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: dateParam,
    details: details,
    recur: 'RRULE:FREQ=DAILY',
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * 產生 Google 日曆每日任務提醒網址
 */
export function generateGoogleTaskCalendarUrl(taskTitle: string): string {
  const now = new Date();
  // 預設為明天上午 10:00
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0, 0);
  const endDate = new Date(tomorrow.getTime() + 60 * 60 * 1000);

  const pad = (n: number) => String(n).padStart(2, '0');
  const formatIsoDate = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  const dateParam = `${formatIsoDate(tomorrow)}/${formatIsoDate(endDate)}`;
  const title = `【人生重啟主線任務】${taskTitle}`;
  const details = `人生重啟冒險日誌 - 每日關鍵行動：${taskTitle}\n像那個全新的自己一樣，自然而專注地完成它！`;

  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: dateParam,
    details: details,
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * 動態產生標準 RFC 5545 .ics 檔案並觸發瀏覽器下載
 */
export function downloadAlarmsIcsFile(alarms: AlarmItem[]): void {
  const pad = (n: number) => String(n).padStart(2, '0');
  const now = new Date();
  const dtStamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  const eventsIcs = alarms
    .filter((a) => a.enabled)
    .map((alarm, index) => {
      const [h, m] = alarm.time.split(':').map(Number);
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
      const end = new Date(start.getTime() + 15 * 60 * 1000);

      const dtStart = `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}T${pad(h)}${pad(m)}00`;
      const dtEnd = `${end.getFullYear()}${pad(end.getMonth() + 1)}${pad(end.getDate())}T${pad(end.getHours())}${pad(end.getMinutes())}00`;

      return [
        'BEGIN:VEVENT',
        `UID:life-reset-alarm-${index}-${Date.now()}@liferesetquest.app`,
        `DTSTAMP:${dtStamp}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        'RRULE:FREQ=DAILY',
        `SUMMARY:【人生重啟覺察】${alarm.question.replace(/,/g, '\\,')}`,
        `DESCRIPTION:${alarm.subText.replace(/\n/g, '\\n').replace(/,/g, '\\,')}\\n\\n提醒：請給自己 30 秒誠實覺察。`,
        'STATUS:CONFIRMED',
        'BEGIN:VALARM',
        'TRIGGER:-PT0M',
        'ACTION:DISPLAY',
        'DESCRIPTION:人生重啟覺察鬧鐘',
        'END:VALARM',
        'END:VEVENT',
      ].join('\r\n');
    })
    .join('\r\n');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Life Reset Quest//Life Awareness Alarms//ZH-TW',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:人生重啟覺察鬧鐘 (Life Reset Quest)',
    'X-WR-TIMEZONE:Asia/Taipei',
    eventsIcs,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'life-reset-alarms.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
