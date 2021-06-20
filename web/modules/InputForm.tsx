import React from 'react';
import {
	EditableText
} from '@blueprintjs/core';

import {
	TextAreaUtils,
	validateJSONString
} from '../utils';

interface InputFormProps {
	defaultValue: string
	onChange: (json: object) => void
}
const InputForm: React.FunctionComponent<InputFormProps> = (props) => {
	const [value, setValue] = React.useState<{ string: string, isValid: boolean }>({
		string: props.defaultValue || "",
		isValid: true
	});
	const [errorMessage, setErrorMessage] = React.useState<Error>();
	return (
		<React.Fragment>
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
					if (value.isValid) {
						props.onChange(JSON.parse(text));
					}
				}}
				onEdit={() => {
					const utils = new TextAreaUtils(document.querySelector(".bp3-editable-text-input")!!);
					utils.enableTabKey();
					utils.enableAutoComplete();
				}}
				intent={value.isValid === true ? "success" : "danger"}
			/>
			<EditableText
				multiline={true}
				minLines={1}
				maxLines={3}
				placeholder=""
				value={value.isValid ? "" : errorMessage?.message}
				intent="warning"
				disabled={true}
			/>
		</React.Fragment>
	)
}
export default InputForm;