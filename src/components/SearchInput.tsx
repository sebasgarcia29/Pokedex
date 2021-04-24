/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

interface Props {
  onDebounce: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({ style, onDebounce }: Props) => {

  const [textValue, setTextValue] = useState('');

  const debounceValue = useDebouncedValue(textValue);

  useEffect(() => {
    onDebounce(debounceValue);
  }, [debounceValue]);


  return (
    <View style={{
      ...styles.container,
      ...style as any,
    }}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder={'Buscar Pokemon'}
          style={styles.textInput}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name={'search'} color={'#f84e1e'} size={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    top: Platform.OS === 'android' ? 2 : 0,
  },
});
