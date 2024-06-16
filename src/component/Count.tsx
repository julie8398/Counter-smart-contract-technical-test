import { useReadContract } from 'wagmi';
import { ABI_GET_COUNT } from '@/abi/increment';

const UNE_MINUTE_EN_SECONDE = 60000

export function Count() {
	const { data, refetch } = useReadContract({
		abi: [ABI_GET_COUNT],
		address: '0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3',
		functionName: ABI_GET_COUNT.name,
		query: { refetchInterval: UNE_MINUTE_EN_SECONDE, notifyOnChangeProps: 'all' },
	});

	return <>
		{data && <h2>Valeur du compteur : {Number(data)}</h2>}
		{<button type="button" onClick={() => refetch()}>Mise à jour</button>}
	</>
}
