import React from "react";
import { MDBJumbotron, MDBContainer } from "mdbreact";

const JumbotronPage = () => {
  return (
    <MDBJumbotron fluid>
      <MDBContainer>
        <h2 className="display-4">kunstundcode</h2>
        <p className="lead">Generative Design / Experimental Design</p>
        <p>Create your own piece of art with code.</p>
      </MDBContainer>
    </MDBJumbotron>
  )
}

export default JumbotronPage;