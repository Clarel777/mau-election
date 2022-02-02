
console.log("Hello Dapp Developpers!");
const web3 = new Web3(window.ethereum);

//Local blockchain address (Ganache)
//const MauElectionAddress = "0xe4cC38D862339d7e383828cF95f0A19a478aF194";

//ropsten address
const MauElectionAddress = "0x395cc743fFb6Dd2517E9F3A806B960B31EaAdB01"

const MauElectionABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "votedEvent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "party",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "candidatesCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "commissioner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "electionOff",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "closeElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

window.addEventListener('load', function() {
    if(typeof window.ethereum !== undefined){
        console.log("Metamask detected!");
        let mmDetected = document.getElementById("mm-detected");
        //mmDetected.innerHTML = "Metamask has been detected!";
    }

    else {
        console.log("Metamask is not installed!");
        alert("You need to install Metamask!");
    }
});

const mmEnable = document.getElementById("mm-connect");
mmEnable.onclick =  async () => {
    await ethereum.request({method: "eth_requestAccounts"}); // To enable ethereum
    console.log("Metamask connected");
    
}

getcurrentAccount = async () => {
    let account = await ethereum.request({method: "eth_accounts"});
    //console.log(account);
    let mmCurrentAccount = document.getElementById("mm-current-account");
    mmCurrentAccount.innerHTML = "The current Account is " + account;
	return account;

    
}
getcurrentAccount();

const submitVote = document.getElementById("input-vote");

submitVote.onclick = async () => {
	const MauElection = new web3.eth.Contract(MauElectionABI,MauElectionAddress);
	let currentAccount = await ethereum.request({method: "eth_accounts"});

	/// @dev if we do not apply toString to the Ethereum Address, the vote function does
	/// @dev not work correctly.
	
	let currentAccountString = currentAccount.toString();
	console.log(currentAccount);
	let voteValue = document.getElementById("vote-value").value;
	console.log("Voting for candidate no " + voteValue);
	await MauElection.methods.vote(voteValue).send( { from: currentAccountString});
}
const getVoteUpdate = document.getElementById("vote-status");

getVoteUpdate.onclick = async () => {
	const MauElection = new web3.eth.Contract(MauElectionABI,MauElectionAddress);
	let currentAccount = await ethereum.request({method: "eth_accounts"});
	let candidatesCount = await MauElection.methods.candidatesCount().call();
	console.log("Candidates Count is " + candidatesCount);
	let candidates = [];
	let voteUpdate = document.getElementById("vote-update");
  let electionOff = await MauElection.methods.electionOff().call();
  console.log("ElectionOff is " + electionOff);
  if(electionOff == true){
    voteUpdate.innerHTML = "Final Results" + "<br />" + "<br />"; //If Election is closed, we print the final results
    voteUpdate.innerHTML += "Candidate ID" + "&emsp;" +"Name" 
	+"&emsp;" + "Party" +"&emsp;" + "Vote Count\n";
  }
  else{
    voteUpdate.innerHTML = "Candidate ID" + "&emsp;" +"Name" 
	+"&emsp;" + "Party" +"&emsp;" + "Vote Count\n";
  }
	


	for(let i = 0; i < candidatesCount; i++)
	{	
		candidates[i] = await MauElection.methods.candidates(i).call();
		console.log(candidates[i]);
		
		let candidateID = candidates[i][0];
        let name = candidates[i][1];
        let voteCount = candidates[i][2];
        let party = candidates[i][3];

		voteUpdate.innerHTML += "<br />";
		voteUpdate.innerHTML += candidateID + "&emsp;" + name + "&emsp;" + party +  "&emsp;" + voteCount;

	}
	
}

const closeElection = document.getElementById("close-election");

closeElection.onclick = async () => {
  const MauElection = new web3.eth.Contract(MauElectionABI,MauElectionAddress);
	let currentAccount = await ethereum.request({method: "eth_accounts"});
  let currentAccountString = currentAccount.toString();
	await MauElection.methods.closeElection().send({from: currentAccountString});

  const isElectionClosed = document.getElementById("is-election-closed");
  isElectionClosed.innerHTML = "Election is Closed!!!"
  


}









