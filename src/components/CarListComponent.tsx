import { CarListItemComponent } from "./CarListItemComponent";
import { Car, CARS } from "../data/Car";
import React, { useEffect, useState } from "react";

export const CarListComponent = () => {
    const [carListData, setCarListInitial] = useState(CARS);
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
            const index= carListData.indexOf(carToEdit);
            setCarListInitial(currCars => [...currCars.splice(1,index),carToEdit,...currCars.splice(index+1)]);
        }
    }

    const deleteCar = (e: React.MouseEvent<HTMLButtonElement>, carName: string) => {
        const carToDelete = carListData.findIndex(car => car.name===carName);
        const carList = [...carListData];

        if(carToDelete!==-1) {
            carList.splice(carToDelete,1);
            setCarListInitial(carList);
        }
    }

    return(
        <div className="main">
            <div className="searchBox">
                <form className="searchForm" onSubmit={(e) => handleSearch(e)}>
                    <input type="text" id="searchFormInput" placeholder="Provide search criteria"/>
                    <button type="submit">Submit</button>
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

