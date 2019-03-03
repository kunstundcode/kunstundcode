import React from "react";
import { MDBJumbotron, MDBContainer, Animation} from "mdbreact";

const JumbotronPage = () => {
  return (
    <MDBJumbotron fluid>
      <MDBContainer>
        <Animation type="rollIn">
          <h2 className="display-4">kunstundcode</h2> 
        </Animation>
        <Animation type="slideInRight">
          <p className="lead">Generative Design / Experimental Design</p>
        </Animation>
        <Animation type="slideInLeft">
          <p>Create your own piece of art with code.</p>
        </Animation>
      </MDBContainer>
    </MDBJumbotron>
  )
}

export default JumbotronPage;