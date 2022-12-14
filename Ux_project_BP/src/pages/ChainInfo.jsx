import { useState, useEffect} from 'react'
import Web3 from 'web3'
import {useNavigate} from 'react-router-dom'

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

function ChainInfo() {

  if (typeof window.ethereum == 'undefined'){

    useEffect(() => {
    const navigate = useNavigate()
    navigate('/not-found') 
    }
    , [])   
  }
  const [chainID, setChainID] = useState(0)
  const [account, setAccount] = useState([])
  
  return (
    <div>
        <h1>Chain Info</h1>
        <p>Chain ID: {chainID}</p>
        <p>Account: {account}</p>
        <button onClick={async () => {
            const result = await Sepoliaconnect()
            setChainID(result.chainId)
            setAccount(result.account)
        }}>Connect</button>
        
    </div>
  )
}

export default ChainInfo
