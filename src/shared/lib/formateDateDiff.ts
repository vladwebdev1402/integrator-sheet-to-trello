export const formateDateDiff = (date: string): string => {
    const currentDate = new Date().getTime();

    const diff = currentDate - new Date(date).getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const month = Math.floor(days / 30);
    const year = Math.floor(month / 12);

    if (seconds < 60) {
        return `Now`;
      } else if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (hours < 24) {
        return `${hours} hours ago`;
      } else if (days < 30) {
        return `${days} days ago`;
      } else if (month < 30) return `${month} months ago`;
      else return `${year} years ago`;
}