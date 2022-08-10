import { ethers } from "hardhat"
import { assert } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", () => {
  let simpleStorageFactory: SimpleStorage__factory
  let simpleStorage: SimpleStorage

  beforeEach(async () => {
    // Deploy contract
    simpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("should start with a value of 0", async () => {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("should update when we call store", async () => {
    const newValue = "42"
    const transactionRespone = await simpleStorage.store(newValue)
    await transactionRespone.wait(1)
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), newValue)
  })
})
