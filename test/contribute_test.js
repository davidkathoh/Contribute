const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contribute", function () {
    it("Should contribute to the contract balance", async function () {
      const [owner, addr1, addr2] = await ethers.getSigners();
      const Contribute = await ethers.getContractFactory("Contribute");
      const contribute = await Contribute.deploy();
      await contribute.deployed();

    let tx=   await contribute.contribute({
        value: ethers.utils.parseEther("1.0")
    });
    await tx.wait();
    expect(await contribute.contributors(0)).to.equal(owner.address);

    tx =  await contribute.connect(addr1).contribute({
        value: ethers.utils.parseEther("1.0")
    });
    await tx.wait()
    expect(await contribute.contributors(1)).to.equal(addr1.address);
    let totalBalance = await contribute.contributionBalance()
    expect(ethers.utils.parseEther("2.0")).to.equal(totalBalance);
    });
    it("Should transfer ownership", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const Contribute = await ethers.getContractFactory("Contribute");
        const contribute = await Contribute.deploy();
        await contribute.deployed();
  
        let tx=   await contribute.transferOwnerShip(addr1.address);
        await tx.wait();
        expect(await contribute.owner()).to.equal(addr1.address);
        await expect( contribute.connect(owner).transferOwnerShip(addr1.address)).to.be.reverted;
      });


      it("Should be able to withdraw", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const Contribute = await ethers.getContractFactory("Contribute");
        const contribute = await Contribute.deploy();
        await contribute.deployed();
  
        let tx =  await contribute.contribute({  value: ethers.utils.parseEther("1.0") });
        await tx.wait();
        tx = await contribute.connect(addr1).contribute({  value: ethers.utils.parseEther("2.0") });
        await tx.wait();
        tx = await contribute.connect(addr2).contribute({  value: ethers.utils.parseEther("3.0") });
        await tx.wait();
        tx = await contribute.distribute();
        await tx.wait();
        await expect( contribute.connect(addr1).distribute()).to.be.reverted;
        let distributedAmount = await contribute.pendingWithdraw(owner.address);
        expect(distributedAmount >0).to.be.true
        tx = await  contribute.withdraw()
        await tx.wait()
        distributedAmount = await contribute.pendingWithdraw(owner.address);
        expect(distributedAmount ==0).to.be.true
      });


      it("Should increase max contribution limit", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const Contribute = await ethers.getContractFactory("Contribute");
        const contribute = await Contribute.deploy();
        await contribute.deployed();
  
      let tx=   await contribute.setContributionLimit(ethers.utils.parseEther("15.0"));
      await tx.wait();
      expect(await contribute.contributionLimit()).to.equal(ethers.utils.parseEther("15.0"));
      await expect( contribute.connect(addr1).setContributionLimit(ethers.utils.parseEther("15.0"))).to.be.reverted;
      
     
      });
  });