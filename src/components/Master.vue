<template>
  <div
    class="container"
    tabindex="0"
    ref="container"
    @keyup.play="onPlayButtonPressed"
    @keyup.next="onNextButtonPressed"
    @keyup.prev="onPrevButtonPressed">
    <div class="track-title">
      {{currentTrack.title}}
    </div>
    <div 
      v-if="sound"
      class="block-left">
      <sound
        :track="currentTrack">
      </sound>
    </div><div 
      v-if="subtitles"
      class="block-right">
      <subtitles
        :track="currentTrack">
      </subtitles>
    </div>
  </div>
</template>

<script>
import Sound from './Sound'
import TextMaster from './TextMaster'
import { mapGetters } from 'vuex'
import { getSlaveWindow } from '../services/window'
import {
  INCREMENT_HEAD,
  DECREMENT_HEAD
} from '../store/types'

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
    ...mapGetters(['currentTrack']),
    track () {
      return this.currentTrack
    },
    sound () {
      if (!this.track) {
        return null
      }
      return this.track.sound
    },
    currentSoundFile () {
      if (!this.sound) {
        return null
      }
      return this.sound.file
    },
    subtitles () {
      if (!this.track) {
        return null
      }
      return this.track.subtitles
    }
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
      console.log('increment!')
      this.$store.commit(INCREMENT_HEAD)
    },
    onPrevButtonPressed () {
      this.$events.fire('prev-button-pressed')
      this.$store.commit(DECREMENT_HEAD)
    },
    onPlayButtonPressed () {
      this.$events.fire('play-button-pressed')
    }
  }
}
</script>

<style scoped>
.track-title {
  font-size: 2em;
  padding-left: 30px;
}
.block-left {
  display: inline-block;
  width: 50%;
}
.block-right {
  display: inline-block;
  width: 50%;
}
</style>