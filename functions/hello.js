exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'YOUNG',
      age: 37,
      email: 'ldkffhdpthsl@naver.com'
    })
  }
}