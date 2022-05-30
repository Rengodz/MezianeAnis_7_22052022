<template>
 <div :style="image"></div>
</template>


<script>
export default {
  data() {
    return {
      image: { backgroundImage: "url(./src/assets/groupobk.png)" }
    };
  }
};
</script>

<style>

.image{
   color:linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5))
}

</style>