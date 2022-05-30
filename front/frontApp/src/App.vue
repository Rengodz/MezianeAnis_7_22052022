<template>
 <div id="app">
   <login/>
   <background/>
 </div>
</template>

<script>
import login from './components/login.vue'
import background from './components/background.vue'
export default {
  name: 'App',
  components: {
    login,
    background
  }
}
</script>

<style>
@import url('./style/reset.css');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
}
</style>

