'use client'

import { Connect } from '@/component/Interaction/Connect';
import React from 'react';
import { Increment } from '@/component/Interaction/Increment';
import { Decrement } from '@/component/Interaction/Decrement';
import { Count } from '@/component/Count';
import { IncrementBy } from '@/component/Interaction/IncrementBy';

function App() {

	return (
		<>
			<h1>Counter</h1>
			<Connect/>
			<Count/>
			<Increment/>
			<Decrement/>
			<IncrementBy/>
		</>
	)
}

export default App
