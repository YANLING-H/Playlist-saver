import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';
import React from 'react';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      searchResults: [
        {name: 'bloom', artist:'iu', album:'bloom',id:'02'}
      ], 
      playlistName: 'My favoriate songs',
      playlistTracks: [
        {name: 'bloom', artist:'iu', album:'bloom',id:'02'}
      ]};
    /* Binding component methods */
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.state({searchResults: searchResults})
    })
  }

  savePlaylist(){

  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  addTrack(track){
    for (let i = 0; i < this.state.playlistTracks.length; i++){
      if (track.id === this.state.playlistTracks[i].id){
        return;
      }
    }
    this.state.playlistTracks.push(track);
    this.setState({playlistName: this.state.playlistTracks});
  }
  
  removeTrack(track){
    this.setState({playlistTracks : this.state.playlistTracks.filter(myTrack => myTrack.id !== track.id)});
  }
  

  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <PlayList playlistName={this.state.playlistName}
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
