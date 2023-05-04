// 노드JS에서 실행
//가져오기
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin} = require('vue-loader')

//내보내기
module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    // 경로 별칭
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }    
  },

  // 파일을 읽어들이기 시작하는 진입점 설정 
  entry: './src/main.js',
  // 결과물을 반환하는 설정
  output: {
    // path: path.resolve(__dirname, 'dist'), // 변수명.resolve(__dirname, '폴더명')
    // filename: 'main.js', // entry 파일명과 같아야함
    clean: true // 파일명이 바뀔경우 전에 있던 파일을 삭제해줌
  },

  module: {
    rules:[
      {
        test:/\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/, // .css와 .scss파일을 찾는다
        use: [
          // 순서가 중요
          'vue-style-loader',
          //'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "~/scss/main";'
            }
          }
        ]
      },
      {
        test:/\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [{
        from: 'static'
      }]
    }),
    new  VueLoaderPlugin()
  ],
  devServer: {
    host: 'localhost'
  }

}