import React from 'react';

class Track extends React.Component {
    constructor(props){
        super(props);
        /* Binding component methods */
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction(){
        const result = (this.isRemoval)? '-': '+';
        return result;
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button className="Track-action" onClick={(this.renderAction() === '+')? this.addTrack: this.removeTrack}>{this.renderAction()}</button>
            </div>
            )
    }
}

export default Track;