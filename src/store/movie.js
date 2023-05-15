import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  //module
  namespaced: true,

  // data
  state: () => ({
        movies: [],
        message: _defaultMessage,
        loading: false,
        theMovie: {}
      
    })
    ,

    // computed
    getters: {

    },

    // methods

    // 변이(관리하는 데이터들을 변경)
    mutations: {
      updateState(state, payload) {
        // ['movie', 'message', 'loading']
        Object.keys(payload).forEach(key => {
          state[key] = payload[key]
        })
      },
      //search탭으로 이동시 기존검색결과 없애기 
      resetMovies(state) {
        state.movies = []
        state.message = _defaultMessage
        state.loading = false
      }
    },

    // 비동기로 동작함 
    actions: {
      async searchMovies({ state, commit }, payload) {
        if (state.loading) {
          return
        }
        
        // 검색전 메시지 초기화
        commit('updateState', {
          message: '',
          loading: true
        })

        try { //영화검색하게 만들기
          const res = await _fetchMovie({
            ...payload,
            page: 1
          })
          const {
            Search,
            totalResults
          } = res.data
          commit('updateState', {
            movies: _uniqBy(Search, 'imdbID')
          })

          // 추가페이지 요청 
          const total = parseInt(totalResults, 10)
          const pageLength = Math.ceil(total / 10)

          if (pageLength > 1) {
            for (let page = 2; page <= pageLength; page += 1) {
              if (page > (payload.number / 10)) break
              const res = await _fetchMovie({
                ...payload,
                page
              })
              const {
                Search
              } = res.data
              commit('updateState', {
                movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
              })
            }
          }

        } catch ({ message }) {
          commit('updateState', {
            movies: [], //에러가 날 경우 초기화 
            message
          })
        } finally {
          commit('updateState', {
            loading: false
          })
        }
      },
      async searchMovieWithId({ state, commit }, payload) {
        if(state.loading) return

        commit('updateState', {
          theMovie: {},
          loading: true
        })

        try {
          const res = await _fetchMovie(payload)
          commit('updateState', {
            theMovie: res.data
          })
        } catch (error) {
          commit('updateState', {
            theMovie: {}
          })
        } finally {
          commit('updateState', {
            loading: false
          })
        }
      }
    }
  }
  

  async function _fetchMovie(payload) {

    return await axios.post('/.netlify/functions/movie', payload)
    // fucntions폴더의 movie.js파일에 입력
    // const {
    //   title,
    //   type,
    //   year,
    //   page,
    //   id
    // } = payload
    // const OMDB_API_KEY = '7035c60c'
    // // 아이디값이 있으면 ? 의 주소로 들어가서 자료를 가져오고 없을경우 밑에 주소로 접속하여 자료를 가져옴 
    // const url = id 
    // ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    // : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type${type}&y=${year}&page=${page}`


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