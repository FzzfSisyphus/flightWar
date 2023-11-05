import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";

import StartPage from "@/StartPage.vue";
import ModeChoose from "@/ModeChoose.vue";
import WareHouse from "@/WareHouse.vue";

import GameInterface from "@/Gameview/GameInterface.vue";
import Game from "@/Game.vue";
import GameEquipment from "@/Gameview/Equipment.vue";
import Manage from "@/Manage.vue";

const router = createRouter({
    history : createWebHashHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: "/",
            name:"StartPage",
            component: StartPage
        },
        {
            path: "/ModeChoose/:userid",
            name:"ModeChoose",
            component: ModeChoose,
        },
        {
            path: "/WareHouse/:userid",
            name:"WareHouse",
            component: WareHouse,
        },
        {
            path: "/Game/:userid",
            name: "Game",
            component: Game,
        },
        {
            path: "/GameInterface/:gameinfo",
            name: "GameInterface",
            component: GameInterface,
        },
        {
            path:"/GameEquipment/:difflv",
            name:"GameEquipment",
            component:GameEquipment
        },
        {
            path: '/Manage/:userid',
            name: 'Manage',
            component: Manage
        },
        {
            path: "/StartPage",
            redirect:"/"
        }
    ]
})

export default router