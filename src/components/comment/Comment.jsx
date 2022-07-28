import React, {useEffect, useState} from 'react'
import './comment.css'
import axios from 'axios'



export const Comment =  ({id,open, setOpen}) => {
    let userDetails = localStorage.getItem('user')
    let token = localStorage.getItem('token')
    const [data, setData] = useState()
    const [comment, setComment] = useState()
    const [reply, setReply] = useState()
    const [user, setUser] = useState(JSON.parse(userDetails))
    useEffect(()=>{
        console.log(id)
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}/products/${id}`,
            headers: {
                authorization: `Bearer ${token}`,
              },
          }).then((val)=>{
              setData(val.data.product)
            }).catch((err)=>{
                console.log('lk')
            })
    },[id, token])

    async function addReply ( commentId ) {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}/reply/addreply/${commentId}`,
            headers: {
                authorization: `Bearer ${token}`,
              },
            data:{
                replyBody:reply
            }
            
          }).then((val)=>{
              setData(val.data.products)
              setReply('')
              window.location.reload()
            }).catch((err)=>{
                console.log('lk')
            })
    }

    async function addComment (text) {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}/comments/addcomment/${id}`,
            headers: {
                authorization: `Bearer ${token}`,
              },
            data:{
                commentBody:comment
            }
            
          }).then((val)=>{
              setData(val.data.products)
              setComment('')
              window.location.reload()
            }).catch((err)=>{
                console.log('lk')
            })
    }

  
    const details = data
   
    return (
        <>
        {open}
        {open && (
        <div>
            <div className="co-body">

            {

               data && (<div className="co-addproductg-form">
               <div className="co-delete-button" onClick={()=>{
                   setOpen(false)
                   console.log('holk')
                   }}>
            x
                {/* <AiOutlineComment/> */}
            </div>
        
                    <h2>{details.name.toUpperCase()} - {details.price}</h2>
                    <div className="wide-body">
                    
                        <div>
                        <img className="co-product-image" src={`${process.env.REACT_APP_BASE_URL}/products/images/${data.image}`} alt={data.image}/>
                        </div>
                       
                        <div>
                            <h4 style={{marginLeft:'20px', marginBottom:'0px'}}>COMMENTS</h4>
                            {details.comments.reverse().map((data)=>{  
                                return (
                                    <div  className="comment-card" key={data._id}>
                                        <div className="comment-text">{data.comment} <div className="reply-name"><i> - {data.user.userName}  </i> </div> </div>
                                        <div style={{marginLeft: '50px'}}>
                                        
                                        {
                                            data.replies.reverse().map((reply,index)=>{
                                                return (
                                                    <div key={reply._id} className="reply-text">{reply.reply}   <div className="reply-name"><i> - {reply.user.userName} </i> </div> </div>
                                                )
                                            })
                                        }

                                        
                                        <div>
                                            <input className="reply-input" onChange={(e)=>setReply(e.target.value)}  type="text" />
                                            <button className="reply-button" onClick={()=>addReply(data._id)}>Reply</button>
                                        </div>
                                        </div>
                                    </div>
                            )
                                
                            })
                            
                            }
                        </div>
                        
                    </div>
                    <div className="comment-tab">
                        <input className="comment-input" placeholder="comment" onChange={(e)=>setComment(e.target.value)} type="text" />
                        <button className="reply-button" onClick={()=> addComment('lk')}>Comment</button>
                    </div>
                </div>)
            
            }
            
            </div>
            
        </div>
        )}
        </>
   )
}
