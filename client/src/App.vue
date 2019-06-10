<template>
  <v-app>
    <v-content>
      <showProducts/>
    </v-content>
  </v-app>
</template>

<script>
import showProducts from './components/showProducts'

export default {
  name: 'App',
  components: {
    showProducts
  },
  data () {
    return {
      //
    }
  }
}
</script>
