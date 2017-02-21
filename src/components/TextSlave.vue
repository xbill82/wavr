<template>
  <div>
    <div
      class="blob-container" 
      v-html="currentTextBlob"></div>
  </div>
</template>

<script>
export default {
  name: 'TextSlave',
  data () {
    return {
      currentTextBlob: null
    }
  },
  mounted () {
    window.addEventListener('message', (message) => {
      this.currentTextBlob = message.data.content
    })
  }
}
</script>

<style>
  body {
    background-color: #000;
  }
  .blob-container {
    color: #FFF;
    font-family: Helvetica, Arial;
    font-size: 2em;
    padding: 30px;
    text-align: center;
  }
</style>