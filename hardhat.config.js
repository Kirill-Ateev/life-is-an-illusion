require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.2',
  networks: {
    polygon_mumbai: {
      url: process.env.POL_API,
      accounts: [process.env.KEY],
    },
    sepolia: {
      url: process.env.ETH_SEPOLIA_API,
      accounts: [process.env.KEY],
    },
    ethereum: {
      url: process.env.ETH_API,
      accounts: [process.env.KEY],
    },
  },

  etherscan: {
    apiKey: {
      polygonMumbai: '',
      sepolia: '',
      mainnet: '',
    }, //polygonscan API key
  },
};
