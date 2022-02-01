const MauElection = artifacts.require("MauElection");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("MauElection", function (/* accounts */) {

  

  it("should assert true", async function () {
    await MauElection.deployed();
    return assert.isTrue(true);
  });

  it("initializes the election with three candidates", async function () {
    let instance = await MauElection.deployed();
    let count = await instance.candidatesCount();
    assert.equal(count, 3);
  });

  it("initializes the candidates with the correct parameters", async function () {
    let instance = await MauElection.deployed();
    let candidate0 = await instance.candidates(0);
    let candidate1 = await instance.candidates(1);
    let candidate2 = await instance.candidates(2);
    
    //remember that the elements of the struct are obtainable by indexing..

    assert.equal(candidate0[0],0, "contains the correct ID");   
    assert.equal(candidate0[1],"John Smith", "contains the correct name"); 
    assert.equal(candidate0[2],0, "the initial vote count is zero"); 
    assert.equal(candidate0[3],"PTR", "the party of the candidate is correct"); 

    assert.equal(candidate1[0],1, "contains the correct ID");   
    assert.equal(candidate1[1],"Ronald Reaver", "contains the correct name"); 
    assert.equal(candidate1[2],0, "the initial vote count is zero"); 
    assert.equal(candidate1[3],"MSM", "the party of the candidate is correct"); 

    assert.equal(candidate2[0],2, "contains the correct ID");   
    assert.equal(candidate2[1],"Jane Reagan", "contains the correct name"); 
    assert.equal(candidate2[2],0, "the initial vote count is zero"); 
    assert.equal(candidate2[3],"MMM", "the party of the candidate is correct"); 
  });

  it("allows the user to vote one time", async function () {
    let instance = await MauElection.deployed();
    let accounts = await web3.eth.getAccounts();
    let candidateId = 1;
    let num = 0;
      
    await instance.vote(candidateId, { from: accounts[0]});
    let voterAccount = accounts[0];

    assert.equal(await instance.voters(voterAccount), true, "The voter has been tagged as having voted");
    let candidate1 = await instance.candidates(candidateId);
    let Count = candidate1[2]; //the vote count is indexed by the third struct element
    assert.equal(Count, 1, "The vote count of the user has been added to the candidate's vote count");
  });

  it("prevents a voter from voting twice", async function () {

    //if the two accounts are different, they will be able to vote
    //and the test will fail to fail. Hence the two accounts must be the same 
    //to check whether the same account to vote twice.
    let instance = await MauElection.deployed();
    let accounts = await web3.eth.getAccounts();
    let candidateId = 1;

    await instance.vote(candidateId, { from: accounts[1]});
     
    candidateId = 0; //change the candidate, but keep the same voter

    try{
      await instance.vote(candidateId, { from: accounts[1]});
    }
    catch(error){
      num = 1;
    }  
    assert.equal(num,1, "voter cannot vote twice")
  });

  it("prevents a voter from voting a candidate with an invalid ID", async function () {
    let instance = await MauElection.deployed();
    let accounts = await web3.eth.getAccounts();
    //This number should be invalid for the test to work.
    //Otherwise, it will fail to fail.
    let candidateId = 99; 
    

    let num = 0;

    try {
      await instance.vote(candidateId, { from: accounts[2]});
    } 
    catch (error) {
        num = 1;
    }
    assert.equal(num,1, "cannot vote candidate with invalid ID");
    });

  it("allows only the commisioner to close the election", async function () {

      let num = 0;
      let accounts = await web3.eth.getAccounts();
      let instance = await MauElection.deployed({from: accounts[0]});
      
      //The test below should fail..
      try {
        await instance.closeElection({ from: accounts[1]});
      } 
      catch (error) {
          num = 1;
      }
      assert.equal(num,1, "Only Commisisoner can close the election");           
    

    num = 0;

    //The test below should pass..
    try {
      await instance.closeElection({ from: accounts[0]});
      num = 1;
         
    } 
    catch (error) {
        num = 0;
      }

    assert.equal(num,1, "The commissioner can close the election"); 
    });
      
  
});


