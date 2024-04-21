import React from 'react';
import classes from './Button.module.css'

export const Button = ({ children, execute }) => (
    <button className={classes['custom-button']} onClick={execute}>
        <p>Button</p>
    </button>
);

