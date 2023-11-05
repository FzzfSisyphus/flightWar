<script setup>
import {onMounted, ref} from 'vue'
import RollTable from './components/RollTable.vue';
import warehouseAPI from './services/warehouseAPI'
import router from "@/router";

let userId = router.currentRoute.value.params.userid
let equipments = ref([])
let coupons = ref(-1)
let credit = ref(-1)
let credits = ref(0)

let startroll = ref(false)

onMounted(() =>
    load()
)

const load = async () => {
  try {
    const response = await warehouseAPI.getWarehouse(userId)
    console.log(response)
    coupons.value = response.data.coupon;
    credit.value = response.data.credit;
    let equipt;
    for (let i = 0; i < response.data.equipts.length; i++) {
      equipt = response.data.equipts[i]
      equipments.value.push({
        itemId: equipt.itemId,
        itemName: equipt.itemName,
        describe: equipt.describe,
        quantity: equipt.quantity,
        price: equipt.price,
        picPath: equipt.picPath
      });
    }
  } catch (error) {
    console.log(error)
  }
}

function getRandomColor() {
  return "hsl(" + Math.random() * 360 + "), 100%, 75%";
}

function turntable() {
//   about the jumping out turntable
  if (coupons.value == 0) {
    startroll.value = true
    couponWarning.value = "You don't have any coupons, you can get one by gaming!";
    return
  } else {
    startroll.value = true
    couponsNumber.value = couponsNumber.value - 1
    couponWarning.value = ''
  }
}

function rolled(){
  startroll.value = false
  coupons.value = coupons.value - 1
}
</script>

<template>
  <div v-if="startroll" class="overlay">
    <RollTable :userId='userId'
    @response="(flag) => rooled"/>
    <button @click="startroll=false">close</button>

  </div>

  <div>
    <h1>Hi! Welcome to your warehouse!</h1>

    <div>
      <h3>Your credits are: {{ credit }}</h3>
      <br>
      <h3>You have {{ coupons }} coupons!</h3>
      <button @click="turntable">roll the turntable!</button>
      <p v-if="couponWarning" class="ErrorMsg">{{ coupons }}</p>
      <p v-else>{{ }}</p>
    </div>

    <div class="equipmentContainer">
      <!--      for the card in the equipments     -->
      <div v-for="equipment in equipments">
        <p class="equipment" :id="equipment.itemId">
          <img :src="equipment.picPath">
          <p>{{ equipment.itemName }}</p>
          <p>{{ equipment.describe }}</p>
          <p>{{ equipment.quantity }}</p>
        </p>
      </div>
    </div>

    <div>
      <router-link :to="{path: '/ModeChoose/' + $route.params.userid}">back to menu</router-link>
    </div>

  </div>
</template>

<style scoped>
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

.equipmentContainer {
  max-width: 1000px;
  padding: 10px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}

.equipment {
  width: 435px;
  height: 435px;
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