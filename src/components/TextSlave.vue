<template>
  <div>
    This is Slave
    <div>
      {{currentTextBlob}}
    </div>
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