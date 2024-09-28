require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

const contract = require('../artifacts/contracts/LifeIsAnIllusion.sol/LifeIsAnIllusion.json');
const contractInterface = contract.abi;

let provider = ethers.provider;

const privateKey = `0x${process.env.KEY}`;
const wallet = new ethers.Wallet(privateKey);

wallet.provider = provider;
const signer = wallet.connect(provider);

const nft = new ethers.Contract(
  '0xC2c434AE04997c95BF5a6004A48B34E4E851B2C9',
  contractInterface,
  signer
);

const main = () => {
  console.log('Waiting for 5 blocks to confirm...');
  nft
    .mint(process.env.PUBLIC_KEY)
    .then((tx) => tx.wait(5))
    .then((receipt) =>
      console.log(
        `Confirmed! Your transaction receipt is: ${receipt.transactionHash}`
      )
    )
    .catch((e) => console.log('Something went wrong', e));
};

main();
