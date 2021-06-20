import React from 'react';
import {
	EditableText
} from '@blueprintjs/core';

import {
	TextAreaUtils,
	validateJSONString
} from '../utils';

interface InputFormProps {
	description?: {
		label: string
		text: string
	}
	defaultValue?: string
}
const InputForm: React.FunctionComponent<InputFormProps> = (props) => {
	const [value, setValue] = React.useState<{ string: string, isValid: boolean }>({
		string: props.defaultValue || "",
		isValid: true
	});
	const [errorMessage, setErrorMessage] = React.useState<string>("");
	const Label = () => {
		return (
			<React.Fragment>
				<h1>{props.description?.label}</h1>
				<p >{props.description?.text}</p>
			</React.Fragment>
		)
	}
	return (
		<React.Fragment>
			{props.description !== undefined && <Label />}
			<EditableText
				multiline={true}
				minLines={4}
				maxLines={10}
				value={value.string}
				onChange={text => {
					// 入力のバリデーションも同時に行なう
					setValue({
						string: text,
						isValid: validateJSONString(text, setErrorMessage)
					});
				}}
				onEdit={() => {
					const utils = new TextAreaUtils(document.querySelector(".bp3-editable-text-input")!!);
					utils.enableTabKey();
					utils.enableAutoComplete();
				}}
				intent={value.isValid === true ? "success" : "danger"}
			/>
		</React.Fragment>
	)
}
export default InputForm;