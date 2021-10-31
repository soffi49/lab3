import React, { MouseEventHandler, useState } from "react";
import { Car } from "../data/Car";
import "../css/CarItemCss.css";

interface CarProps {
    carData: Car
    deleteCar: (e: React.MouseEvent<HTMLButtonElement>, carName: string) => void
    changePrice: (e: React.MouseEvent<HTMLButtonElement>, carName: string, newPrice: number) => void
}

const CarPriceEdit: React.FC<CarProps> = ({carData, deleteCar, changePrice: changePrice}) => {

    const getPriceInputValue = () => {
        return Number((document.getElementById('priceInput') as HTMLInputElement).value);
    }

    return(
        <div className="carPriceBox">
                <h6>Price per day</h6>
                <input id="priceInput" type="number" value={carData.pricePerDay}/>
                <div className="carButtonBox">
                    <button onClick={(e)=>changePrice(e,carData.name,getPriceInputValue())}>Save Edit</button>
                    <button onClick={(e)=>deleteCar(e,carData.name)}>Delete</button>
                </div>
        </div>
    )
}

export const CarListItemComponent: React.FC<CarProps> = ({carData, deleteCar, changePrice: changePrice}) => {
    const [editState, setEditState] = useState(false);

    const getPriceInputValue = () => {
        return Number((document.getElementById('priceInput') as HTMLInputElement).value);
    }

    const editCar = () => {
        setEditState(true);
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
                <h6>Price per day</h6>
                {(editState)? <input id="priceInput" type="number" defaultValue={carData.pricePerDay}/> : <h4>{carData.pricePerDay}</h4>}
                <div className="carButtonBox">
                    {(editState)? <button onClick={(e)=>submitEdit(e,carData.name,getPriceInputValue())}>Save Edit</button>
                                    : <button onClick={editCar}>Edit</button>}
                    <button onClick={(e)=>deleteCar(e,carData.name)}>Delete</button>
                </div>
        </div>
        </div>
    )
}