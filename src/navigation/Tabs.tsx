/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Tab1 } from './Tab1';
import { Tab2Screen } from './Tab2';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      tabBarOptions={{
        activeTintColor: '#dc5248',
        labelStyle: {
          marginBottom: Platform.OS === 'ios' ? 10 : 0,
        },
        style: {
          backgroundColor: 'rgba(255,255,255, 0.89)',
          position: 'absolute',
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 85 : 60,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={Tab1}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({ color }) => (
            <Icon
              name={'th-list'}
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={Tab2Screen}
        options={{
          tabBarLabel: 'Busqueda',
          tabBarIcon: ({ color }) => (
            <Icon
              name={'search'}
              color={color}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
