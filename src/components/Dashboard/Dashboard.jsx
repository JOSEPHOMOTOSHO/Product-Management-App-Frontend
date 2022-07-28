import React,{useState} from 'react'
import { Header } from '../Header/Header';
import { ProductList } from '../productList/ProductList';
import { AddProduct } from '../form/AddProduct';
import { Comment } from '../comment/Comment';

export const Dashboard = () => {
    const [visible, setVisible] = useState(false)
    const [open, setOpen] = useState(false)
    const [id, setId] = useState('')
    return (
        <div>
        <Header/>
      <ProductList setOpen={setOpen} setId={setId} show={!visible}/>
      <AddProduct show={visible} setShow={setVisible}/>
      <Comment open={open} setOpen={setOpen} setId={setId} id={id} />
      <button className="add-product" onClick={()=>setVisible(!visible)}> Add Product</button>
        </div>
    )
}
