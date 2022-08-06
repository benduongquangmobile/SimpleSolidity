import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-etherscan"
import "hardhat/config"
import "dotenv/config"

const RINKEBY_PROVIDER_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.15",
  networks: {
    rinkeby: {
      url: RINKEBY_PROVIDER_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
}
