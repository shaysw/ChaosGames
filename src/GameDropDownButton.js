import React from 'react';

export class GameDropDownButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentGame: this.props.currentGame
        };
    }

    gameSelected(e) {
        this.setState({ currentGame: e.target.innerText })
        this.props.onGameSelected(e)
    }

    render() {
        return (<div className="row col-md-4">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="gamesDropDownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">{this.props.currentGame}</button>
            <ul className="dropdown-menu col-md-2" aria-labelledby="gamesDropDownMenuButton" id="gamesDropDownMenuItems" onClick={this.gameSelected.bind(this)}>
                <li><a className="dropdown-item">Fractals</a></li>
                <li><a className="dropdown-item">Barnsley fern</a></li>
                <li><a className="dropdown-item">Mandelbrot set</a></li>
            </ul>
        </div>)
    }
}