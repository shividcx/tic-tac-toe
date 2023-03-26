import Footer from "./Footer";
import GameBoard from "./GameBoard";
import BraggBoard from "./BraggBoard";
import WaitingRoom from "./WaitingRoom";

import { useState, useEffect } from "react";
import { getContract } from '../services/CustomEthers.service';

const Home = ({ primaryPlayer }) => {
    const [gameId, setgameId] = useState(0);
    const [isRunning, setisRunning] = useState(false);
    const [player2, setplayer2] = useState(null);
    const [player2Name, setplayer2Name] = useState('');
    const [player1Name, setplayer1Name] = useState('');
    const [gameboard, setgameboard] = useState([Array(3).fill(''), Array(3).fill(''), Array(3).fill('')]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const contract = getContract();
        async function getActiveGameIdfunc(playerAddress) {
            let gameId = await contract.getActiveGameId(playerAddress);
            if (gameId > 0) {
                let gameDetails = await contract.getGame(gameId - 1);
                let [player1Name, player2, player2Name, turn, isRunning] = gameDetails;

                console.log('from game details', gameDetails.player1Name);

                console.log('game details::', gameDetails);
                setisRunning(parseInt(Number(isRunning)));

                setplayer2(player2);

                setplayer2Name(player2Name);
                setplayer1Name(player1Name);

                setplayer1Name(gameDetails.player1Name);
                setplayer2Name(gameDetails.player2Name);

                console.log('the game board::', gameDetails.board[0][0]._hex);

                transformBoard(gameDetails.board);
                console.log('new board::', gameDetails.board);

            }
        }

        getActiveGameIdfunc(primaryPlayer);

    }, [])


    function transformBoard(board){
        let newBoard = [Array(3).fill(''), Array(3).fill(''), Array(3).fill('')];
        board.forEach((row, i)=>{
            row.forEach((col, j)=>{
                console.log('the val is::', board[i][j], col._hex)
                col = parseInt(Number(col._hex));
                switch(col){
                    case 0: newBoard[i][j] = ''
                    break;
                    case 1: newBoard[i][j] = 'X';
                    break;
                    case 2: newBoard[i][j] = 'O';
                    break;
                }
            })
        })
        setgameboard(newBoard);
    }


    let secondaryPlayer = 'address2';
    const activeGame = true;

    /**
     * check if a game is ongoing corresponding to the primary player address:
     * yes -- then get the game details -- {board status, primaryplayer, secondary player, gameId}
     * 
     * gameId ? (secondaryPlayer? GameBoard: Waiting Room): BraggBoard
     */

    const mssgToJoinGame = () => {
        // send a transaction to join the room, and generate a gameId, also get the results of the game.
        // setgameId(1);
        // console.log(isRunning, gameId)

    }

    return (
        <div>
            {gameId>=0 ? (isRunning ?
                <GameBoard player1Name={player1Name} player2Name={player2Name} gameBoard={gameboard} />
                : <WaitingRoom />)
                : <BraggBoard mssgToJoinGame={() => mssgToJoinGame()} />}

            {/* {!activeGame && <BraggBoard/>}
        {activeGame && <GameBoard/>} */}
            <Footer />
        </div>
    )
}

export default Home;

