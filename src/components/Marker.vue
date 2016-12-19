<template>
  <div
    class="marker"
    :class="{next: isNext}"
    :style="{left: position + 'px'}">
    <div class="text">[{{time}}]</div>
    <div class="text">{{label}}</div>
  </div>
</template>

<script>
export default {
  name: 'Marker',
  props: ['position', 'time', 'label', 'isNext'],
  computed: {
    formattedTime () {
      return '00:00'
    }
  }
}
</script>

<style scoped>
.marker {
  position: absolute;
  top: 0;
  height: 210px;
  border-left: solid 1px #169966;
  z-index: 4;
}
.marker.next {
  color: #34eea5;
}
.text {
  margin-left: 6px;
}
</style>