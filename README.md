TODO LIST

(v) Cria um projeto usando o "npm init -y".
(v) Instalar o next + react + reactdom: npm install next react react-dom -> https://nextjs.org/docs/getting-started
(v) Criar a pasta pages e adicionar o arquivo index.js
"A pasta pages é resposavel por manter as paginas que seram exibidas no frontend"
(v) Criar a pasta public e adicionar um favicon.icon nela.
(v) Instalar o Reactstrap:
" npm install --save bootstrap
npm install --save reactstrap react react-dom "
https://reactstrap.github.io/
(v) Adicionando o CSS de forma global é preciso criar um arquivo dentro de pages com o nome de "\_app.js" e adicionar:
"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyApp({ Component, pageProps }) {
return <Component {...pageProps} />;
}
"
(v) Cria uma pasta static na raiz para receber o css e adicionar o importa no arquivo \_app.js
