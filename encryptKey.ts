import { ethers } from "ethers"
import * as fs from "fs-extra"
import "dotenv/config"

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string)
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD as string,
    process.env.PRIVATE_KEY
  )

  fs.writeFileSync("./encryptedJsonKey.json", encryptedJsonKey)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
