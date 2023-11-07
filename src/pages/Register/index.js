import React, { useState, useContext } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import logo from "../../assets/Design sans titre.png";
import "./register.css";
import api from "../../utils/Axios";
import CustomSnackbar from '../../components/CustomSnackbar';
import Loading from '../../components/Loading'

import { LoadingContext } from "../../context/loadingContext";
import { AuthContext } from "../../context/authContext";
import { SnackbarContext } from "../../context/snackbarContext";

function Register() {
  const { showSnackbar } = useContext(SnackbarContext);
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const {login} = useContext(AuthContext)
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [verifPassword, setVerifPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (firstName && lastName && identifiant && password && verifPassword) {
      if (password === verifPassword) {
      try {
        showLoading()
        const reponse = await api.post("/auth/register", {
          firstName: firstName,
          lastName: lastName,
          identifiant: identifiant,
          password: password,
        });
        setIdentifiant(""); 
        setPassword("");
        setFirstName("");
        setLastName("");
        setVerifPassword("");
        hideLoading();
        login(reponse.data.token)
        showSnackbar(reponse.data.message, "success");
        
      } catch (error) {
        hideLoading()
        console.log(error);
        setIdentifiant("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setVerifPassword("");
      showSnackbar(error.response.data.message,"error")
      }
    } else {
      showSnackbar("password mal recopier","error")
    }
    }else {
      showSnackbar("champs vide","error")
    }
    
  };

  return (
    <>
    <MDBContainer fluid className="p-4 arriere ">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Net computer services
            <br />
            <span className="text-primary">A vos service informatique </span>
          </h1>
        </MDBCol>

        <MDBCol md="5">
          <MDBCard className="my-5">
            <MDBCardBody className="p-3">
              <div className="text-center mb-3">
                <img src={logo} width={"65px"} alt="logo" />
              </div>
              <form onSubmit={handleRegister}>
              <MDBRow>
                <MDBCol col="6 ">
                  <MDBInput
                    wrapperClass="mb-3"
                    label="First name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </MDBCol>

                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-3"
                    label="Last name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-3"
                label="Identifiant"
                type="text"
                value={identifiant}
                onChange={(e) => setIdentifiant(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-3"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-3"
                label="Verifier Password"
                type="password"
                value={verifPassword}
                onChange={(e) => setVerifPassword(e.target.value)}
              />

              <MDBBtn
                className="w-100 mb-4 arrier "
                size="md"
                type="submit"
              >
                sign up
              </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
          <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
            Toujours la à votre services besoin de conseil technique ou reseau
            contacter nous au:
            <a
              href="mailto:davidserfaty2315@gmail.com"
              class="text-grey-50 fw-bold"
              target="_blank"
            >
              {" "}
              davidserfaty2315@gmail.com
            </a>
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <Loading/>
    <CustomSnackbar/>
    </>
  );
}

export default Register;
