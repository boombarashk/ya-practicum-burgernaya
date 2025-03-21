import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
// https://day.js.org/docs/en/plugin/calendar
dayjs.extend(calendar);

export const formatDate = (d: string): string => {
  const date = dayjs(new Date(d));
  const dayCountDiff = Math.round(dayjs().diff(date) / (86400 * 1000));
  return date.calendar(null, {
    sameDay: "Сегодня, HH:mm",
    lastDay: "Вчера, HH:mm",
    lastWeek: `${dayCountDiff} ${dayCountDiff < 5 ? "дня" : "дней"} назад HH:mm`, // [Last]: Last week ( Last Monday at 2:30 AM )
    sameElse: "DD.MM.YYYY HH:mm",
  });
};

export const formatNumber = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(n);
