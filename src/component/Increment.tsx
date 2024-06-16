import { useWriteContract } from 'wagmi';
import { Status } from '@/utils/status';

export function Increment() {
	const { writeContract, data, error, status } = useWriteContract()

	function increment() {
		writeContract({
			address: '0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3',
			abi: [ABI_INCREMENT],
			functionName: ABI_INCREMENT.name,
		})
	}

	return <div>
		<button onClick={increment}>Increment</button>
		{status === Status.ERROR && <div>Une erreur est apparu lors de l‘incrémentation: {error?.message}</div>}
		{status === Status.SUCCESS && <div>L‘incrementation a bien fonctionnée</div>}
	</div>
}
