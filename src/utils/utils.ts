import {IPokemonData, IPokemonCompleteData} from '../types/types'

const baseUrl = 'https://pokeapi.co/api/v2/';

export const fetchPokemons = async (key: string, offset: number) => {
    const res = await fetch(`${baseUrl}pokemon?limit=100&offset=${offset}/`);
    return res.json();
}

export const fetchPokemon = async (key: string, selectedPokemon: string) => {
    const res = await fetch(`${baseUrl}pokemon/${selectedPokemon}/`);
    return res.json();
}

export const fetchPokemonData = async (pokemonId: string): Promise<IPokemonCompleteData> => {
    
    // 1. Grab pokemon data
    const originalPokemonData = await fetchPokemon('', pokemonId);
    const originalPokemonExtra = await (await fetch(`${baseUrl}pokemon-species/` + originalPokemonData.id)).json();
    const pokemonColor = originalPokemonExtra.color.name; 
    // 2. Grab evolution data
    const evolutionUrl = originalPokemonExtra.evolution_chain.url;
    const evolutionChainRes = await (await fetch(evolutionUrl)).json();
    const evolutionPokemonSpeciesData = [];
    evolutionPokemonSpeciesData.push(evolutionChainRes?.chain?.species)
    if (evolutionChainRes.chain.evolves_to.length !== 0) {
        if (evolutionChainRes?.chain?.evolves_to[0]) {
            evolutionPokemonSpeciesData.push(evolutionChainRes?.chain?.evolves_to[0].species);
        }
        if (evolutionChainRes?.chain?.evolves_to[0].evolves_to[0]) {
            evolutionPokemonSpeciesData.push(evolutionChainRes?.chain?.evolves_to[0].evolves_to[0].species);
        }
    }
    
    // 3. Grab evaolution pokemon ids
    const evolutionPokemonIds = evolutionPokemonSpeciesData.map(evoPokemon => {
        return evoPokemon.url.match(/\b\d+\b/)[0];
    });
    // 4. Grab evolution pokemon data
    const evolusionPokemonExtraData =  await Promise.all(evolutionPokemonIds.map(async (item) => {
        return await fetchPokemon('', item);
    }));

    const evolutionReturnedData: Array<IPokemonData> = evolusionPokemonExtraData.map(p => {
        return {
            name: p.name,
            sprite: p.sprites.front_default,
            id: p.id,
        }
    })

    const originalPokemonType = [];

    originalPokemonType.push(originalPokemonData.types[0].type.name)
    if (originalPokemonData.types[1] !== undefined && originalPokemonData.types.length > 0) {
        originalPokemonType.push(originalPokemonData.types[1].type.name)
    }

    return {
        originalPokemon: {
            name: originalPokemonData.name,
            sprite: originalPokemonData.sprites.front_default,
            id: originalPokemonData.id,
            type: originalPokemonType,
            hp: originalPokemonData.stats[0].base_stat,
            attack: originalPokemonData.stats[1].base_stat,
            defense: originalPokemonData.stats[2].base_stat,
            specialAttack: originalPokemonData.stats[3].base_stat,
            specialDefense: originalPokemonData.stats[4].base_stat,
            speed: originalPokemonData.stats[5].base_stat,
            color: pokemonColor
        },
        evolutionChain: {
            pokemons: evolutionReturnedData
        }
    }
}