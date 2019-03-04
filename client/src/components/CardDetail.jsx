import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBView } from 'mdbreact';

const CardDetail = (props) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "12rem" }}>
        <MDBView hover zoom>
          <MDBCardImage className="img-fluid" src={props.c.pictureUrl} waves />
        </MDBView>
        <MDBCardBody>
          <MDBBtn href={"/user/"+ props.c._user._id}>{props.c._user.username}</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default CardDetail;