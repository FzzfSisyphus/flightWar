<script setup>
import {ref, onMounted} from 'vue'
import manageAPI from '../services/manageAPI'



  let loading = ref(true)
  const responseData = ref(null)
  
  
  const loadDiff  = async() => {
    try{
      const response = await manageAPI.getDiffLV() 
      responseData.value = response.data
      console.log(responseData.value)
      console.log("userid is ")
      loading.value=false
    } catch(err){
        console.log(err)
    }
  }
  onMounted(() =>{
    loadDiff()
  })
  async function confirmChange(){
    try{
      const response = await manageAPI.modifyDiffLV(responseData.value) 
      console.log(response)
    } catch(err){
      console.log(err)
    }
    console.log(responseData.value)
  }
</script>

<template>
  <div v-if="loading"> loading information </div>
  <div v-else>
    <n-list hoverable clickable>
      <n-list-item v-for="(item, index) in responseData" :key="index" >
        <n-input-group>
          <div class="listitem" >Difficult Level : {{responseData[index].diffLv}}</div>  
          <div class="listitem">Enemy Density</div>
          <n-input-number class="listitem" v-model:value="responseData[index].enemyDensity" placeholder="Enemy Density" />
          <div class="listitem">Award Density</div>
          <n-input-number class="listitem" v-model:value="responseData[index].awardDensity" placeholder="Award Density" />
        </n-input-group>
      </n-list-item>
    </n-list>
    <button @click="confirmChange"> save change </button>
  </div>
</template>

<style scoped>

.listitem{
  margin-right: 20px; 
  width: '17%';
}
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