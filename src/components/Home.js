import Footer from "./Footer";
import GameBoard from "./GameBoard";
import BraggBoard from "./BraggBoard";
import WaitingRoom from "./WaitingRoom";

import { useState } from "react";
import { ethers } from "ethers";

const Home = ({primaryPlayer}) =>{
    const activeGame = true;

    const [gameId, setgameId] = useState(0);

    let secondaryPlayer = 'address2';

    /**
     * check if a game is ongoing corresponding to the primary player address:
     * yes -- then get the game details -- {board status, primaryplayer, secondary player, gameId}
     * 
     * gameId ? (secondaryPlayer? GameBoard: Waiting Room): BraggBoard
     */

     const mssgToJoinGame = ()=>{
         // send a transaction to join the room, and generate a gameId, also get the results of the game.
         setgameId(1);
    }

return (

    
    <div>

        {gameId ? (secondaryPlayer ? <GameBoard /> : <WaitingRoom />) : <BraggBoard mssgToJoinGame={()=> mssgToJoinGame()}/>}

        {/* {!activeGame && <BraggBoard/>}
        {activeGame && <GameBoard/>} */}
        <Footer/>
    </div>
)
}

export default Home;

