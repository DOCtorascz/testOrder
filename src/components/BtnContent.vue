<script>
import PopupOrder from './PopupOrder.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    PopupOrder
  },
  computed: mapGetters(["popup"]),
  methods: {
    openPopup(event) {
      let statusPopup = this.$store.state.popupObj;
      const mainPopup = event.target.closest('.main-btn').parentNode.children[0].closest('.main-popup');
      const selectNames = mainPopup.children[0].children[1].children[2].children;
      const btnClick = event.target.textContent;

      statusPopup.selectList.forEach((element, index) => {
        const city = btnClick.indexOf(element)

        if (element === "Москва") {
          selectNames[index + 1].removeAttribute('selected');
          selectNames[index].setAttribute('selected', 'selected');
          statusPopup.select = "Москва"
        } else if (city !== -1) {
          selectNames[index - 1].removeAttribute('selected');
          selectNames[index].setAttribute('selected', 'selected');
          statusPopup.select = "Санкт-Петербург"
        }
      });

      if (!statusPopup.status) {
        mainPopup.classList.replace('false', 'true');
        statusPopup.status = false;
      }
    }
  }
}
</script>

<template>
  <PopupOrder :popupStatus="status" />
  <main class="main-btn">
    <div class="btn__inner flex h-screen items-center justify-center">
      <button @click="openPopup" class="
      bg-amber-400 
      rounded
      text-gray-50
      drop-shadow-2xl 
      mr-5 
      p-5 
      transition 
      ease-in-out 
      bg-blue-500 
      hover:-translate-y-1 
      hover:scale-110 
      hover:bg-indigo-500 
      duration-300
      italic">
        Заказать в Москву</button>
      <button @click="openPopup" class="
      bg-amber-400 
      rounded
      text-gray-50
      drop-shadow-2xl 
      mr-0 
      p-5 
      transition 
      ease-in-out 
      bg-blue-500 
      hover:-translate-y-1 
      hover:scale-110 
      hover:bg-indigo-500 
      duration-300
      italic">
        Заказать в Санкт-Петербург
      </button>
    </div>
  </main>
</template>

<style></style>