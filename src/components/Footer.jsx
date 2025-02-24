import React from 'react';
import { assets } from '../assets/assets';
import Nav from 'react-bootstrap/Nav';
const Footer = () => {
  return (
    <>
      < div className='container d-flex  flex-row justify-content-between gap-3 flex-wrap mt-5'>
        {/* ...left section... */}
        
            <div className='d-flex flex-column'>
                <img src={assets.logo} alt="" width={'200px'}/>
                <p className='my-3'>Lorem Ipsum dolor sit amet consectetur adipisicing elit. <br />Provident nesciunt ratione modi iste voluptates iure <br /> ipsa voluptate  dignissimos consequatur x a expedita adipisci <br />
                 hic distinctio ipsam, qui fugiat fuga reiciendis at.</p>
            </div>
        
        {/* ...center section... */}
        
            <div>
                <p className='footer fw-bold fs-4 my-2'>COMPANY</p>
                <Nav.Link href="/" className='active  footerhover mb-2 ms-1 '>Home</Nav.Link>
            <Nav.Link href="/about" className='   footerhover mb-2 ms-1'>About us</Nav.Link>
            <Nav.Link href="/contact" className=' mb-2  footerhover ms-1'>Contact us</Nav.Link>
            <Nav.Link href="mailto:rasoolbeebabaiah0786@gmail.com" className='  footerhover ms-1'>Privacy policy</Nav.Link>
           
            </div>
        
        {/* ...right section */}
        
           <div>
            <p className='footer fw-bold fs-4 mt-3'>GET IN TOUCH</p>
            <Nav.Link href="tel: +918919904986" className=' footerhover mb-2'> +1-212-456-7890</Nav.Link>
            <Nav.Link href="mailto:rasoolbeebabaiah0786@gmail.com" className=' mb-2 footerhover'>rasoolbeebabaiaho789@gmail.com</Nav.Link>
           
            </div> 
        
           
      </div>
      {/* ...copy right text... */}
      <div className='my-5'>
        <hr />
        <p className='my-3 text-center p-3'> Copyright 2024 &copy;
          Prescripto - All Rights Reserved By  <span className='text-primary fs-5 mx-1 ' >RasoolbeeSandyamala</span></p>
      </div>

    </>
  );
}

export default Footer;
