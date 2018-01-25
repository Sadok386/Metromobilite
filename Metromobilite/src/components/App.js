import React from 'react';
import Location from './Location';
import queryString from 'query-string';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.getInnerRef = this.getInnerRef.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.getStopTimes = this.getStopTimes.bind(this);
    this.getHorraire = this.getHorraire.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
     this.state = {
            users: [],
            lat: 0,
            lng: 0,
            busStop: [],
            ok: [],
        }
      this.data = {
            position: [],
        }
  }

 
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
                ok : json.map((dynamicData,key)=>
            {dynamicData.id}
        ),
            })
            console.log(json);
        });
    }
    
getMyPosition(){
        fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD92vPPN0LB7ZZNm6x2E1TB1hgzd4xwF3c`, {
           method: 'POST',
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then( (response) => {
            return response.json()
        })
        .then((json) => {
            this.setState({
              
                lat:json.location.lat,
                lng:json.location.lng,
            })
        });
    }
    getStopTimes(busId){
      
      fetch(`https://data.metromobilite.fr/api/routers/default/index/stops/${busId}/stoptimes`)
        .then( (response) => {
            return response.json()
        })
        .then((json) => {
            this.setState({
              
                busStop:json,

            })
        });
    }

    getHorraire(){
      return(
        this.state.users.map((dynamicDato,key)=>
            {dynamicDato.id}
        )
        )
      
    }
    componentDidMount() {
      this.getMyPosition();
      this.getStopTimes(this.state.users.id);
      this.getUserById(this.state.lng, this.state.lat);
    }

  render() {
    const { props } = this;
    console.log(this.state.bus)
    let items = this.state.busStop
    const { getInnerRef, getLocation, getUserById, componentDidMount, getStopTimes } = this;
    return (<div>
    {items.map(item => <h4>{item.pattern.shortDesc}</h4>)}
    {
      this.state.users.map((dynamicData,key)=>
      <li key={dynamicData.id}><button onClick={getStopTimes(dynamicData.id)}>
      {dynamicData.id}
      </button>
      :
      {dynamicData.name}
      </li>
      )
    }
       
      <Location ref={getInnerRef}/>
      <button onClick={componentDidMount}>Trouver les arrets a proximité de chez moi</button>
    </div>);
  }
}
