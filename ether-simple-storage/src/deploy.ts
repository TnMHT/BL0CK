import { ethers } from 'ethers';
import fs from 'fs';

async function main() {
	const rpcServer = 'HTTP://127.0.0.1:7545';
	const privateKey =
		'0x6fcac237545f3716d7bd53f984a811df3ede3491ae75385bafb481c35bc3d9b7';
	// CONNECTION TO THE BLOCKCHAIN
	const provider = new ethers.JsonRpcProvider(rpcServer);
	// WALLET WITH OUR PRIVATE KEY TO SIGN DIFFERENT TRANSACTIONS
	const wallet = new ethers.Wallet(privateKey, provider);

	const abi = fs.readFileSync('./SimpleStorage_sol_SImpleStorage.abi', 'utf8');
	const binrary = fs.readFileSync(
		'./SimpleStorage_sol_SImpleStorage.bin',
		'utf8'
	);
	const contractFactory = new ethers.ContractFactory(abi, binrary, wallet);
	console.log('DEPLOYING CONTRACT. WAIT...');
	const contract = await contractFactory.deploy(); // STOP HERE. WAIT FOR CONTRACT TO DEPLOY
	const deploymentReceipt = await contract.deploymentTransaction();
	//console.log(contract);
	console.log(deploymentReceipt);
}

main();
