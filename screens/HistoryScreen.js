import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderButton';
import MonthsModal from '../components/MonthsModal';

import YearItem from '../components/YearItem';
import Loader from '../components/Loader';

import Colors from '../constants/colors';

import { fetchYears } from '../store/api-requests/api-requests';

const HistoryScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchYears());
  }, []);

  const years = useSelector(state => state.history.years);
  const isLoading = useSelector(state => state.history.isLoading);

  const [chosenYear, setChosenYear] = useState(null);

  const onCloseModal = useCallback(() => setChosenYear(null), [setChosenYear]);
  const onOpenModal = useCallback((year) => setChosenYear(year), [setChosenYear]);

  if(isLoading) {
    <View style={styles.centeredView}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  }


  return ( 
    <ScrollView>
      <>
        {
          years.length > 0 ?
            years.map(yearItem => (
              <YearItem 
                key={yearItem.year}
                year={yearItem.year}
                onShowMonths={onOpenModal}
              />
            ))
            :
            <Text style={styles.text}>Brak historii!</Text>
        }
      </>
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
 
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },  
  text: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  }
});

export default HistoryScreen;