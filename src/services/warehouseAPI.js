import API from "./API";

class warehouseAPI{
    static getWarehouse(userId){
        return API().get("/warehouse",{
            params: {
                userId: userId
            }
        })
    }

    static getPrize() {
        return API().get("/warehouse/rolltable")
    }

    static winPrize(userId) {
        return API().post("/warehouse/rolltable", {
            userId: userId
        })
    }
}

export default warehouseAPI