**1. Project Overview:**

This project builds a basic Ethereum-based Election system. The candidates are instantiated with the constructor and a commissioner (the owner of the contract) is assigned. Only the commissioner can close the election and declare the final results. Voters are allowed to vote only once. Furthermore, no one can vote once the election has been declared as closed. The project can be run on the local blockchain with Ganache or with the Ropsten test network. Note that the project is based on vanilla javascript. Future editions can make use of React.

The name MauElection is used to represent Mauritius Election. Eventually, the code can be expanded to represent the election system of the country. But this is a long way ahead!

**2. Dependencies:**

The dependencies to the project are as follows:
1. `npm install` (this install the node modules required)
2. `npm install truffle` (to install the truffle development environment)
3. `npm install dotenv` (to use the .env file to store the Infura API key and the seed phrase). 
4. `npm install @openzeppelin/contracts` (this will help to use the Ownable contract from OpenZeppelin) 
5. `npm install @truffle/hdwallet-provider@2.0.1` (to provide access for the ropsten network. Using version 2.0.2 caused a bug. See https://stackoverflow.com/questions/70911092/truffle-migrations-cb-is-not-a-function)
6. `npm install fs` (to use the toString() function to retrieve the seed phrase from the .env file)
7. Install the Ganache UI at https://trufflesuite.com/ganache/ (to be used as a local Blockchain)
8. Install the Metamask extension to the browser (to be used as Wallet)

**3. Compiling, testing and migrating the smart contract to the local blockchain:**

1. Ensure that ganache is properly, installed and that the truffle-config.js file is properly linked to a ganache workspace.
2. Use the following commands:
- `truffle compile`: to check if all the dependencies are properly installed and work well
- `truffle test`: to check whether the contract passes all the test defined
- `truffle migrate` or `truffle migrate --reset` to migrate the smart contract to ganache
- Copy the contract address to the MauElectionAddress variable in dapp.js

**4. Migrating to the Ropsten test network:**

1. Ensure that a ropsten account is funded (by using a ropsten faucet) and create additional accounts and fund them as well. 5 accounts is considered enough for the test. Each account should have some ether. 
2. Ensure that the .env file is populated with the following:
- INFURA_API_KEY= Your infura key
- MNEMONIC="list of twelve phrases to be added here for it to work"
3. Use the following command: `truffle migrate --network ropsten` or `truffle migrate --network ropsten --reset` for a fresh deployment.
4. Copy the contract address to the MauElectionAddress variable in dapp.js

**5. Running the App:**

1. It is advised to use developper tools of the browser to show the console. This can be very helpful in debugging
2. The main html file is index.html. Launching the file should bring up the App page. 
3. Click on "Connect to Metamask" to connect the app to Metamask. Ensure that the accounts (ganache or ropsten are appropriately funded). Note: Ganache accounts can be imported using their corresponsing private keys.
4. Click on "Get Updated Vote Status" to see the status of the vote results. Initially, all three candidates would have a score of zero.
5. Vote by choosing either "0", "1", or "2", representing the indexes of the candidates. Note that there are only three candidates. Clicking on "Submit Vote" will trigger a confirmation request from Metamask. If on the ropsten network, this will take about 15 seconds to be mined on the blockchain. 
6. If the same account tries to vote twice, the transaction will fail.
7. After a user has voted, clicking on "Get Updated Vote Status" again will reflect the updated vote counts.
8. If a user, other than the owner of the smart contract (check this account when migrating the contract) tries to close the election, it will result in a failure.
9. Once the "commissioner" clicks on the "Close Election", the final results will be displayed and no one can vote anymore.

**6. Demo Website of the app:**

A demo website of the App is provided at https://clarel777.github.io/blockchain-developer-bootcamp-final-project/. 

**7. My public Ethereum Account:**
0xba85Efb74D2ED29Bd64C4301337b06E2345eA6B5







