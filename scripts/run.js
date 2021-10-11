
const main = async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const contributeContractFactory = await hre.ethers.getContractFactory('Contribute');
    const contributeContract = await contributeContractFactory.deploy();
    await contributeContract.deployed();
   console.log("Contract deployed to:",contributeContract.address);
    
  
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
  