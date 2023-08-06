import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
    const[author,setAuthor]=useState('')
    const[title,setTitle]=useState('')
    const[body,setBody]=useState('')
    const[isPending,setIsPending]=useState(false)
    const history=useHistory()
    const handleSubmit=(e)=>{
        e.preventDefault()
        const blog = {title,body,author}
        setIsPending(true)
        fetch('http://localhost:8000/blogs',{
         method:'POST',
         headers:{"Content-Type":"application/json"},
         body: JSON.stringify(blog)
     } ).then(()=>{
        console.log("added")
        setIsPending(false)
        history.push('/')
     })
     
    }
    return (  
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Blog Title:
                </label>
                <input type="text" required value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                <label>
                    Blog Body:
                </label>
                <textarea required value={body}  onChange={(e)=>setBody(e.target.value)}>

                </textarea>
                <label>
                    Blog Author:
                </label>
                <input type="text" required value={author} onChange={(e)=>setAuthor(e.target.value)}></input>
               { !isPending && <button>ADD</button>}
               {isPending && <button disabled>Adding Blog...</button>}
                
            </form>
        </div>
    );
}
 
export default Create;