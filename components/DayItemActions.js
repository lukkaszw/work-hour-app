import React from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import IconButton from './IconButton';

import Colors from '../constants/colors';

const DayItemActions = ({ 
  id, isLoading, isLeave, isSickLeave, isEditing, areInitialExists,
  onCancelEditMode, onStartEditMode,
  onSendData,  onFastAdd, onRemoveDaysHours, onSetLeave, onSetSickLeave }) => {
  return ( 
    <View style={styles.actions}>
      {
        isLoading ?
          <ActivityIndicator 
            size='small'
            color={Colors.primary}
          />
          :
          (
            isEditing ?
              <>
                <View style={styles.icon}>
                  <IconButton 
                    iconName='md-checkmark'
                    onPress={onSendData}
                    color='green'
                    size={25}
                  />
                </View>
                <View style={styles.icon}>
                  <IconButton 
                    iconName='md-close'
                    onPress={onCancelEditMode}
                    color='red'
                    size={25}
                  />
                </View>
              </>
              :
              <>
                <View style={styles.icon}>
                  <IconButton 
                    iconName='md-create'
                    onPress={onStartEditMode}
                    color='deeppink'
                    size={25}
                  />
                </View>
                {
                  !id ?
                    <View style={styles.icon}>
                      <IconButton 
                        iconName='ios-flash'
                        onPress={onFastAdd}
                        color={areInitialExists ? 'orange' : 'gray'}
                        size={25}
                      />
                    </View>
                    :
                    <View style={styles.icon}>
                      <IconButton 
                        iconName='ios-remove'
                        onPress={onRemoveDaysHours}
                        color='red'
                        size={25}
                      />
                    </View>
                }
                <View style={styles.icon}>
                  <IconButton 
                    iconName='ios-bed'
                    onPress={onSetLeave}
                    color={isLeave ? 'gray' : 'dodgerblue'}
                    size={25}
                  />
                </View>
                <View style={styles.icon}>
                  <IconButton 
                    iconName='ios-medkit'
                    onPress={onSetSickLeave}
                    color={isSickLeave ? 'gray' : 'red'}
                    size={25}
                  />
                </View>
            </>
          )
      }
    </View>
  );
}

DayItemActions.propTypes = {
  id: PropTypes.number,
  isLoading: PropTypes.bool,
  isLeave: PropTypes.number,
  isSickLeave: PropTypes.number,
  isEditing: PropTypes.bool,
  areInitialExists: PropTypes.bool,
  onSendData: PropTypes.func.isRequired,
  onCancelEditMode: PropTypes.func.isRequired,
  onStartEditMode: PropTypes.func.isRequired,
  onFastAdd: PropTypes.func.isRequired,
  onRemoveDaysHours: PropTypes.func.isRequired,
  onSetLeave: PropTypes.func.isRequired,
  onSetSickLeave: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  actions: {
    paddingTop: 20,
    paddingHorizontal: 20,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
 
export default DayItemActions;