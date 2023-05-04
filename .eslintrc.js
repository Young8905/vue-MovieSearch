module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    // vue 코드규칙
    // 'plugin:vue/vue3-essential', // Lv1
    'plugin:vue/vue3-strongly-recommended', // Lv2
    //'plugin:vue/vue3-recommended', // Lv3
 
    // js 코드규칙
    'eslint:recommended' // es가 권장하는 문법
  ],
  parserOptions: {
    // 분석기 지정
    parser: 'babel-eslint'
  },
  rules: {
    // 기존 규칙을 변경하고싶을때 작성
    //(https://eslint.org/docs/latest/) 참조

    // ex.닫히는 > 를 새로운줄에 하고싶지 않을때 
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }],

    // 빈태그 일시 self-closing 슬래시(/)작성하기
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always", //img태그
        "normal": "never", // div 등 일반태그는 적용하지 않음
        "component": "always" //
      },
      "svg": "always",
      "math": "always"
    }]

  }
}