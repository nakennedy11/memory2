import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<MysteryMatch channel = {channel}/>, root);
}

class MysteryMatch extends React.Component {
  constructor(props) {
    super(props);



    // initiate the buttons randomly
    let tileList = this.initiateTiles();

    this.state = {
      tiles: {},
	    clicks: 0,
	    first: {},
	    second: {},
    };

    this.channel.join()
    .receive("ok", resp=> {
      console.log("Jouined successfully", resp);
      this.setState(resp.game);
    })
    .receive("error", resp => { console.log("Unable to join", resp); })
  }

  tileClick(index) {
    for (var t in this.state.tiles) {
      if(!p.hasOwnProperty(t)) {
        continue;
      }
      if (t.index == index) {
        let tile = t;
      }
    }

    this.channel.push("click", tile)
      .receive("ok", resp => {console.log("click", resp.game);
                              this.setState(resp.game);
                             })

    if (!(_.isEmpty(state.second))) {
      this.checkMatch();
    }
  }

  checkMatch(){
		if (this.state.first.letter == this.state.second.letter) {
      (this.channel.push("reset_click", this.state)
                              .receive("ok", resp => {console.log("match, reset_clicked", resp.game);
                                                      this.setState(resp.game);
                                                    }));
    } else {
      setTimeout((this.channel.push("not_match", this.state)
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
    let tiles = [];
    for (var i = 0; i < 4; i++) {
      tiles[i] = new Array(4);
    }

    for (var t in this.state.tiles) {
      if(!p.hasOwnProperty(t)) {
        continue;
      }
      tiles[t.i][t.j] = t;
      }

	let restartbutton = <button className="restart" onClick={this.restartGame.bind(this)}> Restart Game </button>;

	return (
		<div>
    	  	  <h1> Memory Matching </h1>
	  	  <div className="row">
	    	  <div className="column">Clicks: {this.state.clicks}</div>
	    	  <div className="column">{restartbutton}</div>
	  	</div>
	 	  <div className="row">
	    	  <div className="column"> {<Tile ii={tiles[0][0].i} jj={tiles[0][0].j}
              hidden={tiles[0][0].hidden} letter={tiles[0][0].letter} />} </div>
	    	  <div className="column"> {tiles[0][1]} </div>
	    	  <div className="column"> {tiles[0][2]} </div>
	   	  <div className="column"> {tiles[0][3]} </div>
	  	</div>
	  	  <div className="row">
	    	  <div className="column"> {tiles[1][0]} </div>
	    	  <div className="column"> {tiles[1][1]} </div>
	    	  <div className="column"> {tiles[1][2]} </div>
	    	  <div className="column"> {tiles[1][3]} </div>
	  	</div>
	  	  <div className="row">
	    	  <div className="column"> {tiles[2][0]} </div>
	    	  <div className="column"> {tiles[2][1]} </div>
	    	  <div className="column"> {tiles[2][2]} </div>
	    	  <div className="column"> {tiles[2][3]} </div>
	  	</div>
	  	  <div className="row">
	   	  <div className="column"> {tiles[3][0]} </div>
	    	  <div className="column"> {tiles[3][1]} </div>
	    	  <div className="column"> {tiles[3][2]} </div>
	    	  <div className="column"> {tiles[3][3]} </div>
	  	</div>
		</div>
	);
  }
}

function Tile(props) {
	if (props.hidden) {
		return <button className="tile" onClick={() => props.onClick(this, )}>???</button>
	}
	else {
		return <button className="tile">{props.tileletter}</button>
	}
}
