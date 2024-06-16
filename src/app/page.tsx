'use client'

import { Connect } from '@/component/Connect';
import React from 'react';
import { Increment } from '@/component/Increment';

function App() {

	return (
		<>
			<h1>Counter</h1>
			<Connect/>
			<Increment/>
		</>
	)
}

export default App
