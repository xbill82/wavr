<template>
  <div>
    <div v-if="nextMarker">
      Next marker: {{nextMarker.label}}
    </div>
    <div v-else>
      Next marker: End of Track
    </div>
    <div>
      Time to next marker: -{{timeToNextMarker}}
    </div>
  </div>
</template>

<script>
import {
  secondsToTime
} from '../utils'

export default {
  name: 'NextMarker',
  props: ['nextMarker', 'progress'],
  computed: {
    timeToNextMarker () {
      if (this.nextMarker) {
        return secondsToTime(
          Number(this.nextMarker.timestamp) -
          Number(this.progress)
        )
      } else {
        return secondsToTime(
          Number(this.$store.getters.currentTrack.duration) -
          Number(this.progress)
        )
      }
    }
  }
}
</script>