import axios from 'axios'
import { defineStore } from 'pinia'


export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
      cart: [],
      
      //define variables
  }),
  
  actions: {
    


    fetchProductsFromDB() {

      axios.get('http://aa1f1d3f1df22476cbf3887045f4b00a-595466472.ap-southeast-1.elb.amazonaws.com/catalog', {
        params: {
          //id: 12,
        },
    }).then(
        (res) => {
          this.products=res.data
           console.log("!!!!!!!!!"+ this.products)
           console.log("??????"+ res.data)
        }
    )
      
    },

    addToCart(product) {
      
      this.cart.push(product)
    },

  addProductToDB()
  {
     
     let product={
      "itemId": this.products.length+1,
      "itemName": "ADD",
      "describe": "",
      "price": 10,
      "picPath":"https://images.freeimages.com/365/images/previews/252/free-bullet-icons-vector-clip-art-32415.png",
      
     }
     this.products.push(product)
      axios.post('https://dummyjson.com/products', products).then(
    (res) => {
        
   
       }
    ) 

    //this.products.push(product)
    return this.products.length
  },
   addFromProduct(id) {
    
      console.log('>>>>> ID', id)
      this.products = this.products.filter((item) => item.id !== id)
    },

    updateFromProductToDB(id) {
    
      axios.post('https://products/manage/catalog', data).then(
        (res) => {
            
        }
    )
  
        console.log('>>>>> ID', id)
        this.products = this.products.filter((item) => item.id !== id)
      },

    removeFromCart(id) {
      console.log('>>>>> ID', id)

      this.cart = this.cart.filter((item) => item.id !== id)
    },
    removeFromProduct(id) {
      console.log('>>>>> ID', id)
      this.products = this.products.filter((item) => item.id !== id)
    },

  }
})