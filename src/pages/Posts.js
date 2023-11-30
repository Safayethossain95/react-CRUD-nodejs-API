import React,{useState} from 'react'
import postService from '../services/postService'
import {Link} from 'react-router-dom'
const Posts = () => {

    const style = {
        width:"500px",
        margin:"0 auto",
        padding:"40px",
        background:"#ddd",
        borderRadius:"15px",
        marginTop:"100px"
    }
    const label = {
        marginRight:"20px"
    }

    const [title,setTitle] = useState("")
    const [date,setDate] = useState("")
    const [image,setImage] = useState("")
    const [message,setMessage] = useState("")

    const handleSubmit= async(e)=>{
        e.preventDefault()

        const formData = {
            'title':title,
            'date':date,
            'image':image
        }

        const response = await postService.create(formData)
        console.log(response)
        if(response.data.success === true){
            setMessage("Post Created Successfully")
        }else{
            setMessage("Post Creation Failed")
        }

        setTimeout(()=>{
            setMessage('')
        },3000)
        e.target.reset()
    }

  return (
    <>
        <div className='main' style={style}>

        <h2>
            <Link to="/allposts">Go to All Posts</Link>
        </h2>

        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
            <label style={label}>Title</label>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>

            <br/><br/>

            <label style={label}>Date</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>

            <br/><br/>

            <label style={label}>Image</label>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>

            <br/><br/>
            <button>Submit</button>

        </form>

        <p>{message}</p>
        </div>
    </>
  )
}

export default Posts