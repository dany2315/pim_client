import React ,{useContext, useState}from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import './login.css'
import Loading from '../../components/Loading'
import logo from '../../assets/Design sans titre.png'
import api from "../../utils/Axios"
//import context
import { LoadingContext } from '../../context/loadingContext';
import { AuthContext } from '../../context/authContext';
import { SnackbarContext } from '../../context/snackbarContext'
import CustomSnackbar from '../../components/CustomSnackbar';


function Login() {
  
  const { showSnackbar } = useContext(SnackbarContext)
  const {showLoading , hideLoading} = useContext(LoadingContext)
  const {login} = useContext(AuthContext)
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');

  const verif = async (e) => {
    e.preventDefault();
    showLoading()
    try {
      const reponse = await api.post('/auth',{
        identifiant:identifiant,
        password:password
        })
        setIdentifiant("")
        setPassword("")
        hideLoading()
        login(reponse.data.token)
        showSnackbar(reponse.data.message,"success")
      console.log(reponse.data);
    } catch (error) {
      hideLoading()
      setIdentifiant("")
      setPassword("")
      showSnackbar(error.response.data.message,"error")
      console.log("erreur de connexion");
    }
  };


  return (
    <>
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12' className='arriere'>

          <MDBCard className='text-grey my-5 mx-auto mt-4' style={{borderRadius: '3rem', maxWidth: '400px' }}>
            <MDBCardBody className='p- d-flex flex-column align-items-center mx-auto w-100 ' type='form'>
            <div className="text-center">
              <img src={logo}
              width={"50px"}
                 alt="logo" />
              <h5 className="fw-bold mt-1 mb-2 pb-1 ">Login</h5>
            </div>
      
              <p className="text-grey-50 mb-3">Please enter your login and password!</p>

<form onSubmit={verif} >
              <MDBInput wrapperClass='class="form-control mb-4  w-100' labelClass='text-grey' label='Identifiant'  type='text' size="md" value={identifiant}
  onChange={(e) => setIdentifiant(e.target.value)}/>
              <MDBInput wrapperClass='class="form-control mb-4  w-100' labelClass='text-grey' label='Password'  type='password' size="md" value={password}
  onChange={(e) => setPassword(e.target.value)}/>

              <p className="mx-5 mb-3  text-center"><a class="text-grey-50 " href="#!">Forgot password?</a></p>
              <MDBBtn outline className='mx-5 px-5 arriere log' color='white' size='md' type='submit'>
                Login
              </MDBBtn>

              <div className='d-flex flex-row mx-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: '#1877F2' }}>
                  <MDBIcon fab icon='facebook-f' size="md"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: '#1DA1F2' }}>
                  <MDBIcon fab icon='twitter' size="md"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'red' }}>
                  <MDBIcon fab icon='google' size="md"/>
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Don't have an account? <a href="/register" class="text-grey-50 fw-bold">Sign Up</a></p>

              </div>
              </form>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    <Loading/>
    <CustomSnackbar/>
    </>
  );
}

export default Login;

