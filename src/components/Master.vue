<template>
  <div
    class="container"
    tabindex="0"
    ref="container"
    @keyup.play="onPlayButtonPressed"
    @keyup.next="onNextButtonPressed"
    @keyup.prev="onPrevButtonPressed">
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
import { getSlaveWindow } from '../services/window'

export default {
  name: 'WavrMaster',
  components: {
    Sound,
    Subtitles: TextMaster
  },
  data () {
    return {
      slaveWindow: null
    }
  },
  computed: {
    ...mapGetters(['currentTrackType', 'currentTrack'])
  },
  mounted () {
    this.slaveWindow = getSlaveWindow()
    this.$refs.container.focus()
    this.$refs.container.addEventListener('blur', () => {
      this.$refs.container.focus()
    })
  },
  methods: {
    onNextButtonPressed () {
      this.$events.fire('next-button-pressed')
    },
    onPrevButtonPressed () {
      this.$events.fire('prev-button-pressed')
    },
    onPlayButtonPressed () {
      this.$events.fire('play-button-pressed')
    }
  }
}
</script>