export function formatDate(
  date,
  format = "DD/MM/YYYY",
  timeZone = "Asia/Kolkata"
) {
  const currentDate = new Date(date);

  if (isNaN(currentDate.getTime())) {
    return "";
  }

  const now = new Date();

  const today = new Date(
    now.toLocaleString("en-US", { timeZone })
  );

  const target = new Date(
    currentDate.toLocaleString("en-US", { timeZone })
  );

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (target.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (target.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return new Intl.DateTimeFormat(
    format === "MM/DD/YYYY" ? "en-US" : "en-GB",
    {
      timeZone,
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(currentDate);
}