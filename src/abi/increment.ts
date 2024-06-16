export const ABI_INCREMENT = {
	name: 'increment',
	"inputs": [],
	"outputs": [],
	type: 'function',
	stateMutability: 'nonpayable',
}

export const ABI_DECREMENT = {
	name: 'decrement',
	"inputs": [],
	"outputs": [],
	type: 'function',
	stateMutability: 'nonpayable',
}

export const ABI_INCREMENTED_BY = {
	name: 'incrementBy',
	"inputs": [{ type: "uint256" }],
	"outputs": [],
	type: 'function',
	stateMutability: 'nonpayable',
}

export const ABI_DECREMENTED_BY = {
	name: 'decrementBy',
	"inputs": [{ type: "uint256" }],
	"outputs": [],
	type: 'function',
	stateMutability: 'nonpayable',
}

export const ABI_GET_COUNT = {
	name: 'count',
	"inputs": [],
	"outputs": [{ type: "uint256" }],
	type: 'function',
	stateMutability: 'view',
}
