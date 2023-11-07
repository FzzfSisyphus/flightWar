<template>
  <div class="products-list">
    <v-text-field clearable label="Label" prepend-icon="$vuetify"></v-text-field>
    <v-row no-gutters>
      <v-col
          v-for="product in store.products"
          :key="product.id"
          cols="12"
          sm="4"
      >
        <product-item
            :product-data="product"
            @item-clicked="goToProductPage"
            @click="goToProductPage( userid, product.itemId)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import ProductItem from "@/components/ProductItem.vue";

export default defineComponent({
  name: 'Catalog',
  components: {
    ProductItem
  }
})
</script>

<script setup>
import {onMounted, ref} from "vue";
import {productsStore} from "@/stores/products";
import {useRouter} from "vue-router";

const store = productsStore()
const router = useRouter()

const search = ref('')

let userid = ref(router.currentRoute.value.params.userid)

const goToProductPage = (userid, itemid) => {
  router.push({name: 'ProductViewUser', params: {userid: userid, itemid: itemid}})
}


onMounted(async () => {
  await store.fetchProductsFromDB()
})
</script>

<style scoped>

</style>