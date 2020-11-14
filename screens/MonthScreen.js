import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderButton';

import moment from 'moment';

import { getDays } from '../store/api-requests/api-requests';

const renderDayItem = ({ item }) => (
  <View>
    <Text>
      {`${item.dayNr}.${item.month}`} - {item.dayOfWeek}
    </Text>
  </View>
);

const MonthScreen = ({ navigation, month, year }) => {

  const dispatch = useDispatch();

  const { startDate, endDate, daysInMonth } = useMemo(() => {
    const startDate = `${year}-${month}-01`;
    const lastDayOfMonth = moment(`${year}-${month}`, 'YYYY-MM').endOf('month').format('D'); 
    const endDate = `${year}-${month}-${lastDayOfMonth}`;

    return {
      startDate,
      endDate,
      daysInMonth: lastDayOfMonth,
    };
  }, [year, month]);

  useEffect(() => {
    dispatch(getDays({ startDate, endDate }));
  }, [startDate, endDate]);

  const fetchedDays = useSelector(state => state.days.data);
  const isLoading = useSelector(state => state.isLoading);

  const generatedDays = useMemo(() => {
    const modifiedDays = fetchedDays.map(day => {
      const mDate = moment(new Date(day.date));
      const dayNr = mDate.date();

      return {
        ...day,
        dayNr: dayNr > 9 ? dayNr.toString() : `0${dayNr}`,
        month,
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
          month,
          dayOfWeek: moment(`${year}-${month}-${dayNr}`).day() + 1,
        });
      }
    } 

    return [...days];
  }, [fetchedDays, daysInMonth]);

  if(isLoading || !generatedDays) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
 
  return ( 
    <View>
      <FlatList 
        data={generatedDays}
        keyExtractor={item => item.dayNr.toString()}
        renderItem={renderDayItem}
      />
    </View>
  );
}

MonthScreen.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
};

MonthScreen.defaultProps = {
  month: moment().month() + 2,
  year: moment().year(),
};

MonthScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Mesiąc',
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