import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

const defaultValue = 'New Playlist';
class Playlist extends React.Components {
    render(){
        return (
            <div className="Playlist">
                <input value={defaultValue}/>
                <TrackList tracks={this.props.playlistTracks} 
                           onRemove={this.props.onRemove}
                           isRemoval={true}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;