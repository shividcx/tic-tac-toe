import { ethers } from "ethers";
import { useEffect } from "react";

const UseEthers = (contractAddress, contractAbi) => {
    const [provider, setprovider] = useState(null);
    const [contract, setcontract] = useState(null);

    useEffect(()=>{
        const init = async () =>{
            const ethersProviders = new ethers.providers.Web3Provider(window.ethereum);
            setprovider(ethersProviders);
            const signer = ethersProvider.getSigner();
            const ethersContract = new ethers.contract(contractAddress, contractAbi, signer);
            setcontract(ethersContract);
        };
        init();
    }, [contractAddress, contractAbi]);

    return [provider, contract];
}

export default UseEthers;