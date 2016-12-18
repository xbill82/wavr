<template>
  <div
    class="marker"
    :style="{left: position + 'px'}">
    <span class="text">[{{time}}] {{label}}</span>
  </div>
</template>

<script>
export default {
  name: 'Marker',
  props: ['position', 'time', 'label'],
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
  height: 128px;
  border-left: solid 1px #169966;
  z-index: 4;
}
.text {
  margin-left: 6px;
}
</style>