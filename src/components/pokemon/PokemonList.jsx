import { useEffect, useState } from "react";
import { Row } from "reactstrap";
import PokemonCard from "./PokemonCard";
import axios from "axios";

const PokemonList = () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        axios.get(url).then((res) => {
            setPokemon(res.data.results);
            console.log(pokemon)
        });
    }, []);

    return (
        <Row>
            {pokemon && pokemon.map((pokemon) => <PokemonCard key={pokemon.name} pokemon={pokemon} />)}
            {!pokemon && (
                <h1>
                    ...Loading
                </h1>
            )}
        </Row>
    );
};

export default PokemonList;
