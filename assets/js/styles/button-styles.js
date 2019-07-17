import { css, unsafeCSS } from 'lit-element';
import button from '!!css-loader!stylus-loader!css/button'

let buttonStylus = ''
try {
  buttonStylus = String(button[0][1] || '')
} catch(err) {
  console.log(err)
}

export const ButtonStyles = css`
  ${unsafeCSS(buttonStylus)}
`;
