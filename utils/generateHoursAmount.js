export const genStartHourAmount = (startHourString) => {
  const parts = startHourString.split(':');
  const hour = parseInt(parts[0]);
  const minutes = parseInt(parts[1])/60;
  return hour + minutes;
}

export const genEndHourAmount = (endHourString, startHourAmount) => {
  const parts = endHourString.split(':');
  const hour = parseInt(parts[0]);
  const minutes = parseInt(parts[1])/60;
  let endHourAmount = hour + minutes;

  if(endHourAmount < startHourAmount) {
    endHourAmount += (24 - startHourAmount);
  }
  return endHourAmount;
}

export const countDaysHoursAmount = (startHourString, endHourString) => {
  const startHourAmount = genStartHourAmount(startHourString);
  const endHourAmount = genEndHourAmount(endHourString, startHourAmount);
  return endHourAmount - startHourAmount;
} 