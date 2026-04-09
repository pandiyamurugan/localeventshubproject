import React from 'react'
import Musicimages1 from "../images/musicimagesthree.webp"
import { FaHeart, FaPlay, FaPause } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
function ConcerteEvents() {
  return (
    <div className='mt-5'>
        <div className='d-flex justify-content-center flex-column align-items-center my-5 py-5'>
           <h2 className="fw-bold mb-3" data-aos="fade-up">
           
               Upcoming  <span className="text-danger">Events Around You</span>
            </h2>

            <p className="text-muted concerte-evts-desc"  data-aos="fade-up"
    data-aos-delay="200">
Stay updated with the latest events happening around you. 
From music concerts to cultural gatherings, find experiences that match your vibe.          </p>
        </div>
            
        <div className='min-vh-100'>
        <div className='container-fluid ' style={{background:"black"}}>
         <div className='row px-0 d-flex justify-content-between'>
          <div className='col-lg-4' data-aos="fade-right">
           <img src={Musicimages1}   style={{
      width: "100%",
      height: "800px",
       transform: "scaleX(-1)",
    }}/>
          </div>
          <div className='col-lg-3  data-aos="fade-up" text-white p-4' style={{background:"#121212",height:"300px"}}>
            <div>
               {/* HEADER */}
  <h3 className="fw-bold">Liked Songs</h3>
  <p style={{color:"#aaa"}}>100 songs</p>

 
  <div className="d-flex justify-content-end mb-3">
    <div style={{
      background:"#1db954",
      width:"50px",
      height:"50px",
      borderRadius:"50%",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      cursor:"pointer"
    }}>
      <FaPlay color="black"/>
    </div>
  </div>

 
  <div className="d-flex gap-2 mb-4 flex-wrap">
    {["Sensual","Chill","Afrobeats","Rap","Soulful"].map((tag,i)=>(
      <span key={i} style={{
        border:"1px solid #555",
        borderRadius:"20px",
        padding:"5px 15px",
        fontSize:"12px"
      }}>
        {tag}
      </span>
    ))}
  </div>


  {[
    {title:"Stacy", artist:"JON VINYL"},
    {title:"Close To You", artist:"Dreezy, T-Pain"},
    {title:"Ready", artist:"Dreezy"},
    {title:"Wonderful Day", artist:"CjayG, glibs"},
    {title:"SAD TONIGHT", artist:"WurID"},
    {title:"Sunday Corolla", artist:"Mayzin, ROHO"},
    {title:"Ansa Me", artist:"Toyé"}
  ].map((song,index)=>(
    
    <div key={index} className="d-flex align-items-center justify-content-between mb-3">

      
      <div className="d-flex align-items-center gap-3" >

        <img 
          src={`https://picsum.photos/50?random=${index}`} 
          style={{width:"50px",height:"50px",borderRadius:"5px"}}
        />

        <div>
          <div style={{fontSize:"14px"}}>{song.title}</div>
          <div style={{fontSize:"12px",color:"#aaa"}}>{song.artist}</div>
        </div>

      </div>

      
      <div className="d-flex align-items-center gap-3">
        <FaHeart color="#1db954" style={{cursor:"pointer"}}/>
        <HiDotsVertical style={{cursor:"pointer"}}/>
      </div>

    </div>
  ))}

  
  <div style={{
    position:"sticky",
    bottom:"0",
    background:"#7a0000",
    padding:"10px",
    borderRadius:"10px",
    marginTop:"20px"
  }}>
    <div className="d-flex align-items-center justify-content-between">

      <div className="d-flex align-items-center gap-2">
        <img 
          src="https://picsum.photos/50" 
          style={{width:"40px",height:"40px",borderRadius:"5px"}}
        />
        <div>
          <div style={{fontSize:"13px"}}>SAD TONIGHT</div>
          <div style={{fontSize:"11px"}}>WurID</div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <FaHeart />
        <FaPause />
      </div>

    </div>
  </div>
            </div>

 

</div>
          <div className='col-lg-4'>
           <img src={Musicimages1}   data-aos="fade-left" style={{width:"100%",height:"800px"}}/>
          </div>
          <div>

          </div>
         </div>
        </div>
    </div>

    </div>
    
  )
}

export default ConcerteEvents