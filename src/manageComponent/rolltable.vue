<script setup>
import {ref, onMounted} from 'vue'
import manageAPI from './services/manageAPI'

let rolltableprize = ref(['', ''])
let modifyrolltableprize = ref(false)
let status = ref('')
let prizeName = ref('')
let picPath = ref('')
let weight = ref('')

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


</script>

<template>
  <div v-if="modifyrolltableprize" class="overlay">
    <div class="backfont">
      <h3>Put the information of the product</h3>
      <br>
      <p>picture: </p>
      <textarea v-model="pic_path" placeholder="Enter picture path"></textarea>
      <br>
      <p>describe:</p>
      <textarea v-model="describe" placeholder="Food describe"></textarea>
      <br>
      <p>price:</p>
      <textarea v-model="price" placeholder="Enter price"></textarea>
      <br>
      <p>quantity:</p>
      <textarea v-model="quantity" placeholder="quantity"></textarea>
      <br>
      <p>expireTime: </p>
      <textarea v-model="expireTime" placeholder="yyyymmdd"> </textarea>
    </div>
    <button @click="newProduct">confirm</button>
    <button @click="closeOverlay">close</button>
  </div>
  <!--every time add/delete one product, we flash the page to get the new product list-->

  <div>
    <button @click="add=true">Add a new Prize</button>

    <h3>Prizes Now:</h3>

    <div v-if="productNumber == 0">
      <h4>Seems you don't have any product...</h4>
      <h4>Create your first by click the right top button!</h4>
    </div>
    <div v-else>
      <div class="productContainer">
        <!--      for the card in the equipments     -->
        <div v-for="prize in rolltableprize">
          <p class="product" :id="indexOf(prize)">
            <img class="img" :src="prize.picPath">
            <p>{{ prize.prizeName }}</p>
            <p>{{ prize.weight }}</p>
            <button @click="modify(indexOf(prize))">modify</button>
          </p>
        </div>
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