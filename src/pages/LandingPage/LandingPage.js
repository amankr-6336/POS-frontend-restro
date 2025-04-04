import React from 'react'
import Navbar from '../../component/Navbar/Navbar'
import './LandingPage.scss'
import Aboutillustration from '../../asset/2292623.jpg'
import billing from '../../asset/billing-software_lg.webp'
import Features from './features/Features'

function LandingPage() {
  
  const featureList=[
    { 
      id:1,
      img:billing,
      title: ( <p> A quick 3-click restaurant <span style={{color:"maroon"}}>billing</span> software </p> ),
      detail:"Take orders, punch bills and generate KOT. Accept payments either by splitting bill or merging tables. Easily apply discounts and coupons. All of this, and more, is easy and quick with Petpooja's restaurant POS.",

    },
    { 
      id:1,
      img:billing,
      title: ( <p> A quick 3-click restaurant <span style={{color:"maroon"}}>billing</span> software </p> ),
      detail:"Take orders, punch bills and generate KOT. Accept payments either by splitting bill or merging tables. Easily apply discounts and coupons. All of this, and more, is easy and quick with Petpooja's restaurant POS.",

    },
    { 
      id:1,
      img:billing,
      title: ( <p> A quick 3-click restaurant <span style={{color:"maroon"}}>billing</span> software </p> ),
      detail:"Take orders, punch bills and generate KOT. Accept payments either by splitting bill or merging tables. Easily apply discounts and coupons. All of this, and more, is easy and quick with Petpooja's restaurant POS.",

    },
  ]

  return (
    <div className="landing-page">
        <div className="navbar-section"><Navbar/></div>
        <div className="about">
            <div className="about-text">
                 <h1>Restaurant POS software made simple!</h1>
                 <p>Manages all your restaurant operations efficiently so that you can focus on growing your brand, like a real boss!</p>
            </div>
            <div className="about-illustration">
             <img src={Aboutillustration} alt="" />
            </div>
        </div>
        <div className="features">
          <div className="features-heading">
            <h4 style={{color:"maroon",fontWeight:"600"}} >SMART POS FEATURES</h4>
            <h1>A restaurant POS made for all your needs</h1>
             <h4>A quick and easy-to-use restaurant billing software that makes managing high order volumes butter smooth</h4>
          </div>
          <div className="features-list">
             {featureList.map((data,index)=> <Features data={data} key={index} />) }
          </div>
        </div>
    </div>
  )
}

export default LandingPage