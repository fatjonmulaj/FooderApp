import React from 'react'

function Contact()  {
    const handleSubmit = (event) => {
      event.preventDefault();
      // Add your form submission logic here
    };

  return (
    <div id='contact'>
      <div className='container' id='wrapper'>
        <h2 className='fw-bold'>Contact Us</h2>
        <div className='contactus'>
          <p className='fs-4 fw-bold'>Fooder <i class="fa-solid fa-pizza-slice "></i></p>
          <div className='telephone'>
            <i class="fa-solid fa-phone"></i>
            <div id='number'>
              <p className='fw-bold m-0'>Telephone</p>
              <a href='tel:(123)456-7890'>(123)456-7890</a>
            </div>
          </div>
    
          <div className='openingHours'>
              <i class="fa-regular fa-clock"></i>
              <div>
                <p className='fw-bold'>Opening Hours</p>
                <p>7 Days a week from 9:00 am to 7:00 pm</p>
              </div>
          </div>
          <div id='details'>
            <i class="fa-solid fa-comment-dots"></i>
            <div id='comments'>
            <p className='fw-bold'>Comments</p>
            <p>We are glad to hear from you</p>
            </div>
          </div>
        </div>
      </div>

    
      <div className="container mt-5 w-75">
        <h1>Contact Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input type="text" className="form-control" id="name" name="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-Mail Address</label>
            <input type="email" className="form-control" id="email" name="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      
    </div>
  )
}

export default Contact