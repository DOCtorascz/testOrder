import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      popupObj: {
        status: false,
        selectList: ["Москва", "Санкт-Петербург"],
        select: "",
      },
    }
  }
})

export default store