export default {
  install(app) {
    app.config.globalProperties.$loadImage = (src) => {
      return new Promise((resolve) => {
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load', () => {
          // 완료 
          resolve() // 로드가 끝나면 resolve로 넘어감 
        })
      })
    }
  }
}