import moment from 'moment';

const getMonthFromDate = (dateString) => {
  const date = moment(dateString);
  const month = date.month() + 1;
  const monthStr = month > 9 ? month : `0${month}`;
  const resultMonthDate = `${monthStr}.${date.year()}`;
  return resultMonthDate;
}

export default getMonthFromDate;