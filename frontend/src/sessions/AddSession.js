import React, {useCallback, useContext, useEffect, useState} from "react"
import classes from './AddSession.module.css'
import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import { faUser, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";

const AddSession = () => {
    return ( 
    <div className={classes["grid-container"]}>
            <Header/>
            <SideBar/>
            <main className={classes.content}>
                <form className={classes["session-container"]} onSubmit="">
                    <h2>Add Session</h2>
                    <div className={classes["readinput-container"]}>
                                <div className={classes["input-icon"]}>          
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                    <div className={classes["divider"]}></div>
                                    <input type="text" name="tutor" placeholder="tutor" value="" readOnly={true} className={classes["input-container-input"]} />
                    </div>

                    <div className={classes["readinput-container"]}>
                            <div className={classes["input-icon"]}>          
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                                <div className={classes["divider"]}></div>
                                <input type="text" name="student" placeholder="student"  value="" readOnly={true} className={classes["input-container-input"]} />
                    </div>

                    <div className={classes["readinput-container"]}>
                                <div className={classes["input-icon"]}>          
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                    <div className={classes["divider"]}></div>
                                    <input type="text" name="subject" placeholder="subject"  value="" readOnly={true} className={classes["input-container-input"]}/>                          
                    </div>

                    <div className={classes["readinput-container"]}>
                                <div className={classes["input-icon"]}>          
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                    <div className={classes["divider"]}></div>
                                    <input type="text" name="location" placeholder="location" value="" readOnly={true} className={classes["input-container-input"]}/>
                    </div>

                    <div className={classes["dateContainer"]}>
                            <div className={classes["icContainer"]}>
                                <FontAwesomeIcon icon={faBirthdayCake} />
                            </div>
                            <div className={classes["inputGroup"]}>
                                <input type="date" name="birthDate"  value="" />          
                            </div>
                    </div>

                    <div className={classes["input-container"]}>
                                <div className={classes["input-icon"]}>          
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                    <div className={classes["divider"]}></div>
                                    <input type="text" name="duration" placeholder="duration" value="" className={classes["input-container-input"]} />
                                   
                    </div>

                    <div className={classes["readinput-container"]}>
                                <div className={classes["input-icon"]}>          
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                    <div className={classes["divider"]}></div>
                                    <input type="text" name="topic" placeholder="topic" value="" readOnly={true} className={classes["input-container-input"]}/>                              
                    </div>

                    <div className={classes["input-container"]}>
                                <div className={classes["input-icon"]}>          
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                    <div className={classes["divider"]}></div>
                                    <input type="text" name="rate" placeholder="rate" value="" className={classes["input-container-input"]} />
                    </div>

                    <div className={classes["readinput-container"]}>
                                <div className={classes["input-icon"]}>          
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                    <div className={classes["divider"]}></div>
                                    <input type="text" name="service" placeholder="service" value="" readOnly={true} className={classes["input-container-input"]}/>                   
                    </div>

                    <div className={classes["button-container"]}>
                        <button className={classes["submit-button"]}>Submit</button>
                    </div>
                </form>
            </main>
        </div>
    );
}
 
export default AddSession;