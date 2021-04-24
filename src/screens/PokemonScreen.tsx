/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParams } from '../navigation/Tab1';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { }

export const PokemonScreen = ({ route, navigation }: Props) => {

  const { color, simplePokemon } = route.params;
  const { name, id, picture } = simplePokemon;

  const { top } = useSafeAreaInsets();

  const { isLoading, pokemon } = usePokemon(id);

  return (
    <View style={{ flex: 1 }}>
      {/* Header container */}
      <View style={{ ...styles.headerContainer, backgroundColor: color }}>
        <TouchableOpacity
          activeOpacity={0.4}
          style={{
            ...styles.backButton,
            top: top + 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon name={'arrow-circle-left'} size={35} color={'white'} />
        </TouchableOpacity>

        {/* Name Pokemon */}
        <Text style={{ ...styles.pokemonName, top: top + 45 }}>
          {name + '\n'} # {id}
        </Text>

        {/* Pokebola Blanca */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={{ ...styles.pokeball }}
        />
        {/* Pokemon Image */}
        <FadeInImage
          uri={picture}
          style={styles.pokemonImage}
        />

      </View>

      {/* Detalles y Loading */}
      {isLoading
        ? (
          <View style={{ ...styles.activityIndicator }}>
            <ActivityIndicator color={color} size={60} />
          </View>
        )
        : (<PokemonDetails pokemon={pokemon} />)}

    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

