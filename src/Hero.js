import React from 'react';
import TopBar from './TopBar';

function HeroSection() {


  return (

    <div className="hero-section">


    <TopBar message="Special Offer: Get 100% off on our Free plan!" />

      {/* <h1 className="product-roadmap-title">Product Roadmap</h1> */}

      
      <h1 className="product-roadmap-title" >Product People</h1>
       <p>Product People is a roadmap tool for <h2>small teams</h2> or <b>indie developers</b> or product owners
        tired of bad tools that just make you want to kill yourself.</p>

        Here is the unfeature list:
        <ul>
          <li>
            No Gantt charts. Instead we have confidende levels.
          </li>
          <li>
            No timelines what so ever
          </li>
        </ul>
      <p>See what we're working on and what's coming next.</p>
      <p>Last updated: Wednesday, Aug 9, 2023</p>


      
      {/* <button onClick={() => alert('Feature suggestion form coming soon!')}>Suggest a Feature</button> */}
    </div>
  );
}

export default HeroSection;
