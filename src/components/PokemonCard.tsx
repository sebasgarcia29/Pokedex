/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/core';


const { width: windowsWidth } = Dimensions.get('window');

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

  const navigation = useNavigation();

  const [bgColor, setbgColor] = useState('grey');
  const isMounted = useRef(false);

  useEffect(() => {

    ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
      .then((colors: { platform: string; dominant: any; background: any; }) => {
        if (isMounted.current) { return; }
        (colors.platform === 'android')
          ? setbgColor(colors.dominant || 'grey')
          : setbgColor(colors.background || 'grey');
      });

    return () => {
      isMounted.current = true;
    };

  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => navigation.navigate('PokemonScreen', { simplePokemon: pokemon, color: bgColor })}
    >
      <View style={{
        ...styles.cardContainer,
        width: windowsWidth * 0.38,
        backgroundColor: bgColor,
      }}>

        {/* Nombre y el Id */}
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>

        <FadeInImage
          uri={pokemon.picture}
          style={styles.pokemonImage}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 13,
    // overflow: 'hidden',
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -9,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});

