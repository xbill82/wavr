<template>
  <div class="text-master">
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TextMaster',
  computed: {
    ...mapGetters(['currentSubtitlesList'])
  }
}
</script>