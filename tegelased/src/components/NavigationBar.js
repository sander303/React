import { Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function NavigationBar() {

    const { t, i18n } = useTranslation();

    const onChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem("language", language);
    }


    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">{t("navbar.home-button")}</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/valitud-tegelased">{t("navbar.selected-chars-button")}</Nav.Link>
                    <Nav.Link as={Link} to="/lisa-tegelane">{t("navbar.add-char-button")}</Nav.Link>
                    <Nav.Link as={Link} to="/autod">{t("navbar.cars-button")}</Nav.Link>                   
                </Nav>
                <div className="lang">
                    <Nav.Link onClick={() => onChangeLanguage('ee')}>EST</Nav.Link>
                    <Nav.Link onClick={() => onChangeLanguage('en')}>ENG</Nav.Link>
                </div>
            </Container>
      </Navbar>
      
    );
}

export default NavigationBar;