import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import * as utils from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playlist: null,
    currentTrackIdx: 0,
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
      if (value === null || value === undefined) {
        return
      }
      if (value > state.playlist.tracks.length - 1 ||
          value < 0) {
        state.currentTrackIdx = 0
      } else {
        state.currentTrackIdx = value
      }
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
      if (!state.playlist) {
        return null
      }
      return state.playlist.tracks[state.currentTrackIdx]
    },
    pxPerSec (state, getters) {
      return state.waveformWidth / getters.currentTrack.duration
    },
    currentMarkers (state, getters) {
      if (!getters.currentTrack) {
        return []
      }
      return getters.currentTrack.markers.map(marker => {
        return {
          ...marker,
          timestamp: utils.timeToSeconds(marker.time)
        }
      })
    }
  }
})
