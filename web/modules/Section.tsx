import React from 'react';
import {
	Card
} from '@blueprintjs/core';
interface SectionProps {
	description?: {
		label: string
		text: string
	}
}
const Section: React.FunctionComponent<SectionProps> = (props) => {
	return (
		<Card>
			<h1>{props.description?.label}</h1>
			<p >{props.description?.text}</p>
			{props.children}
		</Card>
	)
}
export default Section;