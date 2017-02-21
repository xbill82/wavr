<template>
  <div
    class="text-master">
    <div 
      class="track-title"
      ref="container"
      tabindex="0"
      @click="onNextButtonPressed"
      @keyup.next="onNextButtonPressed"
      @keyup.prev="onPrevButtonPressed">
      {{track.title}}
    </div>
    <div v-if="currentIndex < 0">
      Press "next" to begin
    </div>
    <div class="current-text">{{currentTextBlob}}</div>
    <div class="next-text">{{nextTextBlob}}</div>      
  </div>
</template>

<script>
import { SET_CURRENT_TRACK } from '../store/types'
import { getSlaveWindow } from '../services/window'

export default {
  name: 'TextMaster',
  props: ['track'],
  data () {
    return {
      currentIndex: -1,
      slaveWindow: null
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
  mounted () {
    this.slaveWindow = getSlaveWindow()
    this.$refs.container.focus()
    if (this.track.file) {
      this.loadBlobFile(this.track.file)
    }
    this.$refs.container.addEventListener('blur', () => {
      this.$refs.container.focus()
    })
  },
  methods: {
    onNextButtonPressed () {
      console.log('NEXT')
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
  }
}
</script>