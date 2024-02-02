<script>
import axios from 'axios'

export default {
  props: ['popupStatus'],
  methods: {
    closePopup(event) {
      const mainPopupElement = event.target.closest('.true');
      mainPopupElement.classList.replace('true', 'false');
    },
    addOrder(event) {
      event.preventDefault();

      const requestOrder = (listParametr) => {

        const data = {
          name: listParametr[0].value,
          phone: listParametr[1].value,
          email: listParametr[2].value,
          city_id: this.$store.state.popupObj.select,
        };

        console.log(data)

        axios.post('http://hh.autodrive-agency.ru/testtasks/front/task-7/', data)
          .then(function (response) {
            console.log('Всё успешно');
          })
          .catch(function (error) {
            alert('Сейчас наблюдаются некоторые проблемы с сервером: ' + error);
          });
      };

      function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }

      const tagName = event.target.tagName;
      const arrInput = [];
      const listInput = 3;

      if (tagName === 'BUTTON') {
        const inputContent = event.target.parentNode.children[0].children;

        for (let i = 0; i < inputContent.length; i++) {
          const valueInput = inputContent[i].children[0];
          const validValue = valueInput.value === '' || valueInput.value === ' ';
          const validValuePattern = inputContent[1].children[0].value === '';
          const patternNumber = inputContent[1].children[0].validity.patternMismatch;
          const inputNum = 1;
          const emailPattern = inputContent[2].children[0];

          if (validValue) {
            valueInput.parentNode.children[1].classList.add('target')
          } else if (!validValue && i !== inputNum && i !== inputNum + 1) {
            valueInput.parentNode.children[1].classList.remove('target')
            arrInput.push(valueInput);
          }

          if (!validateEmail(emailPattern.value)) {
            emailPattern.classList.add('target')
          } else if (i === inputNum + 1) {
            valueInput.parentNode.children[1].classList.remove('target')
            arrInput.push(valueInput);
          }

          if (patternNumber || validValuePattern) {
            inputContent[1].children[1].classList.add('target')
          } else if (i === inputNum) {
            valueInput.parentNode.children[1].classList.remove('target')
            arrInput.push(valueInput);
          }

        }
      }

      console.log(arrInput)
      if (arrInput.length === listInput) {
        requestOrder(arrInput);
      }

    }
  }
}

</script>

<template>
  <main :class="{ 'main-popup false': !popupStatus, 'main-popup true': popupStatus }">
    <div class="popup__inner max-w-96 bg-red-600 px-5 py-7 text-gray-50 w-full rounded-3xl">
      <div class="popup__info-content flex items-center justify-between mb-10">
        <h1 class="popup__name text-xl text-center">Сделать заказ</h1>
        <button class="popup__close-btn" @click="closePopup">
          <img class="popup__close" src="../../public/images/closePopup.svg" alt="close">
        </button>
      </div>
      <form class="form flex flex-col items-center" @click="addOrder">
        <div class="form__input-inner">
          <div class="form__input-section">
            <input class="form__input" type="text" placeholder="Имя">
            <div class="target-stl">*Обязательное поле</div>
          </div>
          <div class="form__input-section">
            <input class="form__input" type="tel" pattern="^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$" maxlength="20" placeholder="Телефон"
              required>
            <div class="target-stl">*Обязательное поле: +7 (000) 000-00-00</div>
          </div>
          <div class="form__input-section">
            <input class="form__input" type="text" placeholder="E-mail">
            <div class="target-stl">*Обязательное поле: t_stor@mail.ru</div>
          </div>
        </div>
        <label class="form__lbl-city mb-5" for="city-select">Город</label>
        <select class="form__select-city mb-10" name="city" id="city-select">
          <option v-for="item in $store.state.popupObj.selectList">{{ item }}</option>
        </select>
        <button class="form__btn
        bg-amber-400 
        rounded
        text-gray-50
        drop-shadow-2xl 
        p-2 
        transition 
        ease-in-out 
        bg-neutral-950
        hover:-translate-y-1 
        hover:scale-110 
        hover:bg-indigo-500 
        duration-300">
          Отправить
        </button>
      </form>
    </div>
  </main>
</template>

<style>
.main-popup {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #0000006b;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
}

.true {
  animation: popupVisbl 1s forwards;
}

.popup__close-btn {
  background: none;
}

.form__input-inner {
  margin-bottom: 25px;
  width: 100%;
}

.form__input-section {
  margin-bottom: 25px;
  position: relative;
}

.form__input-section:last-child {
  margin-bottom: 0;
}

.form__input {
  margin-bottom: 25px;
  background: none;
  border-bottom: 1px solid black;
  padding-bottom: 5px;
  color: white;
  width: 100%;
}

.form__input:focus {
  outline: none;
}

.form__input::placeholder {
  color: white;
}

.target {
  animation: popupVisbl 1s forwards;
}

.target-stl {
  overflow: hidden;
  visibility: hidden;
  position: absolute;
  bottom: -5px;
  left: 0;
}

.form__select-city {
  background: black;
  cursor: pointer;
}

.form__select-city:focus {
  outline: none;
}

.form__select-city option {
  background: rgba(0, 0, 0, 0.11);
  color: rgb(231, 95, 95);
}

@keyframes popupVisbl {
  0% {
    opacity: 0;
    visibility: hidden;
  }

  100% {
    opacity: 1;
    visibility: visible;
  }
}
</style>