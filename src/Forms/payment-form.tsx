import React from "react";
import useForm from "react-hook-form";
import {Box, Button, Container, TextField} from "@material-ui/core";
import * as valid from 'card-validator';

import {Card} from "../Model/card";

interface PaymentFormProps {
    onPaymentFormSubmit: Function
}

export const PaymentForm: React.FC<PaymentFormProps> = (props: PaymentFormProps) => {

    // INIT

    const {register, handleSubmit, errors, formState} = useForm({
        mode: 'onBlur'
    });

    // API

    const onSubmit = (formData: any) => {
        props.onPaymentFormSubmit(formData as Card);
    };

    const isCardNumberValid = (cardNumber: string) => {
        return valid.number(cardNumber).isValid;
    };

    const isExpirationDateValid = (expirationDate: string) => {
        return valid.expirationDate(expirationDate).isValid;
    };

    const isSecurityCodeValid = (cvv: string) => {
        return valid.cvv(cvv).isValid;
    };

    // RENDER

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="row" flexWrap="wrap" mb={4}>
                    {/* Card number */}
                    <Box width={1} mt={2} mb={2}>
                        <TextField name="cardNumber"
                                   label="Card number"
                                   inputRef={register({
                                       validate: cNumber => isCardNumberValid(cNumber)
                                   })}
                                   error={errors.cardNumber !== undefined}
                                   helperText={errors.cardNumber ? 'Card number is invalid' : ''}
                                   aria-describedby="card number"
                                   fullWidth/>
                    </Box>
                    {/* Expiration date (should be replaced by a more UX-friendly solution) */}
                    <Box width={1 / 2} pr={1}>
                        <TextField name="expirationDate"
                                   label="Expiration date (e.g. MM/YY)"
                                   inputRef={register({
                                       validate: expiration => isExpirationDateValid(expiration)
                                   })}
                                   error={errors.expirationDate !== undefined}
                                   helperText={errors.expirationDate ? 'Card expiration date is invalid' : ''}
                                   aria-describedby="expiration date"
                                   fullWidth/>
                    </Box>
                    {/* Security code */}
                    <Box width={1 / 2} pl={1}>
                        <TextField name="cvv"
                                   label="CVV"
                                   inputRef={register({
                                       validate: cvv => isSecurityCodeValid(cvv)
                                   })}
                                   error={errors.cvv !== undefined}
                                   helperText={errors.cvv ? 'Security code is invalid' : ''}
                                   aria-describedby="security code"
                                   fullWidth/>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="center">
                    <Button variant="contained"
                            type="submit"
                            disabled={!formState.isValid}>
                        Pay
                    </Button>
                </Box>
            </form>
        </Container>
    );
};
