import axios from "axios";

class Post {
    create(formData){
        const url = "http://localhost:8000/api/create-post";
        const config = {
             headers:{
                'Content-type':'multipart/form-data',
             }
        };
        return axios.post(url,formData,config);
    }

    get(){
        const url = "http://localhost:8000/api/get-posts";
        return axios.get(url)
    }
    
    delete(id){
        const url = `http://localhost:8000/api/delete-post/${id}`;
        return axios.get(url)
    }

    edit(formdataedit){
        const url = "http://localhost:8000/api/update-post";
        const config = {
            headers:{
               'Content-type':'multipart/form-data',
            }
       };
       return axios.post(url,formdataedit,config);
    }
   
}

let mypost = new Post()

export default mypost;