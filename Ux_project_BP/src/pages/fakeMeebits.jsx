import { useState, useEffect} from 'react'
import Web3 from 'web3'
import contract from '../fakeMeebitsclaimer.json'
import sig from '../sig.json'


async function Sepoliaconnect() {
    const eth =window.ethereum
    await eth
    .request({ method: "eth_requestAccounts" })
    .then(() => console.log("Connected to MetaMask"));
  
    const web3 = new Web3(eth)
    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.getChainId()
    return {account:accounts[0], chainId}
  }

function fakeMeebits() {

    const web3 = new Web3(window.ethereum);
    const contractAddress = "0x5341e225Ab4D29B838a813E380c28b0eFD6FBa55";
    const contractInstance = new web3.eth.Contract(contract, contractAddress);
    const [token, setToken] = useState(0)
    const [temptoken, setTokenID] = useState(0)
    
    async function ChooseToken(tokenId) {
        
        if(await contractInstance.methods.tokensThatWereClaimed(tokenId).call()){
            alert("This token has alredy been mint"); 
            return false;
        }
        else{

            return true;
        }

    }
    const handleChamp = (event)=>{
        setTokenID(event.target.value)
    }
  return (
    <div>
        <h1>Fake Meebits</h1>
        <input type="number" value={temptoken} onChange={handleChamp}/>
        <button onClick={async () => {
            if(ChooseToken(temptoken)===true){
            setToken(temptoken)
            const result= await Sepoliaconnect()
            const account=result.account
            const _signature = sig[token].signature; 
            await contractInstance.methods.claimAToken(token, _signature).send({ from: account})
            }
        }}>Mint</button>
        
    </div>
  )
}

export default fakeMeebits
