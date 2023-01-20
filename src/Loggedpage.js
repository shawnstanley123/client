import {useEffect, useState} from 'react'
import './App.css';
import Axios from 'axios'
import {useParams} from 'react-router-dom'
function Loggedpage() {
  const [moviename,setMoviename]=useState("")
  const [rating,setRating] = useState("")
  const [booked,setBooked]= useState(false)
  const [rname,setRname]=useState("")
  const [booklist,setBooklist]= useState([])
  const [rides,setRides]=useState([])
  const [aprice,setAprice]=useState([])
  const [data,setData]=useState([])
  const [count,setCount]=useState([])
const {id}=useParams()

  useEffect(()=>{
    Axios.get("http://localhost:2000/rides")
    .then(res=>{
      setRides(res.data)
    })
    Axios.post("http://localhost:2000/sum",{cid:id})
    .then(res=>{
       
      setAprice(res.data)
      
      
    })
  // Axios.get("http://localhost:2000/get")
  // .then(res=>{
   
  //   if(res.data.length>0)
  //   setBooked(true)
  //   else setBooked(false)
  // })

  },[])
  const submithandler = (e) =>{
    e.preventDefault()
Axios.post("http://localhost:2000",{
moviename: moviename,
rating:rating
}).then(()=>{
  alert("success")
})
  }
  const bookhandler =(item) =>{
   

alert("called")
Axios.post("http://localhost:2000/insert",{
  rname:item.Rname,
  eid:item.Eid,
  price:item.Price,
  cid:parseInt(id),
}).then((res)=>{
  alert("success")
})
window.location.reload(true)
}
const check = async (item,e) =>{
    e.preventDefault()
    let number = await Axios.get(`http://localhost:2000/check/${parseInt(id)}/${item.Eid}`)
    .then(res=>{
        let number=res.data.length
        return number
    }
       )
       
       console.log(number)
       if(number < 1){
        bookhandler(item)
        
       }
       else alert("already booked")
    }
  const cancelhandler = (item) =>{
    window.alert(item.Eid)
  Axios.post(`http://localhost:2000/delete/${id}/${item.Eid}`)
  }
  const both = (item,e)=>{
    
   check(item,e)
    
  }
  return (
    <div className="App">
      <form className='form'>
        {rides.map((item,key)=>(<div className='roller-coaster'>{item.Rname}
        <button className='rbutton' onClick={()=>cancelhandler(item)}>Cancel</button>
        <button className='rbutton'  onClick={(e)=>both(item,e)} >Book</button>
        {/* {Axios.get("http://localhost:2000/filter",{
          Eid:item.Eid
        }
        ).then((res)=>res.data?(<button className='rbutton' onClick={cancelhandler}>Cancel</button>):(<button className='rbutton'  onClick={()=>both(item,key)} >Book</button>))} */}
        </div>))}
        <div>Total Price:{aprice.map((item)=>(<div>{item.sum}</div>))}</div>
     
      </form>
    </div>
  );
}

export default Loggedpage;
