<template>
    <v-btn @click="goToAdminPage" color="primary" variant="elevated">
        Back to catalog
    </v-btn>

    <div class="productUser">
        <div class="product-image">
            <img :src="selectedProduct.thumbnail" alt="">
        </div>
        <div class="product-details">
            <p>Brand: {{ selectedProduct.brand }}</p>
            <p>Description: {{ selectedProduct.description }}</p>
            <h2>Price: ${{ selectedProduct.price }}</h2>
            <v-btn variant="elevated" color="indigo-lighten-3" @click="addToCart">Purchase</v-btn>
        </div>
    </div>
</template> 

<script setup>

import { productsStore } from "@/stores/products";
import { useRoute, useRouter } from "vue-router";
const store = productsStore()
const router = useRouter()
const route = useRoute()

const goToAdminPage = () => {
    router.push({ name: 'CatalogAdmin' })
}
const selectedProduct = computed(() => {
    return store.products.find((item) => item.id === Number(route.params.id))
})

const addToCart = () => {

    store.addToCart(selectedProduct.value)
    router.push({ name: 'CartView' })

}

//用selectedproduct.id调用
const addToCartDB = (userID, id) => {
    //if 语句stock>0
    if (getCredit(userID) > selectedProduct.price) {
        axios({
            method: 'post',//请求方法
            data: this.selectedProduct,
            url: '/catalog/buy',
        }).then(res => {
            //执行成功后代码处理
        })

        store.addToCart()
        router.push({ name: 'CartView' })
    }
    else
        alert("Do not have enough credit!")
}
</script>

<script>
import { defineComponent } from "vue";
import { ref } from 'vue';
import { ElTable, ElTableColumn, ElButton, ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus';
import { computed } from "vue";
import { productsStore } from "@/stores/products";
import { mapMutations } from "vuex";
import { useRoute, useRouter } from "vue-router";
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

        getCredit(userID) {
            axios.get('/catalog/user', {
                params: {
                    id: userID,
                },
            }).then(
                (res) => {
                    //let credit=res.data.id
                    let credit = 0
                    if (credit < selectedProduct.price)
                        alert("You do not have enough credit")
                    return credit;
                }
            )


        }



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