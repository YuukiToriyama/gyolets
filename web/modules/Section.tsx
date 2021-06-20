import React from 'react';

interface SectionProps {
	description?: {
		label: string
		text: string
	}
}
const Section: React.FunctionComponent<SectionProps> = (props) => {
	return (
		<React.Fragment>
			<h1>{props.description?.label}</h1>
			<p >{props.description?.text}</p>
			{props.children}
		</React.Fragment>
	)
}
export default Section;