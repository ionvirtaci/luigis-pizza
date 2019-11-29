import {Box, Button, Container, TextField} from "@material-ui/core";
import React from "react";
import useForm from "react-hook-form";

interface PaymentFormModel {
    cardNumber: string,
    expirationDate: string,
    securityCode: string
}

// TODO: add validation; pass value to parent
export const PaymentForm: React.FC = (props) => {

    // INIT

    const {register, handleSubmit, errors} = useForm({
        mode: "onChange"
    });

    // API

    const onSubmit = (formData: any) => {
        console.log(formData);
    };

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="row" flexWrap="wrap">
                    {/* Card number */}
                    <Box width={1} mt={2} mb={2}>
                        <TextField name="cardNumber"
                                   label="Card number"
                                   inputRef={register({required: true})}
                                   aria-describedby="card number"
                                   error={errors.name !== undefined}
                                   helperText={errors.name ? 'You must specify a card number' : ''}
                                   fullWidth/>
                    </Box>
                    {/* Expiration date*/}
                    <Box width={1 / 2} pr={1}>
                        <TextField name="expirationDate"
                                   label="Expiration date"
                                   inputRef={register({required: true})}
                                   aria-describedby="expiration date"
                                   error={errors.name !== undefined}
                                   helperText={errors.name ? 'You must specify an expiration date' : ''}
                                   fullWidth/>
                    </Box>
                    {/* Security code */}
                    <Box width={1 / 2} pl={1}>
                        <TextField name="securityCode"
                                   label="Security code"
                                   inputRef={register({required: true})}
                                   aria-describedby="security code"
                                   error={errors.name !== undefined}
                                   helperText={errors.name ? 'You must specify a security code' : ''}
                                   fullWidth/>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="center" mt={4}>
                    <Button variant="contained" type="submit">Pay</Button>
                </Box>
            </form>
        </Container>
    );
};
