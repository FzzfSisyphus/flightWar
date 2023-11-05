<template>
  <LuckyWheel
      ref="LuckyWheel"
      width="700px"
      height="700px"
      :prizes="prizes"
      :default-style="defaultStyle"
      :blocks="blocks"
      :buttons="buttons"
      @start="startCallBack"
      @end="endCallBack"
  />
</template>

<script>
import warehouseAPI from '../services/warehouseAPI.js'

export default {
  props: {
    prizeList: Array,
    userId: Number
  },

  data() {
    return {
      prizes: [],
      defaultStyle: {
        fontColor: '#d64737',
        fontSize: '14px'
      },
      blocks: [
        {padding: '20px', background: '#d64737'}
      ],
      buttons: [
        {radius: '100px', background: '#d64737'},
        {radius: '80px', background: '#ff7402', pointer: true},
        {
          radius: '60px',
          background: '#fff',
          fonts: [{text: 'start', fontSize: '40px', top: '-25px'}]
        }
      ],
    }
  },
  mounted() {
    this.getPrizesList()
  },
  methods: {
    // getPrizesList() {
    //   const prizes = []
    //   let data = this.prizeList
    //   data.forEach((item, index) => {
    //     prizes.push({
    //       title: item.name,
    //       background: index % 2 ? '#f9e3bb' : '#f8d384',
    //       fonts: [{text: item.name, top: '10%',fontSize: '20px'}],
    //       imgs: [{ src: item.src, width: '45%', top: '20%' }],
    //     })
    //   })
    //   this.prizes = prizes
    // },
    async getPrizesList() {
      let prizes = []
      let data;
      try {
        console.log("get prize list")
        let response = await warehouseAPI.getPrize()
        data = response.data.data
        console.log(response)
      } catch (error) {
        console.log(response)
        console.log("error")
      }
      data.forEach((item, index) => {
        var i;
        for (i = 0; i < item.weight; i++) {
          prizes.push({
            title: item.itemName,
            background: index % 2 ? '#f9e3bb' : '#f8d384',
            fonts: [{text: item.itemName, top: '10%', fontSize: '20px'}],
            imgs: [{src: item.picPath, width: '45%', top: '20%'}],
          })
        }
      })
      this.prizes = prizes
    },
    startCallBack() {
      this.$refs.LuckyWheel.play()
      setTimeout(() => {
        this.$refs.LuckyWheel.stop(Math.random() * 8 >> 0)
      }, 3000)
    },
    endCallBack(prize) {
      // alert(`恭喜你获得${prize.title}`)
      console.log(prize.title, prize.index)
      try{
        const response = warehouseAPI.winPrize(userId)
        console.log(response)
      }catch (error){
        console.log(error)
      }
    },
  }
}
</script>
