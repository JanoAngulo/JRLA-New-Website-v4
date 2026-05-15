<template>
  <div id="Portfolio" class="scroll-mt-40">
    <div class="flex flex-col gap-6 px-5 mb-32 lg:px-14">
      <div class="text-center font-Gilroy">
        <p class="text-lg uppercase text-dark-primary dark:text-light-primary">you can check my works here</p>
        <p class="py-3 text-5xl capitalize xl:text-7xl dark:text-light">my portfolio</p>
      </div>

      <div v-for="(category, index) in portfolioWithContent" :key="index" :id="index">
        <p class="pb-4 text-3xl capitalize font-Gilroy dark:text-light-primary">{{ index }}</p>
        <swiper class="mySwiper" :loop="isDivisibleByThree(category)" :grab-cursor="true" :slidesPerView="slidesCount" :modules="modules" :autoplay="{ delay: 3500, disableOnInteraction: false }" :space-between="20">
          <swiper-slide :id="portfolioId(item.title)" class="p-5 transition-all duration-200 ease-out card group lg:hover:-translate-y-2" v-for="(item, index) in category" :key="index">
            <div class="grid gap-4">
              <div @click="passModalData(item)" class="cursor-pointer relative grid h-full w-fit ease-out lg:group-hover:scale-[1.02] transition-all duration-300">
                <img class="object-cover rounded-lg aspect-video" :src="item.thumbnail" :alt="item.title + ' Image'" />
                <div class="absolute grid w-full h-full transition-all duration-300 bg-black rounded-lg lg:opacity-0 group-hover:opacity-100 place-self-center place-content-center bg-opacity-30">
                  <p class="text-light underline">View more</p>
                </div>
              </div>

              <div>
                <p class="text-xl lg:text-2xl font-Gilroy dark:text-light">{{ item.title }}</p>
                <p class="text-gray-700 dark:text-light md:line-clamp-4 line-clamp-3">{{ item.description }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div v-show="toggleModal" class="fixed z-999 w-full h-screen top-0 left-0 grid">
      <div class="grid w-full h-full place-content-center">
        <div @click="closeModal" class="absolute w-full h-full bg-black dark:bg-opacity-60 bg-opacity-30"></div>
        <div id="modalContainer" class="p-5 transition-all duration-300 translate-y-3 opacity-0">
          <div class="relative grid self-center max-w-xl gap-6 p-5 card">
            <button @click="closeModal" class="absolute grid w-5 h-5 p-5 text-light rounded-full shadow-xl bg-primary hover:bg-white hover:text-dark-primary top-2 right-2 place-content-center">
              <i class="fa-solid fa-xmark"></i>
            </button>

            <img class="self-center h-auto rounded-lg aspect-video" :src="modalData.thumbnail" alt="" />
            <div class="grid content-center gap-2">
              <p class="text-lg capitalize dark:text-light">featured - {{ modalData.feature }}</p>
              <p class="text-3xl capitalize lg:text-4xl font-Gilroy dark:text-light">{{ modalData.title }}</p>
              <p class="text-gray-700 whitespace-pre-wrap dark:text-light indent-5">{{ modalData.description }}</p>
              <a :href="modalData.link" target="_blank" class="w-full py-3 mt-3 text-center text-light capitalize rounded-md shadow-xs hover:text-black hover:bg-secondary h-fit bg-primary">view project</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.mySwiper {
  padding-top: 1rem;
  padding-bottom: 2rem;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import data from './PortfolioData.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

const modules = [Autoplay]
const toggleModal = ref(false)
const modalData = ref([])
const slidesCount = ref(3)

const windowSize = () => {
  if (window.innerWidth >= 1024) {
    slidesCount.value = 3
  } else if (window.innerWidth >= 768) {
    slidesCount.value = 2
  } else {
    slidesCount.value = 1
  }
}

let portfolioWithContent = computed(() => {
  let result = {}
  for (let category in data.portfolio) {
    if (data.portfolio[category].length != 0) {
      result[category] = data.portfolio[category]
    }
  }
  return result
})

onMounted(() => {
  windowSize()
  window.addEventListener('resize', windowSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', windowSize)
})

const passModalData = (data) => {
  modalData.value = data
  openModal()
}

const openModal = () => {
  toggleModal.value = true
  document.body.classList.add('overflow-hidden')
  setTimeout(() => {
    document.getElementById('modalContainer').classList.remove('opacity-0')
    document.getElementById('modalContainer').classList.remove('translate-y-3')
  }, 100)
}

const closeModal = () => {
  document.body.classList.remove('overflow-hidden')
  document.getElementById('modalContainer').classList.add('opacity-0')
  document.getElementById('modalContainer').classList.add('translate-y-3')
  setTimeout(() => {
    toggleModal.value = false
  }, 300)
}

const portfolioId = (data) => {
  return data[0].toLowerCase() + data.replace(/[,.' ]/g, '').slice(1)
}

const isDivisibleByThree = (category) => {
  let length = category.length
  return length > 3 && length % 3 === 0
}
</script>
