import { useWriteContract } from 'wagmi';
import { Status } from '@/utils/status';
import { ABI_DECREMENTED_BY, ABI_INCREMENT, ABI_INCREMENTED_BY } from '@/abi/increment';
import React, { useId } from 'react';
const INPUT_NAME = 'decrementedBy'

export function DecrementBy() {
	const labelId = useId()
	const { writeContract, error, status } = useWriteContract()

	function decrementedBy(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget);
		const decrementedBy = formData.get(INPUT_NAME)

		writeContract({
			address: '0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3',
			abi: [ABI_DECREMENTED_BY],
			functionName: ABI_DECREMENTED_BY.name,
			args: [Number(decrementedBy)],
		})
	}

	return <div>
		<form onSubmit={decrementedBy}>
			<label id={labelId}>Nombre a décrémenter:</label>
			<input type="number" aria-labelledby={labelId} name={INPUT_NAME}/>
			<button>Décrémenter de</button>
		</form>
		{status === Status.ERROR && <div>Une erreur est apparu lors de la décrémentation: {error?.message}</div>}
		{status === Status.SUCCESS && <div>La décrémentation a bien fonctionnée</div>}
	</div>
}
