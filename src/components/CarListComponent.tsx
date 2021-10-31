import { CarListItemComponent } from "./CarListItemComponent";
import { Car, CARS } from "../data/Car";
import React, { useEffect, useState } from "react";
import "../css/CarItemCss.css";

export const CarListComponent = () => {
    const [carListData, setCarListData] = useState(CARS);
    const [searchVal, setSearchVal] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputVal = (e.currentTarget.elements.item(0) as HTMLInputElement).value;
        if(inputVal) {
            setSearchVal(inputVal);  
        }
        else {
            setSearchVal("");
        }
    }

    const editCar = (e: React.MouseEvent<HTMLButtonElement>, carName: string, newPrice: number) => {
        let carToEdit = carListData.find(car => car.name===carName) as Car;

        if(carToEdit) {
            carToEdit.pricePerDay = newPrice;
            setCarListData(carListData.map(car => (car.name!==carName)? car : carToEdit));
        }
    }

    const deleteCar = (e: React.MouseEvent<HTMLButtonElement>, carName: string) => {
        setCarListData(carListData.filter(car => car.name!==carName));
    }

    return(
        <div className="main">
            <div className="searchBox">
                <form className="searchForm" onSubmit={(e) => handleSearch(e)}>
                    <input type="text" id="searchFormInput" placeholder="Provide search criteria"/>
                    <button className="buttonStyle" type="submit">Submit</button>
                </form>
            </div>
            <div>
                {carListData
                    .filter(car => car.name.toLowerCase().includes(searchVal.toLowerCase()))
                    .map(car => <CarListItemComponent carData={car} deleteCar={deleteCar} changePrice={editCar}/>)}    
            </div>
        </div>
    )
}

