import React, {
  FunctionComponent,
  useState,
  useEffect,
  createContext,
} from "react";

import { fetchPokemonData } from "../utils/utils";
import { IPokemonData, IPokemonCompleteData } from "../types/types";

import { useNavigate } from "react-router-dom";

export const PokemonContext = createContext({});

export const PokemonProvider: FunctionComponent = (props) => {
  const [completePokemonData, setCompletePokemonData] =
    useState<IPokemonCompleteData>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDefaultPokemonDataForId("1");
  }, []);

  const fetchDefaultPokemonDataForId = async (id: string) => {
    const defaultPokemonData = await fetchPokemonData(id);
    setCompletePokemonData(defaultPokemonData);
    navigate(
      `/${defaultPokemonData?.originalPokemon?.name}/${defaultPokemonData?.originalPokemon?.id}`
    );
  };
  return (
    <PokemonContext.Provider
      value={[completePokemonData, setCompletePokemonData]}
    >
      {props.children}
    </PokemonContext.Provider>
  );
};
