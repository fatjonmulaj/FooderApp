import React from 'react'
import { Link } from 'react-router-dom';
import sliderImage from '../images/offers/slider_1.jpg';
import sliderImage2 from '../images/offers/slider_2.jpg';
import sliderImage3 from '../images/offers/slider_3.jpg';
import deals from '../images/offers/deals.png';
import peperonipizza from '../images/offers/peperoni.avif'

function Home() {
 
  return (
    <>
      <div id='homepage '>
        <div id="carouselExampleCaptions" class="carousel slide">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src={sliderImage} class="d-block w-100" height='550px' alt="..."/>
        <div class="carousel-caption d-none d-md-block">
          <h5>Pizza.Online order only $8</h5>
          <p>We are committed to your satisfaction with every order. Get started today!</p>
        </div>
      </div>
        <div class="carousel-item">
          <img src={sliderImage2} class="d-block w-100" height='550px' alt="..."/>
          <div class="carousel-caption d-none d-md-block">
            <h5>Hamburger.Online order only $8</h5>
            <p>We are committed to your satisfaction with every order. Get started today!</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src={sliderImage3} class="d-block w-100" height='550px' alt="..."/>
          <div class="carousel-caption d-none d-md-block">
            <h5>Donner.Online order only $8</h5>
            <p>We are committed to your satisfaction with every order. Get started today!</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div> 
      </div> 

      <div id='cards'>
      <div class="card w-50 bg-black">
          <img src={sliderImage2} class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Beef Burger</h5>
            <p class="card-text">“Tasty, delicious, and has you craving more on the first bite.” </p>
            <Link to='/Products' class="btn btn-outline-dark">SHOP NOW</Link>
          </div>
        </div>

          <div class="card w-50 bg-black">
          <img src={sliderImage3} class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Rolled Donner</h5>
            <p class="card-text">Is a type of typical meat dish, made of meat cooked on a vertical skewer.</p>
            <Link to='/Products' class="btn btn-outline-dark">SHOP NOW</Link>
          </div>
        </div>

        <div class="card w-50 bg-black">
          <img src={peperonipizza} class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">Pepperoni Pizza</h5>
            <p class="card-text">Pepperoni is a meat mixture of beef and pork that has been cured and seasoned with paprika and chili powder</p>
            <Link to='/Products' class="btn btn-outline-dark">SHOP NOW</Link>
          </div>
        </div>
      </div>

        <section id="day-deals">
            <div class="container-fluid">
                <div class="row">
                
                <div class="img-fluid d-flex justify-content-center mt-3 image">
                    <figure class="txtover text-light">
                    <img src={deals} alt="Deal" />
                    <figcaption class="fs-4 fw-bold"><span class="con1">Deal of the day </span><br/> <span class="fs-1 con2">"Free Fries"<br/><span class="fs-6 con3">WITH YOUR NEXT ONLINE ORDER</span></span></figcaption>
                    </figure>
                </div>
                </div>
            </div>
        </section>

      <div id='footer'>
        <p className='text-light'>© 2023 FOODER. All Right Reserved.</p>
      </div>
      
      </>
  
  )
}

export default Home



