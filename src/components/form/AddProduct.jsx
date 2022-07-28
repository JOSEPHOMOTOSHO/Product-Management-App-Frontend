import React, {useState} from 'react'
import './addproduct.css'
import axios from 'axios'
import Autocomplete from "react-google-autocomplete";

async function postData({image, name, radius, address, price, coord}) {
    let token = localStorage.getItem('token')
    const formData = new FormData();
    formData.append("image", image)
    formData.append("name", name)
    formData.append("address", address)
    formData.append("price", price)
    formData.append("radius", radius)
    formData.append("location[0]", coord.lng)
    formData.append("location[1]", coord.lat)
  
    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/products/addproduct`, formData, { headers: {'Content-Type': 'multipart/form-data', authorization: `Bearer ${token}`}})
    console.log(result)
    window.location.reload()
    return result.data
  }

export const AddProduct = ({show, setShow}) => {
    const [apiKey, setAPiKey] = useState(process.env.REACT_APP_GOOGLE_API_KEY)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [radius, setRadius] = useState('')
    const [file, setFile] = useState()
    const [coord, setCoord] = useState()

    async function addNewProduct () {
        const result = await postData({image: file, name, radius, address,price, coord})
        setShow(false)
        console.log(result)
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    async function getCoordinate (address) {

        try{
            setAddress(address)
            const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params:{
                    address,
                    key: process.env.REACT_APP_GOOGLE_API_KEY
                }
            })
            let coordinate = result.data.results[0].geometry.location
            setCoord(coordinate)
        }catch(error){
            console.log(error)
        }
    }


    return (
        <>
      { show && (<div className="body">
            <div className="login-box">
                    <h2>Add Product</h2>
                    <form>
                        <div className="user-box">
                            <input type="text" value={name} onChange={(e)=>{setName(e.target.value); }} />
                            <label>ProductName</label>
                        </div>
                        <div className="user-box">
                            <input type="text" email  value={radius} onChange={(e)=>{setRadius(e.target.value)}} />
                            <label>Radius in Km</label>
                        </div>
                        <div className="user-box">
                            <Autocomplete type="text" apiKey={apiKey} onPlaceSelected={(place) => getCoordinate(place.formatted_address)}  />
                            <label>Address</label>
                        </div>
                        <div className="user-box">
                            <input type="text"  value={price} onChange={(e)=>{setPrice(e.target.value)}} />
                            <label>Price</label>
                        </div>
                        
                        {/* <div className="user-box">
                            <input type="password"   value={password} onChange={(e)=>{setPassword(e.target.value); setError(false)}}/>
                            <label>Password</label>
                        </div> */}
                        <input className="input" onChange={fileSelected} type="file" accept="image/*" placeholder="image" />
                        <a href="#" onClick={addNewProduct}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </a>
                    </form>
                </div>
        </div>) }
        </>
        
    )
}
