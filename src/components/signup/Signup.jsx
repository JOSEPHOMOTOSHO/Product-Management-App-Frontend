import React, { useState } from "react";
import "./signup.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";

async function postData({
  userName,
  email,
  phone,
  address,
  password,
  location,
}) {
  console.log("going");
  const result = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/users/register`,
    data: { userName, email, phoneNumber: phone, location, address, password },
  });
  console.log(result);
  return result.data;
}

export const Signup = ({ show, setShow }) => {
  console.log(
    process.env.REACT_APP_GOOGLE_API_KEY,
    "key",
    process.env.REACT_APP_BASE_URL,
    "LOP"
  );
  const [apiKey, setAPiKey] = useState(process.env.REACT_APP_GOOGLE_API_KEY);
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [coord, setCoord] = useState();

  async function addNewProduct() {
    try {
      console.log("hello");
      const result = await postData({
        userName: name,
        email,
        phone,
        location: [coord.lng, coord.lat],
        address,
        password,
      });
      console.log(result);
      setSuccess(true);
    } catch (error) {
      console.log(error, "error", coord);
      setError(true);
    }
  }

  async function getCoordinate(address) {
    try {
      setAddress(address);
      const result = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address,
            key: process.env.REACT_APP_GOOGLE_API_KEY,
          },
        }
      );
      let coordinate = result.data.results[0].geometry.location;
      setCoord(coordinate);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {show && (
        <div className="body">
          <div className="login-box">
            <h2>SIGN UP</h2>
            {error && (
              <h4 style={{ color: "red" }}>Incorrect sign up details</h4>
            )}
            {success && (
              <h4 style={{ color: "green" }}>
                Registration successful you can now login{" "}
                <u
                  style={{ cursor: "pointer" }}
                  onClick={() => history("/login")}
                >
                  here
                </u>
              </h4>
            )}
            <form>
              <div className="user-box">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(false);
                  }}
                />
                <label>Username</label>
              </div>
              <div className="user-box">
                <input
                  type="text"
                  email
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(false);
                  }}
                />
                <label>Email</label>
              </div>
              <div className="user-box">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError(false);
                  }}
                />
                <label>Phone number</label>
              </div>
              <div className="user-box">
                <Autocomplete
                  type="text"
                  apiKey={apiKey}
                  onPlaceSelected={(place) =>
                    getCoordinate(place.formatted_address)
                  }
                />
                <label>Address</label>
              </div>
              <div className="user-box">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                />
                <label>Password</label>
              </div>
              <a href="#" onClick={addNewProduct}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </a>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
