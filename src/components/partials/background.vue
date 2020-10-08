<template>
  <section class="background01">
    <div class="cloudBox">
      <img v-for="n in 13" class="cloud01" src="./img/clouds/cloud.svg">
      <img v-for="n in 2" class="cloud02" src="./img/clouds/cloud.svg">
      <img class="cloud03" src="./img/clouds/cloud.svg">
      <img class="cloud04" src="./img/clouds/cloud.svg">
      <img class="cloud01" src="./img/clouds/cloud.svg">
    </div>
    <div class="hills">
      <img class="cloud01" src="./img/bottomhills.svg">
    </div>
  </section>
</template>

<script>
  export default {
    name: 'background'
  }
</script>

