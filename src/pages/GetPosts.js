import React, { useEffect, useState } from 'react'
import postService from '../services/postService'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Table} from 'react-bootstrap'
const GetPosts = () => {
    const [posts,setPosts] = useState({})
    const [modal,setModal] = useState(false)
    const [title,setTitle] = useState("")
    const [date,setDate] = useState("")
    const [image,setImage] = useState("")
    const [message,setMessage] = useState("")
    const [editId,setEditId]=useState(null)
    async function fetchGet(){
        setPosts(await postService.get())
    }

    useEffect(()=>{
         fetchGet()
    },[posts])

    const handleDelete = async(id,e)=>{
        var response = await postService.delete(id)
        if(response.data.success===true){
            alert(response.data.msg)
            document.getElementById(id).parentElement.parentElement.remove();
        }else{
            alert(response.data.msg)
        }
    }
    const handleClose=()=>{
        setModal(false)
    }
    const label = {
        marginRight:"20px"
    }
    const handleOpenModal=(myid)=>{
        setModal(true)
        setEditId(myid)
    }

    const handleSubmitedit= async(e)=>{
        e.preventDefault()

        const formData = {
            'id': editId,
            'title':title,
            'date':date,
            'image':image
        }

        const response = await postService.edit(formData)
        console.log(response)
        if(response.data.success === true){
            setMessage("Post Edited Successfully")
        }else{
            setMessage("Post Edit Failed")
        }

        setTimeout(()=>{
            setMessage('')
        },3000)
        

        handleClose()
    }
  return (
    <>

    <h2 style={{textAlign:"center"}}>
        <Link to='/posts'>Create Post</Link>
    </h2>
        <Modal show={modal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                <label style={label}>Title</label>
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>

                <br/><br/>

                <label style={label}>Date</label>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>

                <br/><br/>

                <label style={label}>Image</label>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>

                <br/><br/>
                

            </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmitedit}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        <h1 style={{textAlign:"center"}}>All Posts</h1>

        {
            posts.data!== undefined && posts.data.data.length > 0 && (

            <Table striped bordered hover style={{margin:"0 auto",width:"80%"}}>
                <thead>
                    <tr>

                    <th style={{textAlign:"center"}}>Title</th>
                    <th style={{textAlign:"center"}}>Date</th>
                    <th style={{textAlign:"center"}}>Image</th>
                    <th style={{textAlign:"center"}}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            posts.data.data?.map((item,key)=>{
                                return(
                                    <>
                                    <tr>
                                    <td style={{textAlign:"center"}}>{item.title}</td>
                                    <td style={{textAlign:"center"}}>{item.date}</td>
                                    <td style={{textAlign:"center"}}><img style={{width:"100px"}} src={`http://localhost:8000/api/postImages/${item.image}`} alt=""/></td>
                                    <td style={{textAlign:"center"}}>
                                        <button id={item._id} onClick={(e)=>handleDelete(item._id,e)}>Delete</button>
                                        <button onClick={()=>handleOpenModal(item._id)}>Edit</button>
                                    </td>
                                    </tr>
                                    </>

                                )
                            })
                        }
                </tbody>
            </Table>
            )
        }
        <p style={{textAlign:"center"}}>{message}</p>
    </>
  )
}

export default GetPosts