<template>
  <div>
    <component
    :is="currentTrackType"
    :track="currentTrack"
  ></component>
  </div>
</template>

<script>
import Sound from './Sound'
import TextMaster from './TextMaster'
import { mapGetters } from 'vuex'

export default {
  name: 'WavrMaster',
  components: {
    Sound,
    Subtitles: TextMaster
  },
  computed: {
    ...mapGetters(['currentTrackType', 'currentTrack'])
  }
}
</script>