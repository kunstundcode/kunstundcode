import React, { Component } from "react";
import api from "../../api";
import SpinnerPage from '../SpinnerPage';
import CardDetail from '../CardDetail';
import ModalPage from '../ModalPage';

export default class CodekunstDetail extends Component {
  constructor(props) {
    super(props);
    window.addEventListener("keydown", this.handleKeyboardInput.bind(this));
    this.state = {
      name: "",
      code: "",
      thumbnail: "",
      userarts: [],
      description: '',
      codekunst: null,
      saving: false
    };
  }

  handleKeyboardInput = e => {
    const code = e.keyCode ? e.keyCode : e.which;

    if (code === 83) { //s key
      console.log("Please wait, your art is going to be saved and will appear shortly");

      this.setState({
        saving: true
      })

      setTimeout(() => {
        console.log("Timeout called!");
        api
          .getCodekunstDetail(this.props.match.params.codekunstId)
          .then(codekunst => {
            this.setState({
              codekunst: codekunst,
              name: codekunst.name,
              code: codekunst.code,
              thumbnail: codekunst.thumbnail,
              userarts: codekunst.userarts,
              description: codekunst.description,
              saving: false
            });
          })
          .catch(err => console.log(err));
      }, 3000);
    }
  };

  render() {
    setTimeout(() => {  // quick timeout to force refresh. Without it the p5canvas does not hava full functionality
      if (!window.location.hash) {
          window.location = window.location + '#loaded';
          window.location.reload();
      }
    }, 1)

    
    if (!this.state.codekunst) return <SpinnerPage />;

    return (
      <div className="Codekuenste CodekunstDetail d-flex flew-row">
        <div className="left col-6">
          {!this.state.saving && <h3><strong>Projectcode</strong>: {this.state.codekunst.projectcode}</h3>}
          {this.state.saving && <h2><SpinnerPage />  Well done! Saving your art :)</h2> }
          <div className="d-flex flex-row flex-wrap">
            {this.state.codekunst.userarts.map((item, i) => (
              <div key={i}><CardDetail c={item} /></div>
              ))}
          </div>
        </div>
        <div className="right col-6">
          <ModalPage codekunst={this.state.codekunst}/>
          <div id="box" style={{ border: "0px solid white" }} />  
              {/* <pre>{this.state.codekunst.code}</pre> uncomment to show used code on page */}
        </div>
      </div>
    );
  }
  
  componentDidMount() {
    console.log("***** Component did mount *****")
    api
      .getCodekunstDetail(this.props.match.params.codekunstId)
      .then(codekunst => {
        this.setState({
          codekunst: codekunst,
          name: codekunst.name,
          code: codekunst.code,
          thumbnail: codekunst.thumbnail,
          userarts: codekunst.userarts,
          description: codekunst.description
        });
            // DISCLAIMER: We know that 'eval' can be dangerous, but after a bunch of days trying to avoid it, 
            // we figured out, that this seems to be the only way to execute p5 based code inside 
            // a react app with full functionality. Also, the user is not able to input own code, 
            // just admins. In real production, we would even not implement this option for admins,
            // because the admin page could potentioally be hacked. In this case we did implement 
            // to add and test new p5 code quickly, without seeding the database. 
        let executeArtsyCode = function(projectcode) {
          // eslint-disable-next-line
          eval(codekunst.code);
        };
        executeArtsyCode(codekunst.projectcode);
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    console.log("***** Component did update *****")
    console.log(
      "Did update called. Userarts length when -componentDidUpdate: " + this.state.userarts.length
    );
  }

}
