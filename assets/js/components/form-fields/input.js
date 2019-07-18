import { html, LitElement } from 'lit-element'

class InputField extends LitElement {
  render() {
    return html`<input type="${this.type}"  />`
  }
}
