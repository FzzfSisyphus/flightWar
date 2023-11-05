<script setup>
import {ref, onMounted} from 'vue'
import manageAPI from '../services/manageAPI'
import router from "@/router";

let diffLVArray = ref(['', ''])
let modifydiffLV = ref(false)
let status = ref('')
let diffLv = ref(0)
let awardDensity = ref(0)
let enemyDensity = ref(0)
let data = ref({
  status,
  diffLv,
  awardDensity,
  enemyDensity
})

let userid = router.currentRoute.value.params.userid

onMounted(() => {
  load();
});
const load = async () => {
  try {
    const response = await manageAPI.getDiffLV()
    console.log(response)
    diffLVArray.value = []
    let p;
    for (let i = 0; i < response.data.length; i++) {
      p = response.data[i]
      diffLVArray.value.push({
        diffLv: p.diffLv,
        awardDensity: p.awardDensity,
        enemyDensity: p.enemyDensity
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const newDiffLV = async () => {
  try {
    const response = await manageAPI.modifyDiffLV(data)
    console.log(response.status)
    modifydiffLV.value = false
  } catch (error) {
    console.log(error)
  }
}

function modify(id) {
  modifydiffLV.value = true
  diffLv.value = diffLVArray.value[id].diffLv
  awardDensity.value = diffLVArray.value[id].awardDensity
  enemyDensity.value = diffLVArray.value[id].enemyDensity
}

function addDiffLV() {
  modifydiffLV.value = true
  status.value = 'add'
}

</script>

<template>
  <div v-if="modifydiffLV" class="overlay">
    <div class="backfont">
      <dev v-if="status != 'add'">
        <input type="radio" v-model="status" value="change"/><label>change</label>
        <input type="radio" v-model="status" value="delete"/><label>delete</label>
      </dev>
      <h3>Put the information of the product</h3>
      <br>
      <p>diffLV: </p>
      <textarea v-model="diffLv"></textarea>
      <br>
      <p>awardDensity:</p>
      <textarea v-model="awardDensity"></textarea>
      <br>
      <p>enemyDensity:</p>
      <textarea v-model="enemyDensity"></textarea>
      <button @click="newDiffLV">confirm</button>
      <button @click="modifydiffLV=false">close</button>
    </div>

  </div>
  <!--every time add/delete one product, we flash the page to get the new product list-->

  <div>
    <h2>Manage your difficult level!</h2>

    <button @click="addDiffLV=true">Add a new product</button>

    <h3>Your levels:</h3>
    <div class="productContainer">
      <!--      for the card in the equipments     -->
      <div v-for="LV in diffLVArray">
        <p class="product" :id="diffLVArray.indexOf(LV)">
          <p>diffLv : {{ LV.diffLv }}</p>
          <p>awardDensity : {{ LV.awardDensity }}</p>
          <p>enemyDensity : {{ LV.enemyDensity }}</p>
          <button @click="modify(diffLVArray.indexOf(LV))">modify</button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backfont {
  color: azure
}

.img {
  height: 70%;
  width: 100%;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.77);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.productContainer {
  max-width: 100%;
  padding: 10px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}

.product {
  width: 125px;
  height: 125px;
  background-color: #98d3fc;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
  margin-bottom: 20px;
}

.jump {
  width: 750px;
  background-color: cyan;
  border-radius: 10px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.ErrorMsg {
  color: red;
}
</style>