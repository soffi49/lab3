import React, { MouseEventHandler, useState } from "react";
import { Car } from "../data/Car";
import "../css/CarItemCss.css";

interface CarProps {
    carData: Car
    deleteCar: (e: React.MouseEvent<HTMLButtonElement>, carName: string) => void
    changePrice: (e: React.MouseEvent<HTMLButtonElement>, carName: string, newPrice: number) => void
}

export const CarListItemComponent: React.FC<CarProps> = ({carData, deleteCar, changePrice}) => {
    const [editState, setEditState] = useState(false);

    const editCar = () => {
        setEditState(true);
    }

    const getPriceInputValue = () => {
        return Number((document.getElementById('priceInput') as HTMLInputElement).value);
    }

    const submitEdit = (e: React.MouseEvent<HTMLButtonElement>, carName: string, newPrice: number) => {
        changePrice(e,carName,newPrice);
        setEditState(false);
    }

    return( 
        <div className="carListItemComponent">
            <div className="carInformation">
                <div className="carImage"><img src={carData.image} alt={carData.name + " car image"}/></div>
                <h2 className="carName">{carData.name}</h2>
                <div className="carDetails">
                    <p>{carData.seats} seats</p>
                    <p>{carData.doors} doors</p>
                    <p>{carData.AC ? "air conditioning" : "no air conditioning"}</p>
                </div>
            </div>
            <div className="carPriceBox">
                <h5>Price per day</h5>
                {(editState)? <input id="priceInput" type="number" defaultValue={carData.pricePerDay} required/>
                     : <h2>{carData.pricePerDay} PLN</h2>}
                <div className="carButtonBox">
                    {(editState)? <button className="buttonStyle" onClick={(e)=>submitEdit(e,carData.name,getPriceInputValue())}>Save Edit</button>
                                    : <button className="buttonStyle" onClick={editCar}>Edit</button>}
                    <button className="buttonStyle" onClick={(e)=>deleteCar(e,carData.name)}>Delete</button>
                </div>
            </div>
        </div>
    )
}