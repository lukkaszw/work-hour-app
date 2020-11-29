import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderButton';
import HoursSummary from '../components/HoursSummary';
import DaysList from '../components/DaysList';

import Loader from '../components/Loader';

import moment from 'moment';

import { getDays, getInitialSettings } from '../store/api-requests/api-requests';
import checkMobileHolidays from '../utils/checkMobileHolidays';
import MONTHS from '../constants/months';

const MonthScreen = ({ navigation, month, year }) => {

  const dispatch = useDispatch();

  const monthNr = navigation.getParam('month', month);
  const yearNr = navigation.getParam('year', year);
  const monthStr = monthNr > 9 ? monthNr.toString() : `0${monthNr}`;

  const { startDate, endDate, daysInMonth } = useMemo(() => {
    const startDate = `${yearNr}-${monthStr}-01`;
    const lastDayOfMonth = moment(`${yearNr}-${monthStr}`, 'YYYY-MM').endOf('month').format('D'); 
    const endDate = `${yearNr}-${monthStr}-${lastDayOfMonth}`;

    return {
      startDate,
      endDate,
      daysInMonth: lastDayOfMonth,
    };
  }, [yearNr, monthStr]);

  useEffect(() => {
    dispatch(getInitialSettings());
  }, []);

  useEffect(() => {
    dispatch(getDays({ startDate, endDate, month: `${monthStr}.${yearNr}` }));
    
    navigation.setParams({
      monthName: MONTHS[monthNr],
    });
  }, [startDate, endDate, monthNr, monthStr, yearNr]);

  const fetchedDays = useSelector(state => state.days.data);
  const isLoading = useSelector(state => state.days.isLoading);

  const generatedDays = useMemo(() => {
    const modifiedDays = fetchedDays.map(day => {
      const mDate = moment(new Date(day.date));
      const dayNr = mDate.date();

      return {
        ...day,
        dayNr: dayNr > 9 ? dayNr.toString() : `0${dayNr}`,
        month: monthStr,
        dayOfWeek: mDate.day() + 1,
      };
    });

    const days = [];

    for(let i = 1; i <= daysInMonth; i++) {
      const dayNr = i > 9 ? i.toString() : `0${i}`;
      const day = modifiedDays.find(day => day.dayNr === dayNr);
      if(day) {
        days.push(day);
      } else {
        days.push({
          id: null,
          dayNr,
          month: monthStr,
          year: yearNr,
          dayOfWeek: moment(`${yearNr}-${monthStr}-${dayNr}`).day() + 1,
        });
      }
    } 

    return [...days];
  }, [fetchedDays, daysInMonth]);

  const mobileHolidaysIn_PL = useMemo(() => checkMobileHolidays(yearNr), [yearNr]);

  if(isLoading) {
    return (
      <Loader />
    )
  }

  return ( 
    <ScrollView>
      <DaysList 
        days={generatedDays}
        mobileHolidays={mobileHolidaysIn_PL}
      />
      <HoursSummary 
        days={generatedDays}
      />
    </ScrollView>
  );
}

MonthScreen.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
};

MonthScreen.defaultProps = {
  month: moment().month() + 1,
  year: moment().year(),
};

MonthScreen.navigationOptions = (navData) => {

  const monthName = navData.navigation.getParam('monthName', MONTHS[moment().month() + 1]);
  const year = navData.navigation.getParam('year', moment().year());

  return {
    headerTitle: `${monthName} ${year}`,
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item 
            title='Menu'
            iconName='ios-menu'
            onPress={() => {
              navData.navigation.openDrawer()
            }}
          />
        </HeaderButtons>
      )
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item 
            title='Dodaj'
            iconName='ios-add'
            onPress={() => {
              navData.navigation.navigate('AddDay');
            }}
          />
        </HeaderButtons>
      )
    }
  }
}
 
export default MonthScreen;