import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderButton';
import MonthsModal from '../components/MonthsModal';

import YearItem from '../components/YearItem';

import { fetchYears } from '../store/api-requests/api-requests';

const HistoryScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchYears());
  }, []);

  const years = useSelector(state => state.history.years);

  const [chosenYear, setChosenYear] = useState(null);

  const onCloseModal = useCallback(() => setChosenYear(null), [setChosenYear]);
  const onOpenModal = useCallback((year) => setChosenYear(year), [setChosenYear]);


  return ( 
    <ScrollView>
      {
        years.map(yearItem => (
          <YearItem 
            key={yearItem.year}
            year={yearItem.year}
            onShowMonths={onOpenModal}
          />
        ))
      }
      <MonthsModal 
        year={chosenYear}
        onClose={onCloseModal}
        navigation={navigation}
      />
    </ScrollView>
  );
}

HistoryScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Historia',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item 
            title='Menu'
            iconName='ios-menu'
            onPress={() => {
              navData.navigation.openDrawer('AddDay');
            }}
          />
        </HeaderButtons>
      )
    }
  }
}
 
export default HistoryScreen;