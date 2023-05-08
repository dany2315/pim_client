
import { Container } from "@mui/material";

import Navbar from "./NavBar";
import Produits from "../components/Produits";
import Footer from '../components/Footer'

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
         
          <Produits />
        </Container>
      </Container>
      <Footer/>
    </>
)}

    export default Layaout