import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnexionStatus } from '@/utils/status';

const METAMASK_TYPE = 'metaMask';

export function Connect() {
	const account = useAccount()

	const { connectors, connect, error } = useConnect()
	const { disconnect } = useDisconnect()

	function getStatusName(status: string) {
		switch (status) {
			case ConnexionStatus.CONNECTED:
				return 'connecté'
			case ConnexionStatus.DISCONNECTED:
				return 'déconnecté'
			case ConnexionStatus.CONNECTING:
				return 'connexion en cours'
			case ConnexionStatus.RECONNECTING:
				return 're-connexion en cours'
		}
	}

	return <>
		<div>
			<h2>Compte</h2>
			<div>Etat de la connexion: {getStatusName(account.status)}</div>
			{account.status === ConnexionStatus.CONNECTED && (
				<button type="button" onClick={() => disconnect()}>
					Disconnect
				</button>
			)}
			<div>
				{connectors.map((connector) => (
          <button key={connector.uid} onClick={() => connect({ connector })} type="button">
              Connexion à: {connector.name}
          </button>
				))}
				<div>{error?.message}</div>
			</div>
		</div>
	</>
}
