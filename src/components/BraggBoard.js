import { useState } from "react";
import './BraggBoard.css'

const EnterGame = ({ ongoingGame, joinGameHandler}) => {

    return (
        <div>
            <button onClick={()=> joinGameHandler('JoinGame')}>{ongoingGame ? 'Join Game' : 'Create Room'}</button>
        </div>
    )
}

const Braggboard = ({ongoingGame, mssgToJoinGame}) => {
    let dummyWinnerList = [
        {
            address: '0x7AdC0B7EeC346a122Dc8059Da0F9556E790B302d',
            name: 'Harry Potter',
        },

        {
            address: '0x7AdC0B7EeC346a122Dc8059Da0F9556E790B302d',
            name: 'shaktiman',
        },

        {
            address: '0x7AdC0B7EeC346a122Dc8059Da0F9556E790B302d',
            name: 'Spider Man',
        },

        {
            address: '0x7AdC0B7EeC346a122Dc8059Da0F9556E790B302d',
            name: 'Iron Man',
        },

    ]

    // listen to event and update the winnerlist accordingly
    const [winnersList, setWinnersList] = useState(dummyWinnerList)
    
    // function mssgToJoinGame(mssg){
    //     alert(mssg);
    // }

    return (
        <div className="wrapper">
            <div className="winnersList">
            <div>
                {winnersList.map(winners => {
                    return (
                        <div class="winner_row">{winners.name}</div>
                    )
                })}
            </div>
            </div>
            <div className="enter_game_sec">
                <EnterGame ongoingGame={true} joinGameHandler={()=> mssgToJoinGame()} />
            </div>
           
        </div>

    )
}

export default Braggboard;


