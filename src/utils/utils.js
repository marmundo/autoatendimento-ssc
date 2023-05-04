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
      return { 'status': false, 'msg': resposta.detail[0].msg };
    }
    return { 'status': false, 'msg': resposta };
  } else {
    console.log("post realizado com sucesso")
    return { 'status': true, 'msg': resposta };
  }
}

export { post };

