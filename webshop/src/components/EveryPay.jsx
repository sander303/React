import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function EveryPay(props) {

    const { t } = useTranslation();

    const everyPay = () => {
        const paymentDetails = {
            "api_username": "92ddcfab96e34a5f",
            "account_name": "EUR3D1",
            "amount": props.totalPrice(),
            "order_reference": Math.floor(Math.random()*899999+100000),
            "nonce": "a9bgt902" + new Date() + Math.floor(Math.random()*899999+100000),
            "timestamp": new Date(),
            "customer_url": "https://react-webshop-1.web.app/"
            }
            fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
                method: "POST",
                body: JSON.stringify(paymentDetails),
                headers: {
                    "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
                .then(body => window.location.href = body.payment_link);
    }

    return (
        <div>
            <Button className="sideBarItems" variant="dark" onClick={() => everyPay()}>{t("cart.pay")}</Button>
        </div>
    );
}

export default EveryPay;