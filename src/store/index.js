import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playlist: null,
    currentTrackIdx: 0,
    waveformWidth: null,
    isPlaying: false,
    head: {
      track: 0,
      subtitle: -1
    }
  },
  mutations: {
    [types.SET_PLAYLIST] (state, playlist) {
      state.playlist = playlist
    },
    [types.SET_IS_PLAYING] (state, value) {
      state.isPlaying = value
    },
    [types.INCREMENT_HEAD] (state) {
      if (state.playlist.tracks[state.head.track].subtitles &&
          state.head.subtitle < state.playlist.tracks[state.head.track].subtitles.length - 1) {
        state.head.subtitle++
      } else {
        state.head.subtitle = -1
        if (state.head.track < state.playlist.tracks.length - 1) {
          state.head.track++
        } else {
          state.head.track = 0
        }
      }
    },
    [types.DECREMENT_HEAD] (state) {
      if (state.playlist.tracks[state.head.track].subtitles &&
          state.head.subtitle >= 0) {
        state.head.subtitle--
      } else {
        state.head.subtitle = -1
        if (state.head.track > 0) {
          state.head.track--
        }
      }
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
      return state.playlist.tracks[state.head.track]
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
