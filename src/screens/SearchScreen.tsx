/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { PokemonCard } from '../components/PokemonCard';
import { styles } from '../theme/appTheme';
import { Loading } from '../components/Loading';
import { Platform } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';


const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {

  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();

  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  const [term, setTerm] = useState('');

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke => poke.name.toLowerCase().includes(term.toLowerCase()))
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }

  }, [term]);

  if (isFetching) {
    return (
      <Loading />
    );
  }

  return (
    <View style={{
      flex: 1,
      marginHorizontal: 10,
    }}>
      <SearchInput
        style={{ ...stylesLocal.inputComponent, top: Platform.OS === 'ios' ? top : top + 30 }}
        onDebounce={setTerm}
      />

      <FlatList
        data={pokemonFiltered}
        keyExtractor={(pokemon) => pokemon.id}
        numColumns={2}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
          />
        )}
        ListHeaderComponent={() => (
          <Text style={{
            ...styles.title,
            ...styles.globalMargin,
            paddingBottom: 10,
            marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
          }}> {term} </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const stylesLocal = StyleSheet.create({
  inputComponent: {
    position: 'absolute',
    zIndex: 999,
    width: screenWidth - 20,
  },
});
