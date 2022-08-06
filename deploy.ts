import { ethers } from "ethers"
import * as fs from "fs-extra"
import "dotenv/config"

const aibFilePath = "contacts_SimpleStorage_sol_SimpleStorage.abi"
const binFilePath = "contacts_SimpleStorage_sol_SimpleStorage.bin"

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  // ! Old wallet code.
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)

  // const encryptedJsonKey = fs.readFileSync("./encryptedJsonKey.json", "utf8")
  // console.log("prev deploy")
  // // @ts-ignore
  // const wallet = await new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJsonKey,
  //   process.env.PRIVATE_KEY_PASSWORD
  // ).connect(provider)
  const binary = fs.readFileSync(binFilePath, "utf8")
  const abi = fs.readFileSync(aibFilePath, "utf8")
  // const { chainId } = await provider.getNetwork()

  // TODO: send transaction factory
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  const contract = await contractFactory.deploy({
    gasLimit: 10000000000000,
  })
  await contract.deployTransaction.wait(1)
  console.log("deployed")
  console.log("address", contract.address)

  let currentFavoriteNumber = await contract.retrieve()
  const transactionRespone = await contract.store("7")
  currentFavoriteNumber = await contract.retrieve()

  // ! deploy with only transaction data !
  // TODO: send transaction
  // const tx = {
  //   nonce: await provider
  // .getTransactionCount(wallet.address),
  //   gasLimit: 1000000,
  //   gasPrice: 20000000000,
  //   to: null,
  //   value: 0,
  //   data: "0x" + binary,
  //   chainId: chainId,
  // };
  // const sendedTx = await wallet.sendTransaction(tx);
  // await sendedTx.wait(1);
  // console.log(sendedTx);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("error", err)
    process.exit(1)
  })
