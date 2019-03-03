import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBMask, MDBView, MDBCol } from 'mdbreact';

const CardUserDetail = (props) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "12rem" }}>
      <MDBView hover zoom>
      < MDBCardImage className="img-fluid" src={props.c.pictureUrl} waves />

      </MDBView>
        
        <MDBCardBody>
          <MDBBtn href={"/codekuenste/"+ props.c._id}>{props.c._codekunst.projectcode}</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default CardUserDetail;