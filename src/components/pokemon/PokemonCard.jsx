import { Card, CardBody, Spinner, CardText, CardTitle, Col } from "reactstrap";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Sprite = styled.img`
    width: 5em;
    height: 5em;
    display: none;
`;

const Pokemon = styled(Card)`
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgb(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
    }
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

const PokemonCard = ({ pokemon }) => {
    const [name, setName] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [pokemonIndex, setPokemonIndex] = useState();
    const [imgLoading, setImgLoading] = useState(true);
    const [toManyRequests, setToManyRequests] = useState(false);

    useEffect(() => {
        const { name, url } = pokemon;
        const capName = name
            .toLowerCase()
            .split(" ")
            .map(
                (letter) =>
                    letter.charAt(0).toUpperCase() + letter.substring(1),
            );

        axios.get(url).then((res) => {
            setImgUrl(res.data.sprites.front_default);
            setPokemonIndex(res.data.order);
        });
        setName(capName);
    }, []);

    return (
        <Col sm="6" md="3" className="mb-5">
            <StyledLink to={`pokemon/${pokemonIndex}`}>
                <Pokemon>
                    <CardBody>
                        <CardTitle className="card-header">
                            <h5>{pokemonIndex}</h5>
                        </CardTitle>

                        {imgLoading && (
                            <Spinner color="primary">
                                Loading...
                            </Spinner>
                        )}
                        <Sprite
                            className="card-img-top rounded mx-auto mt-2"
                            src={imgUrl}
                            onLoad={() => setImgLoading(false)}
                            onError={() => setToManyRequests(true)}
                            style={
                                toManyRequests
                                    ? { display: "none" }
                                    : imgLoading
                                    ? null
                                    : { display: "block" }
                            }
                        />
                        {toManyRequests && (
                            <h6>
                                <span className="badge text-bg-danger mt-2">
                                    To Many Requests
                                </span>
                            </h6>
                        )}
                        <CardText>{name}</CardText>
                    </CardBody>
                </Pokemon>
            </StyledLink>
        </Col>
    );
};

export default PokemonCard;
