<template>
  <div id="app">
    <div v-if="!playlist">Loading...</div>
    <div v-else>
      <div class="block-1">
        <div
          class="track-title"
          v-if="currentTrack">
          {{currentTrack.title}}
        </div>
        <div class="progress">
          {{secondsToTime(progress)}}
        </div>
      </div>
      <next-marker
        class="next-marker"
        :next-marker="nextMarker"
        :progress="progress">
      </next-marker>
      <div class="wave-and-markers">
        <wave-marker
          v-for="marker in currentMarkers"
          :key="marker.timestamp"
          :position="timeToMarkerPosition(marker.time)"
          :time="marker.time"
          :label="marker.label"
          :isNext="isNextMarker(marker)">
        </wave-marker>
        <waveform
          @progress="updateProgress">
        </waveform>
      </div>
    </div>
</template>

<script>
import {} from 'assets/fonts.css'

import { mapGetters } from 'vuex'
import Waveform from './Components/Waveform'
import WaveMarker from './Components/Marker'
import NextMarker from './Components/NextMarker'
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
    WaveMarker,
    NextMarker
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
    isNextMarker (marker) {
      if (!this.nextMarker) {
        return false
      }
      return marker.timestamp === this.nextMarker.timestamp
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
  font-family: 'Roboto Mono', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #169966;
  margin-top: 30px;
}
.wave-and-markers {
  position: relative;
  margin-top: 60px;
}
.track-title {
  font-size: 2em;
}
.progress {
  font-size: 4em;
}
.block-1 {
  display: inline-block;
  width: 50%;
  margin-left: 30px;
}
.next-marker {
  color: #34eea5;
  display: inline-block;
  font-size: 2em;
}
</style>
