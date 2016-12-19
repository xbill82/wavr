import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import * as utils from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playlist: null,
    currentTrackIdx: null,
    waveformWidth: null,
    isPlaying: false
  },
  mutations: {
    [types.SET_PLAYLIST] (state, playlist) {
      state.playlist = playlist
    },
    [types.SET_IS_PLAYING] (state, value) {
      state.isPlaying = value
    },
    [types.SET_CURRENT_TRACK] (state, value) {
      state.currentTrackIdx = value
    },
    [types.SET_CURRENT_TRACK_DURATION] (state, value) {
      Vue.set(state.playlist.tracks[state.currentTrackIdx], 'duration', value)
    },
    [types.SET_WAVEFORM_WIDTH] (state, value) {
      state.waveformWidth = value
    }
  },
  getters: {
    currentTrack (state) {
      return state.playlist.tracks[state.currentTrackIdx]
    },
    pxPerSec (state, getters) {
      return state.waveformWidth / getters.currentTrack.duration
    },
    currentMarkers (state, getters) {
      return getters.currentTrack.markers.map(marker => {
        return {
          ...marker,
          timestamp: utils.timeToSeconds(marker.time)
        }
      })
    }
  }
})
