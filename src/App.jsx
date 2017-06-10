import React,{Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';

class App extends Component{
    constructor(props){
    	super(props);
    	this.state = {
        query:''
      };
    }

    search(){
      console.log('this.state', this.state);
      const TOKEN = 'BQDg5xs29jHVTJDUtdlpqJTx2lxY2tf2SlGaaz2vwxTXojz9g6dbHklSSAdb_03Seml3iKCu_ttNPXxATajpDmNO1WKgH_U5rzsBU4vmIb_AqRE_Qa3z1NFh8_I5RfXeKSozapVaIGYloOMPbOc6YffKOpyn3AZQJw';
      const BASE_URL = 'https://api.spotify.com/v1/search?';
      const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1&access_token='+ TOKEN;
      console.log('FETCH_URL',FETCH_URL);
      fetch(FETCH_URL,{
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
          const artist = 
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
                <div className="Profile">
                    <div>Artist Picture</div>
                    <div>Artist Name</div>
                </div>
                <div className="Gallery">
                    Gallery
                </div>
            </div>
        );
    }
}

export default App;
