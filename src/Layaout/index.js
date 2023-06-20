//mui
import { Container } from "@mui/material";
//project import
import Navbar from "./NavBar";
import Footer from '../components/Footer'
import { Outlet } from "react-router-dom";

const Layaout = () =>{

return (
    <>
      <Navbar />

      <Container
        sx={{
          paddingTop: "24px",
          paddingBottom: "24px",
          backgroundColor: "grey",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            paddingTop: "24px",
            paddingBottom: "24px",
            borderRadius: "16px",
            boxShadow: "0px 4px 8px 4px rgba(0, 0, 0, 0.1)",
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