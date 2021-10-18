import carsFromJSON from "./cars.json"

export interface Car {
    name: string;
    pricePerDay: number;
    "seats": number;
    "doors": number;
    "image": string;
}

export const CARS: Car[] = carsFromJSON;