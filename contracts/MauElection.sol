// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";

///@notice MauElection stands for Mauritius Election. With more experience, the current project
///@notice can be expanded to ressemble more the Mauritian Election system. 

contract MauElection is Ownable {

  ///@dev Modelling of a candidate
  struct Candidate {
    uint id; ///@dev the ID of the candidate, starting with ID 0.
    string name; ///@dev the name of the candidate
    uint voteCount; ///@dev the number of votes the candidate receives
    string party; ///@dev the party to which the candidate belongs

    ///@dev In the future, the following struct elements can be added: constituency;
    ///@dev There are 21 constituencies in Mauritius. Results can be given for each constituency.
  }

  //Store the number of candidates
  uint public candidatesCount;

  address public commissioner;

  ///@dev This boolean operator is used to keep the state of the election (on or off)
  bool public electionOff;

  //Store the candidates with key uint and value struct Candidate
  mapping(uint => Candidate) public candidates;

  //default mapping is false. After a voter has voted, its mapping is updated to true.
  mapping(address => bool) public voters;

  //Registering candidates is done at the time of initializing the contract
  constructor () public {
        registerCandidate("John Smith", "PTR");
        registerCandidate("Ronald Reaver", "MSM");
        registerCandidate("Jane Reagan", "MMM");   
        commissioner = msg.sender;    
  }

  //registering candidate cannot be public.
  function registerCandidate (string memory _candidateName, string memory _party) private {
      candidatesCount ++;
      //We need to subtract 1 in the index because the index of the candidates start with zero
      //but the count of candidates must start with 1, hence we increment candidatesCount prior.
      candidates[candidatesCount-1]= Candidate(candidatesCount-1, _candidateName, 0, _party);
      
  }

  function vote (uint _candidateId) public {
        //require that the election is not closed
        require(electionOff == false);

        // Require that the voter has not voted before
        require(!voters[msg.sender]);

        // Require that the candidate has a valid ID
        require(_candidateId >= 0 && _candidateId <= candidatesCount-1);

        // Update the candidate vote Count
        candidates[_candidateId].voteCount ++;

        // Record that voter has voted 
        voters[msg.sender] = true;       
    }

    ///@dev the function closeElection() can be implemented
    function closeElection() public onlyOwner{ 
      electionOff = true;

    
    }
}


