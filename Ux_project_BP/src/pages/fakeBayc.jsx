import { useState, useEffect} from 'react'
import Web3 from 'web3'
import contract from '../fakeBayc.json'


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

function fakeBayc() {

    const web3 = new Web3(window.ethereum);
    const contractAddress = "0x1dA89342716B14602664626CD3482b47D5C2005E";
    const contractInstance = new web3.eth.Contract(contract, contractAddress);
    const [Name, setName] = useState("")
    const [tot, settotal] = useState(0)

  return (
    <div>
        <h1>Fake Bayc</h1>
        <p>Name : {Name}</p>
        <p>Total Supply : {tot}</p>
        <button onClick={async () => {
            contractInstance.methods.totalSupply().call((err, result) => { settotal(result) })
            contractInstance.methods.name().call((err, result) => { setName(result) })
        }}>Connect</button>
        
        <button onClick={async () => {
            const result= await Sepoliaconnect()
            const account=result.account
            await contractInstance.methods.claimAToken().send({ from: account })
        }}>Claim a Token</button>
        
    </div>
  )
}

export default fakeBayc
