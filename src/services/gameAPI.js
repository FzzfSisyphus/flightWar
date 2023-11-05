import API from "./API";
class gameAPI{
    static getEquip(useridValue){
        return API().get('/game/equip/'+useridValue,{
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

    static  getDiff(userId){
        return API().get('/game/diff',{ 
            params:{userId: userId }          
        })
    }

}
export default gameAPI;

