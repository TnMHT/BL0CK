/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, ContractRunner } from 'ethers';
import type {
	SimpleStorage_sol_SimpleStorage,
	SimpleStorage_sol_SimpleStorageInterface,
} from '../SimpleStorage_sol_SimpleStorage.js';

const _abi = [
	{
		inputs: [
			{
				internalType: 'string',
				name: '_name',
				type: 'string',
			},
			{
				internalType: 'uint256',
				name: '_favoriteNum',
				type: 'uint256',
			},
		],
		name: 'addPerson',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string',
			},
		],
		name: 'nameToFavoriteNum',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'people',
		outputs: [
			{
				internalType: 'uint256',
				name: 'favoriteNumber',
				type: 'uint256',
			},
			{
				internalType: 'string',
				name: 'name',
				type: 'string',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'retrieve',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_favoriteNum',
				type: 'uint256',
			},
		],
		name: 'store',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
] as const;

export class SimpleStorage_sol_SimpleStorage__factory {
	static readonly abi = _abi;
	static createInterface(): SimpleStorage_sol_SimpleStorageInterface {
		return new Interface(_abi) as SimpleStorage_sol_SimpleStorageInterface;
	}
	static connect(
		address: string,
		runner?: ContractRunner | null
	): SimpleStorage_sol_SimpleStorage {
		return new Contract(
			address,
			_abi,
			runner
		) as unknown as SimpleStorage_sol_SimpleStorage;
	}
}
