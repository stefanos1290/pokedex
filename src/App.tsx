import React, { FunctionComponent } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header";
import Pokemons from "./components/Pokemons";
import { PokemonProvider } from "./components/PokemonProvider";
import SelectedPokemonCard from "./components/SelectedPokemonCard";

import "./styles/Container.css";

export const queryClient = new QueryClient();

const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonProvider>
        <div className="container">
          <Header />
          <Pokemons />
          <SelectedPokemonCard />
        </div>
      </PokemonProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
