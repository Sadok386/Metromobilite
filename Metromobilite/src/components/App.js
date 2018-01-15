import React from 'react';
import Location from './Location';



export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.getInnerRef = this.getInnerRef.bind(this);
    this.getLocation = this.getLocation.bind(this);
     this.state = {
            user: {}
        }
  }

  innerRef;
  getInnerRef(ref) {
    this.innerRef = ref;
  }


  getLocation() {
    this.innerRef && this.innerRef.getLocation();
  }
   getUserById(lat, long){
        fetch(`http://data.metromobilite.fr/api/linesNear/json?x=${lat}&y=${long}&dist=500&details=true`)
        .then( (response) => {
            return response.json()
        })
        .then( (json) => {
            this.setState({
                user: json
            })
        });
    }

    componentDidMount() {
        this.getUserById(5.6608439, 45.206305);
    }




  render() {
    // this.state.user.id n'existe pas car il y a plusieurs 'users'
    console.log(this.state.user);

    const { getInnerRef, getLocation } = this;
    return (<div>
      {/*L'erreur se trouve à la ligne 50 lorsque j'essaie d'afficher le contenu de mon json il passe bien par le consol.log*/}
      {/*mais pas par la div*/}
      <p>ID: {this.state.user.toString()}</p>
      <Location ref={getInnerRef}/>
      <button onClick={getLocation}>Get location</button>
    </div>);
  }
}
