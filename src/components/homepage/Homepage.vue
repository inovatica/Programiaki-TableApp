<template>
  <div>
    <header>
      <img class="title animated headImage" alt="start-arrow" src="./img/programiaki.svg"/>
    </header>
    <div class="buttonContainer">
      <router-link :to="{name:'GamesList'}">
        <span class="animated pulse infinite">START</span>
        <img class="arrowStart animated infinite pulse" alt="start-arrow" src="./img/start-arrow.svg"/>
      </router-link>
    </div>
  </div>
</template>

