import { useEffect, useState } from "react";
import Home from './components/Home';

import {initEthers, getProvider, getContract} from './services/CustomEthers.service';

function MetamaskNew() {
    const [primaryPlayer, setprimaryPlayer] = useState(undefined);
    useEffect(()=>{
        initEthers();
    }, [])

    async function connectToMetamask() {
        const provider = getProvider();

        const accounts = await provider.send('eth_requestAccounts', []);
        setprimaryPlayer(accounts[0]);

        // const contract = getContract();
        // let tx = await contract.joinGame(0, 'user1');
        // console.log('tx::', tx);
        // contract.on('GameCreated', (gameId, event)=>{
        //     console.log('the event::', event, gameId);
        // })
    }


    function renderMetamask() {
        if (!primaryPlayer) {
            return (
                <button onClick={() => connectToMetamask()}>Connect to Metamask</button>
            )
        } else {
            return (
                <>
                    <p>Welcome {primaryPlayer}</p>
                    <Home primaryPlayer={primaryPlayer}/>
                </>
            );
        }
    }

    return (
        <div>
            {renderMetamask()}
        </div>
    )
}

export default MetamaskNew;