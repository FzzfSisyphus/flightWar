import API from "./API";
class gameAPI{
    static getEquip(useridValue){
        return API().get('/game/equip/',{
            params: {
              userId: useridValue
            }
          })
    }

    static postEquip(userId,equipList){
        return API().post('/game/equip/',
        {
            userId: userId,
            itemId: equipList
        })
    }

    static postCredits(userId,credit,coupon){
        return API().post('/game/end',{
            userId:userId ,
            credit:credit ,
            coupon:coupon
        })
    }

    static  getDiff(){
        return API('/game/diff').get()
    }

}
export default gameAPI;