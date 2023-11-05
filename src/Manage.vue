<script setup>
import {ref} from 'vue'
import Rolltable from "@/manageComponent/rolltable.vue";
import DiffLVff from "@/manageComponent/diffLV.vue";
import Catalog from "@/manageComponent/catalog.vue";

let choose = ref('rolltable')

function changechoise(mychooose){
  choose.value = mychooose
}
</script>

<template>
  <div class="base">
    <h1>Manager Site of the Game</h1>

    <button-group class="choose" type="text">
      <button class="choosebutton" v-on:click="changechoise('rolltable')">rolltable</button>
      <button class="choosebutton" v-on:click="changechoise('diffLV')">diffLV</button>
      <button class="choosebutton" v-on:click="changechoise('catalog')">catalog</button>
    </button-group>

    <sub class="sub">
      <Rolltable  v-if="choose == 'rolltable'"/>
      <DiffLVff  v-if="choose == 'diffLV'"/>
      <Catalog v-if="choose == 'catalog'"/>
    </sub>
  </div>
</template>

<style scoped>

.base {
  display: flex;
  justify-content: center;
  text-align: center;
}

.choose {
  position: absolute;
  top: 15%;
}

.choosebutton {
  height: 60px;
  width: 200px;
  line-height: 36px;
  font-weight: bold;
  font-size: 40px;
  background: #accbea;
  color: #2c3e50;
  border: 1px solid transparent;
//border: 1px solid #164bde; padding: 0 10px;
  margin: 2px;
}

.sub {
  position: absolute;
  top: 25%;
}
</style>