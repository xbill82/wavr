<template>
  <div
    ref="waveform"
    class="waveform">
    <div class="wave-container">
    </div>
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer'
import {
  SET_IS_PLAYING,
  SET_WAVEFORM_WIDTH,
  SET_CURRENT_TRACK_DURATION
} from '../store/types'

export default {
  name: 'Waveform',
  data () {
    return {
      waveform: null
    }
  },
  props: ['trackFile'],
  mounted () {
    this.waveform = window.waveform = WaveSurfer.create({
      container: this.$refs.waveform,
      waveColor: '#1be395',
      progressColor: '#169966',
      barWidth: 2,
      height: 160
    })
    this.waveform.on('ready', () => {
      this.$store.commit(SET_CURRENT_TRACK_DURATION, this.waveform.getDuration())
      this.$store.commit(SET_WAVEFORM_WIDTH, this.$refs.waveform.offsetWidth)
    })
    this.waveform.on('finish', () => {
      this.$store.commit(SET_IS_PLAYING, false)
    })
    this.waveform.on('audioprocess', this.onProgress)
    this.loadCurrentTrack()
    this.$events.listen('play-button-pressed', this.togglePlay)
  },
  beforeDestroy () {
    this.pause()
    this.$events.$off('play-button-pressed')
  },
  methods: {
    togglePlay () {
      if (this.$store.state.isPlaying) {
        this.pause()
      } else {
        this.play()
      }
    },
    play () {
      this.waveform.play()
      this.$store.commit(SET_IS_PLAYING, true)
    },
    pause () {
      this.waveform.pause()
      this.$store.commit(SET_IS_PLAYING, false)
    },
    onProgress () {
      this.$emit('progress', this.waveform.getCurrentTime())
    },
    loadCurrentTrack () {
      this.pause()
      if (this.waveform && this.trackFile) {
        this.waveform.load('static/' + this.trackFile)
      }
    }
  },
  watch: {
    trackFile () {
      this.loadCurrentTrack()
    }
  }
}
</script>

<style>
.wave-container {
  padding-top: 150px;
}
.wave-container:focus {
  outline: none;
}
</style>