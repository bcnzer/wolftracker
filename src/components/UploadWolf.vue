<template>
  <v-layout>
    <v-flex xs12 sm7 offset-sm3>
      <v-card v-if="!authenticated">
        <v-card-media contain src="../../static/img/wolflogin.png" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Sign in</h3>
            <div>Login with your GitHub, Google or Twitter account</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" @click="auth.login()">Proceed</v-btn>
        </v-card-actions>
      </v-card>

      <div v-if="authenticated">
        <div class="text-xs-center">
          <picture-input 
            ref="pictureInput" 
            @change="onChanged" 
            @removed="onRemoved" 
            width="600" 
            height="400" 
            accept="image/jpeg,image/png" 
            size="10" 
            buttonClass="btn secondary"
            :autoToggleAspectRatio="true"
            :customStrings="{
              upload: '<h1>Upload your wolf pic!</h1>',
              drag: 'Drag and drop your image here',
              tap: 'Tap here to select a photo'
            }">
          </picture-input>
        
          <v-btn large color="primary" :loading="uploading" @click="attemptUpload" :disabled="!image || uploading">
            Upload
            <span slot="loader">Loading...</span>
          </v-btn>

          <div v-if="authenticated && uploading">
            <img src="../assets/loading.svg" alt="loading"/>
          </div>
        </div>
      </div>

      <v-card color="darken-2" class="white--text" v-if="(imageInfo || uploadError) && authenticated">
        <v-container fluid grid-list-lg>
          <v-layout row>
            <v-flex xs7>
              <div>
                <div class="headline">{{ imageDescriptionHeader }}</div>
                <br/>
                <p v-if="imageInfo.IsWolf">{{ imageConfidence }}</p>
                <p>{{ imageDescription }}</p>
                <p v-if="imageInfo.IsWolf">Thumbnail is being generated. Will be available in the list of wolves in a few seconds</p>
              </div>
            </v-flex>
            <v-flex xs5>
              <v-card-media
                :src="wolfImageSrc"
                height="125px"
                contain
              ></v-card-media>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import PictureInput from 'vue-picture-input'
import FormDataPost from '../upload/upload'

export default {
  props: ['auth', 'authenticated'],
  data: function () {
    return {
      image: null,
      uploading: false,
      uploadError: false,
      imageInfo: null
    }
  },

  components: {
    PictureInput
  },

  computed: {
    wolfImageSrc: function () {
      if (!this.imageInfo) return null
      if (this.uploadError) return '../../static/img/wolflogouhoh.png'
      return this.imageInfo.IsWolf && !this.imageInfo.IsAdult && !this.imageInfo.IsRacy ? '../../static/img/wolflogoyay.png' : '../../static/img/wolflogonay.png'
    },
    imageDescriptionHeader: function () {
      if (!this.imageInfo) return null
      if (this.uploadError) return `Error... how embarassing`
      if (this.imageInfo.IsAdult) return `This image is a bit... adult`
      if (this.imageInfo.IsRacy) return `This image is a bit... racy`
      return `The image ${(this.imageInfo.IsWolf ? 'IS' : 'is NOT')} a wolf`
    },
    imageConfidence: function () {
      if (!this.imageInfo || !this.imageInfo.IsWolf) return null
      var confidence = (this.imageInfo.WolfConfidence).toLocaleString('en', {style: 'percent'})
      return `I am ${confidence} confident it is a wolf`
    },
    imageDescription: function () {
      if (this.uploadError) return `Something went wrong`
      if (!this.imageInfo) return null
      return `Appears to be ${this.imageInfo.ImageDescription}`
    }
  },

  methods: {
    uploadAnother () {
      this.imageInfo = null
    },
    onChanged () {
      console.log('New picture selected!')
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file
      } else {
        console.log('Old browser. No support for Filereader API')
      }
    },
    onRemoved () {
      console.error('hi')
    },
    attemptUpload (url, file, name = 'avatar') {
      if (this.image) {
        this.imageInfo = null
        this.uploading = true
        this.uploadError = false
        FormDataPost('https://api.wolftracker.nz/api/UploadWolfImage', this.image, localStorage.getItem('id_token'))
          .then(response => {
            if (response.status === 200) {
              console.log('Image uploaded successfully')
              this.uploading = false
              this.imageInfo = JSON.parse(response.data)
            } else {
              this.uploadError = true
            }
          })
          .catch(err => {
            this.uploading = false
            this.uploadError = true
            console.error(err)
          })
      }
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
</style>
