import React, {useState} from "react";
import classes from './Modal.module.css'

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return (
        <div className={classes['modal-overlay']}>
            <div className={classes.modal}>
                <button className={classes['close-button']} onClick={onClose}>X</button>
                <div className={classes['modal-content']}>
                    {children}
                </div>
            </div>
        </div>
    )
}