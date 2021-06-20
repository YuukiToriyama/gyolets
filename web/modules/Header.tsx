import React from 'react';
import {
	Alignment,
	AnchorButton,
	IconName,
	Navbar,
	Button
} from '@blueprintjs/core';
export interface ButtonProps {
	icon: IconName
	text?: string
	href?: string
}
export interface HeaderProps {
	title: string
	buttons: ButtonProps[]
}
const Header: React.FunctionComponent<HeaderProps> = (props) => {
	return (
		<Navbar className="bp3-dark">
			<Navbar.Group align={Alignment.LEFT}>
				<Navbar.Heading>{props.title}</Navbar.Heading>
			</Navbar.Group>
			<Navbar.Group align={Alignment.RIGHT}>
				<Navbar.Divider />
				{props.buttons.map(buttonProps => {
					return buttonProps.href === undefined ? <Button className="bp3-minimal" {...buttonProps} /> : <AnchorButton {...buttonProps} />
				})}
			</Navbar.Group>
		</Navbar>
	)
}
export default Header;