<template>
  <div>
    <div v-if="nextMarker">
      Next: {{nextMarker.label}}
    </div>
    <div v-else>
      Next: End of Track
    </div>
    <div>
      within -{{timeToNextMarker}}
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
          Number(this.$store.getters.currentTrack.sound.duration) -
          Number(this.progress)
        )
      }
    }
  }
}
</script>