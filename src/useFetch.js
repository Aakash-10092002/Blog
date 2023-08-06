import { useState,useEffect } from "react";
const useFetch = (url) => { 
    const [data, setData] = useState(null)
    const [isPending,setIsPending]=useState(true);
    const [error,setError]=useState(null)
        useEffect(()=>{
          setTimeout(()=>{
            const abortCont=new AbortController();
             fetch(url,{signal:abortCont.signal})
              .then(res=>{
                  if(! res.ok){
                    throw Error("Could not fetch")  
                  }
                return  res.json();
              })
              .then(data=>{
                  setData(data)
                  setIsPending(false)
                  setError(null)
              })
              .catch(err=>{
                if(err.name === 'AbortError'){
                    console.log('fetch aborted')
                }
                else{
                  setIsPending(false)
                  setError(err.message)
                }
              })
              return ()=>abortCont.abort()
          },500)
        },[url]);
    return{error,isPending,data}
     
}
 
export default useFetch;