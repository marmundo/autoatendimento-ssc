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
  console.log(headerOptions)
  const response = await fetch(url, headerOptions)
  const resposta = response.json()
  if (!response.ok) {
    return { 'status': false, 'msg': resposta };
  } else {
    console.log("post realizado com sucesso")
    return { 'status': true, 'msg': resposta };
  }
}

export { post }

