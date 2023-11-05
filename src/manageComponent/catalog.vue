<script setup>
import {ref, onMounted} from 'vue'
import manageAPI from '../services/manageAPI'
import router from "@/router";

let equipments = ref(['', ''])
let modifyequipment = ref(false)
let status = ref('')
let itemId = ref(null)
let itemName = ref('')
let describe = ref('')
let price = ref(0)
let picPath = ref('')
let userid = ref(router.currentRoute.value.params.userid)
let data = ref({
  status,
  itemId,
  itemName,
  describe,
  price,
  picPath,
  userid
})


onMounted(() => {
  load();
});
const load = async () => {
  try {
    const response = await manageAPI.getDiffLV()
    console.log(response)
    equipments.value = []
    let p;
    for (let i = 0; i < response.data.data.length; i++) {
      p = response.data.data[i]
      equipments.value.push({
        itemId: p.itemId,
        itemName: p.itemName,
        describe: p.describe,
        price: p.price,
        picPath: p.picPath
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const newEquipment = async () => {
  try {
    const response = await manageAPI.modifyEquipment(data)
    console.log(response.status)
    modifyequipment.value = false
  } catch (error) {
    console.log(error)
  }
}

const deleteEquipment = async (id) => {
  try {
    const response = await manageAPI.deleteEquipment(id)
    console.log(response.status)
  } catch (error) {
    console.log(error)
  }
}

function changeEquipment(id) {
  modifyequipment.value = true
  itemName.value = equipments.value[id].itemName
  describe.value = equipments.value[id].describe
  price.value = equipments.value[id].price
  picPath.value = equipments.value[id].picPath
}

function addEquipment() {
  modifyequipment.value = true
  status.value = 'add'
}

</script>

<template>
  <div v-if="modifyequipment" class="overlay">
    <div class="backfont">
      <dev v-if="status != 'add'">
        <input type="radio" v-model="status" value="change"/><label>change</label>
        <input type="radio" v-model="status" value="delete"/><label>delete</label>
      </dev>
      <h3>Put the information of the product</h3>
      <br>
      <p>itemName: </p>
      <textarea v-model="itemName"></textarea>
      <br>
      <p>describe:</p>
      <textarea v-model="describe"></textarea>
      <br>
      <p>price:</p>
      <textarea v-model="price"></textarea>
      <br>
      <p>picPath:</p>
      <textarea v-model="picPath"></textarea>
    </div>
    <button @click="newEquipment">confirm</button>
    <button @click="modifyequipment=false">close</button>
  </div>
  <!--every time add/delete one product, we flash the page to get the new product list-->

  <div>
    <h2>Manage your equipments!</h2>

    <button @click="addEquipment">Add a new product</button>

    <h3>Your equipments:</h3>
    <div class="productContainer">
      <!--      for the card in the equipments     -->
      <div v-for="equipment in equipments">
        <p class="product" :id="equipment.itemId">
          <img class="img" :src="equipment.picPath">
          <p>{{ equipment.itemName }}</p>
          <p>{{ equipment.describe }}</p>
          <p>{{ equipment.price }}</p>
          <button @click="changeEquipment(equipments.valueOf(equipment))">change</button>
          <button @click="deleteEquipment(equipments.itemId)">delete</button>
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