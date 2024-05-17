import {useState, useEffect} from 'react';

export const Photo = (props) =>{

    
    return(
        <>
            <div className="current-weather">
                <div className="day-of-week">
                    <p>{props.date}</p>
                </div>
                <div className="photo-box">
                    <img src={props.img} alt="photo" />
                </div>
                <p className="current-temp">{props.temp}°</p>
            </div>
        </>
    );
}