import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
}
from 'mdb-react-ui-kit';
import logo from '../../assets/Design sans titre.png'
import './register.css'

function Register() {
  return (

    <MDBContainer  fluid className='p-4 arriere '>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Net computer services<br />
            <span className="text-primary">A vos service informatique </span>
          </h1>

         

        </MDBCol>

        <MDBCol md='6'>

          <MDBCard className='my-5'>
            <MDBCardBody className='p-4'>
<div className="text-center mb-3">
              <img src={logo}
              width={"65px"}
                 alt="logo" />
            </div>
              <MDBRow>
              
                <MDBCol col='6 '>
                  <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text'/>
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text'/>
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>


              <MDBBtn className='w-100 mb-4 arrier' size='md' >sign up</MDBBtn>

              

            </MDBCardBody>
          </MDBCard>
 <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
           Toujours la à votre services besoin de conseil technique ou reseau contacter nous au:<a href="mailto:davidserfaty2315@gmail.com" class="text-grey-50 fw-bold" target='_blank'> davidserfaty2315@gmail.com</a>
          </p>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Register;