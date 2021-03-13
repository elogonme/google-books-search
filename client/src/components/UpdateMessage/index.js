import React from "react";
import "./style.css"
import { Message, Transition } from 'semantic-ui-react';

const UpdateMessage = (props) => {
    const { isVisible, favorite } = props.savedUpdate;
    return (
        <Transition.Group animation='slide right' duration={500}>
                {isVisible && 
                    <div>
                        <Message
                            className='update-message'
                            positive
                            icon='heart'
                            header='New book saved!'
                            content={`${favorite.title} by ${favorite.authors}`}
                        />
                    </div>}
            </Transition.Group>
)}

export default UpdateMessage;
