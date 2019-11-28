export class CustomerData {
    constructor(name: string,
                streetName: string,
                houseNumber: number,
                postalCode: number,
                city: string,
                phoneNumber: number) {
        return {
            name: name,
            address: {
                streetName: streetName,
                houseNumber: houseNumber,
                postalCode: postalCode,
                city: city
            },
            phoneNumber: phoneNumber
        }
    }

}