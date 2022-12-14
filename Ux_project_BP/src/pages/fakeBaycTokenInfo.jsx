import { useState, useEffect} from 'react'
import Web3 from 'web3'
import contract from '../fakeBayc.json'
import { IpfsImage } from 'react-ipfs-image';

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

function fakeBaycTokenInfo() {

    const web3 = new Web3(window.ethereum);
    const contractAddress = "0x1dA89342716B14602664626CD3482b47D5C2005E";
    const contractInstance = new web3.eth.Contract(contract, contractAddress);
    const [tokenId, setTokenID] = useState(0);
    const [attributes, setAttributes] = useState("")
    const [image, setimage] = useState("")
    const [total, setTotal] = useState()

    async function TokenInfos(){
        const result= await Sepoliaconnect()
        await contractInstance.methods.totalSupply().call((err, supply) => {setTotal(supply)});

        if(tokenId >= total){
            alert("This token doesn't exist yet")
            throw Error("Token inexistant")
          }
          else{
            
          let info= await contractInstance.methods.tokenURI(tokenId).call()
          const jsonURI = await fetch(info).then(res => res.json());    
          //const metaData = await fetch(jsonURI).then(res => res.json());
          setAttributes(JSON.stringify(jsonURI.attributes))
          setimage(jsonURI.image)
          //await contractInstance.methods.tokenURI(tokenId).call((err, result) => {setimage(result)})
        }
    }
    const handleChamp = (event)=>{
        setTokenID(event.target.value)
    }

  return (
    <div>
        <h1>Fake Bayc Token Infos</h1>
        <p>Token ID : {tokenId}</p>
        <p>Attributes : {attributes}</p>
        <input type="number" value={tokenId} onChange={handleChamp}/>
        <button onClick={TokenInfos}>Get Infos</button>
        {image!=="" && 
        <p>
        <IpfsImage hash={image}/>
        </p>
        }
    </div>
  )
}

export default fakeBaycTokenInfo
