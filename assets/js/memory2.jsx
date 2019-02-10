import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
  ReactDOM.render(<MysteryMatch channel={channel}/>, root);
}

class MysteryMatch extends React.Component {
  constructor(props) {
    super(props);

    this.channel = props.channel;

    this.state = {
      tiles: [],
	    clicks: 0,
	    first: {},
	    second: {},
    };

    this.channel
    .join()
    .receive("ok", resp=> {
      console.log("Joined successfully", resp.game);
      this.setState(resp.game);
    })
    .receive("error", resp => { console.log("Unable to join", resp); });
  }

  tileClick(index) {
    for (var t in this.state.tiles) {
      if(!this.state.tiles.hasOwnProperty(t)) {
        continue;
      }
      if (t.index == index) {
        let tile = t;
      }
    }

    this.channel.push("click", tile)
      .receive("ok", resp => {console.log("click", resp.game);
                              this.setState(resp.game);
                            });

    if (!(_.isEmpty(state.second))) {
      this.checkMatch();
    }
  }

  checkMatch(){
		if (this.state.first.letter == this.state.second.letter) {
      this.channel.push("reset_click", {})
                              .receive("ok", resp => {console.log("match, reset_clicked", resp.game);
                                                      this.setState(resp.game);
                                                    });
    } else {
      setTimeout((this.channel.push("not_match", {})
                              .receive("ok", resp => {console.log("not a match", resp.game);
                                                      this.setState(resp.game);
                                                    })), 800);
    }
	}

  // sets the game back to a starting state with a new set of random tiles
  restartGame() {
	   this.channel.push("new", {})
     .receive("ok", resp => {console.log("new", resp.game);
                              this.setState(resp.game);});
  }

  render() {
    //let tiles = [];
//    for (var i = 0; i < 4; i++) {
//      tiles[i] = [0, 0, 0, 0];
//    }

    //let tiles = Object.values(this.state);
    console.log("state:", this.state);
    console.log("TILETEST", this.state.tiles[0]);
/*    for (var t in this.state.tiles) {

      if(!this.state.tiles.hasOwnProperty(t)) {
        continue;
      }
      console.log(t);
      tiles[t.i][t.j] = t;
      }
*/
// let tiles = this.state.tiles;
// console.log("array of tiles:", this.state.tiles);
// console.log("tile 0 attempt:", tiles[0])
	let restartbutton = <button className="restart" onClick={this.restartGame.bind(this)}> Restart Game </button>;

	return (
		<div>
    	  	  <h1> Memory Matching </h1>
	  	  <div className="row">
	    	  <div className="column">Clicks: {this.state.clicks}</div>
	    	  <div className="column">{restartbutton}</div>
	  	</div>
	 	  <div className="row">
	    	  <div className="column"> {<Tile hidden={tiles[0].hidden}
                                          letter={tiles[0].letter}
           onClick={this.tileClick.bind(this, tiles[0].index)} />} </div>
	    	  <div className="column"> {<Tile hidden={tiles[0][1].hidden}
                                          letter={tiles[0][1].letter}
           onClick={this.tileClick.bind(this, tiles[0][1].index)} />} </div>
	    	  <div className="column"> {<Tile hidden={tiles[0][2].hidden}
                                          letter={tiles[0][2].letter}
           onClick={this.tileClick.bind(this, tiles[0][2].index)} />} </div>
	   	  <div className="column"> {<Tile hidden={tiles[0][3].hidden}
                                        letter={tiles[0][3].letter}
         onClick={this.tileClick.bind(this, tiles[0][3].index)} />} </div>
	  	</div>
	  	  <div className="row">
	    	  <div className="column"> {<Tile hidden={tiles[1][0].hidden}
                                          letter={tiles[1][0].letter}
           onClick={this.tileClick.bind(this, tiles[1][0].index)} />} </div>
	    	  <div className="column"> {<Tile hidden={tiles[1][1].hidden}
                                          letter={tiles[1][1].letter}
           onClick={this.tileClick.bind(this, tiles[1][1].index)} />} </div>
	    	  <div className="column"> {<Tile hidden={tiles[1][2].hidden}
                                          letter={tiles[1][2].letter}
           onClick={this.tileClick.bind(this, tiles[1][2].index)} />} </div>
	    	  <div className="column"> {<Tile hidden={tiles[1][3].hidden}
                                          letter={tiles[1][3].letter}
           onClick={this.tileClick.bind(this, tiles[1][3].index)} />} </div>
	  	</div>
	  	  <div className="row">
	    	  <div className="column"> {<Tile hidden={tiles[2][0].hidden}
                                          letter={tiles[2][0].letter}
           onClick={this.tileClick.bind(this, tiles[2][0].index)} />} </div>
	    	  <div className="column"> {<Tile hidden={tiles[2][1].hidden}
                                          letter={tiles[2][1].letter}
           onClick={this.tileClick.bind(this, tiles[2][1].index)} />} </div>
	    	  <div className="column"> {<Tile hidden={tiles[2][2].hidden}
                                          letter={tiles[2][2].letter}
           onClick={this.tileClick.bind(this, tiles[2][2].index)} />} </div>
	    	  <div className="column"> {<Tile hidden={tiles[2][3].hidden}
                                          letter={tiles[2][3].letter}
           onClick={this.tileClick.bind(this, tiles[2][3].index)} />} </div>
	  	</div>
	  	  <div className="row">
	   	  <div className="column"> {<Tile hidden={tiles[3][0].hidden}
                                        letter={tiles[3][0].letter}
         onClick={this.tileClick.bind(this, tiles[3][0].index)} />} </div>
	    	  <div className="column"> {<Tile hidden={tiles[3][1].hidden}
                                          letter={tiles[3][1].letter}
           onClick={this.tileClick.bind(this, tiles[3][1].index)} />} </div>
	    	  <div className="column"> {<Tile hidden={tiles[3][2].hidden}
                                          letter={tiles[3][2].letter}
           onClick={this.tileClick.bind(this, tiles[3][2].index)} />} </div>
	    	  <div className="column"> {<Tile hidden={tiles[3][3].hidden}
                                          letter={tiles[3][3].letter}
           onClick={this.tileClick.bind(this, tiles[3][3].index)} />} </div>
	  	</div>
		</div>
	);
  }
}

function Tile(props) {
	if (props.hidden) {
		return <button className="tile" onClick={() => props.onClick(this, props.index)}>???</button>
	}
	else {
		return <button className="tile">{props.letter}</button>
	}
}
