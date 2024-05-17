import {useState, useEffect} from 'react'

export const Header = (props) => {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    function formatTime(){
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const meridiem = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        return `${padZero(hours)}:${padZero(minutes)} ${meridiem}`;

        function padZero(number){
            return (number < 10 ? "0" : "") + number;
        }
    }
 
    return(
        <>
            <div className="header">
                <p>{props.location}</p>
                <p>{formatTime()}</p>
            </div>
        </>
    );
}