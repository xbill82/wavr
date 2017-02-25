import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

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
      if (!state.playlist.tracks[state.currentTrackIdx] ||
          !state.playlist.tracks[state.currentTrackIdx].sound) {
        return null
      }
      Vue.set(state.playlist.tracks[state.currentTrackIdx].sound, 'duration', value)
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
    currentTrackType (state, getters) {
      if (!getters.currentTrack || !getters.currentTrack.type) {
        return null
      }

      return getters.currentTrack.type
    },
    currentSubtitlesTrack (state, getters) {
      if (!getters.currentTrack || !getters.currentTrack.type ||
          getters.currentTrack.type !== 'Subtitles') {
        return null
      }

      return getters.currentTrack
    }
  }
})
