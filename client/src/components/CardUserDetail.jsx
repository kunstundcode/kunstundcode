import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBNavLink, MDBView, MDBCol } from 'mdbreact';

const CardUserDetail = (props) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "12rem" }}>
        <MDBView hover zoom>
        <MDBCardImage className="img-fluid" src={props.c.pictureUrl} waves />
        </MDBView>
        <MDBCardBody>
          <MDBNavLink to={"/codekuenste/"+ props.c._codekunst._id}><MDBBtn>{props.c._codekunst.projectcode}</MDBBtn></MDBNavLink>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default CardUserDetail;