import React,{Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            query:'',
            artist:null,
            tracks:[]
        };
    }

    search(){
        console.log('this.state', this.state);
        const GET_TOKEN_URL = 'http://localhost:8888/refresh_token?refresh_token=AQBYGrolFwxTUzM57sjSLPZMT_jZCLDN7iykByFoIyAc_-Ky1CE4upwVgxNAOOOwHdvidLEghUnnjjvJOV4H1M8645Gp9piqUQ8LKVr-X5QQj6HAgFILt9pYw5KddyfI9c0';
        fetch(GET_TOKEN_URL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(json => {
            console.log('parsed json', json) // access json.body here
            const TOKEN = json.access_token;
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
                    this.setState({tracks}); // this line can be re-written as 'this.setState({tracks})', because key and value has same name!
                })
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
                        <Gallery
                            tracks={this.state.tracks} //tracks is props it will be passed on Gallery Component
                        />
                    </div>
                    : <div></div>
                }

            </div>
        );
    }
}

export default App;
