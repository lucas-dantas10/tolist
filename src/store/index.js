import { createStore } from "vuex";
import state from "./state";
import actions from "./action";
import mutations from "./mutation";

const store = createStore({
    state,
    actions,
    mutations,
});

export default store;
