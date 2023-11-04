<script setup>
import {ref, onMounted} from 'vue'
import manageAPI from './services/manageAPI'
import router from "@/router";

let rolltableprize = ref(['', ''])
let modifyrolltableprize = ref(false)
let status = ref('change')
let prizeName = ref('')
let picPath = ref('')
let weight = ref('')

let index = ref(0)
let userid = ref(router.currentRoute.value.params.userid)

onMounted(() => {
  load();
});
const load = async () => {
  try {
    const response = await manageAPI.getRolltablePrize()
    console.log(response)
    rolltableprize.value = []
    let p;
    for (let i = 0; i < response.data.data.length; i++) {
      p = response.data.data[i]
      rolltableprize.value.push({
        prizeName: p.prizeName,
        picPath: p.picPath,
        weight: p.weight
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const newPrize = async () => {
  let data;
  data = {
    status,
    prizeName,
    picPath,
    weight
  }
  try {
    const response = await manageAPI.modifyRolltablePrize(data)
    console.log(response.status)
  } catch (error) {
    console.log(error)
  }
}

function modify(id) {
  index.value = id
  modifyrolltableprize.value = true
}

</script>

<template>
  <div v-if="modifyrolltableprize" class="overlay">
    <div class="backfont">
      <input type="radio" v-model="status" value="add"/><label>add</label>
      <input type="radio" v-model="status" value="change"/><label>change</label>
      <input type="radio" v-model="status" value="delete"/><label>delete</label>
      <h3>Put the information of the prize</h3>
      <br>
      <p>picture: </p>
      <textarea v-model="picPath" placeholder="Enter picture path">
      </textarea>
      <br>
      <p>prize name:</p>
      <textarea v-model="prizeName" placeholder="prize name">
      </textarea>
      <br>
      <p>weight:</p>
      <textarea v-model="weight" placeholder="Enter weight">
      </textarea>
    </div>
    <button @click="newPrize">confirm</button>
    <button @click="modifyrolltableprize=false">close</button>
  </div>
  <!--every time add/delete one product, we flash the page to get the new product list-->

  <div>
    <button @click="modifyrolltableprize=true">Add a new Prize</button>

    <h3>Prizes Now:</h3>
    <div class="productContainer">
      <!--      for the card in the equipments     -->
      <div v-for="prize in rolltableprize">
        <p class="product" :id="rolltableprize.indexOf(prize)">
          <img class="img" :src="prize.picPath">
          <p>{{ prize.prizeName }}</p>
          <p>{{ prize.weight }}</p>
        </p>
      </div>
    </div>
    <button @click="modify()">modify</button>
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
  width: 325px;
  height: 325px;
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