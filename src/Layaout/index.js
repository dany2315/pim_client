//mui
import { Container } from "@mui/material";
//project import
import CustomSnackbar from "../components/CustomSnackbar/index"
import Navbar from "./NavBar";
import Footer from '../components/Footer'
import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";



const Layaout = () =>{


return ( 
    <>
   
      <Navbar />

      <Container
        sx={{
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        <Loading/>
        <CustomSnackbar/>
        <Container
          maxWidth="lg"
          sx={{
            paddingTop: "24px",
            paddingBottom: "24px",
            borderRadius: "16px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
           
         <Outlet/>

        </Container>
      </Container>
      <Footer/>
      
      
    </>
)}

    export default Layaout