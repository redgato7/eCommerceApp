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

<style>

h1 {
	color: #42A5F5;
}

.form-title {
  font-size: 30px;
  color: #42A5F5;
  margin-bottom: 30px;
  border-bottom: solid;
  display:inline-block;
}

.form {
  text-align: center;
}

.toolbar-title {
  cursor: pointer;
}

.img-main { /* xs */
    max-height: 100px;
    max-width: 100px;
}

@media (min-width: 768px) { /* sm */
    .img-main {
      max-height: 185px;
      max-width: 158px;
    }
}
@media (min-width: 992px) { /* md */
    .img-main {
      max-height: 250px;
      max-width: 250px;
    }
}
@media (min-width: 1200px) { /* lg */
    .img-main {
      max-height: 300px;
      max-width: 300px;
    }
}

</style>
