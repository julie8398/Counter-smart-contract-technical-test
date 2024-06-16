import { useWriteContract } from 'wagmi';
import { Status } from '@/utils/status';
import { ABI_DECREMENT } from '@/abi/increment';

export function Decrement() {
	const { writeContract, data, error, status } = useWriteContract()

	function decrement() {
		writeContract({
			address: '0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3',
			abi: [ABI_DECREMENT],
			functionName: ABI_DECREMENT.name,
		})
	}

	return <div>
		<button onClick={decrement}>Decrement</button>
		{status === Status.ERROR && <div>Une erreur est apparu lors de la décrémentation: {error?.message}</div>}
		{status === Status.SUCCESS && <div>La décrémentation a bien fonctionnée</div>}
	</div>
}
