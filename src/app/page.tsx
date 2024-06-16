'use client'

import { useAccount, useConnect, useDisconnect, useWriteContract } from 'wagmi'
import { QueryClient } from '@tanstack/react-query';

function App() {
	const account = useAccount()

	const { connectors, connect, status, error } = useConnect()
	const { disconnect } = useDisconnect()
	const { writeContract, data, error: errorWriteContract } = useWriteContract()

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
		console.log(data)
	}

	return (
		<>
			<div>
				<h2>Account</h2>
				<div>
					status: {account.status}
					addresses: {JSON.stringify(account.addresses)}
					chainId: {account.chainId}
				</div>
				{account.status === 'connected' && (
					<button type="button" onClick={() => disconnect()}>
						Disconnect
					</button>
				)}
			</div>
			<div>
				<h2>Connect</h2>
				{connectors.map((connector) => (
					<button key={connector.uid} onClick={() => connect({ connector })} type="button">
						{connector.name}
					</button>
				))}
				<div>{status}</div>
				<div>{error?.message}</div>
			</div>
			<div>
				<button onClick={increment}>Increment</button>
				{errorWriteContract?.message}
			</div>
		</>
	)
}

export default App
