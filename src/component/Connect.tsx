import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function Connect() {
	const account = useAccount()

	const { connectors, connect, status, error } = useConnect()
	const { disconnect } = useDisconnect()
	return <div>
		<div>
			<h2>Account</h2>
			<div>
				<div>status: {account.status}</div>
				<div>addresses: {JSON.stringify(account.addresses)}</div>
				<div>chainId: {account.chainId}</div>
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
	</div>
}
