import React from 'react';
import { Text, View, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderBtn from '../components/HeaderButton';

import InputField from '../components/InputField';
import Colors from '../constants/colors';
import { APP_HEIGHT } from '../constants/sizes';

import useHolidaysForm from '../hooks/useHolidaysForm';


const HolidaysScreen = () => {

  const {
    overdueHolidays,
    currentHolidays,
    overdueError,
    currentError,
    holidays,
    isLoading,
    handleChangeCurrentHolidays,
    handleChangeOverdueHolidays,
    handleCheckHolidays,
  } = useHolidaysForm();

  return (
    <View style={styles.screen}>
      <View style={styles.options}>
        <View style={styles.option}>
          <Text style={styles.text}>
            Ilość zaległego urlopu na początku roku:
          </Text>
          <InputField 
            value={overdueHolidays}
            onChangeText={handleChangeOverdueHolidays}
            keyboardType="number-pad"
            error={overdueError}
            inputStyles={styles.input}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.text}>
            Ilość przysługującego urlopu w bieżącym roku: 
          </Text>
          <InputField 
            value={currentHolidays}
            onChangeText={handleChangeCurrentHolidays}
            keyboardType="number-pad"
            error={currentError}
            inputStyles={styles.input}
          />
        </View>
        <View style={styles.button}>
          <Button 
            title="Sprawdź stan urlopu"
            color={Colors.primary}
            onPress={handleCheckHolidays}
          />
        </View>
      </View>
      <View style={styles.result}>
        {
          isLoading ?
            <ActivityIndicator 

            />
            :
            <>
              {
                holidays &&
                  <View> 
                    <View style={styles.option}>
                      <Text style={styles.text}>
                        Wykorzystano w tym roku:
                      </Text>
                      <Text style={styles.number}>
                        {holidays.used}
                      </Text>
                    </View>   
                    <View style={styles.option}>
                      <Text style={styles.text}>
                        Pozostało do końca roku: 
                      </Text>     
                      <Text style={styles.number}>
                        {holidays.left}
                      </Text>
                    </View>
                  </View>
                }
            </>
        }
      </View>
    </View>
  );
}

HolidaysScreen.navigationOptions = (navData) => {

  return {
    headerTitle: 'Stan urlopu',
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
            title='Do aplikacji'
            iconName='md-create'
            onPress={() => {
              navData.navigation.navigate('Month');
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  options: {
    marginBottom: APP_HEIGHT < 600 ? 10 : 30,
  },
  text: {
    fontSize:  APP_HEIGHT < 600 ? 16 : 18,
    marginRight: 10,
    maxWidth: '75%',
  },  
  number: {
    fontSize: APP_HEIGHT < 600 ? 16 : 18,
    fontWeight: '700',
  },  
  input: {
    width: 40,
    textAlign: 'center',
    fontSize: APP_HEIGHT < 600 ? 16 : 18,
  },  
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  button: {
    marginTop:  APP_HEIGHT < 600 ? 15 : 30,
  },
  result: {
    width: '100%',
    padding: 20,
    paddingTop: APP_HEIGHT < 600 ? 0 : 20,
  },
});


export default HolidaysScreen;