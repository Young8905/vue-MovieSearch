<template>
  <Headline />
  <Search />
  <MovieList />
</template>

<script>
import Headline from '~/components/Headline'
import Search from '~/components/Search'
import MovieList from '~/components/MovieList'
export default {
  components: {
    Headline,
    Search,
    MovieList

  },
  //search탭으로 이동시 기존검색결과 없애기 
  created() {
    this.$store.commit('movie/resetMovies')
  }
}
</script>
