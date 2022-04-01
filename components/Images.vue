<template>
    <div id="images">
        <div class="images-row">
            <div v-for="(image, index) in images" :key="index" class="images-column">
                <img :src="`https://image.tmdb.org/t/p/w500${image.file_path}`" @click="openModal();currentSlide(index)" class="hover-shadow">
            </div>
        </div>

            <!-- The Modal/Lightbox -->
        <div v-show="showModal" id="imagesModal" class="images-modal">
            <span class="close cursor" @click="closeModal()">&times;</span>
            <div class="images-modal-content">

                <div v-for="(image, index) in images" :key="index" v-show="index===slideIndex" class="imageSlides">
                    <img :src="`https://image.tmdb.org/t/p/w500${image.file_path}`" style="width:100%">
                </div>

                <!-- Next/previous controls -->
                <a class="prev" @click="plusSlides(-1)">&#10094;</a>
                <a class="next" @click="plusSlides(1)">&#10095;</a>

                <!-- Thumbnail image controls -->
                <div v-for="(image, index) in images" :key="index" class="images-column">
                    <img class="demo" :class="{'active':index===slideIndex}" :src="`https://image.tmdb.org/t/p/w500${image.file_path}`" @click="currentSlide(index)">
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Images',
    props:['images'],

    data(){
        return {
            slideIndex:0,
            showModal:false,
        }
    },

    mounted(){
        this.showSlides(this.slideIndex);
    },

    methods:{
        openModal() {
            this.showModal=true;
        },

        closeModal() {
            this.showModal=false;
        },
        
        plusSlides(n) {
            showSlides(this.slideIndex += n);
        },

        currentSlide(n) {
            showSlides(this.slideIndex = n);
        },

        showSlides(n) {

            if (n >= this.images.length) {
                this.slideIndex = 1
            }

            if (n < 0) {
                this.slideIndex = this.images.length
            }
        }
    }
}
</script>

<style scoped>
.images-row > .images-column {
  padding: 0 8px;
}

.images-row:after {
  content: "";
  display: table;
  clear: both;
}

/* Create four equal images-columns that floats next to eachother */
.images-column {
  float: left;
  width: 25%;
}

/* The Modal (background) */
.images-modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: black;
}

/* Modal Content */
.images-modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 90%;
  max-width: 1200px;
}

/* The Close Button */
.close {
  color: white;
  position: absolute;
  top: 10px;
  right: 25px;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #999;
  text-decoration: none;
  cursor: pointer;
}

/* Hide the slides by default */
.imageSlides {
  display: none;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -50px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* Caption text */
.caption-container {
  text-align: center;
  background-color: black;
  padding: 2px 16px;
  color: white;
}

img.demo {
  opacity: 0.6;
}

.active,
.demo:hover {
  opacity: 1;
}

img.hover-shadow {
  transition: 0.3s;
}

.hover-shadow:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>