import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBView, MDBNavLink } from 'mdbreact';

const CardDetail = (props) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "12rem" }}>
        <MDBView hover zoom>
          <MDBCardImage className="img-fluid" src={props.c.pictureUrl} waves />
        </MDBView>
        <MDBCardBody>
          <MDBNavLink to={"/user/"+ props.c._user._id}><MDBBtn>{props.c._user.username}</MDBBtn></MDBNavLink>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default CardDetail;