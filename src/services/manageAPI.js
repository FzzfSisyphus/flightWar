import API from "./API";

class manageAPI {
    static getRolltablePrize() {
        return API().get('/manage/rolltable')
    }

    static modifyRolltablePrize(data) {
        return API().post('/manage/rolltable', {
            status: data.status,
            prizeName: data.prizeName,
            picPath: data.picPath,
            weight: data.weight
        })
    }

    static getDiffLV() {
        return API().get('/manage/diff')
    }

    static modifyDiffLV(data) {
        return API().post('/manage/diff', {
            status: data.status,
            diffLV: data.diffLV,
            awardDensity: data.awardDensity,
            enemyDensity: data.enemyDensity
        })
    }

    static getEquipment() {
        return API().get('/manage/catalog')
    }

    static modifyEquipment(data) {
        return API().put('/manage/catalog', {
            status: data.status,
            itemId: data.itemId,
            itemName: data.itemName,
            describe: data.describe,
            price: data.price,
            picPath: data.picPath,
            operatorId: data.userid
        })
    }

    static deleteEquipment(itemId) {
        return API().delete('/manage/catalog', {
            params: {
                itemId: itemId
            }
        })
    }
}

export default manageAPI