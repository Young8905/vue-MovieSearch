const axios = require('axios')

exports.handler = async function (event) {
  console.log(event)
  const payload = JSON.parse(event.body)
  const {title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  // 아이디값이 있으면 ? 의 주소로 들어가서 자료를 가져오고 없을경우 밑에 주소로 접속하여 자료를 가져옴 
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type${type}&y=${year}&page=${page}`

  try {
    const { data } = await axios.get(url)
    if (data.Error) {
      return {
        statusCode: 400, //오류코드
        body: data.Error // 오류코드가 뜰경우 에러 메시지를 출력
      }
    }

    return {
      statusCode: 200, //정상코드
      body: JSON.stringify(data)
    }
  } catch(error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
  // return new Promise((resolve, reject) => {
  //   axios.get(url)
  //     .then((res) => {          
  //       if (res.data.Error) {
  //         reject(res.data.Error) // 에러가 날경우 메시지를 출력하라
  //       }
  //       resolve(res)
  //     })
  //     .catch((err) => {
  //       reject(err.message)
  //     })
  // })
}