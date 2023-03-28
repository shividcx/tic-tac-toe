import './NewGameBoard.css';
import { useState,  useEffect} from 'react';
import { getContract } from '../services/CustomEthers.service';


const Player = ({ name, active = false }) => {
    return (
        <div className={`player ${active? 'active': ''}`}>{name}</div>
    )
}

const NewGameBoard = ({ gameId, primaryPlayer, player1, player2, player1Name, player2Name, gameBoard, turnAdd }) => {

    const [board, setboard] = useState(gameBoard);
    const [turn, setturn] = useState(turnAdd);
    const [activePlayer, setactivePlayer] = useState('');
    const contract = getContract();

    useEffect(() => {
    let playerToPlay = turn?.toLowerCase() === player1?.toLowerCase() ? 'player1': 'player2';
    setactivePlayer(playerToPlay);
    }, [turn])
    

    useEffect(() => {
        contract.on('Move', (id, playedBy, row, col)=>{
            console.log('move event::');
            if(parseInt(id)+1 === parseInt(gameId)){
                let newBoard = [...board];
                switch(playedBy?.toLowerCase()){
                    case player1?.toLowerCase(): newBoard[row][col] = 'X';
                    break;
                    case player2?.toLowerCase(): newBoard[row][col] = 'O';
                    break;
                    default: newBoard[row][col] = '';
                    break;  
                }
                setboard(newBoard);
                let newTurn = playedBy.toLowerCase() === player1.toLowerCase() ? player2 : player1;
                setturn(newTurn);
            }
        })

        contract.on('WinnerDecleared', (id, winner)=>{
            if(parseInt(id)+1 === parseInt(gameId)){
                let winnerName = winner.toLowerCase() === player1.toLowerCase() ? player1Name : player2Name;
                alert(`Game Over !!! Winner is ${winnerName}`);
                alert('Please refresh the page and start a new game');
            }
            
        })

    }, [])
    
    

    async function handleTurn(row, col){
        if(turn?.toLowerCase()!==primaryPlayer || board[row][col]) return;
        let moveTx = await contract.play(parseInt(gameId)-1, row, col);
        console.log('moveTx::', moveTx);
    }

    function renderTicTacToeBoard(arr) {
        return (
            arr.map((row, i) => {
                return (
                    <div key={i} className="row">
                        {row.map((col, j) => {
                            return (
                                <div key={j + i} className="col" onClick={()=>{handleTurn(i,j)}}>{col}</div>)
                        })}
                    </div>
                )
            })
        )
    }

    return (
        <div className='game_board_wrapper'>
            <div className="tic_tac_toe">
                <div className="Header">
                    Tic Tac Toe
                </div>
                <div className="play_arena">
                    <div>
                        <Player name={player1Name} active={activePlayer === 'player1'} />
                    </div>
                    <div className="board">
                        {renderTicTacToeBoard(board)}
                    </div>
                    <div>
                        <Player name={player2Name} active={activePlayer === 'player2'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewGameBoard;