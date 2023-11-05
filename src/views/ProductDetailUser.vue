<template>
  <v-btn @click="goToAdminPage" color="primary" variant="elevated">
    Back to catalog
  </v-btn>

  <div class="productUser">
    <div class="product-image">
      <img :src="selectedProduct.picPath" alt="">
    </div>
    <div class="product-details">
      <p>Name: {{ selectedProduct.itemName }}</p>
      <p>Description: {{ selectedProduct.describe }}</p>
      <h2>Price: ${{ selectedProduct.price }}</h2>
      <v-btn variant="elevated" color="indigo-lighten-3" @click="getCredit(itemid)">Purchase</v-btn>
      <!-- <v-btn variant="elevated" color="indigo-lighten-3" @click="addToCartDB(2,selectedProduct.itemId)">Purchase</v-btn> -->
    </div>
  </div>
</template>

<script setup>

import {productsStore} from "@/stores/products";
import {useRoute, useRouter} from "vue-router";
import axios from 'axios';

const store = productsStore()
const router = useRouter()
const route = useRoute()

let userid = ref(router.currentRoute.value.params.userid)
let itemid = ref(router.currentRoute.value.params.itemid)

const selectedProduct = computed(() => {
  console.log(Number(route.params.userid))
  console.log("The item is ")
  console.log(store.products[route.params.userid])
  //return store.products.find((item) => item.item_id === Number(route.params.id))
  return store.products[route.params.userid]
})

function goToAdminPage() {
  router.push(`/Catalog/${userid.value}`)
}


const getCredit = async () => {
  alert(`Congratulations, you have bought it!`);
  await axios.post('http://aa1f1d3f1df22476cbf3887045f4b00a-595466472.ap-southeast-1.elb.amazonaws.com/catalog/buy', {
    userId: Number(userid),
    itemId: Number(itemid)
  }).then(
      (res) => {
        alert(`Congratulations, you have bought it!`)
        console.log("Credit")
        console.log(res.data.credit)
        // //let credit=res.data.id
        // let credit = 0
        // if (credit < selectedProduct.price)
        //     alert("You do not have enough credit")
        let credit = res.data.credit
        let price = store.products[route.params.id].price
        console.log(credit)
        console.log(price)
        if (credit > price) {
          addToCartDB(2, store.products[route.params.userid].itemId)
        } else
          alert("You don't have enough money")
        return res.data.credit;
      }
  )


}


//用selectedproduct.id调用
const addToCartDB = (userID, id) => {
  console.log("Price is")
  console.log(store.products[route.params.id].price)

  axios({
    method: 'post',//请求方法
    //data: this.selectedProduct,
    data: {
      "userId": userID,
      "itemId": id,

    },
    url: 'http://aa1f1d3f1df22476cbf3887045f4b00a-595466472.ap-southeast-1.elb.amazonaws.com/catalog/buy',
  }).then(res => {

  })
  alert("Purchase successful!")
  // store.addToCart()
  // router.push({ name: 'WareHouse' })


}


</script>

<script>
import {defineComponent} from "vue";
import {ref} from 'vue';
import {ElTable, ElTableColumn, ElButton, ElDialog, ElForm, ElFormItem, ElInput} from 'element-plus';
import {computed} from "vue";
import {productsStore} from "@/stores/products";
import {mapMutations} from "vuex";
import {useRoute, useRouter} from "vue-router";

export default {
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    name: 'ProductDetailUser'

  },
  setup() {
    const router = useRouter()


  },
  data() {

    const form = ref({});
    const dialogVisible = ref(true)
    const store = productsStore()
    //   const router = useRouter()
    //   const route = useRoute()

    const route = useRoute();
    const router = useRouter()


    const selectedProduct = computed(() => {
      console.log(Number(route.params.id))
      return store.products.find((item) => item.id === Number(route.params.id))
    })

    const tableData = ref(store.products)
    console.log(store.products)
    return {

      selectedProduct,

    };
  },
  methods: {

    ...mapMutations("update", ["setUser"]),

    handleTabsClick(tab) {
      this.activeTab = tab.name;
    },
  },
};


</script>

<style scoped lang="less">
.productUser {
  display: flex;
  margin-top: 50px;
}

.product-image {
  margin-right: 24px;
}

.update {
  width: 300px;
  margin: 0 auto;

  .box-card {
    width: 10px;
    margin: 10px auto;

  }
}

.border {
  border: 1px solid;
}
</style>