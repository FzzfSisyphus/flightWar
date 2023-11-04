<template>
  <v-btn
      @click="goToAdminPage"
      color="primary"
      variant="elevated">
    Back to catalog
  </v-btn>

  <div class="product">
    <div class="product-image">
      <img :src="selectedProduct.thumbnail" alt="">
    </div>
    <div class="product-details">
      
      <p>itemName: {{ selectedProduct.itemName}}</p>
      <p>Description: {{ selectedProduct.describe }}</p>
      <h2>Price: ${{ selectedProduct.price }}</h2>
      <!-- <v-btn
        variant="elevated"
        color="indigo-lighten-3"
        @click="addToCart"
    >Add to cart</v-btn> -->
    </div>
  </div>

  <div class="update">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Update Product</span>
      </div>
      <el-tabs
          v-model="currentIndex"
          stretch
          @tab-click="handleTabsClick"
      >

        <el-tab-pane label="登陆" name="update">
          <el-form
              :model="updateForm"
              :rules="rules"
              status-icon
              ref="updateForm"
          >
            <el-form-item
                label="itemName"
                label-width="80px"
                prop="itemName"
            >
              <el-input
                  type="text"
                  v-model="updateForm.itemName"
                  class="border"
                  placeholder="Add description"
              />
            </el-form-item>
            <el-form-item
                label="Price"
                label-width="80px"
                prop="price"
            >
              <el-input
                  type="text"
                  v-model="updateForm.price"
                  class="border"
                  placeholder="You can only enter number"


              />
            </el-form-item>
              <el-form-item
                label="Description"
                label-width="80px"
                prop="describe"
            >
              <el-input
                  type="text"
                  v-model="updateForm.describe"
                  class="border"
                  placeholder="Add descriprion"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                  type="primary"
                  @click="submitForm('updateForm')"
              >Submit</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { productsStore } from "@/stores/products";
import { useRoute, useRouter } from "vue-router";
const store = productsStore()
const router = useRouter()
const route = useRoute()

const goToAdminPage= () => {
  router.push({ name: 'CatalogAdmin' })
}
const selectedProduct = computed(() => {
  return store.products.find((item) => item.id === Number(route.params.id))
})
// const addToCart = () => {
//   //if 语句itemName>0
//   if(selectedProduct.value.itemName>0)
//   { store.addToCart(selectedProduct.value)
//     selectedProduct.value.itemName--
//     router.push({ name: 'CartView' }) }
//   else
//     alert("No itemName now!")
// }

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
    name: 'ProductDetails'

  },
  setup() {
    const router = useRouter()


  },
  mounted(){
    this.updateForm.itemName=this.selectedProduct.itemName
    this.updateForm.price=this.selectedProduct.price// get data
    this.updateForm.describe=this.selectedProduct.describe
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

    // 验证规则
    var validateUserName = (rule, value, callback) => {

      if (value==="") {

        callback(new Error("Please enter itemName"));
      }
      else {
        callback();
      }
    };
    var validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter price"));
      } else {
        callback();
      }
    };




    // const selectedProduct = computed(() => {
    //     return store.products.find((item) => item.id === Number(route.params.id))
    //   })
    return {
      currentIndex: "update",
      updateForm: {
        itemName: "",
        price: "",
      },
      // registerForm: {
      //   itemName: "",
      //   price: "",
      //   configurePassword: "",
      //   email: "",
      // },
      activeTab: "update",
      selectedProduct,
      rules: {
        itemName: [
          {
            validator: validateUserName,
            trigger: "blur",
            required: true,
            message: 'Please enter itemName'

          },
        ],
        price: [
          {
            validator: validatePassWord,
            trigger: "blur",
            required: true,
            message: 'Please enter price',

          },
        ],
      },

    };
  },
  methods: {

    ...mapMutations("update", ["setUser"]),
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       if (this.activeTab === "update") {
    //         // 登陆
    //         console.log("111111111111111111"+this.updateForm.itemName)
    //         this.selectedProduct.itemName=this.updateForm.itemName
    //         this.selectedProduct.price=this.updateForm.price// update form
    //this.selectedProduct.describe=this.updateForm.describe
    //         let product={
    //   "id": this.selectedProduct.id,
    //   "itemName": "ADD",
    //   "describe": "",
    //   "price": this.selectedProduct.price,
    //   "picPath": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
    //    "status":"update"
    //  }

    //         axios.put('https://products/manage/catalog', product).then(
    //     (res) => {
            
    //     }
    // )
    //         console.log("22222222"+this.selectedProduct.itemName)
    //         this.updateForm.itemName=""
    //         this.updateForm.price=""//clean form
    //       }

    //     } else {
    //       return;
    //     }
    //   });
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.activeTab === "update") {
            // 登陆
            console.log("111111111111111111"+this.updateForm.itemName)
            this.selectedProduct.itemName=this.updateForm.itemName
            this.selectedProduct.price=this.updateForm.price// update form
            this.selectedProduct.describe=this.updateForm.describe// update form
            //let product={
           //   "id": this.selectedProduct.id,
          //   "itemName": this.selectedProduct.itemName,
           //   "describe": this.selectedProduct.describe,
         //   "price": this.selectedProduct.price,
        //   "picPath": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
       //    "status":"update"
       //  }        
    //         axios.put('https://products/manage/catalog', product).then(
    //     (res) => {
            
    //     }
    // )

            console.log("22222222"+this.selectedProduct.itemName)
            this.updateForm.itemName=""
            this.updateForm.price=""//clean form
            this.updateForm.describe=""
          }

        } else {
          return;
        }
      });
    },

    handleTabsClick(tab) {
      this.activeTab = tab.name;
    },


  },
};



</script>

<style scoped lang="less">

* {
    margin: 0;
    padding: 0;
}

main {
    max-width: 900px;
    margin: 0 auto;
    padding: 16px;
}

.product {
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
.border{
  border: 1px solid;
}
</style>