import { useEffect, useState } from "react";
import Home from './components/Home';

import {initEthers, getProvider} from './services/CustomEthers.service';

function MetamaskNew() {
    const [primaryPlayer, setprimaryPlayer] = useState(undefined);
    useEffect(()=>{
        initEthers();
    }, [])

    async function connectToMetamask() {
        const provider = getProvider();
        const accounts = await provider.send('eth_requestAccounts', []);
        setprimaryPlayer(accounts[0]);
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
                    <Home />
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