import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import logo from '../../asset/logo.png'
import Button from '../common/button/Button';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [scroll,setScroll]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
   const hanldescroll=()=>{
    if(window.scrollY>500){
      setScroll(true);
    }
    else{
      setScroll(false);
    }
   }

   window.addEventListener('scroll',hanldescroll);

   return ()=> window.removeEventListener('scroll',hanldescroll);
  },[])

  function handleNavigation(){
      navigate("/login")
  }

  return (
    <div className={`navbar ${scroll? "shadow":""}`}>
     <div className="logo">
         <img src={logo} alt="" />
     </div>
     <div className="nav-list">
         <ul>
            <li>Pos</li>
            <li>Outlet types</li>
            <li>Resources</li>
         </ul>
     </div>
     <div className="user-control">
       <Button onClick={handleNavigation} type='border'> Login </Button>
     </div>
    </div>
  )
}

export default Navbar