<template>
  <div >
    <v-text-field clearable label="Label" prepend-icon="$vuetify" ></v-text-field>
    <v-row no-gutters>
      <v-col
          v-for="product in store.products"
          :key="product.id"
          cols="12"
          sm="4"
          class="card"
      >
        <product-item
        
            :product-data="product"
            @item-clicked="goToProductPage"
            @click="goToProductPage(product.id)"
        />
    <button @click="removeFromProduct(product.id)">Remove</button>
      </v-col>
    </v-row>           
    </div>
      <v-btn
      @click="addProduct"
      color="primary"
      variant="elevated">
    Add more
  </v-btn>
  <br><br>
  <v-btn
      @click="goToCatelogView"
      color="primary"
      variant="elevated">
   Go to user page
  </v-btn>
</template>

<script>
  import { defineComponent } from "vue";
  import ProductItem from "@/components/ProductItem.vue";
  export default defineComponent({
    name: 'CatalogAdmin',
    components: {
      ProductItem
    }
  })
</script>

<script setup>
  import { onMounted, ref } from "vue";
  import { productsStore } from "@/stores/products";
  import { useRouter } from "vue-router";

  const store = productsStore()
  const router = useRouter()

  const search = ref('')

  const goToProductPage = (id) => {
    router.push({ name: 'ProductView', params: { id } })
  }

  const goToCatelogView = () => {
    
    router.push({ name: 'Catalog' })
  }


 const removeFromProduct = (id) => {
    store.removeFromProduct(id)
    // let data = {
    //             id:id
    //         }
    //         //url传递参数
    //         axios.delete('接口地址', {
    //             parmas:{
    //                 id:id
    //             }
    //         }).then(
    //             (res) => {
    //                 //执行成功后代码处理
    //             }
    //         )

  }

//  const addProduct = (id) => {
//     store.removeFromProduct(id)
//   }

  const addProduct = () => {
    store.addProduct()
    // goToProductPage(store.products.length)
    //goToProductPage(store.size)
    

  }

  onMounted(async () => {
    await store.fetchProductsFromDB()
  })
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

main {
    max-width: 900px;
    margin: 0 auto;
    padding: 16px;
}
.card{
 
    margin: 20px;
    padding: 16px;
    width: 40px;
}
</style>