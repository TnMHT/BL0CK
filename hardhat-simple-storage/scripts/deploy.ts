import { ethers, network } from 'hardhat';

async function main() {
	const [deployer] = await ethers.getSigners();

	const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');

	const SimpleStorage = await SimpleStorageFactory.deploy();
	await SimpleStorage.deployed();

	if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
		// WAIT FOR A FEW BLOCKS
		console.log('WAITING FOR A FEW BLOCKS');
		await SimpleStorage.deployTransaction.wait(6);
		await verify(SimpleStorage.address, []);
	}
	const currentValue = await SimpleStorage.retrieve();
	console.log(`CURRENT VALUE: ${currentValue}`);
	// UPDATE VALUE
	const transactionResponse = await SimpleStorage.store(7);
	await transactionResponse.wait();
	const updatedValue = await SimpleStorage.retrieve();
	console.log(`UPDATED VALUE: ${updatedValue}`);

	console.log('DEPLOYOING CONTRACT... ');
	console.log('DEPLOYER ADDRESS:', deployer.address);
	console.log('ACCOUNT BALANCE:', (await deployer.getBalance()).toString());
	console.log(`SIMPLE STORAGE ADDRESS: ${SimpleStorage.address}`);
	console.log(network.config);
}

async function verify(contractAddress, args) {
	try {
		await run('verify:verify', {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (e) {
		if (e.message.toLowerCase().includes('already verified')) {
			console.log('ALREADY VERIFIED');
		} else {
			console.log(e);
		}
	}

	console.log('VERIFYING CONTRACT...');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
