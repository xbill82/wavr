<template>
  <div>
    This is Slave
    <div v-html="currentTextBlob"></div>
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