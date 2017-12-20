<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 v-if="wolfImagesResized === null">
        <div class="spinner">
          <img src="../assets/loading.svg" alt="loading"/>
        </div>        
      </v-flex>

      
      <v-flex xs8 sm4 md2>
        <v-select
          v-bind:items="displayCountOptions"
          v-model="displayCount"
          :disabled="loading"
          label="Wolves to Display"
          class="input-group--focused"
        ></v-select>
      </v-flex>
      <v-flex xs4 sm4 md2>
        <v-btn color="primary" :loading="loading" @click="loadWolves" :disabled="loading">
          Refresh
          <span slot="loader">Loading...</span>
        </v-btn>
      </v-flex>

      <v-flex xs12 v-if="wolfImagesResized !== null">
        <gallery :images="wolfImagesOriginal" :index="wolfImageIndex" @close="wolfImageIndex = null"></gallery>
          <div
          class="image"
          v-for="(image, imageIndex) in wolfImagesResized"
          :key="imageIndex"
          @click="wolfImageIndex = imageIndex"
          v-if="imageIndex < displayCount"
          :style="{ backgroundImage: 'url(' + wolfImagesResized[imageIndex] + ')', width: '300px', height: '200px' }"
        ></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VueGallery from 'vue-gallery'
import axios from 'axios'

export default {
  props: ['auth', 'authenticated'],
  data: function () {
    return {
      loading: true,
      wolfImageIndex: null,
      wolfImagesOriginal: [],
      wolfImagesResized: [],
      displayCountOptions: [
        5,
        10,
        20,
        50,
        100
      ],
      displayCount: 10
    }
  },

  components: {
    'gallery': VueGallery
  },

  created () {
    this.loadWolves()
  },

  methods: {
    loadWolves () {
      this.wolfImagesOriginal = []
      this.wolfImagesResized = []
      // 'https://wolftracker.azurewebsites.net/mock/api/GetWolves'
      axios.get('https://wolftracker.azurewebsites.net/api/GetWolves?code=WbzC1yh4bKyeQyVnHJhxSxrSg9HCadYn1g34r8T6tF//3C3rB6rNjw==')
      .then(Response => {
        var wolfImages = JSON.parse(Response.data)
        console.log('Getting wolves')
        var i = 0
        for (i = 0; i < wolfImages.length; i++) {
          this.wolfImagesOriginal.push(wolfImages[i].UrlOriginal)
          this.wolfImagesResized.push(wolfImages[i].UrlResized)
        }
        this.loading = false
      })
      .catch(e => {
        this.loading = false
        console.log(e)
      })
    }
  }
}
</script>

<style>
.image {
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    margin: 5px;
  }

  .spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>