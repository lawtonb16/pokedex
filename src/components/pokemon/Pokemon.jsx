import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    CardHeader,
    Card,
    Col,
    Row,
    Badge,
    CardBody,
    CardText,
    Progress,
    CardTitle,
} from "reactstrap";

const Pokemon = () => {
    const TYPE_COLORS = {
        bug: "B1C12E",
        dark: "4F3A2D",
        dragon: "755EDF",
        electric: "FCBC17",
        fairy: "F4B1F4",
        fighting: "823551D",
        fire: "E73B0C",
        flying: "A3B3F7",
        ghost: "6060B2",
        grass: "74C236",
        ground: "D3B357",
        ice: "A3E7FD",
        normal: "C8C4BC",
        poison: "934594",
        psychic: "ED4882",
        rock: "B9A156",
        steel: "B5B5C3",
        water: "3295F6",
    };

    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [types, setTypes] = useState([]);
    const [stats, setStats] = useState({
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        specialAttack: "",
        specialDefense: "",
    });
    const [description, setDescription] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [eggGroups, setEggGroups] = useState();
    const [abilites, setAbilities] = useState([]);
    const [genderRatioMale, setGenderRatioMale] = useState();
    const [genderRatioFemale, setGenderRatioFemale] = useState();
    const [evs, setEvs] = useState();
    const [hatchSteps, setHatchSteps] = useState();
    const [catchRate, setCatchRate] = useState();

    const { pokemonId } = useParams();

    useEffect(() => {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;

        axios.get(pokemonSpeciesUrl).then((res) => {
            const description = res.data.flavor_text_entries.find((flavor) => {
                if (flavor.language.name === "en") {
                    return flavor.flavor_text;
                }
                return;
            }).flavor_text;
           
            setDescription(description);
            setGenderRatioFemale(res.data["gender_rate"] * 12.5);
            setGenderRatioMale((8 - res.data["gender_rate"]) * 12.5);
            setCatchRate(Math.round((100 / 255) * res.data["capture_rate"]));
            setEggGroups(
                res.data["egg_groups"]
                    .map((group) => {
                        return group.name
                            .toLowerCase()
                            .split("-")
                            .map(
                                (s) =>
                                    s.charAt(0).toUpperCase() + s.substring(1),
                            )
                            .join(" ");
                    })
                    .join(", "),
            );
            setHatchSteps(255 * (res.data["hatch_counter"] + 1));
        });

        axios.get(pokemonUrl).then((res) => {
            setName(res.data.name);

            setImageUrl(res.data.sprites.front_default);

            const types = res.data.types.map((type) => type.type.name);

            setTypes(types);

            const abilities = res.data.abilities
                .map((ability) => {
                    return ability.ability.name
                        .toLowerCase()
                        .split("-")
                        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ");
                })
                .join(", ");

            setAbilities(abilities);

            setEvs(
                res.data.stats
                    .filter((stat) => {
                        if (stat.effort > 0) {
                            return true;
                        }
                        return false;
                    })

                    .map((stat) => {
                        return `${stat.effort} ${stat.stat.name
                            .toLowerCase()
                            .split("-")
                            .map(
                                (s) =>
                                    s.charAt(0).toUpperCase() + s.substring(1),
                            )
                            .join(" ")}`;
                    })
                    .join(", "),
            );

            let [hp, attack, defense, speed, specialAttack, specialDefense] =
                "";

            res.data.stats.map((stat) => {
                switch (stat.stat.name) {
                    case "hp":
                        hp = stat["base_stat"];
                        break;
                    case "attack":
                        attack = stat["base_stat"];
                        break;
                    case "defense":
                        defense = stat["base_stat"];
                        break;
                    case "speed":
                        speed = stat["base_stat"];
                        break;
                    case "special-attack":
                        specialAttack = stat["base_stat"];
                        break;
                    case "special-defense":
                        specialDefense = stat["base_stat"];
                        break;
                }
            });

            setStats({
                ...stats,
                hp: hp,
                attack: attack,
                defense: defense,
                speed: speed,
                specialAttack: specialAttack,
                specialDefense: specialDefense,
            });

            // convert decimeters to ft...

            const height =
                Math.round((res.data.height * 0.328084 + 0.0001) * 100) / 100;
            setHeight(height);

            // convert hectograms to lbs

            const weight =
                Math.round((res.data.weight * 0.220462 + 0.0001) * 100) / 100;
            setWeight(weight);
        });
    }, []);

    return (
        <Col>
            <Card className="my-2">
                <CardHeader>
                    <Row>
                        <Col xs="5">
                            <h5>{pokemonId}</h5>
                        </Col>
                        <Col className="text-end">
                            {types.map((type) => (
                                <Badge
                                    style={{
                                        backgroundColor: `#${TYPE_COLORS[type]}`,
                                        color: "white",
                                    }}
                                    color=""
                                    pill
                                    key={type}
                                >
                                    {type
                                        .toLowerCase()
                                        .split("-")
                                        .map(
                                            (s) =>
                                                s.charAt(0).toUpperCase() +
                                                s.substring(1),
                                        )
                                        .join(" ")}
                                </Badge>
                            ))}
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row className="align-items-center">
                        <Col md="3">
                            <img
                                src={imageUrl}
                                className="card-img-top rounded mx-auto mt-2"
                            />
                        </Col>
                        <Col md="9">
                            <CardText tag="h4">
                                {name
                                    .toLowerCase()
                                    .split("-")
                                    .map(
                                        (s) =>
                                            s.charAt().toUpperCase() +
                                            s.substring(1),
                                    )
                                    .join(" ")}
                            </CardText>
                            <Row className="align-items-center">
                                <Col md="3">HP</Col>
                                <Col md="9">
                                    <Progress
                                        color="danger"
                                        value={stats.hp}
                                        max="255"
                                    >
                                        {stats.hp}
                                    </Progress>
                                </Col>
                                <Col md="3">Attack</Col>
                                <Col md="9">
                                    <Progress
                                        color="warning"
                                        value={stats.attack}
                                        max="255"
                                    >
                                        {stats.attack}
                                    </Progress>
                                </Col>
                                <Col md="3">Defense</Col>
                                <Col md="9">
                                    <Progress
                                        color="success"
                                        value={stats.defense}
                                        max="255"
                                    >
                                        {stats.defense}
                                    </Progress>
                                </Col>
                                <Col md="3">Speed</Col>
                                <Col md="9">
                                    <Progress
                                        color="info"
                                        value={stats.speed}
                                        max="255"
                                    >
                                        {stats.speed}
                                    </Progress>
                                </Col>
                                <Col md="3">Special Attack</Col>
                                <Col md="9">
                                    <Progress
                                        color="warning"
                                        value={stats.specialAttack}
                                        max="255"
                                    >
                                        {stats.specialAttack}
                                    </Progress>
                                </Col>
                                <Col md="3">Special Defense</Col>
                                <Col md="9">
                                    <Progress
                                        color="success"
                                        value={stats.specialDefense}
                                        max="255"
                                    >
                                        {stats.specialDefense}
                                    </Progress>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-1">
                        <Col>
                            <CardText className="p-2">{description}</CardText>
                        </Col>
                    </Row>
                </CardBody>
                <hr />
                <CardBody>
                    <CardTitle className="text-center" tag="h5">
                        Profile
                    </CardTitle>
                    <Row>
                        <Col md="6">
                            <Row>
                                <Col xs="6">
                                    <CardText tag="h6" className="text-end">
                                        Height:
                                    </CardText>
                                </Col>
                                <Col xs="6">
                                    <CardText tag="h6" className="text-start">
                                        {height} ft.
                                    </CardText>
                                </Col>

                                <Col xs="6">
                                    <CardText tag="h6" className="text-end">
                                        Weight:
                                    </CardText>
                                </Col>
                                <Col xs="6">
                                    <CardText tag="h6" className="text-start">
                                        {weight} lbs.
                                    </CardText>
                                </Col>

                                <Col xs="6">
                                    <CardText tag="h6" className="text-end">
                                        Catch Rate:
                                    </CardText>
                                </Col>
                                <Col xs="6">
                                    <CardText tag="h6" className="text-start">
                                        {catchRate} ft.
                                    </CardText>
                                </Col>

                                <Col xs="6">
                                    <CardText tag="h6" className="text-end">
                                        Gender Ratio:
                                    </CardText>
                                </Col>
                                <Col xs="6">
                                    <Progress multi>
                                        <Progress
                                            color="primary"
                                            bar
                                            value={genderRatioMale}
                                        >
                                            {genderRatioMale}
                                        </Progress>
                                        <Progress
                                            color="danger"
                                            bar
                                            value={genderRatioFemale}
                                        >
                                            {genderRatioFemale}
                                        </Progress>
                                    </Progress>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="6">
                            <Row>
                                <Col xs="6">
                                    <CardText tag="h6" className="text-end">
                                        Egg Groups:
                                    </CardText>
                                </Col>
                                <Col xs="6">
                                    <CardText tag="h6" className="text-start">
                                        {eggGroups}
                                    </CardText>
                                </Col>
                                <Col xs="6">
                                    <CardText tag="h6" className="text-end">
                                        Hatch Steps:
                                    </CardText>
                                </Col>
                                <Col xs="6">
                                    <CardText tag="h6" className="text-start">
                                        {hatchSteps}
                                    </CardText>
                                </Col>
                                <Col xs="6">
                                    <CardText tag="h6" className="text-end">
                                        Abilities:
                                    </CardText>
                                </Col>
                                <Col xs="6">
                                    <CardText tag="h6" className="text-start">
                                        {abilites}
                                    </CardText>
                                </Col>
                                <Col xs="6">
                                    <CardText tag="h6" className="text-end">
                                        Evs:
                                    </CardText>
                                </Col>
                                <Col xs="6">
                                    <CardText tag="h6" className="text-start">
                                        {evs}
                                    </CardText>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Pokemon;
