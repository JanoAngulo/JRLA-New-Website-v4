<template>
  <div id="Resume" class="scroll-mt-40">
    <div class="grid px-5 mb-32 lg:gap-6 md:gap-10 lg:px-14">
      <div class="pb-6 text-center md:pb-0 font-Gilroy">
        <p class="text-lg uppercase dark:text-light-primary text-primary">know me more</p>
        <p class="py-3 text-5xl capitalize dark:text-light xl:text-7xl">my resume</p>
      </div>

      <div class="grid col-auto gap-y-20 lg:gap-x-10 xl:grid-cols-4 2xl:grid-cols-3">
        <div class="h-full md:col-span-2">
          <div class="h-full grid-cols-1 md:grid-cols-3">
            <div class="flex flex-col h-full">
              <div>
                <p class="pb-4 text-3xl text-center capitalize font-Gilroy lg:text-left dark:text-light">education</p>

                <div class="grid gap-4">
                  <div class="flex">
                    <div class="items-center hidden lg:flex">
                      <div class="grid w-5 h-5 rounded-full bg-secondary place-content-center">
                        <div class="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <hr class="border-2 w-[2vh] border-secondary hidden lg:flex" />
                    </div>
                    <div class="grid w-full gap-4 p-5 transition-colors duration-300 card dark:text-light hover:text-light hover:bg-light-primary">
                      <p class="text-xl sm:text-2xl 2xl:text-3xl xl:text-2xl lg:text-3xl font-Gilroy">Bachelor of Science in Information and Techology</p>
                      <div class="text-lg 2xl:text-xl">
                        <p>Major in Web and Mobile Development</p>
                        <p>Bulacan State University</p>
                      </div>

                      <hr class="w-full border-2 border-secondary" />
                      <p class="xl:text-[16px] 2xl:text-base">I took my degree at Bulacan State University for 4yrs where I have spent learning different IT-related studies and enhancing my skills throughout those years.</p>
                    </div>
                  </div>

                  <div class="flex">
                    <div class="items-center hidden lg:flex">
                      <div class="grid w-5 h-5 rounded-full bg-secondary place-content-center">
                        <div class="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <hr class="border-2 w-[2vh] border-secondary hidden lg:flex" />
                    </div>
                    <div class="grid gap-4 p-5 transition-colors duration-300 card hover:text-light dark:text-light hover:bg-light-primary">
                      <p class="text-xl sm:text-2xl 2xl:text-3xl xl:text-2xl lg:text-3xl font-Gilroy">Science, Technology, Engineering, and Mathematics</p>
                      <div class="text-lg 2xl:text-xl">
                        <p>La Consolacion University Philippines</p>
                      </div>

                      <hr class="w-full border-2 border-secondary" />
                      <p class="xl:text-[16px] 2xl:text-base">I spent my junior year at LCUP which helped me become a better person since it’s a Catholic school. I took the strand STEM in LCUP exposed to complex mathematical and scientific theories and concepts that served as a foundation for my college.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid gap-4">
                <p class="pt-8 pb-4 text-3xl text-center capitalize font-Gilroy lg:text-left dark:text-light">Work Experience</p>

                <div class="grid gap-4 dark:text-light">
                  <div v-for="(work, index) in data.resume" :key="index" class="flex">
                    <div class="items-center hidden lg:flex">
                      <div class="grid w-5 h-5 rounded-full bg-secondary place-content-center">
                        <div class="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <hr class="border-2 w-[2vh] border-secondary hidden lg:flex" />
                    </div>
                    <div class="grid w-full gap-4 p-5 transition-colors duration-300 card hover:text-light hover:bg-light-primary">
                      <p class="text-xl sm:text-2xl 2xl:text-3xl xl:text-2xl lg:text-3xl font-Gilroy">{{ work.title }}</p>
                      <div class="text-lg 2xl:text-xl">
                        <p>{{ work.date }}</p>
                      </div>

                      <hr class="w-full border-2 border-secondary" />
                      <p class="xl:text-[16px] 2xl:text-base">{{ work.about }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-2 2xl:col-span-1">
          <p class="pb-4 text-xl text-center md:text-3xl lg:text-2xl xl:text-3xl font-Gilroy dark:text-light">You can download my resume here</p>
          <div class="grid w-full place-content-center">
            <div class="xl:w-full sm:w-120 w-full">
              <div class="grid gap-5 p-5 card">
                <a :href="Resume" :download="Resume" target="_blank" class="w-full py-3 text-center text-black capitalize rounded-md shadow-xs lg:hidden hover:text-light hover:bg-light-primary bg-secondary font-Gilroy">Download CV</a>
                <div class="relative w-full h-full group">
                  <div class="absolute top-0 left-0 z-50 hidden w-full h-full p-5 transition-all duration-300 bg-black bg-opacity-0 rounded-md lg:block group-hover:bg-opacity-40">
                    <a :href="Resume" :download="Resume" target="_blank" class="grid content-center w-full h-full gap-4 p-5 text-center text-light transition-all duration-300 delay-100 border border-white border-dashed rounded-md opacity-0 group-hover:opacity-100">
                      <i class="text-6xl fa-solid fa-file-arrow-down"></i>
                      <p class="text-xl font-bold capitalize">download CV</p>
                    </a>
                  </div>
                  <img class="duration-300 transition-all w-full rounded-md lg:group-hover:blur-[2px]" src="@/assets/img/JRLA-Resume-updated.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Resume from '@/assets/img/John_Russel_Angulo_CV.pdf'
import data from './PortfolioData'
</script>
