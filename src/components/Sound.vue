<template>
  <div>
    <div class="block-1" >
      <div
        class="track-title"
        v-if="currentTrack">
        {{currentTrack.title}}
      </div>
      <div class="progress">
        {{secondsToTime(progress)}}
      </div>
      <div class="playback-indicator">
        <span v-if="$store.state.isPlaying">>></span>
        <span v-else>||</span>
      </div>
    </div><!--
    --><next-marker
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
        :pull-up="marker.pullUp"
        :isNext="isNextMarker(marker)">
      </wave-marker>
      <waveform
        @progress="updateProgress">
      </waveform>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Waveform from './Waveform'
import WaveMarker from './Marker'
import NextMarker from './NextMarker'
import {
  timeToSeconds,
  secondsToTime
} from '../utils'

export default {
  name: 'Sound',
  components: {
    Waveform,
    WaveMarker,
    NextMarker
  },
  props: ['track'],
  data () {
    return {
      progress: 0
    }
  },
  computed: {
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
  },
  watch: {
    currentTrack () {
      this.progress = 0
    }
  }
}
</script>

<style>
.wave-and-markers {
  position: relative;
  margin-top: 60px;
}
.track-title {
  font-size: 2em;
  padding-left: 30px;
}
.progress {
  font-size: 4em;
  padding-left: 30px;
}
.block-1 {
  display: inline-block;
  width: 50%;
}
.playback-indicator {
  font-size: 3em;
  font-weight: bold;
  padding-left: 30px;
  color: #1be395;
}
.next-marker {
  color: #34eea5;
  display: inline-block;
  font-size: 2em;
  width: 50%;
}
</style>