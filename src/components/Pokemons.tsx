import React, { FunctionComponent, useState, useContext } from "react";
import { useQuery } from "react-query";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PokemonContext } from "./PokemonProvider";

import { fetchPokemons, fetchPokemonData, fetchPokemon } from "../utils/utils";
import { queryClient } from "../App";
import PokemonCard from "./PokemonCard";
import "../styles/Pokemons.css";

const Pokemons: FunctionComponent = () => {
  const [offset, setOffset] = useState<number>(0);
  // eslint-disable-next-line
  const [completePokemonData, setCompletePokemonData] =
    useContext<any>(PokemonContext);

  const pokemonsQuery = useQuery(["pokemons", offset], () =>
    fetchPokemons("pokemons", offset)
  );

  const fetchCompletePokemonDataForId = async (id: string) => {
    const pokemonData = await fetchPokemonData(id);
    setCompletePokemonData(pokemonData);
  };

  const onClickHandler = async (id: string) => {
    await fetchCompletePokemonDataForId(id);
  };

  return (
    <div className="root">
      {pokemonsQuery.status === "loading" && (
        <div
          data-test="allPokemonsLoaderContainer"
          className="allPokemonsLoaderContainer"
        >
          <CircularProgress />
        </div>
      )}

      {pokemonsQuery.status === "error" && <div>Error Fetching Data</div>}

      {pokemonsQuery.status === "success" && (
        <div data-test="allPokemonsContainer" className="allPokemonsContainer">
          {pokemonsQuery.data.results.map((pokemon: any) => (
            <PokemonCard
              data-test="pokemonCard"
              onMouseEnter={async () => {
                await queryClient.prefetchQuery(["pokemon", pokemon.name], () =>
                  fetchPokemon("pokemon", pokemon.name)
                );
              }}
              onClick={() => {
                onClickHandler(pokemon.name);
              }}
              key={pokemon.url.match(/\b\d+\b/)}
              id={pokemon.url.match(/\b\d+\b/)}
              name={pokemon.name}
            />
          ))}
          <div className="buttonContainer">
            <Button
              data-test="prevPage"
              className="prevPage"
              disabled={offset === 0}
              onClick={() => setOffset((old) => Math.max(old - 100, 0))}
            >
              Prev Page
            </Button>
            <Button
              data-test="nextPage"
              className="nextPage"
              disabled={!pokemonsQuery.data || !pokemonsQuery.data.next}
              onClick={() =>
                setOffset((old) =>
                  !pokemonsQuery.data || !pokemonsQuery.data.next
                    ? old
                    : old + 100
                )
              }
            >
              Next Page
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemons;
