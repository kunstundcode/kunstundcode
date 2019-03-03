import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBAnimation, MDBView, MDBCol } from 'mdbreact';

const Card = (props) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "12rem" }}>
        <MDBView hover zoom>
         <MDBCardImage className="img-fluid" src={props.c.thumbnail} waves />
        </MDBView>
        <MDBCardBody>
          <MDBCardTitle>{props.c.username}</MDBCardTitle>
          {/* <MDBCardText>
            Some quick example text to build on the card title and make
            up the bulk of the card&apos;s content.
          </MDBCardText> */}
          <MDBBtn href={"/codekuenste/"+ props.c._id}>Details</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default Card;