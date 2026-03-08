export const getFormattedDate = (date: Date | undefined) => {
  if (!date) return '';
  return date.toISOString().split('T')[0];
}

export const getDateMinusDays = (date: Date, days: number) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}