import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sumOfCartService } from '../store/sumOfCartService';
import { useState } from 'react';
import { useEffect } from 'react';

function NavigationBar() {

    const { t, i18n } = useTranslation();
    
    useEffect(() => {
        sumOfCartService.getCartSum().subscribe(sumOfCart => setCartSum(sumOfCart));
    }, [])

    const onChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem("language", language);
    }

    const getTotalPrice = () => {

        const cartProducts = JSON.parse(sessionStorage.getItem("cartProducts")) || [];
        let sumOfCart = 0;
        cartProducts.forEach(element => sumOfCart += (Number(element.product.price) * element.quantity));
        return sumOfCart;
    }

    const [cartSum, setCartSum] = useState(getTotalPrice());
    
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand as={Link} to="/"><img src={require('../assets/webshop.png')} alt="" /></Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/admin">{t("navbar.admin-button")}</Nav.Link>
                <Nav.Link as={Link} to="/cart">{t("navbar.cart-button")}({cartSum}€)</Nav.Link>  
                <Nav.Link as={Link} to="/poed">{t("navbar.shops-button")}</Nav.Link>  
                <Nav.Link as={Link} to="/meist">Meist</Nav.Link>  
                <div>{t('Welcome to React')}</div> 
                <img className="lang" onClick={() => onChangeLanguage('ee')} src={require('../assets/estonia.png')} alt="" />  
                <img className="lang" onClick={() => onChangeLanguage('en')} src={require('../assets/uk.png')} alt="" />
                <img className="lang" onClick={() => onChangeLanguage('fr')} src={require('../assets/france.png')} alt="" /> 
            </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;