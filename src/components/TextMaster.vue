<template>
  <div
    class="text-master">
    <div class="track-title">
      {{track.title}}
    </div>
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
import { SET_CURRENT_TRACK } from '../store/types'

export default {
  name: 'TextMaster',
  props: ['track'],
  data () {
    return {
      currentIndex: -1
    }
  },
  computed: {
    nextTextBlob () {
      if (this.currentIndex === this.textList.length - 1) {
        return null
      }
      return this.textList[this.currentIndex + 1]
    },
    currentTextBlob () {
      if (this.currentIndex < 0) {
        return null
      }
      return this.textList[this.currentIndex]
    },
    textList () {
      if (!this.track || (!this.track.list && !this.track.file)) {
        return null
      }
      if (this.track.list) {
        return this.track.list
      }
      if (this.track.file) {
        return [ require('../../static/' + this.track.file + '.html') ]
      }
    }
  },
  methods: {
    onNextButtonPressed () {
      if (this.currentIndex === this.textList.length - 1) {
        this.currentIndex = -1
        this.sendBlobToSlave('')
        this.$store.commit(SET_CURRENT_TRACK, this.$store.state.currentTrackIdx + 1)
        return
      }
      this.currentIndex++
      this.sendBlobToSlave(this.currentTextBlob)
    },
    onPrevButtonPressed () {
      if (this.currentIndex < 0) {
        this.sendBlobToSlave('')
        this.$store.commit(SET_CURRENT_TRACK, this.$store.state.currentTrackIdx - 1)
        return
      }
      this.currentIndex--
      this.sendBlobToSlave(this.currentTextBlob)
    },
    sendBlobToSlave (blob) {
      if (!this.slaveWindow) {
        return
      }
      this.slaveWindow.postMessage({
        type: 'textBlob',
        content: blob
      }, '*')
    }
  },
  mounted () {
    this.$events.listen('next-button-pressed', this.onNextButtonPressed)
    this.$events.listen('prev-button-pressed', this.onPrevButtonPressed)
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