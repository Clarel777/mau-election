**Design Patern Used in the Project:**

Two design patterns which have been used in this project are:
- Inheritance: the contract Ownable from Openzeppelin was extended to build the Contract of the project, MauElection. 
- Access Control: The modifier "onlyOwner" from the Ownable Contract was used to restrict access to the closeElection function, so that only the owner (or the Election Commissioner) has that power.


