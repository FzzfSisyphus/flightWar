<script setup>
import {ref} from "vue";
import router from "@/router";
import accountAPI from "../services/accountAPI"

let Username = ref('')
let Password = ref('')
let verifyerrorMessage = ref("")
let emptyerrorMessage = ref("")
let userid = ref(0)

const log = async () => {
  verifyerrorMessage.value = ''
  emptyerrorMessage.value = ''
  if (Username == '' & Password == '') {
    emptyerrorMessage.value = 'Please input the username and password'
  } else {
    try {
      const response = await accountAPI.login(Username.value, Password.value)
      console.log(response);
      console.log("ok");
      userid.value = response.data.userId;
      if (response.data.roleType == 1) {
        router.push(`/Manage/${userid.value}`);
      } else {
        router.push(`/ModeChoose/${userid.value}`);
      }
      console.log("no jump")
      console.log(response.data.roleType)
    } catch (error) {
      console.log(error);
      console.log("error");
      verifyerrorMessage.value = "Sorry! The username and the password don't match!";
    }
  }
}
</script>

<template>
  <h2>Log in</h2>
  <br>
  <h4>Continue your exciting fight fight!</h4>
  <br>
  <p> Username: <input v-model="Username" placeholder="Username"></p>
  <p> Password: <input v-model="Password" type="password" placeholder="Password"></p>

  <p v-if="emptyerrorMessage" style="color: red">{{ emptyerrorMessage }}</p>
  <p v-if="verifyerrorMessage" style="color: red">{{ verifyerrorMessage }}</p>
  <!--  <p v-else>{{ type="password" }}</p>-->

  <button class="Signbutton" @click="log">Log in</button>

  <!--  <button class="Signbutton" @click="">Quit</button>-->
</template>

<style>
.Signbutton {
  height: 35px;
  width: 150px;
  line-height: 23px;
  font-weight: bold;
  font-size: 22px;
  background: #accbea;
  color: #2c3e50;
  border: 1px solid transparent;
  border: 1px solid #164bde;
  padding: 0 10px;
  margin: 2px;
}
</style>


