import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import "./LandingPage.scss";
import Aboutillustration from "../../asset/2292623.jpg";
import billing from "../../asset/billing-software_lg.webp";
import Features from "./features/Features";
import pizza from "../../asset/pi.png";
import Dot from "../../component/ui/dot/Dot";
import drink from "../../asset/drink.png";
import Animation from "../../component/ui/animation/Animation";
import burger from '../../asset/bur.png'
import fries from '../../asset/fries.png'
import DishCircle from "../../component/ui/dishCircle/DishCircle";
import Footer from "../../component/ui/footer/Footer";


function LandingPage() {
  const featureList = [
    {
      id: 1,
      img: billing,
      title: (
        <p>
          {" "}
          A quick 3-click restaurant{" "}
          <span style={{ color: "maroon" }}>billing</span> software{" "}
        </p>
      ),
      detail:
        "Take orders, punch bills and generate KOT. Accept payments either by splitting bill or merging tables. Easily apply discounts and coupons. All of this, and more, is easy and quick with Petpooja's restaurant POS.",
    },
    {
      id: 1,
      img: billing,
      title: (
        <p>
          {" "}
          A quick 3-click restaurant{" "}
          <span style={{ color: "maroon" }}>billing</span> software{" "}
        </p>
      ),
      detail:
        "Take orders, punch bills and generate KOT. Accept payments either by splitting bill or merging tables. Easily apply discounts and coupons. All of this, and more, is easy and quick with Petpooja's restaurant POS.",
    },
    {
      id: 1,
      img: billing,
      title: (
        <p>
          {" "}
          A quick 3-click restaurant{" "}
          <span style={{ color: "maroon" }}>billing</span> software{" "}
        </p>
      ),
      detail:
        "Take orders, punch bills and generate KOT. Accept payments either by splitting bill or merging tables. Easily apply discounts and coupons. All of this, and more, is easy and quick with Petpooja's restaurant POS.",
    },
  ];

  return (
    <div className="landing-page">
      <div className="navbar-section">
        <Navbar />
      </div>
      <div className="hero-section">
        <div className="about-text">
          <h1>
            Restaurant POS software made{" "}
            <span style={{ color: "#c8151d" }}>Simple!</span>{" "}
          </h1>
          {/* <p>Modern POS App</p> */}
        </div>

        <Dot color="#c8151d" left="5%" top="47%" size="13px" />
        <Dot size="20px" color="#ffcb35" left="13%" top="0%" />
        <Dot color="#c8151d" left="35%" top="20%" />
        <Dot size="15px" color="#ffcb35" left="50%" top="35%" />

        <img id="hero-section-1" src={pizza} alt="" />
        <img id="hero-section-2" src={drink} alt="" />
        {/* <div className="about-illustration">
             <img src={Aboutillustration} alt="" />
            </div> */}
      </div>
      <div className="about">
        
        <div className="animation-heading">
          <h1>About the POS</h1>
          <Dot size="400px" top="20%" left="-15%" color="#c8151d" />
          <Animation />
          <DishCircle img={burger} top="85%" left="85%" />
          <Dot size="15px" color="#ffcb35" top="80%" left="5%"   />
           <Dot size="11px" color="#ffcb35" top="60%" left="25%"   />
           <Dot size="20px" color="#c8151d" top="70%" left="30%"   />
        </div>
        <div className="about-content">
          <Dot size="15px" color="#c8151d" top="55%" left="95%" />
          <div className="text-box">
            <h4>Description</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus sit accusantium vitae repudiandae nulla voluptate totam
              voluptates qui dignissimos culpa eos, quod quo ullam dicta
              expedita in aliquam error quis! Quod quidem dicta adipisci dolores
              rerum deleniti ut error atque est veniam ex architecto quam totam
              sapiente voluptatum, aperiam maiores.
            </p>
          </div>
           <div className="text-box">
            <h4>Main goal</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus sit accusantium vitae repudiandae nulla voluptate totam
              voluptates qui dignissimos culpa eos, quod quo ullam dicta
              expedita in aliquam error quis! Quod quidem dicta adipisci dolores
              rerum deleniti ut error atque est veniam ex architecto quam totam
              sapiente voluptatum, aperiam maiores.
            </p>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="features-heading">
          <h4 style={{ color: "maroon", fontWeight: "600" }}>
            SMART POS FEATURES
          </h4>
          <h1>A restaurant POS made for all your needs</h1>
          <h4>
            A quick and easy-to-use restaurant billing software that makes
            managing high order volumes butter smooth
          </h4>
        </div>
        <div className="features-list">
          {featureList.map((data, index) => (
            <Features data={data} key={index} />
          ))}
        </div>
          <Dot size="10px" color="#c8151d" top="20%" left="90%"   />
          <Dot size="18px" color="#ffcb35" top="10%" left="80%"   />
          <Dot size="10px" color="#c8151d" top="5%" left="90%"   />
          <DishCircle img={fries} top="35%" left="-10%" />
      </div>
      <div className="footer-ssection">
        <Footer/>
      </div>
    </div>
  );
}

export default LandingPage;
