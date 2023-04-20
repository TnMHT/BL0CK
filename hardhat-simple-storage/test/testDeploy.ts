import { ethers } from 'hardhat';
import { SimpleStorage } from '../typechain-types';
import { expect, assert } from 'chai';

describe('SimpleStorage', () => {
	let SimpleStorage: SimpleStorage, SimpleStorageFactory;
	beforeEach(async () => {
		SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
		SimpleStorage = await SimpleStorageFactory.deploy();
	});

	it('Should start with a favourtie number of 0', async () => {
		const currentValue = await SimpleStorage.retrieve();
		const expectedValue = '0';

		// assert or expect
		assert.equal(currentValue.toString(), expectedValue);
	});

	it('Should update when we call store', async () => {
		const expectedValue = '7';
		const transactionResponse = await SimpleStorage.store(expectedValue);
		await transactionResponse.wait(1);

		const currentValue = await SimpleStorage.retrieve();
		assert.equal(currentValue.toString(), expectedValue);
	});
});
