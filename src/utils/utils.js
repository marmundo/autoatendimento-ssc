import axios from "axios";

async function post(url, dadosjson, nocors) {
  let headerOptions = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: dadosjson
  }
  if (nocors) {
    headerOptions.headers.mode = 'no-cors'
  }

  const response = await fetch(url, headerOptions).catch((error) => console.log(error))
  const resposta = await response.json()
  if (!response.ok) {
    if (resposta.detail) {
      return { 'status': false, 'msg': resposta.detail };
    }
    return { 'status': false, 'msg': resposta };
  } else {
    console.log("post realizado com sucesso")
    return { 'status': true, 'msg': resposta };
  }
}

async function axiosPost(url, dadosjson) {
  try {
    let response = await axios.post(url, dadosjson)
    return { status: response.status, data: response.data }
  } catch (error) {
    console.log(error);
  }
}

async function loginSUAP(matricula, senha) {
  let autenticacaoURL = "https://suap.ifrn.edu.br/api/v2/autenticacao/token/"
  let dadosUsuario = { username: matricula, password: senha };

  let response = await axiosPost(autenticacaoURL, dadosUsuario)

  if (!response.status) {
    return false;
  } else {
    console.log("Login realizado com sucesso")
    let token = response.data.access
    return { 'status': true, 'token': token };
  }
}

export { post, axiosPost, loginSUAP };

