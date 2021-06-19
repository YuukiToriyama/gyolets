import React from 'react';
import {
	Alignment,
	IconName,
	Navbar,
	Button
} from '@blueprintjs/core';
export interface HeaderProps {
	title: string
	buttons: {
		icon: IconName
		label: string
	}
}
const Header: React.FunctionComponent<HeaderProps> = (props) => {
	return (
		<Navbar>
			<Navbar.Group align={Alignment.LEFT}>
				<Navbar.Heading>{props.title}</Navbar.Heading>
				<Navbar.Divider />
				<Button className="bp3-minimal" icon={props.buttons.icon} text={props.buttons.label} />
			</Navbar.Group>
		</Navbar>
	)
}
export default Header;