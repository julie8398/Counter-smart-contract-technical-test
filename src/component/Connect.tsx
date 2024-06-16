import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Connection_status } from '@/utils/status';

export function Connect() {
	const account = useAccount()

	const { connectors, connect, status, error } = useConnect()
	const { disconnect } = useDisconnect()
	return <>
		<div>
			<div>
				<h2>Account</h2>
				<div>status: {account.status}</div>
				<div>addresses: {JSON.stringify(account.addresses)}</div>
			</div>
			{account.status === Connection_status.CONNECTED && (
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
			<div>{error?.message}</div>
		</div>
	</>
}
