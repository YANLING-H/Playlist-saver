import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';
import React from 'react';


class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      searchResults: [
      {name: 'eight', artist:'iu', album:'eight',id:'01'}
    ],
      playlistName: 'My favoriate songs',
      playlistTracks: [
        {name: 'bloom', artist:'iu', album:'bloom',id:'02'}
      ]};
    /* Binding component methods */
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  addTrack(track){
    for (let i = 0; i < this.state.playlistTracks.length; i++){
      if (track.id == this.state.playlistTracks[i].id){
        return;
      }
    }
    this.state.playlistTracks.push(track);
    this.setState({playlistName: this.state.playlistTracks});
  }
  
  removeTrack(track){
    this.state.playlistTracks = this.state.playlistTracks.filter(myTrack => {myTrack.id != track.id})
    this.setState({playlistTracks : this.state.playlistTracks});
  }

  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <PlayList playlistName={this.state.playlistName}
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}/>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
