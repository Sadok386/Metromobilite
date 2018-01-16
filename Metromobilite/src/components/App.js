import React from 'react';
import Location from './Location';
import queryString from 'query-string';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.getInnerRef = this.getInnerRef.bind(this);
    this.getLocation = this.getLocation.bind(this);
     this.state = {
            users: [],
        }
      this.data = {
            position: [],
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
        .then((json) => {
            this.setState({
              
                users:json,
            })
        });
    }

    componentDidMount() {
        this.getUserById(5.6608439, 45.206305);
    }
 getHorraire(lines){
        fetch(`http://data.metromobilite.fr/api/ficheHoraires/json?route=${lines}:{X}&time={Y}`)
        .then( (response) => {
            return response.json()
        })
        .then((json) => {
            this.setState({
              
                users:json,
            })
        });
    }



  render() {
    // this.state.user.id n'existe pas car il y a plusieurs 'users'
    console.log(this.data.position)
    const { getInnerRef, getLocation, getUserById } = this;
    return (<div>
    {
      this.state.users.map((dynamicData,key)=>
      <div>{dynamicData.id}:
      {dynamicData.name}</div>
      )
    }
      <Location ref={getInnerRef}/>
      <button onClick={getUserById}>Trouver les arrets</button>
    </div>);
  }
}
