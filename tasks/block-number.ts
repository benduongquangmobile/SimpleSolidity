// const { task } = require("hardhat/config")
import { task } from "hardhat/config"
import { run } from "hardhat"

task("block-number", "Prints the current block number").setAction(
  // const blockTask = async function() => {}
  // async function blockTask() {}
  async (_: any, hre: any) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current block number: ${blockNumber}`)
  }
)

run("block-number")

module.exports = {}
