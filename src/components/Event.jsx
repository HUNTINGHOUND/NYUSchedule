import React from 'react';

const Event = props => {
    return (
        <div className="calendar-event" style={{background: props.color}}>
            <span>{`${props.start.format('HH:mm')} - ${props.end.format('HH:mm')}`}</span>
            <br />
            <div>{props.value}</div>
        </div>
    )
}

export default Event;