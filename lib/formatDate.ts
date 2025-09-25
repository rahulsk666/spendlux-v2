import { formatDistanceToNow } from "date-fns";

export function formatRelativeDate(timestamp: string): string {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
}

// export function formatDate(timestamp: string): string {
//   const date = new Date(timestamp);
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   });
// }
