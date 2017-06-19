import React,{Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
class App extends Component{
    constructor(props){
    	super(props);
    	this.state = {
        query:'',
        artist:null,
        tracks:null
      };
    }

    search(){
      console.log('this.state', this.state);
      const TOKEN = 'BQCOkBPhmvYrJr7xd5rZ2Xk4rkvZX0CW4b3j5q5UhFXXBf93WulpwSqfM72RIkieyGXWfEAl9JewFXKOpwV0E74988cGeyCLrpU0y34OU_RRzZYKg8oUMLfwxggKVGH466K_RQR7u-wIKmunm023-WwhNjRAfSzlkw';
      const BASE_URL = 'https://api.spotify.com/v1/search?';
      const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
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
          const ALBUM_FETCH_URL = ALBUM_URL + artist.id + '/top-tracks?country=US&access_token='+ TOKEN;
          console.log('ALBUM_FETCH_URL',ALBUM_FETCH_URL);
          fetch(ALBUM_FETCH_URL,{
            method: 'GET'
          })
          .then(response => response.json())
          .then(json => {
            console.log('artist\'s top-tracks',json);
            const { tracks } = json;
            this.setState({tracks:tracks}); // this line can be re-written as 'this.setState({tracks})', because key and value has same name!  
          })
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
                {
                  this.state.artist !== null
                  ? <div>
                      <Profile
                         artist={this.state.artist}
                      />
                      <div className="Gallery">
                        Gallery
                      </div>
                    </div>
                  : <div></div>
                }

            </div>
        );
    }
}

export default App;
