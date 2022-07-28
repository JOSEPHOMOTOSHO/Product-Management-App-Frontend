import './product.css'

export const Product = (props) => {
    
    function setcommentAction (){
        props.setId(props.id)
        props.setOpen(true)
    }

    return (
        <div className="product-card">
           <img className="product-image" src={props.image}/>
            <div className="product-description">
                <div className="product-name">{props.name}</div>
                <div className="product-price">{props.price}</div>
            </div>
            <div className="comment-description" onClick={()=>{setcommentAction()}}>
                <div className="product-name">comments</div>
               
            </div>
        </div>
    )
}
