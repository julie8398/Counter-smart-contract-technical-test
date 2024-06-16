'use client'

import { Connect } from '@/component/Interaction/Connect';
import React from 'react';
import { Increment } from '@/component/Interaction/Increment';
import { Decrement } from '@/component/Interaction/Decrement';
import { useReadContract } from 'wagmi';
import { ABI_GET_COUNT } from '@/abi/increment';
import { Count } from '@/component/Count';

function App() {
	return (
		<>
			<h1>Counter</h1>
			<Connect/>
			<Count/>
			<Increment/>
			<Decrement/>
		</>
	)
}

export default App
