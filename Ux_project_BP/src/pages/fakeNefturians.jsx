import { useState, useEffect} from 'react'
import Web3 from 'web3'
import contract from '../fakeNefturians.json'


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

function fakeNefturians() {

    const web3 = new Web3(window.ethereum);
    const contractAddress = "0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED";
    const contractInstance = new web3.eth.Contract(contract, contractAddress);
    const [Name, setName] = useState("")
    const [Price, setPrice] = useState()
    const [Price2, setPrice2] = useState()

    

  return (
    <div>
        <h1>Fake Nefturians</h1>
        <p>Name : {Name}</p>
        <p>Price : {Price2} SepETH</p>
        <button onClick={async () => {
            const price = await contractInstance.methods.tokenPrice().call()
            setPrice(String(price*1.00001))
            setPrice2(web3.utils.fromWei(String(Price)))
            contractInstance.methods.name().call((err, result) => { setName(result) })
        }}>Connect</button>
        
        <button onClick={async () => {
            const result= await Sepoliaconnect()
            const account=result.account
            await contractInstance.methods.buyAToken().send({ from: account, value:Price})
        }}>Buy a Token</button>
        
    </div>
  )
}

export default fakeNefturians
