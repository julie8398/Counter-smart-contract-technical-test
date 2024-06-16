import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnexionStatus } from '@/utils/status';

const METAMASK_TYPE = 'metaMask';
export function Connect() {
	const account = useAccount()

	const { connectors, connect, status, error } = useConnect()
	const { disconnect } = useDisconnect()
	return <>
		<div>
			<div>
				<h2>Compte</h2>
				<div>status: {account.status}</div>
				<div>addresses: {JSON.stringify(account.addresses)}</div>
			</div>
			{account.status === ConnexionStatus.CONNECTED && (
				<button type="button" onClick={() => disconnect()}>
					Disconnect
				</button>
			)}
		</div>
		<div>
			<h2>Connexion</h2>
			{connectors.map((connector) => (
				connector.type === METAMASK_TYPE &&
        <button key={connector.uid} onClick={() => connect({ connector })} type="button">
					{connector.name}
        </button>
			))}
			<div>{error?.message}</div>
		</div>
	</>
}
