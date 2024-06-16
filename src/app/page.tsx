'use client'

import { Connect } from '@/component/Connect';
import React from 'react';
import { Increment } from '@/component/Increment';
import { Decrement } from '@/component/Decrement';

function App() {

	return (
		<>
			<h1>Counter</h1>
			<Connect/>
			<Increment/>
			<Decrement/>
		</>
	)
}

export default App
