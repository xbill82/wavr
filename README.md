# wavr

> U gimme sound, I give u wavez

## Motivation

During my story-telling sessions, I'm including more and more music tunes as a background to my spoken word.
Speech and music need some sort of synchronization, not very tight, but sometimes I need to nail key moments in music with the right word. And sometimes it's hard to think about the speech and the music at the same time. I wanted a tool to help me

* see the music waveform as it plays
* see the total playing time
* place markers at given moments in each song
* see which one is the next marker and how much time do I have before I hit it
* once the current song is over, skip to the next but do not play it until I say it
* toggle play/pause within a keystroke
* skip to the next within a keystroke

## Implementation

I used [VueJs](http://vuejs.org/) and [Waveform.js](https://wavesurfer-js.org/) to implement this tool and it took me 5 hours. I'm so grateful to you guys.

## Usage

Place your mp3 files into the `static` directory along with a `playlist.json` file looking like the example:

```json
{
  "tracks": [
    {
      "file": "song_1.mp3",
      "title": "Title of the first song",
      "markers": [
        {
          "label": "Marker 1",
          "time": "00:29"
        },
        {
          "label": "Marker 2",
          "time": "01:14"
        }
      ]
    },
    {
      "file": "song_2.mp3",
      "title": "Title of the second song",
      "markers": [
        {
          "label": "Tralala",
          "time": "01:09"
        },
        {
          "label": "Tralalero",
          "time": "01:44"
        }
      ]
    }
  ]
}
```
