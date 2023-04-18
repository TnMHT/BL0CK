import { ethers } from 'ethers';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
	const encryptedJsonKey = await wallet.encrypt(
		process.env.PRIVATE_KEY_PASSWORD
	);
	fs.writeFileSync('./.encryptedKey.json', encryptedJsonKey);
}

main()
	.then(() => process.exit(0))
	.catch((error) => console.error(error));
