import React from "react";
import './LogIn.scss'
import {ReactComponent as KeyIcon} from "../../assets/key.svg";
import {ReactComponent as UserIcon} from "../../assets/user.svg";

const LogIn = () => {

    return (
        <div className="wrapper">
            <form action="" className="form-login">
                <h1 className="form-heading">Login</h1>
                <div className="form-group">
                    <UserIcon className="form-user-icon"/>
                    <input type="text" className="form-input" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <KeyIcon className="form-user-icon"></KeyIcon>
                    <input type="password" className="form-input" placeholder="Password"/>
                        <div id="eye">
                            <i className="far fa-eye"/>
                        </div>
                </div>
                <input type="submit" value="Log In" className="form-submit"/>
            </form>
        </div>
    )
}

export default LogIn;