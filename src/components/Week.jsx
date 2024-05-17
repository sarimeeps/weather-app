export const Week = (props) =>{
    return(
        <>
        <div className="week-container">
            <div className="weather-card">
                <p className="weekday">{props.date}</p>
                <img src={props.img} alt="photo" />
                <p className="weekday-temp">{props.temp}°</p>
            </div>
        </div>
        </>
    );
}