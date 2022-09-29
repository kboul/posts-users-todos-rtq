import { parseISO, formatDistanceToNow } from "date-fns";

const truncate = (text: string, limit?: number): string => {
  const limitation = limit ?? 110;
  return text.length > limitation
    ? `${text.substring(0, limitation)}...`
    : text;
};

const formatDate = (timestamp: string): string => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return timeAgo;
};

export { formatDate, truncate };
