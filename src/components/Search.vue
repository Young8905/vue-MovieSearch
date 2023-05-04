<template>
  <div class="container">
    <input 
    v-model="title"
    class="form-control"
    type="text"
    placeholder="Search for Movies, Series & more"
    @keyup.enter="apply" />

    <div class="selects">
      <select
      v-for="filter in filters"
      v-model="$data[filter.name]"
      :key="filter.name"
      class="form-select" >
      <option 
      v-if="filter.name === 'year'"
      value="">
        All Years
      </option>
        <option
        v-for="item in filter.items"
          :key="item">
          {{ item }}
          
        </option>
      </select>
    </div>
    <button
    class="btn btn-primary"
    @click="apply">
  Apply
</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title:'',
      type: 'movie',
      number: 10,
      year: '', // template의 option의 value값을 비워놓은 상태로 내용에 All Years를 넣어 All Years가 뜸 // v-if를 사용하여 name이 year인 경우에만 적용
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() =>  {
            const years = []
            const thisYear = new Date().getFullYear() // 현재 연도의 값을 반환
            for (let i = thisYear; i>= 1985; i -=1) { 
              years.push(i)
            }
            return years
          })()
        }
      ]
    }
  },

  methods: {
    async apply() {
     this.$store.dispatch('movie/searchMovies',{
      title: this.title,
      type: this.type,
      number: this.number,
      year: this.year
     })    
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0; // 가로 넓이가 120보다 줄어드는걸 방지, 1로 해놓을경우 화면비율만큼 작아질수있음
  }
  // 디스플레이화면이 lg사이즈보다 작을경우 display를 flex(수평)에서 block(수직) 으로 바꿔줌 , 
@include media-breakpoint-down(lg) {
  display: block;
  input {
    margin-right: 0;
    margin-bottom: 10px;
  }
  .selects {
    margin-right: 0;
    margin-bottom: 10px;
    select {
      width: 100%
    }
  }
  .btn {
    width: 100%;
  }
}
}
</style>