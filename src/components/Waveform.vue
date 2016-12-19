<template>
  <div class="waveform">
    <div 
      tabindex="0"
      @keyup.space="togglePlay"
      ref="waveform">
    </div>
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer'
import {
  SET_IS_PLAYING,
  SET_WAVEFORM_WIDTH,
  SET_CURRENT_TRACK,
  SET_CURRENT_TRACK_DURATION
} from '../store/types'
import { mapGetters } from 'vuex'

export default {
  name: 'Waveform',
  data () {
    return {
      waveform: null
    }
  },
  mounted () {
    console.log('mounted')
    this.waveform = window.waveform = WaveSurfer.create({
      container: this.$refs.waveform,
      waveColor: '#1be395',
      progressColor: '#169966'
    })
    this.waveform.on('ready', () => {
      this.$store.commit(SET_CURRENT_TRACK_DURATION, this.waveform.getDuration())
      this.$store.commit(SET_WAVEFORM_WIDTH, this.$refs.waveform.offsetWidth)
    })
    this.waveform.on('finish', () => {
      this.$store.commit(SET_IS_PLAYING, false)
      this.$store.commit(SET_CURRENT_TRACK, this.$store.state.currentTrackIdx + 1)
    })
    this.waveform.on('audioprocess', this.onProgress)
    this.$refs.waveform.focus()
    this.loadCurrentTrack()
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
      if (this.waveform && this.currentTrack && this.currentTrack.file) {
        this.waveform.load('static/' + this.currentTrack.file)
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentTrack'
    ])
  },
  watch: {
    currentTrack () {
      this.loadCurrentTrack()
    }
  }
}
</script>