import "@nomiclabs/hardhat-ethers"
import "dotenv/config"
import { ethers, network, run } from "hardhat"

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying SimpleStorage...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log("SimpleStorage deployed at", simpleStorage.address)
  console.log("network.config.chainId", network.config.chainId)
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying deployment...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log("Current value:", currentValue)
  // update the current value
  const transactionResponse = await simpleStorage.store(8)
  await transactionResponse.wait(1)
  const newValue = await simpleStorage.retrieve()
  console.log("New value:", newValue)
}

async function verify(contractAddress: any, args: any) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      args: args,
    })
  } catch (error: any) {
    if (error.message.includes("verify:verify")) {
      console.log("Deployment verified")
    } else {
      console.log("Deployment failed", error)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("error", err)
    process.exit(1)
  })
