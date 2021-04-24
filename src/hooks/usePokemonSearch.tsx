/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {


  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemonList, setsimplePokemonList] = useState<SimplePokemon[]>([]);


  const loadPokemons = async () => {
    const response = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1118');
    mapPokemonList(response.data.results);
  };

  const mapPokemonList = (pokemonList: Result[]) => {

    const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
      const urlParts = url.split('/');
      // const id = urlParts[6];
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return { id, name, picture };
    });
    setsimplePokemonList(newPokemonList);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isFetching,
    simplePokemonList,
  };

};

