import React from "react";
import {
    Box,
    Button, Checkbox,
    Container,
    FormControl,
    FormControlLabel, FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    Typography
} from "@material-ui/core";
import {RHFInput} from "react-hook-form-input";
import useForm from "react-hook-form";

import {Toppings, PizzaSizes, Product, getProductPrice, Pizza} from "../Model/pizza";


interface PizzaFormProps {
    onPizzaFormSubmit: Function
}

interface PizzaFormModel {
    size?: string;
    olives?: boolean;
    pepperoni?: boolean;
    mushrooms?: boolean;
    pepper?: boolean;
}

export const PizzaForm: React.FC<PizzaFormProps> = (props) => {

    // INIT

    const {register, handleSubmit, watch, setValue, formState} = useForm({
        mode: "onChange"
    });
    const pizzaSizes = PizzaSizes
        , toppings = Toppings
        , getPrice = getProductPrice
        , watchAll = watch();

    // API

    const onSubmit = (formData: PizzaFormModel) => {
        const pizza = makePizzaFromFormData(formData);
        props.onPizzaFormSubmit(pizza);
    };

    const getTotalPrice = (formData: PizzaFormModel) => {
        if (!Object.keys(formData).length) {
            return 0;
        } else {
            const pizza = makePizzaFromFormData(formData);
            return getPizzaPriceTotal(pizza);
        }
    };

    // the best way to make a pizza is from form data
    const makePizzaFromFormData = (formData: PizzaFormModel) => {
        const size: Product = new Product('size', Number(formData.size));
        const pizzaToppings: Product[] = Object.keys(formData)
            .filter(key => {
                // filter out size or unselected toppings
                // @ts-ignore TODO: properly infer type to formData[key]
                return key !== 'size' && formData[key];
            })
            .map((key: string) => {
                const price = getPrice(key, toppings) as number;
                return new Product(key, price)
            });
        return new Pizza(size, pizzaToppings);
    };

    const getPizzaPriceTotal = (pizza: Pizza) => {
        const toppingsTotalPrice: number = pizza.toppings
            .map((topping: Product) => topping.price)
            .reduce((prevPrice: number, currPrice: number) => {
                return prevPrice + currPrice;
            }, 0);
        return pizza.size.price + toppingsTotalPrice;
    };

    // Render

    return (
        <Container>
            {/* Price */}
            <Box display="flex" flexDirection="row" justifyContent="flex-end" flexWrap="wrap" mt={4}>
                <Typography component="p">
                    Price: {getTotalPrice(watchAll)}
                </Typography>
            </Box>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="row" flexWrap="wrap" mt={4}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Size</FormLabel>
                        <RHFInput name="size"
                                  register={register}
                                  setValue={setValue}
                                  type="radio"
                                  as={
                                      <RadioGroup aria-label="size" defaultValue={pizzaSizes[0].price}>
                                          {
                                              pizzaSizes.map(
                                                  (size: Product) => {
                                                      return <FormControlLabel
                                                          key={size.label}
                                                          value={size.price.toString()}
                                                          control={<Radio/>}
                                                          label={`${size.label} (${size.price}$)`}
                                                      />;
                                                  })
                                          }
                                      </RadioGroup>
                                  }/>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Toppings</FormLabel>
                        <FormGroup>
                            {
                                toppings.map(
                                    (topping: Product) => {
                                        return <RHFInput
                                            key={topping.label}
                                            name={topping.label}
                                            setValue={setValue}
                                            register={register}
                                            type="checkbox"
                                            as={
                                                <FormControlLabel
                                                    control={<Checkbox/>}
                                                    label={`${topping.label} (${topping.price}$)`}
                                                />
                                            }/>
                                    })
                            }
                        </FormGroup>
                    </FormControl>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="center" mt={2}>
                    <Button variant="contained" type="submit">Next</Button>
                </Box>
            </form>
        </Container>
    );
};