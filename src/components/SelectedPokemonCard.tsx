import React, {FunctionComponent, useEffect, useState, useContext} from 'react';

import { Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PokemonContext } from './PokemonProvider';

import { Link } from "react-router-dom";

import { fetchPokemonData } from '../utils/utils';
import {IPokemonData} from '../types/types';

import '../styles/SelectedPokemon.css'

const SelectedPokemonCard:FunctionComponent = () => {
    const [completePokemonData, setCompletePokemonData] = useContext<any>(PokemonContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (completePokemonData !== undefined) {
            setIsLoading(false)
        }
    }, [completePokemonData])

    
    const fetchCompletePokemonDataForId = async (id: string) => {
        const pokemonData = await fetchPokemonData(id);
        setCompletePokemonData(pokemonData);
    }
    
    const onClickHandler = async (id: string) => {
        await fetchCompletePokemonDataForId(id);
    }
    
    return (
        <>
            <div>
            {isLoading ? <div data-test="selectedPokemonCardLoaderContainer" className='selectedPokemonCardLoaderContainer'> <CircularProgress  /> </div> : 
            <>
            <Card style={{backgroundColor: completePokemonData.originalPokemon.color}}  className='selected_pokemon_container_opacityDiv'></Card>
        <div data-test="selected_pokemon_container" className='selected_pokemon_container'>
                {
                    completePokemonData !== undefined && (
                        <>
                            <div className='name_image_container'>
                            <Typography component="div" variant="h4" data-test="selected_pokemon_id" className='selected_pokemon_id'>#{completePokemonData.originalPokemon.id}</Typography>
                            <Typography component="div" variant="h4" data-test="selected_pokemon_name" className='selected_pokemon_name'>{completePokemonData.originalPokemon.name}</Typography>
                            <img className='selected_pokemon_image' src={completePokemonData.originalPokemon.sprite}/>
                            </div>
                            <div data-test="flex2Container" className='flex2Container'>
                                <Typography component="div" variant="h5" className='type'>Type</Typography>
                            <div data-test="type_container" className='type_container'>
                            {completePokemonData.originalPokemon.type?.map((type: string) =><Typography component="div" variant="subtitle1" className='selected_pokemon_type' key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</Typography>)}
                            </div>
                            <Typography component="div" variant="h5">Base Stats</Typography>
                            <div className='stats_container'>
                                <div className='statBox1'>
                                    <div>
                            <Typography component="div" variant="subtitle1">Hp</Typography>
                            <Typography data-test="hp_value" className='stat_value' component="div" variant="subtitle1">{completePokemonData.originalPokemon.hp}</Typography>
                                    </div>
                                    <div>
                            <Typography component="div" variant="subtitle1">Attack</Typography> 
                            <Typography data-test="attack_value" className='stat_value' component="div" variant="subtitle1">{completePokemonData.originalPokemon.attack}</Typography>
                            </div>
                            <div>
                            <Typography component="div" variant="subtitle1">Defense</Typography>
                            <Typography data-test="defense_value" className='stat_value' component="div" variant="subtitle1">{completePokemonData.originalPokemon.defense}</Typography>
                            </div>
                            <div>
                            <Typography component="div" variant="subtitle1">Speed</Typography>
                            <Typography data-test="speed_value" className='stat_value'  component="div" variant="subtitle1">{completePokemonData.originalPokemon.speed}</Typography>
                            </div>
                            
                            </div>
                            <div className='statBox2'>
                                <div>
                            <Typography component="div" variant="subtitle1">Special Defense</Typography> 
                            <Typography data-test="specialDefense_value" className='stat_value' component="div" variant="subtitle1">{completePokemonData.originalPokemon.specialDefense}</Typography>
                            </div>
                            <div>
                            <Typography component="div" variant="subtitle1">Special Attack</Typography>
                            <Typography data-test="specialAttack_value" className='stat_value' component="div" variant="subtitle1">{completePokemonData.originalPokemon.specialAttack}</Typography>
                            </div>
                            </div>
                            <Typography component="div" variant="h5">Evolutions</Typography>
                            <div data-test="evolution_chain" className='evolution_chain'>
            {
                completePokemonData !== undefined && completePokemonData?.evolutionChain.pokemons.length > 0 ? (
                    <>
                        {
                            completePokemonData.evolutionChain.pokemons.map((evolPokemon: IPokemonData) => (
                                <Link to={`/${evolPokemon.name}/${evolPokemon.id}`} data-test="evolution" className='evolution' onClick={() => onClickHandler(evolPokemon.id)} key={`evolusion_pokemon_${evolPokemon.id}`}>
                                    <img src={evolPokemon.sprite}/>
                                    <Typography component="div" variant="subtitle1">{evolPokemon.name}</Typography>
                                </Link>
                            ))
                        }
                    </>
                ) : null
            }
            </div>
                            </div>
                            </div>
                        </>
                    )
                }
        
        </div>
        </>
            }
        </div>
        </>
    );
}

export default SelectedPokemonCard;