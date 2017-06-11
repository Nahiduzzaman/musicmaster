import React,{Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
class App extends Component{
    constructor(props){
    	super(props);
    	this.state = {
        query:'',
        artist:null
      };
    }

    search(){
      console.log('this.state', this.state);
      const TOKEN = 'BQDOLTcxVtxyRRNZcQ-_0U7Xehe-8e50BNs_h24on7_PqSohwBqrpBvdPb5mqzowXYCPStqkgcXAbew1NfYI_2TUfxO4yPPckKi2OS8tY4D4RkoCKQO2WhY1XPm5FPfkGBMX82hycpefX17BgE8jwDihsi-C9qfPEw';
      const BASE_URL = 'https://api.spotify.com/v1/search?';
      const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1&access_token='+ TOKEN;
      console.log('FETCH_URL',FETCH_URL);
      fetch(FETCH_URL,{
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
          const artist = json.artists.items[0];
          console.log('artist',artist);
          this.setState({artist:artist});
      });
    }
    render() {
        return (
            <div className="app">
                <div className="app-title">Music Master</div>
                <FormGroup>
                  <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="Search for an Artist"
                      value={this.state.query}
                      onChange={event => this.setState({query : event.target.value})}
                      onKeyPress={event => {
                        if(event.key === 'Enter'){
                          this.search();
                        }
                      }}
                    />
                    <InputGroup.Addon onClick={()=>this.search()}>
                      <Glyphicon glyph="search"></Glyphicon>
                    </InputGroup.Addon>
                  </InputGroup>
                </FormGroup>
                <Profile
                  artist={this.state.artist}
                />
                <div className="Gallery">
                    Gallery
                </div>
            </div>
        );
    }
}

export default App;
