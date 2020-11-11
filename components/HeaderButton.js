import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const HeaderBtn = (props) => {
  return ( 
    <HeaderButton 
      {...props}
      IconComponent={Ionicons}
      iconSize={30}
      color="white"
    />
  );
}
 
export default HeaderBtn;