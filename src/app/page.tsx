'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { QueryClient } from '@tanstack/react-query';

function App() {
	const account = useAccount()

	const { connectors, connect, status, error } = useConnect()
	const { disconnect } = useDisconnect()

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
		</>
	)
}

export default App
