export const formatYMD = (dateInput = new Date()) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
};

export const addDays = (dateInput, days) => {
  const d =
    dateInput instanceof Date
      ? new Date(dateInput)
      : new Date(`${dateInput}T00:00:00`);

  d.setDate(d.getDate() + days);
  return d;
};
