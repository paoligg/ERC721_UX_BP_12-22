import { useState, useEffect} from 'react'
import { render } from 'react-dom';
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

function fakeNefturiansUserInfo() {

    const web3 = new Web3(window.ethereum);
    const contractAddress = "0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED";
    const contractInstance = new web3.eth.Contract(contract, contractAddress);
    const [list, setList] = useState([]);

    
    async function getToken(){

        const result= await Sepoliaconnect()
        const account=result.account

        let bal = await contractInstance.methods.balanceOf(account).call();  
        let tempArr = [];

        for( let i = 0; i < bal; i++){
          
            let tempTokenId = await contractInstance.methods.tokenOfOwnerByIndex(account,i).call(); 
            let URI = await contractInstance.methods.tokenURI(tempTokenId).call();
            let fetchUri = await fetch(URI).then(res => res.json());  
            console.log(fetchUri);
            tempArr.push([tempTokenId ,fetchUri.image, fetchUri.name, fetchUri.description]);
            
        }
       setList(tempArr); 
       console.log(tempArr)
       console.log(list);
    } 

  return (
    <div>
        <h1>Fake Nefturians User Infos</h1>
        <button onClick={getToken}>Get Infos </button>
        {
            list.map((token,i)=>
                <li key={i}>
                Token ID : {token[0]}
                <br></br>
                Name : {token[2]}
                <br></br>
                <img src={token[1]}></img>
                <br></br>
                Description : {token[3]}
                <br></br>
                </li>
            )
        }
    </div>
  )
}

export default fakeNefturiansUserInfo
