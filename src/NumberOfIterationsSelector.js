import React from 'react';

export class NumberOfIterationsSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfIterations: this.props.numberOfIterations
        };
    }

    onNumberOfIterationsChanged(e){
        var newNumberOfIterations = e.target.value
        this.setState({ numberOfIterations: newNumberOfIterations })
        this.props.onNumberOfIterationsChanged(newNumberOfIterations)
    }

    render() {
        return (
            <div className="row text-center py-4 align-content-between">
                <div className="d-flex justify-content-start align-items-center col-md-6">
                    Number of iterations</div>
                <div className="row col-md-2">
                    <input className="form-control" id="numberOfIterations" type="number"
                        value={this.props.numberOfIterations} onChange={this.onNumberOfIterationsChanged.bind(this)}/>
                </div>
            </div>
        )
    }
}