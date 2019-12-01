import React from "react";
import {Box, Container, CssBaseline, Step, StepLabel, Stepper} from "@material-ui/core";
import JSONPretty from 'react-json-pretty';

import './App.css';
import {CustomerForm} from "./Forms/customer-form";
import {Customer} from "./Model/customer";
import {PizzaForm} from "./Forms/pizza-form";
import {getPizzaPriceTotal, Pizza} from "./Model/pizza";
import {PaymentForm} from "./Forms/payment-form";
import {Card} from "./Model/card";

const App: React.FC = () => {
    const steps = ['You', 'Your pizza', 'Your card', 'All done'];
    const [activeStep, setActiveStep] = React.useState(0);
    const [customer, setCustomer] = React.useState({});
    const [pizza, setPizza] = React.useState({});
    const [card, setCard] = React.useState({});

    const handleCustomerFormSubmit = (customer: Customer) => {
        setActiveStep(1);
        setCustomer(customer);
    };

    const handlePizzaFormSubmit = (pizza: Pizza) => {
        setActiveStep(2);
        setPizza(pizza);
    };

    const handlePaymentFormSubmit = (card: Card) => {
        setActiveStep(3);
        setCard(card);
    };

    const makePayload = () => {
        const pizzaCopy = pizza as Pizza;
        return {
            customer: customer,
            pizza: pizza,
            billing: Object.assign({}, card, {price: getPizzaPriceTotal(pizzaCopy)})
        };
    };

    const renderCurrentStep = (stepIdx: number) => {
        switch (stepIdx) {
            case 0:
                return <CustomerForm onCustomerFormSubmit={handleCustomerFormSubmit}/>;
            case 1:
                return <PizzaForm onPizzaFormSubmit={handlePizzaFormSubmit}/>;
            case 2:
                return <PaymentForm onPaymentFormSubmit={handlePaymentFormSubmit}/>;
            case 3:
                return (
                    <Box>
                        <p>Order submitted:</p>
                        <JSONPretty data={makePayload()}/>
                    </Box>
                );
            default:
                return <CustomerForm onCustomerFormSubmit={handleCustomerFormSubmit}/>;
        }
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="sm">
                <Box display="flex" flexDirection="column" justifyContent="center" style={{height: '100vh'}}>
                    <Box style={{backgroundColor: '#eeeeee'}}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Box p={4}>
                            {renderCurrentStep(activeStep)}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default App;
