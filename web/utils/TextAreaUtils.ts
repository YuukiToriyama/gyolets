export class TextAreaUtils {
	textArea: HTMLTextAreaElement;
	cursor: {
		position: number
		leftString: string
		rightString: string
	}
	/**
	 * ```typescript
	 * const utils = new TextAreaUtils(_textArea: HTMLTextAreaElement);
	 * ```
	 * @param _textArea <textarea>要素への参照を渡します
	 */
	constructor(_textArea: HTMLTextAreaElement) {
		this.textArea = _textArea;
		this.cursor = {
			position: 0,
			leftString: "",
			rightString: ""
		}
	}

	private getCursor() {
		const position = this.textArea.selectionStart;
		this.cursor = {
			position: position,
			leftString: this.textArea.value.substring(0, position),
			rightString: this.textArea.value.substring(position)
		};
	}
	/**
	 * enableTabKey()
	 * 
	 * <textarea>内の入力においてTabを使えるようにします
	 * 
	 * ```typescript
	 * const utils = new TextAreaUtils(_textArea: HTMLTextAreaElement);
	 * utils.enableTabKey();
	 * ```
	 */
	public enableTabKey() {
		window.addEventListener("keydown", event => {
			if (event.key === "Tab") {
				event.preventDefault()
			}
		});
		this.textArea.addEventListener("keydown", event => {
			if (event.key !== "Tab") {
				return;
			}
			this.getCursor();
			this.textArea.value = this.cursor.leftString + "\t" + this.cursor.rightString;
			this.textArea.selectionEnd = this.cursor.position + 1;
		});
	}
	/**
	 * enableAutoComplete()
	 * 
	 * <textarea>内の入力に対してカッコ"["を入力すると、閉じカッコ"]"も自動で入力されるようにします
	 * 
	 * ```typescript
	 * const utils = new TextAreaUtils(_textArea: HTMLTextAreaElement);
	 * utils.enableAutoComplete();
	 * ```
	 */
	enableAutoComplete() {
		this.textArea.addEventListener("keydown", event => {
			if (event.key === "[") {
				event.preventDefault();
				this.getCursor();
				this.textArea.value = this.cursor.leftString + "[]" + this.cursor.rightString;
				this.textArea.selectionEnd = this.cursor.position + 1;
			}
			if (event.key === ",") {
				event.preventDefault();
				this.getCursor();
				this.textArea.value = this.cursor.leftString + ", " + this.cursor.rightString;
				this.textArea.selectionEnd = this.cursor.position + 2;
			}
		});
	}
}