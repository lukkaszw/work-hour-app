import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, View, Text, Switch, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderButton';
import HourSettings from '../components/HourSettings';

import useSettings from '../hooks/useSettings';
import DivideLine from '../components/DivideLine';
import InlineButton from '../components/InlineButton';

import Colors from '../constants/colors';

const SettingsScreen = ({ navigation }) => {

  const initialValues = useSelector(state => state.settings);

  const handleNavigateToMonthScreen = useCallback(() => {
    navigation.navigate('Month');
  }, [navigation]);

   const {
    startHourField,
    endHourField,
    handleChangeEndHour,
    handleChangeStartHour,
    startOnSaturdayField,
    endOnSaturdayField,
    handleChangeSaturdayEnd,
    handleChangeSaturdayStart,
    startOnSundayField,
    endOnSundayField,
    handleChangeSundayEnd,
    handleChangeSundayStart,
    workOnSaturday,
    workOnSunday,
    toggleWorkOnSaturday,
    toggleWorkOnSunday,
    handleSaveSettings,
  } = useSettings({ initialValues });

  return ( 
    <View style={styles.screen}>
      <View style={styles.hourSettings}>
        <HourSettings 
          headerText="Podaj obecne godz. pracy:"
          onFromChangeHandler={handleChangeStartHour}
          onToChangeHandler={handleChangeEndHour}
          fromValue={startHourField.value}
          fromError={startHourField.error}
          toValue={endHourField.value}
          toError={endHourField.error}
        />
      </View>
      <DivideLine />
      <View style={styles.specificDaySettings}>
        <View style={styles.centeredContent}>
          <View style={styles.checkItem}>
            <Text style={styles.checkText}>
              Praca w sobotę
            </Text>
            <Switch 
              onValueChange={toggleWorkOnSaturday}
              value={workOnSaturday}
            />
          </View>
        </View>
        {
          workOnSaturday &&
            <HourSettings 
              onFromChangeHandler={handleChangeSaturdayStart}
              onToChangeHandler={handleChangeSaturdayEnd}
              fromValue={startOnSaturdayField.value}
              fromError={startOnSaturdayField.error}
              toValue={endOnSaturdayField.value}
              toError={endOnSaturdayField.error}
            />
        }
      </View> 
      <DivideLine />
      <View style={styles.specificDaySettings}>
        <View  style={styles.centeredContent}>
          <View style={styles.checkItem}>
            <Text style={styles.checkText}>
              Praca w niedzielę
            </Text>
            <Switch 
              onValueChange={toggleWorkOnSunday}
              value={workOnSunday}
            />
          </View>
        </View>
        {
          workOnSunday &&
            <HourSettings 
              onFromChangeHandler={handleChangeSundayStart}
              onToChangeHandler={handleChangeSundayEnd}
              fromValue={startOnSundayField.value}
              fromError={startOnSundayField.error}
              toValue={endOnSundayField.value}
              toError={endOnSundayField.error}
            />
        }
      </View> 
      <DivideLine />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <InlineButton 
            title='Anuluj'
            onPress={handleNavigateToMonthScreen}
          />
        </View>
        <View style={styles.button}>
          <Button 
            title='Zapisz'
            color={Colors.primary}
            onPress={handleSaveSettings}
          />
        </View>
      </View>
    </View>
  );
}

SettingsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Ustawienia',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderBtn}>
          <Item 
            title='Menu'
            iconName='ios-menu'
            onPress={() => {
              navData.navigation.openDrawer();
            }}
          />
        </HeaderButtons>
      )
    }
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  hourSettings: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  specificDaySettings: {
    marginVertical: 40,
  },
  checkItem: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  checkText: {
    fontSize: 16,
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 20,
  }
})
 
export default SettingsScreen;