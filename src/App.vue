<template>
  <div id="app">
    <div v-if="!playlist">Loading...</div>
    <div v-else>
      <div>
        {{secondsToTime(progress)}}
      </div>
      <div>
        Next marker: {{nextMarker.label}}
      </div>
      <div class="wave-and-markers">
        <wave-marker
          v-for="marker in currentMarkers"
          :key="marker.timestamp"
          :position="timeToMarkerPosition(marker.time)"
          :time="marker.time"
          :label="marker.label">        
        </wave-marker>
        <waveform
          @progress="updateProgress">
        </waveform>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Waveform from './Components/Waveform'
import WaveMarker from './Components/Marker'
import {
  SET_PLAYLIST,
  SET_CURRENT_TRACK
} from './store/types'
import {
  timeToSeconds,
  secondsToTime
} from './utils'

export default {
  name: 'Wavr',
  components: {
    Waveform,
    WaveMarker
  },
  data () {
    return {
      progress: 0
    }
  },
  mounted () {
    require.ensure(['../static/playlist.json'], (require) => {
      this.$store.commit(SET_PLAYLIST, require('../static/playlist.json'))
      this.$store.commit(SET_CURRENT_TRACK, 0)
    })
  },
  computed: {
    playlist () {
      return this.$store.state.playlist
    },
    nextMarker () {
      return this.currentMarkers.find(marker => {
        return marker.timestamp > this.progress
      })
    },
    ...mapGetters([
      'currentTrack',
      'pxPerSec',
      'currentMarkers'
    ])
  },
  methods: {
    timeToMarkerPosition (time) {
      const seconds = timeToSeconds(time)
      return Math.round(seconds * this.pxPerSec)
    },
    updateProgress (seconds) {
      this.progress = seconds
    },
    secondsToTime
  }
}
</script>

<style>
body {
  background-color: #0c2b2d;
}
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #169966;
}
.wave-and-markers {
  position: relative;
  margin-top: 60px;
}
</style>
