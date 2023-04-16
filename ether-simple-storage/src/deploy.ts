import { ethers } from 'ethers';
import fs from 'fs';

async function main() {
	const rpcServer = 'HTTP://127.0.0.1:7545';
	const privateKey =
		'0x6fcac237545f3716d7bd53f984a811df3ede3491ae75385bafb481c35bc3d9b7';
	// CONNECTION TO THE BLOCKCHAIN GANACHE
	const provider = new ethers.JsonRpcProvider(rpcServer);
	// CONNECT TO OUR WALLET WITH OUR PRIVATE KEY TO SIGN DIFFERENT TRANSACTIONS
	const wallet = new ethers.Wallet(privateKey, provider);
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
	await contract.deploymentTransaction();

	console.log(contract);

	// GET NUMBER
	const retriveFunction = await contract.getFunction('retrieve');
	const currentFavNumber = await contract.retrieve();
	console.log(currentFavNumber);
}

main();
