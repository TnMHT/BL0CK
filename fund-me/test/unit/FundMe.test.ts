import { deployments, ethers, getNamedAccounts, network } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { assert, expect } from 'chai';
import { FundMe, MockV3Aggregator } from '../../typechain-types';
import { developmentChains } from '../../helper.hardhat.config';

describe('FundMe', async () => {
	let fundMe: FundMe;
	let deployer: SignerWithAddress;
	let mockV3Aggregator: MockV3Aggregator;
	const sendValue = ethers.utils.parseEther('1'); // 1 ETH

	beforeEach(async () => {
		// DEPLOY OUR FUNDME CONTRACT
		// USING HARDHAT DEPLOY
		if (!developmentChains.includes(network.name)) {
			throw 'You need to be on a development chain to run tests';
		}
		const accounts = await ethers.getSigners();
		deployer = accounts[0];
		//console.log('DEPLOYER: ', deployer);

		await deployments.fixture(['all']);
		fundMe = await ethers.getContract('FundMe', deployer);
		mockV3Aggregator = await ethers.getContract('MockV3Aggregator', deployer);
		// console.log('FUNDME', fundMe);
		// console.log('MOCKV3', mockV3Aggregator);
	});

	describe('constructor', () => {
		it('sets the aggregator addresses correctly', async () => {
			const response = await fundMe.s_priceFeed();
			assert.equal(response, mockV3Aggregator.address);
		});
	});

	describe('Fund', async () => {
		it('failse if you dont send enough ETH'),
			async () => {
				await expect(fundMe.fund()).to.be.revertedWith(
					'YOU NEED TO SPEND MORE ETH!'
				);
			};
		it('Updates the amount funded data structure', async () => {
			await fundMe.fund({ value: sendValue });
			const response = await fundMe.s_addressToAmountFunded(deployer.address);
			assert.equal(response.toString(), sendValue.toString());
		});
		it('Adds funder to array of funders', async () => {
			await fundMe.fund({ value: sendValue });
			const funder = await fundMe.s_funders(0);
			assert.equal(funder, deployer.address);
		});
	});

	describe('Withdraw', async () => {
		beforeEach(async () => {
			await fundMe.fund({ value: sendValue });
		});
		it('withdraw ETH from a single founder', async () => {
			// ARRANGE
			const startingFundMeBalance = await fundMe.provider.getBalance(
				fundMe.address
			);
			const startingDeployerBalance = await fundMe.provider.getBalance(
				deployer.address
			);

			// ACT
			const transactionResponse = await fundMe.withdraw();
			const transactionReceipt = await transactionResponse.wait();
			const { gasUsed, effectiveGasPrice } = transactionReceipt;
			const gasCost = gasUsed.mul(effectiveGasPrice);

			const endingFundMeBalance = await fundMe.provider.getBalance(
				fundMe.address
			);
			const endingDeployerBalance = await fundMe.provider.getBalance(
				deployer.address
			);

			// ASSERT
			assert.equal(endingFundMeBalance.toString(), '0');
			assert.equal(
				startingFundMeBalance.add(startingDeployerBalance).toString(),
				endingDeployerBalance.add(gasCost).toString()
			);
		});
	});
});
