import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBView, MDBCol, MDBNavLink } from 'mdbreact';

const Card = (props) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "12rem" }}>
        <MDBView hover zoom>
        <MDBNavLink to={"/codekuenste/"+ props.c._id}><MDBCardImage className="img-fluid" src={props.c.thumbnail} waves /></MDBNavLink>
        </MDBView>
        <MDBCardBody>
          <MDBCardTitle>{props.c.username}</MDBCardTitle>
          <MDBNavLink to={"/codekuenste/"+ props.c._id}><MDBBtn>Details</MDBBtn></MDBNavLink>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default Card;