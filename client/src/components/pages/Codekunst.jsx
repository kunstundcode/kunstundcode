import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import Card from '../Card';


class Codekunst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codekuenste: []
    };
  }

  deleteCodekunst(codekunstId) {
    api.deleteCodekunst(codekunstId).then(data => {
      this.setState({
        codekuenste: this.state.codekuenste.filter(c => c._id !== codekunstId),
        message: data.message
      });
      // Remove the message after 3 seconds
      setTimeout(() => {
        this.setState({
          message: null
        });
      }, 3000);
    });
  }

  render() {
    return (
      <div className="Codekuenste justify-content-center d-flex flex-row flex-wrap align-items-center">

          {this.state.codekuenste.map(c => (
             <div key={c._id}>
              <Card c={c} />
              {api.isAdmin() && (
                <button onClick={() => this.deleteCodekunst(c._id)}>
                  Delete
                </button>
              )}
            </div>
          ))}

        {this.state.message && <div className="info">{this.state.message}</div>}
      </div>
    );
  }


  componentDidMount() {
    api
      .getCodekuenste()
      .then(codekuenste => {
        console.log("All Codekuenste: " + codekuenste);
        this.setState({
          codekuenste: codekuenste
        });
      })
      .catch(err => console.log(err));
  }
}

export default Codekunst;
