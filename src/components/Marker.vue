<template>
  <div
    class="marker"
    :class="{next: isNext, 'pull-up': pullUp}"
    :style="{left: position + 'px'}">
    <div class="text">[{{time}}]</div>
    <div class="text">{{label}}</div>
  </div>
</template>

<script>
export default {
  name: 'Marker',
  props: ['position', 'time', 'label', 'isNext', 'pullUp'],
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
  top: 60px;
  height: 200px;
  border-left: solid 1px #169966;
  z-index: 4;
  font-size: 1.1em
}
.marker.next {
  color: #34eea5;
}
.marker.pull-up {
  top: 0px;
  height: 260px;
}
.text {
  margin-left: 6px;
}
</style>