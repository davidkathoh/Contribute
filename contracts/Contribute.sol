//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract Contribute{
address public owner;
uint public contributionBalance;
uint  public contributionLimit = 10 ether;
mapping (address=>uint) public contributions;
using SafeMath for uint256;
address[] public contributors;
mapping (address=>uint) public pendingWithdraw;

constructor(){
    owner = msg.sender;
}
function contribute() public  payable{
    uint currentContribution = contributions[msg.sender];
    require(currentContribution.add(msg.value)<= contributionLimit && msg.value >0,"maximum contribution reached or no ether is sent");
    contributionBalance = contributionBalance.add(msg.value);
    contributions[msg.sender] =  contributions[msg.sender].add(msg.value);
    contributors.push(msg.sender);
   
}

function distribute() public onlyOwner{
    require(contributors.length>0);
    uint amountPerContributor = contributionBalance.div(contributors.length);
    for(uint i =0;i< contributors.length;i++){
        pendingWithdraw[contributors[i]] =  pendingWithdraw[contributors[i]].add(amountPerContributor);
    }
    contributionBalance = 0;
    delete contributors;
}

function withdraw() public {
    uint amount = pendingWithdraw[msg.sender];
    pendingWithdraw[msg.sender] = 0 ;
    payable(msg.sender).transfer(amount);
}
function transferOwnerShip(address newOwner) public onlyOwner{
    owner = newOwner;
}

function setContributionLimit(uint _limit) public onlyOwner{
    contributionLimit = _limit;
}
modifier onlyOwner(){
    require(owner == msg.sender,"only the owner is  allowed to call this function");
    _;
}
}