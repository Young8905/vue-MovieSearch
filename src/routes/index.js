import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'


export default createRouter({
  // Hash모드 사용 
  history: createWebHashHistory(),

  // 페이지가 바꼇을때 스크롤이 맨 위로 돌아오게
  scrollBehavior() {
    return { top:0 }
  },

  // pages 구분
  routes: [
    {
      path:'/', // 메인페이지로 접근하겟다
      component: Home // 메인페이지에서 접근할 component
    },
    {
      path:'/Movie/:id', // Movie페이지로 접근하겟다
      component: Movie // Movie페이지에서 접근할 component
    },
    {
      path:'/about', // about페이지로 접근하겟다
      component: About // about페이지에서 접근할 component
    },
    {
      path: '/:notFound(.*)', // 이름은 바꿀수 있음, 갈 수 없는 페이지로 이동할때 뜸 
      component: NotFound
    }
  ]
} )