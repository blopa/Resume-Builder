import React from 'react';
import {Link} from "react-router-dom";

export class Header extends React.Component {
    render() {
        return(
            <div className="nav-menu no-print">
                <ul>
                    <li>
                        <a href="#" className="nav-disabled">
                            <img className="logo" src="../logo.png" title="Made with squarespace.com"/>
                        </a>
                    </li>
                    <li>
                        <Link to="/">Home</Link> |
                    </li>
                    <li>
                        <Link to="/parser">Build a Resume</Link> |
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link> |
                    </li>
                </ul>
            </div>
        );
    }
}