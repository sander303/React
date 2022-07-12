import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <Nav fill variant="tabs" defaultActiveKey="/">
            <Nav.Item>
                <Nav.Link as={Link} to="/itinerary">ITINERARY</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/overall">OVERALL</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/stages">STAGES</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/splits">SPLITS</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default Navigation;