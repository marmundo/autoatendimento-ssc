async function post(url, dadosjson) {

  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: dadosjson,
  })
  if (!response.ok) {
    return false;
  } else {
    console.log("post realizado com sucesso")
    return true;
  }
}

export { post };
