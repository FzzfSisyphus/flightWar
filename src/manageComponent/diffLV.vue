<script setup>
import {ref, onMounted} from 'vue'
import manageAPI from '../services/manageAPI'

import router from "@/router";


  const loading = ref(true)
  const responseData = ref(null)
  
  const loadDiff  = async() => {
    try{
      const response = await manageAPI.getDiffLV() 
      responseData.value = response.data
      console.log(responseData.value)
      console.log("userid is ")
    } catch(err){
        console.log(err)
    } finally{
        loading.value=false
    }
  }
  onMounted(
    loadDiff()
  )


// let userid = ref(router.currentRoute.value.params.userid)

// onMounted(() => {
//   load();
// });
// const load = async () => {
//   try {
//     const response = await manageAPI.getDiffLV()
//     console.log(response)
//     diffLVArray.value = []
//     let p;
//     for (let i = 0; i < response.data.data.length; i++) {
//       p = response.data.data[i]
//       diffLVArray.value.push({
//         diffLV: p.diffLV,
//         awardDensity: p.awardDensity,
//         enemyDensity: p.enemyDensity
//       })
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// const newDiffLV = async () => {
//   try {
//     const response = await manageAPI.modifyDiffLV(data)
//     console.log(response.status)
//     modifydiffLV.value = false
//   } catch (error) {
//     console.log(error)
//   }
// }

// function modify(id) {
//   modifydiffLV.value = true
//   diffLV.value = diffLVArray.value[id].diffLV
//   awardDensity.value = diffLVArray.value[id].awardDensity
//   enemyDensity.value = diffLVArray.value[id].enemyDensity
// }

// function addDiffLV() {
//   modifydiffLV.value = true
//   status.value = 'add'
// }

</script>

<template>
  <div v-if="loading"> loading information </div>
  <div v-else>
    <div> {{responseData}}</div>
    <n-list hoverable clickable>
      <n-list-item v-for="(item, index) in responseData" :key="index" >
        <n-input-group>
          <div class="listitem" >{{responseData[index].diffLv}}</div>
  
          <div class="listitem">Enemy{{ responseData[index].awardDensity }}</div>
          <n-input-number class="listitem" v-model:value="responseData[index].awardDensity" placeholder="Enemy Density" />
          <div class="listitem">Award Density</div>
          <n-input-number class="listitem" v-model:value="responseData[index].awardDensity" placeholder="Award Density" />
        </n-input-group>
      </n-list-item>
    </n-list>
    <!-- <n-list hoverable clickable v-for="(item, index) in responseData" :key="index" >
      <n-list-item >
        <n-dynamic-input v-model:value="responseData" :on-create="onCreate">
          <n-input-number
            v-model:value="responseData[index].awardDensity"
            style="margin-right: 12px; width: 160px"
          />
        </n-dynamic-input>
      </n-list-item>
    </n-list> -->

    <button @click="confirmChange"> save change </button>
  </div>
</template>

<style scoped>

.listitem{
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