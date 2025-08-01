require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    "edu-chain-testnet": {
      url: "https://rpc.open-campus-codex.gelato.digital",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 656476,
      gasPrice: 20000000000, // 20 gwei
      gas: 2100000,
    },
    "edu-chain": {
      url: "https://rpc.edu-chain.raas.gelato.cloud",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 41923,
      gasPrice: 20000000000, // 20 gwei
      gas: 2100000,
    },
  },
  etherscan: {
    apiKey: {
      "edu-chain-testnet": "XXXX",
      "edu-chain": "XXXX",
    },
    customChains: [
      {
        network: "edu-chain-testnet",
        chainId: 656476,
        urls: {
          apiURL: "https://edu-chain-testnet.blockscout.com/api",
          browserURL: "https://edu-chain-testnet.blockscout.com",
        },
      },
      {
        network: "edu-chain",
        chainId: 41923,
        urls: {
          apiURL: "https://explorer.edu-chain.raas.gelato.cloud/api",
          browserURL: "https://explorer.edu-chain.raas.gelato.cloud",
        },
      },
    ],
  },
}; 