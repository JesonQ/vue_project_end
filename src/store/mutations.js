import {GETADDRRSSOBJ,GETCATEGORIES,
    GETSHOPS,GETUSER,RESTUSER,AUTOLOGIN,
    GETSELLER,GETGOODS} from "./mutation_types"
export default {
    [GETADDRRSSOBJ](state,addressObj){
        state.addressObj = addressObj
    },
    [GETCATEGORIES](state,categories){
        state.categories = categories
    },
    [GETSHOPS](state,shops){
        state.shops = shops
    },
    [GETUSER](state,user){
        state.user = user;
        state.token = user.token;
    },
    [RESTUSER](state){
        state.user={};
        state.token = "";
    },
    [AUTOLOGIN](state,user){
        state.user = user
    },
    [GETSELLER](state,seller){
        state.seller = seller
    },
    [GETGOODS](state,goods){
        state.goods = goods
    }
}