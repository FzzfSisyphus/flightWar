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
      // fetch('https://dummyjson.com/products')
      //     .then(res => res.json())
      //     .then(json => {
      //       this.products = json.products;
      //       console.log(this.products)
      //     })    
      // https://products/manage/catalog
      // axios.get('https://dummyjson.com/products', {

      // }).then(
      //     (res) => {
      //       console.log("????????"+res.data.products)
      //       this.products=res.data.products//没有对象名字可以直接用
      //       console.log("!!!!!!!!!"+ this.products)
      //     }
      // )
        
      axios.get('https://dummyjson.com/products', {
        params: {
          //id: 12,
        },
    }).then(
        (res) => {
          //this.products=res.data.products
           console.log("!!!!!!!!!"+ this.products)
           console.log("??????"+ res.data)
        }
    )
      this.products =[
          {
              "id": 1,
              "itemName": "iPhone 9",
              "describe": "An apple mobile which is nothing like apple",
              "price": 20,
              "couponID":"sdf132",
              "discountPercentage": 12.96,
              "rating": 4.69,
              "stock": 1,
              "brand": "Apple",
              "category": "smartphones",
              "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
              "images": [
                  "https://i.dummyjson.com/data/products/1/1.jpg",
                  "https://i.dummyjson.com/data/products/1/2.jpg",
                  "https://i.dummyjson.com/data/products/1/3.jpg",
                  "https://i.dummyjson.com/data/products/1/4.jpg",
                  "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
              ]
          },
          {
              "id": 2,
              "itemName": "iPhone X",
              "describe": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
              "price": 100,
              "couponID":"sdf132",
              "discountPercentage": 17.94,
              "rating": 4.44,
              "stock": 1,
              "brand": "Apple",
              "category": "smartphones",
              "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
              "images": [
                  "https://i.dummyjson.com/data/products/2/1.jpg",
                  "https://i.dummyjson.com/data/products/2/2.jpg",
                  "https://i.dummyjson.com/data/products/2/3.jpg",
                  "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
              ]
          },
          {
            "id": 3,
            "itemName": "iPhone X",
            "describe": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
            "price": 50,
            "couponID":"sdf132",
            "discountPercentage": 17.94,
            "rating": 4.44,
            "stock": 1,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
            "images": [
                "https://i.dummyjson.com/data/products/3/1.jpg",
                "https://i.dummyjson.com/data/products/3/2.jpg",
                "https://i.dummyjson.com/data/products/3/3.jpg",
                "https://i.dummyjson.com/data/products/3/thumbnail.jpg"
            ]
        }
      ];
    },

    addToCart(product) {
      
      this.cart.push(product)
    },
  addProductToDB()
  {
     
     let product={
      "id": this.products.length+1,
      "itemName": "ADD",
      "description": "",
      "price": 0,
      "discountPercentage": 0,
      "couponID":"",
      "rating": 0,
      "stock": 0,
      "brand": "",
      "category": "",
      "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/4/1.jpg",
        "https://i.dummyjson.com/data/products/4/2.jpg",
        "https://i.dummyjson.com/data/products/4/3.jpg",
        "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
      ]
     }
     this.products.push(product)
      axios.post('https://dummyjson.com/products', products).then(
    (res) => {
        
   
       }
    ) 

    this.products.push(product)
    return this.products.length
  },

  addProductToDB()
  {
     
     let product={
      "id": this.products.length+1,
      "itemName": "ADD",
      "describe": "",
      "price": 10,
      "discountPercentage": 0,
      "couponID":"",
      "rating": 4.09,
      "stock": 5,
      "brand": "",
      "category": "",
      "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/4/1.jpg",
        "https://i.dummyjson.com/data/products/4/2.jpg",
        "https://i.dummyjson.com/data/products/4/3.jpg",
        "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
      ]
     }
     this.products.push(product)
      axios.post('https://dummyjson.com/products', products).then(
    (res) => {
        
   
       }
    ) 

    this.products.push(product)
    return this.products.length
  },
  addProduct()
  {
     
     let product={
      "id": this.products.length+1,
      "itemName": "ADD",
      "describe": "",
      "price": 10,
      "discountPercentage": 0,
      "couponID":"",
      "rating": 4.09,
      "stock": 5,
      "brand": "",
      "category": "",
      "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
      "images": [
        "https://i.dummyjson.com/data/products/4/1.jpg",
        "https://i.dummyjson.com/data/products/4/2.jpg",
        "https://i.dummyjson.com/data/products/4/3.jpg",
        "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
      ]
     }
    this.products.push(product)
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
    // EditNumber(id,number) {
    //   console.log('>>>>> ID', id)
    //   if(this.products.item.id=id)
    //   {
    //     item.brand=number;
    //   }
    // }
  }
})