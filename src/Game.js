import React from 'react';
import './index.css';
import * as fractals from './fractals.js'
import * as barnsleyFern from './barnsleyFern.js'
import * as mandelbrot from './mandelbrot.js'
import { GameDropDownButton } from './GameDropDownButton';
import { NumberOfIterationsSelector } from './NumberOfIterationsSelector';

let
  ctx = false,
  canvas = null,
  width, height = 0,
  defaultNumberOfIterations = 10000,
  erased, started = false,
  currentPoint = [0, 0]

export class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentGame: fractals,
      numberOfIterations: defaultNumberOfIterations
    }
  }

  onGameSelected(e) {
    var currentGameString = e.target.innerText

    switch (currentGameString) {
      case 'Fractals':
        this.setState({ currentGame: fractals })
        this.setState({ numberOfIterations: 10000 })
        break
      case 'Barnsley fern':
        this.setState({ currentGame: barnsleyFern })
        this.setState({ numberOfIterations: 20000 })
        break
      case 'Mandelbrot set':
        this.setState({ currentGame: mandelbrot })
        break
    }

    this.erase(true)
  }

  componentDidMount() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
  }

  handleCanvasOnClick(e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;

    if (!started) {
      this.state.currentGame.onClick(x, y, ctx)
    }
    else {
      this.zoomIn(x, y)
    }
  }

  onNumberOfIterationsChanged(newNumberOfIterations) {
    this.setState({ numberOfIterations: newNumberOfIterations })
  }

  zoomIn(x, y) {
    this.state.currentGame.zoomIn(x, y)
    this.start()
  }

  start() {
    if (this.state.currentGame === fractals && fractals.anchorPoints.length < 3) {
      alert("Please choose at least 3 anchor points to generate a meaningful image")
      return
    }

    erased = false
    started = true

    if (this.state.currentGame !== mandelbrot) {
      for (var i = 0; i < this.state.numberOfIterations; i++) {
        if (erased) {
          break
        }
        setTimeout(() => {
          currentPoint = this.state.currentGame.getNextPoint(currentPoint)
          this.drawPoint(currentPoint[0], currentPoint[1])
        }, 10)
      }
    }
    else {
      for (var row = 0; row < height; row++) {
        for (var col = 0; col < width; col++) {
          var numberOfIterationsUntilScattered = mandelbrot.getNumberOfIterationsUntilScattered(row, col)
          if (numberOfIterationsUntilScattered >= mandelbrot.maxNumberOfIterations) {
            this.drawPoint(row, col)
          }
          else {
            if (numberOfIterationsUntilScattered < 5) {
              this.drawPoint(row, col, "red")
            }
            else if (numberOfIterationsUntilScattered < 10) {
              this.drawPoint(row, col, "yellow")
            }
            else if (numberOfIterationsUntilScattered < 15) {
              this.drawPoint(row, col, "green")
            }
            else if (numberOfIterationsUntilScattered < 20) {
              this.drawPoint(row, col, "blue")
            }
          }
        }
      }
    }
  }

  drawPoint(x, y, style = "black", size = 1) {
    ctx.beginPath();
    ctx.fillStyle = style;
    ctx.fillRect(x, y, size, size);
    ctx.closePath();
  }

  erase(force = false) {
    var clearMessage = force
    
    if (!force) {
      clearMessage = window.confirm("Clear the canvas?");
    }
    
    if (clearMessage) {
      ctx.clearRect(0, 0, width, height);
    }
    this.state.currentGame.erase()
    erased = true
    started = false
  }

  resetSettings() {
    this.setState({ numberOfIterations: defaultNumberOfIterations })
    this.setState({ currentGame: fractals })
  }

  render() {
    return (
      <div className="row figure-holder align-items-center">
        <div className="col-12 col-md-6 pt-3 pt-md-4">
          <h2 className="site-headline font-weight-bold">Fractal-based chaos games</h2>
          <div className="site-tagline mb-3">Based on the linked video, I created a fractal generator, which
            iterates over a simple set of rules, and generates a beatiful image. To try it out, draw 3 lines
            of a triangle and hit "start". Next, try with a square or a pentagram<br /><br />
          </div>
          <div>
            <button id="submit" type="button" className="btn btn-secondary btn-lg" onClick={this.start.bind(this)}>
              Start
            </button>
            <button className="btn btn-default right-aligned-button" type="button" onClick={this.erase.bind(this)}>
              <img src="../assets/fontawesome/svgs/solid/eraser.svg" width="40px" />
            </button>
            <button className="btn btn-default right-aligned-button" data-bs-toggle="modal"
              data-bs-target="#settingsModal">
              <img src="../assets/fontawesome/svgs/solid/cog.svg" width="40px" />
            </button>
            <button className="btn btn-default right-aligned-button" type="button"
              onClick={() => window.open("https://www.youtube.com/watch?v=kbKtFN71Lfs", "_blank")}>
              <img src="../assets/fontawesome/svgs/solid/question-circle.svg" width="40px" />
            </button>
            <div className="modal fade bd-example-modal-lg" id="settingsModal" tabIndex="-1"
              aria-labelledby="settingsModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="settingsModalLabel">Settings</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                      aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form id="settingsForm" className="lead-sm">
                      <div className="row text-center py-4 align-content-between flex-wrap">
                        <span className="d-flex justify-content-start align-items-center col-md-6">Choose game</span>
                        <GameDropDownButton currentGame={this.state.currentGame.getName()}
                          onGameSelected={this.onGameSelected.bind(this)} />
                      </div>
                      <NumberOfIterationsSelector numberOfIterations={this.state.numberOfIterations}
                        onNumberOfIterationsChanged={this.onNumberOfIterationsChanged.bind(this)} />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">OK
                    </button>
                    <button type="button" className="btn btn-danger"
                      onClick={this.resetSettings.bind(this)}>Reset</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 pt-3 pt-md-4">
          <div className="d-block mx-lg-auto img-fluid">
            <canvas id="canvas" width="500" height="500" style={{ border: "2px solid" }} onClick={this.handleCanvasOnClick.bind(this)}></canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
