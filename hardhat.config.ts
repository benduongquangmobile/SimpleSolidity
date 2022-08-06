import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "hardhat/config"
import "dotenv/config"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@typechain/hardhat"

const RINKEBY_PROVIDER_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARTKETCAP_API_KEY = process.env.COINMARTKETCAP_API_KEY

module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.15",
  networks: {
    rinkeby: {
      url: RINKEBY_PROVIDER_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    showTotalCost: true,
    showIndividualCost: true,
    outputFile: "gas-reporter-report.txt",
    coinmarketcap: COINMARTKETCAP_API_KEY,
    noColor: true,
  },
}
