<template>
  <div
    class="text-master">
    <div class="blob-block">
      Currently displaying:
      <div
        class="current-text"
        v-html="currentTextBlob"></div>
      Next:
      <div
        class="next-text"
        v-html="nextTextBlob"></div>
    </div>
  </div>
</template>

<script>
import { getSlaveWindow } from '../services/window'

export default {
  name: 'TextMaster',
  props: ['track'],
  computed: {
    currentIndex () {
      return this.$store.state.head.subtitle
    },
    nextTextBlob () {
      if (this.currentIndex === this.subtitles.length - 1) {
        return null
      }
      return this.getSubtitle(this.subtitles[this.currentIndex + 1])
    },
    currentTextBlob () {
      if (this.currentIndex < 0) {
        return null
      }
      return this.getSubtitle(this.subtitles[this.currentIndex])
    },
    subtitles () {
      if (!this.track) {
        return null
      }
      return this.track.subtitles
    }
  },
  methods: {
    getSubtitle (subtitle) {
      if (typeof subtitle === 'object') {
        return require('../../static/' + subtitle.file + '.html')
      }
      return subtitle
    },
    sendBlobToSlave (blob) {
      let slaveWindow = getSlaveWindow()
      if (!slaveWindow) {
        return
      }
      slaveWindow.postMessage({
        type: 'textBlob',
        content: blob
      }, '*')
    }
  },
  watch: {
    currentTextBlob (blob) {
      this.sendBlobToSlave(blob)
    }
  }
}
</script>

<style scoped>
  .track-title:focus {
    outline: none;
  }
  .blob-block {
    padding: 30px;
  }
  .current-text {
    margin-bottom: 30px;
    color: #1be395;
    font-size: 1.5em;
  }
</style>