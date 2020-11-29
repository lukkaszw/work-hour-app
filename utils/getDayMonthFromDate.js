const getDayMonthFromDate = (date) => {
  const month = date.month() + 1;
  const day = date.date();

  const monthString = month > 9 ? month : `0${month}`;
  const dayString = day > 9 ? day : `0${day}`;

  return `${dayString}.${monthString}`;
}

export default getDayMonthFromDate;