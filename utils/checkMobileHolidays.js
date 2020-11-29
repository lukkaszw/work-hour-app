import moment from 'moment';
import getDayMonthFromDate from './getDayMonthFromDate';

const checkMobileHolidays_PL = (year) => {
  const A = 24;
  const B = 5;
  
  const a = year % 19;
  const b = year % 4;
  const c = year % 7;

  const d = (a * 19 + A) % 30;
  const e = (2*b + 4*c + 6*d + B) % 7;

  let easterHoliday;
  const mobileHolidays = [];

  if(d === 29 && e === 6) {
    easterHoliday = moment(`${year}-04-19`);
  } else if (d === 28 && e === 6) {
    easterHoliday = moment(`${year}-04-18`);
  } else {
    const dayFrom22March = d + e;
    easterHoliday = moment(`${year}-03-22`).add(dayFrom22March, 'd');
   }

   const mondayAfterEaster = moment(easterHoliday).add(1, 'd');
   const divineBodyHoliday = moment(easterHoliday).add(60, 'd');

 
   mobileHolidays.push(getDayMonthFromDate(easterHoliday));
   mobileHolidays.push(getDayMonthFromDate(mondayAfterEaster));
   mobileHolidays.push(getDayMonthFromDate(divineBodyHoliday));

   return mobileHolidays;
}

export default checkMobileHolidays_PL;