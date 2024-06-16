'use client'

import { useAccount, useConnect, useDisconnect, useWriteContract } from 'wagmi'
import { QueryClient } from '@tanstack/react-query';
import { Connect } from '@/component/Connect';

function App() {
	const { writeContract, data, error: errorWriteContract, status: statusWriteContract } = useWriteContract()

	function increment() {
		console.log('increment')
		writeContract({
			address: '0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3',
			abi: [{
				name: 'increment',
				"inputs": [],
				"outputs": [],
				type: 'function',
				stateMutability: 'nonpayable',
			}],
			functionName: 'increment',
		})
	}

	return (
		<>
			<Connect/>
			<div>
				<button onClick={increment}>Increment</button>
				{statusWriteContract === 'error' &&
            <div>Une erreur est apparu lors de l‘incrémentation: {errorWriteContract?.message}</div>}
				{statusWriteContract === 'success' && <div>l‘incrementation a bien fonctionnée</div>}
			</div>
		</>
	)
}

export default App
