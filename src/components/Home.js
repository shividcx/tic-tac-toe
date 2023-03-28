import Footer from "./Footer";
import NewGameBoard from "./NewGameBoard";
import BraggBoard from "./BraggBoard";
import WaitingRoom from "./WaitingRoom";
import { useState, useEffect } from "react";
import { getContract } from '../services/CustomEthers.service';

const Home = ({ primaryPlayer }) => {
    const [gameId, setgameId] = useState(-1);
    const [isRunning, setisRunning] = useState(false);
    const [player2, setplayer2] = useState(null);
    const [player2Name, setplayer2Name] = useState('');
    const [player1Name, setplayer1Name] = useState('');
    const [gameboard, setgameboard] = useState([Array(3).fill(''), Array(3).fill(''), Array(3).fill('')]);
    const [turn, setTurn] = useState(null);
    const [successJoinGame, setsuccessJoinGame] = useState(false);
    // const [loading, setLoading] = useState(true); loaders to be added
    const [player1, setplayer1] = useState(null);

    useEffect(() => {

        const contract = getContract();
        async function getActiveGameIdfunc(playerAddress) {
            let gameId = await contract.getUserActiveGame(playerAddress);
            if (gameId > 0) {
                let gameDetails = await contract.getGame(gameId - 1);
                setplayer1(gameDetails.player1);
                setplayer2(gameDetails.player2);
                setisRunning(parseInt(Number(gameDetails.isRunning)));
                setplayer1Name(gameDetails.player1Name);
                setplayer2Name(gameDetails.player2Name);
                transformBoard(gameDetails.board);
                setTurn(gameDetails.turn);
                setgameId(gameId);
                console.log('game details::', gameDetails);
            }
        }

        getActiveGameIdfunc(primaryPlayer);

    }, [])


    function transformBoard(board) {
        let newBoard = [Array(3).fill(''), Array(3).fill(''), Array(3).fill('')];
        board.forEach((row, i) => {
            row.forEach((col, j) => {
                col = parseInt(Number(col._hex));
                switch (col) {
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

    /**
     * check if a game is ongoing corresponding to the primary player address:
     * yes -- then get the game details -- {board status, primaryplayer, secondary player, gameId}
     * 
     * gameId ? (secondaryPlayer? GameBoard: Waiting Room): BraggBoard
     */

    async function mssgToJoinGame() {
        let name = prompt('Please enter your name');
        const contract = getContract();
        try {
            let tx = await contract.joinGame(0, name);
            console.log('tx to join the game::', tx);
            contract.on('GameCreated', (gameId, add) => {
                // the address needs to be confirmed here
                console.log('the game is created', gameId, add);
                if (add.toLowerCase() == primaryPlayer.toLowerCase()) {
                    setgameId(parseInt(gameId));
                    setsuccessJoinGame(true);
                }
            })

            contract.on('GameStarted', (gameId, player1, player2, turnAdd) => {
                console.log('game started event::', gameId, player1, player2, turnAdd);
                if (primaryPlayer.toLowerCase() == player1.toLowerCase() || primaryPlayer.toLowerCase() == player2.toLowerCase()) {
                    setTurn(turnAdd);
                }
            })
        } catch (err) {
            alert(err.message);
        }


    }

    return (
        <div>
            {gameId >= 0 ? (isRunning ?
                <NewGameBoard gameId={gameId}
                    primaryPlayer={primaryPlayer}
                    player1={player1} player2={player2}
                    player1Name={player1Name} player2Name={player2Name}
                    gameBoard={gameboard}
                    turnAdd={turn} />
                : <WaitingRoom />)
                : <BraggBoard mssgToJoinGame={() => mssgToJoinGame()} />}
            <Footer />
        </div>
    )
}

export default Home;

