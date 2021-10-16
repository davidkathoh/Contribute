# Contribute

The SmartContract accepts contributions in eth from people and then divides the Eth up evenly and distributes it to the people who contributed. Here's the link to the deployed contract [etherscan](https://rinkeby.etherscan.io/address/0x3e52889B9A76EF5D96e5EDa30D4cAd5BE15243F4).

#### Project setup

```
npm install
```

#### Running tests

```
npx hardhat test
```

#### Deployment on Rinkedby testnet

Create an .env file on root project level and fill in the project url(setup a test project on [Alchemy](https://www.alchemy.com/)) and the wallet address's private key

```
TEST_ALCHEMY_URL = "ALCHEMY_TEST_PROJECT_URL"
TEST_PRIVATE_KEY = "WALLET_ADDRESS_PRIVATE_KEY"
```

Finaly to deploy run

```
 npx hardhat run scripts/deploy.js --network rinkeby
```



