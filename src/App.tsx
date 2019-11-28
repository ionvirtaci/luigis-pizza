import React from "react";
import {Box, Container, CssBaseline, Step, StepLabel, Stepper} from "@material-ui/core";

import './App.css';
import {CustomerForm} from "./Forms/customer-form";
import {CustomerData} from "./Model/customer";
import {PizzaForm} from "./Forms/pizza-form";
import {Pizza} from "./Model/pizza";

const App: React.FC = () => {
    const steps = ['You', 'Your pizza', 'Your card'];
    const [activeStep, setActiveStep] = React.useState(0);

    const handleCustomerFormSubmit = (customerData: CustomerData) => {
        setActiveStep(1);
        // TODO set state
    };

    const handlePizzaFormSubmit = (pizza: Pizza) => {
        setActiveStep(2);
        // TODO set state
    };

    const renderCurrentStep = (stepIdx: number) => {
        switch (stepIdx) {
            case 0:
                return <CustomerForm onCustomerFormSubmit={handleCustomerFormSubmit}/>;
            case 1:
                return <PizzaForm onPizzaFormSubmit={handlePizzaFormSubmit}/>;
            case 2:
                return <p>WIP</p>;
            default:
                return <CustomerForm onCustomerFormSubmit={handleCustomerFormSubmit}/>;
        }
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="sm">
                <Box display="flex" flexDirection="column" justifyContent="center" style={{height: '100vh'}}>
                    <Box style={{backgroundColor: '#eeeeee', height: '560px'}}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {renderCurrentStep(activeStep)}
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default App;
