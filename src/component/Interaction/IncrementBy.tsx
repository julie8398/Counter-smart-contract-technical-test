import { useWriteContract } from 'wagmi';
import { Status } from '@/utils/status';
import { ABI_INCREMENT, ABI_INCREMENTED_BY } from '@/abi/increment';
import React from 'react';
const INPUT_NAME = 'incrementedBy'

export function IncrementBy() {
	const { writeContract, error, status } = useWriteContract()

	function incrementedBy(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget);
		const incrementedBy = formData.get(INPUT_NAME)

		writeContract({
			address: '0x5f100C3e6f8fA7e4E76918dCad61c3B6f65709A3',
			abi: [ABI_INCREMENTED_BY],
			functionName: ABI_INCREMENTED_BY.name,
			args: [Number(incrementedBy)],
		})
	}

	return <div>
		<form onSubmit={incrementedBy}>
			<label id="id-label">Nombre a incrémenter:</label>
			<input type="number" aria-labelledby="id-label" name={INPUT_NAME}/>
			<button>Incrémenter de</button>
		</form>
		{status === Status.ERROR && <div>Une erreur est apparu lors de l‘incrémentation: {error?.message}</div>}
		{status === Status.SUCCESS && <div>L‘incrementation a bien fonctionnée</div>}
	</div>
}
