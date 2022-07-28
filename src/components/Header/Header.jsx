import React from 'react'
import './header.css'
import { IoLocationSharp, IoCall } from "react-icons/io5";

export const Header = () => {
    return (
        <div className="main-header">
            <div className="header-logo">Trade Depot</div>
            <div className="header-details">
                {/* <div className="address">
                    <div className="address-icon"><IoLocationSharp/></div>
                    <div className="address-text">No. 21 OLATILEWA STREET, SURULERE, LAGOS </div>
                </div> */}
                {/* <div className="phone">
                    <div className="phone-icon"><IoCall/></div>
                    <div className="phone-text">PHONE <br/><span className="number">070-6428-6583</span></div>
                </div> */}
                {/* <div className="service">
                    <div className="service-text">SERVICE <span className="service-number">070-6428-6583</span> </div>
                    <div className="service-text">PARTS <span className="service-number">070-6428-6583</span> </div>
                </div> */}
            </div>
        </div>
    )
}
