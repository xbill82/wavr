<template>
  <div id="app">
    <div v-if="!playlist">Loading...</div>
    <div v-else>
      <router-view></router-view>
    </div>
</template>

<script>
import {} from 'assets/fonts.css'
import {
  SET_PLAYLIST
} from './store/types'

export default {
  name: 'WavrApp',
  computed: {
    playlist () {
      return this.$store.state.playlist
    }
  },
  mounted () {
    require.ensure(['../static/playlist.json'], (require) => {
      this.$store.commit(SET_PLAYLIST, require('../static/playlist.json'))
    })
  }
}
</script>

<style>
body {
  background-color: #0c2b2d;
}
#app {
  font-family: 'Roboto Mono', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #169966;
  margin-top: 30px;
}
</style>
