import { ethers } from 'ethers';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
	// CONNECTION TO THE BLOCKCHAIN GANACHE
	const provider = new ethers.JsonRpcProvider(process.env.RPC_SERVER);

	// CONNECT TO OUR WALLET WITH OUR PRIVATE KEY TO SIGN DIFFERENT TRANSACTIONS
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

	// const encryptedJson = fs.readFileSync('./.encryptedKey.json', 'utf8');
	// let wallet = new ethers.Wallet.fromEncryptedJsonSync(
	// 	encryptedJson,
	// 	process.env.PRIVATE_KEY_PASSWORD
	// );
	// wallet = await wallet.connect(provider);

	// GRABBING THE ABI & BINARY DATA FROM OUR CONTRACTS
	const abi = fs.readFileSync('./SimpleStorage_sol_SImpleStorage.abi', 'utf8');
	const binrary = fs.readFileSync(
		'./SimpleStorage_sol_SImpleStorage.bin',
		'utf8'
	);
	// CONNECT THEM TO OUR NEW OBJECT WHICH IS CONNECTED TO WALLET
	const contractFactory = new ethers.ContractFactory(abi, binrary, wallet);
	console.log('DEPLOYING CONTRACT. WAIT...');

	// DEPLOY THE CONTRACT
	const contract = await contractFactory.deploy(); // STOP HERE. WAIT FOR CONTRACT TO DEPLOY
	await contract.waitForDeployment(1);
	await contract.deploymentTransaction();
	const address = await contract.getAddress();
	console.log(`Contract Address ${address}`);

	// console.log(contract);

	// GET INTIAL NUMBER
	const currentFavNumber = await contract.retrieve();
	console.log(`CURRENT FAV NUMBER: ${currentFavNumber.toString()}`);

	// UPDATE CONTRACT
	const transactionResponse = await contract.store('7'); // GET RESPONSE
	const transactionReceipt = await transactionResponse.wait(1); // GET RECEIPT

	// GET UPDATED NUMBER
	const updatedFavoriteNumber = await contract.retrieve();
	console.log(`UPDATED FAV NUMBER: ${updatedFavoriteNumber.toString()}`);
}
main()
	.then(() => process.exit(0))
	.catch((error) => console.error(error));
