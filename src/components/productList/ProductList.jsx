import React,{useState, useEffect} from 'react'
import { Product } from '../product/Product'
import './productlist.css'
import axios from 'axios'

export const ProductList = ({show, setOpen, setId}) => {
    let token = localStorage.getItem('token')
    const [data, setData] = useState([ ])
    useEffect(()=>{
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}/products/getproducts`,
            headers: {
                authorization: `Bearer ${token}`,
              },
          }).then((val)=>{
              setData(val.data.products)
              console.log(val.data)
            })
    },[])

    return (
        <>
        {show && (<div className="product-list">
        {
            data && (data.map((val,index)=>{
                let image = `${process.env.REACT_APP_BASE_URL}/products/images/${val.image}`
                return(
                    <Product key={index} setOpen={setOpen} setId={setId} id={val._id} name={val.name.toUpperCase()} price={val.price.toUpperCase()} image={image}/>
                )
            }))
        }   
        </div>)}
        </>
    )
}
