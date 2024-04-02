export const formatJobPostTime = (date: Date) => {
  const now = new Date();

  const hoursAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  const daysAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (hoursAgo < 1) return "just now";
  else if (hoursAgo < 2) return "1 hour ago";
  else if (hoursAgo < 3) return "2 hours ago";
  else if (hoursAgo < 4) return "3 hours ago";
  else if (hoursAgo < 5) return "4 hours ago";

  if (daysAgo < 8) {
    if (daysAgo === 0) {
      return "today";
    } else if (daysAgo === 1) {
      return "yesterday";
    } else if (daysAgo < 8) {
      return `${daysAgo} days ago`;
    }
  }

  const weeksAgo = Math.floor(daysAgo / 7);

  if (weeksAgo < 5) {
    return `${weeksAgo} week${weeksAgo === 1 ? "" : "s"} ago`;
  }

  const monthsAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30));

  if (monthsAgo < 13) {
    return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
  }

  const yearsAgo = Math.floor(now.getFullYear() - date.getFullYear());

  return `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago`;
};
