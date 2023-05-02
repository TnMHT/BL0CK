import { assert } from 'chai';
import { ethers, network } from 'hardhat';
import { developmentChains } from '../../helper.hardhat.config';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { FundMe } from '../../typechain-types';

// ONLY RUN IF WE ARE ON A DEVELOPMENT CHAIN
developmentChains.includes(network.name)
	? describe.skip
	: describe('FundMe Staging Tests', async () => {
			let fundMe: FundMe;
			let deployer: SignerWithAddress;

			const sendValue = ethers.utils.parseEther('0.1');
			beforeEach(async function () {
				const accounts = await ethers.getSigners();
				deployer = accounts[0];
				// ASSUMING THAT WERE ALREADY DEPLOYED
				fundMe = await ethers.getContract('FundMe', deployer.address);
			});

			it('Allows people to fund and withdraw', async () => {
				await fundMe.fund({ value: sendValue });
				await fundMe.withdraw({
					gasLimit: 100000,
				});
				const endingFundMeBalance = await fundMe.provider.getBalance(
					fundMe.address
				);
				console.log(
					endingFundMeBalance.toString() +
						' should equal 0, running assert equal...'
				);
				assert.equal(endingFundMeBalance.toString(), '0');
			});
	  });
