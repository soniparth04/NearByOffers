import React from "react";
import Food from "../../../assets/Home/food.png"
import Property from "../../../assets/Home/property.png"
import Vehicles from "../../../assets/Home/vehicle.png"
import Salon from "../../../assets/Home/salon.png"
import ViewAll from "../../../assets/Home/viewall.png"

const Category = () => {
    return (
        <div className="category flex justify-between m-4">
            <div className="items-center flex flex-col">
                <img src={Food} alt="food" className="w-14" />
            </div>
            <div className="flex flex-col items-center">
                <img src={Property} alt="property" className="w-14 " />
            </div>
            <div className="flex flex-col items-center">
                <img src={Vehicles} alt="vehicle" className="w-14  " />
            </div>
            <div className="flex flex-col items-center">
               <img src={Salon} alt="salon" className="w-14  mt-2 " />
            </div>
            <div className="flex flex-col items-center">
            <img src={ViewAll} alt="viewall" className="w-14" />
            </div>
        </div>
    );
};

export default Category;