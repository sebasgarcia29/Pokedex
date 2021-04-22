/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { FadeInImage } from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: Props) => {
  return (
    <ScrollView
      style={{ ...StyleSheet.absoluteFillObject }}
      showsVerticalScrollIndicator={false}
    >

      <View style={{ ...styles.container, marginTop: 370 }}>
        <Text style={styles.title}>{'Types'}</Text>

        {/* Container Types and weigt */}
        <View style={{ flexDirection: 'row' }}>
          {
            pokemon.types.map(({ type }) => (
              <Text
                key={type.name}
                style={{ ...styles.regularText, marginRight: 10 }}
              >
                {type.name}
              </Text>
            ))
          }
        </View>
        {/* Weigt */}
        <Text style={styles.title}>{'Peso'}</Text>
        <Text style={styles.regularText}>{pokemon.weight}kg</Text>
      </View>

      {/* Container Sprites */}
      <View style={styles.container}>
        <Text style={{ ...styles.title }}>
          {'SPrites'}
        </Text>
        <ScrollView style={{}} horizontal showsHorizontalScrollIndicator={false}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemon.sprites.back_default}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemon.sprites.front_shiny}
            style={styles.basicSprite}
          />
          <FadeInImage
            uri={pokemon.sprites.back_shiny}
            style={styles.basicSprite}
          />
        </ScrollView>
      </View>

      {/* Habilities */}
      <View style={styles.container}>
        <Text style={styles.title}>{'Skills base'}</Text>
        {/* Container Types and weigt */}
        <View style={{ flexDirection: 'row' }}>
          {
            pokemon.abilities.map(({ ability }) => (
              <Text
                key={ability.name}
                style={{ ...styles.regularText, marginRight: 10 }}
              >
                {ability.name}
              </Text>
            ))
          }
        </View>
      </View>

      {/* Habilities */}
      <View style={styles.container}>
        <Text style={styles.title}>{'Movimientos'}</Text>
        {/* Container Types and weigt */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            pokemon.moves.map(({ move }) => (
              <Text
                key={move.name}
                style={{ ...styles.regularText, marginRight: 10 }}
              >
                {move.name}
              </Text>
            ))
          }
        </View>
      </View>

      {/* Stats */}
      <View style={styles.container}>
        <Text style={styles.title}>{'Propiedades'}</Text>
        {/* Container Types and weigt */}
        <View>
          {
            pokemon.stats.map((stat, i) => (
              <View
                style={{ flexDirection: 'row' }}
                key={stat.stat.name + i}
              >
                <Text
                  key={stat.stat.name}
                  style={{ ...styles.regularText, marginRight: 10, width: 150 }}
                >
                  {stat.stat.name}
                </Text>
                <Text
                  style={{ ...styles.regularText, fontWeight: 'bold' }}
                >
                  {stat.base_stat}
                </Text>
              </View>
            ))
          }
        </View>

        {/* Sprite Final */}
        <View style={{ marginBottom: 80, alignItems: 'center' }}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});

