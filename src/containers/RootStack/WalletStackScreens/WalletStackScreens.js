import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { defaultHeaderOptions } from '../../../utils/navigation/header';
import Home from '../../Home/Home';
import Service from '../../Services/Service/Service';

const WalletStack = createStackNavigator();

const WalletStackScreens = props => {
  return (
    <WalletStack.Navigator
      screenOptions={defaultHeaderOptions}
    >
      <WalletStack.Screen
        name="Wallets"
        component={Home}
        options={{
          title: "Wallets",
        }}
      />
      <WalletStack.Screen
        name="Service"
        component={Service}
      />
    </WalletStack.Navigator>
  );
};

export default WalletStackScreens