import React,{useEffect} from "react";
import { MDBContainer,MDBRow } from "mdb-react-ui-kit";

function Error() {
    useEffect(()=>{
        document.body.style.backgroundColor="#5b468d";
    })
  return (
    <div>
    <div className="Error-container">
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h1 style={{ color: "white", fontFamily: "bahnschrift" }}>404</h1>
            <h1 style={{ color: "white", fontFamily: "bahnschrift" }}>PAGE NOT FOUND</h1>
          </div>
        </MDBRow>
      </MDBContainer>
    </div>
  </div>
  );
}

export default Error;
