import PokemonList from "../pokemon/PokemonList";
import { Row, Col } from "reactstrap";

const Dashboard = () => {
    return (
        <Row>
            <Col>
                <PokemonList />
            </Col>
        </Row>
    );
};

export default Dashboard;
