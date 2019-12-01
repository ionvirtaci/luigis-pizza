import React from "react";
import {Box, Button, Container, TextField} from "@material-ui/core";
import useForm from "react-hook-form";
import {Customer} from "../Model/customer";

interface CustomerFormProps {
    onCustomerFormSubmit: Function
}

export const CustomerForm: React.FC<CustomerFormProps> = (props: CustomerFormProps) => {

    // INIT
    const {register, handleSubmit, formState, errors} = useForm({
        mode: 'onBlur'
    });

    // API

    const onSubmit = (data: any) => {
        const customerData: Customer = new Customer(
            data.name,
            data.streetName,
            data.houseNumber,
            data.postalCode,
            data.city,
            data.phoneNumber);
        props.onCustomerFormSubmit(customerData);
    };

    // RENDER

    // TODO consider rewriting this in a more compact form; 90% of below is boilerplate
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="row" flexWrap="wrap" mt={4} mb={4}>
                    <Box width={1} mb={2}>
                        <TextField name="name"
                                   label="Full name"
                                   inputRef={register({required: true})}
                                   aria-describedby="name"
                                   error={errors.name !== undefined}
                                   helperText={errors.name ? 'You must specify a name' : ''}
                                   fullWidth/>
                    </Box>
                    <Box width={1 / 2} pr={1} mb={2}>
                        <TextField name="streetName"
                                   label="Street Name"
                                   inputRef={register({required: true})}
                                   aria-describedby="street name"
                                   error={errors.streetName !== undefined}
                                   helperText={errors.streetName ? 'You must specify your street name' : undefined}
                                   fullWidth/>
                    </Box>
                    <Box width={1 / 2} pl={1} mb={2}>
                        <TextField name="houseNumber"
                                   label="House Number"
                                   inputRef={register({required: true})}
                                   aria-describedby="house number"
                                   error={errors.houseNumber !== undefined}
                                   helperText={errors.houseNumber ? 'You must specify your house number' : ''}
                                   fullWidth/>
                    </Box>
                    <Box width={1 / 2} pr={1} mb={2}>
                        <TextField name="postalCode"
                                   label="Postal Code"
                                   inputRef={register({required: true})}
                                   aria-describedby="postal code"
                                   error={errors.postalCode !== undefined}
                                   helperText={errors.postalCode ? 'You must specify your postal code' : ''}
                                   fullWidth/>
                    </Box>
                    <Box width={1 / 2} pl={1} mb={2}>
                        <TextField name="city"
                                   label="City"
                                   inputRef={register({required: true})}
                                   aria-describedby="city"
                                   error={errors.city !== undefined}
                                   helperText={errors.city ? 'You must specify your city' : ''}
                                   fullWidth/>
                    </Box>
                    <Box width={1} mb={2}>
                        <TextField name="phoneNumber"
                                   label="Phone number"
                                   inputRef={register({required: true})}
                                   aria-describedby="phone number"
                                   error={errors.phoneNumber !== undefined}
                                   helperText={errors.phoneNumber ? 'You must specify your phone number' : ''}
                                   fullWidth/>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="center">
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={!formState.isValid}>
                        Next
                    </Button>
                </Box>
            </form>
        </Container>

    );
};