import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.activityContaiuner}>
      <ActivityIndicator size={30} color={'grey'} />
      <Text>Cargando</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  activityContaiuner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
