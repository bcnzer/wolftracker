<template>
  <v-container>
      <v-flex xs12 sm7 offset-sm3>
        <v-card>
            <v-card-media contain src="../../static/img/wolflogin.png" height="200px">
            </v-card-media>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Wolf Tracker</h3>
                    <p>Wolf Tracker is a demo app. For more info checkout: <a href='https://liftcodeplay.com'>this blog post</a></p>
                    <p>The use case is purely fictional: for tracking wolves in New Zealand (NZ). Trouble is we don't have wolves here so how can I ensure the photo is of a wolf? I don't want to view and manually approve them all.</p>
                    <p>If people upload a picture from a sighting I'll get Cognitive Services to determine if it's a wolf. Must be at least 60% certain.</p>
                    <p>If it is a wolf then we'll use Cognitive Services Smart Cropping to generate a thumbnail based on the focal point of the image. Very cool!</p>
                    <h3 class="headline mb-0">Privacy Info</h3>
                    <p>You need to login with your Twitter, GitHub or Google account. I have set it up to only require the most minimal info.</p>
                    <p>In table storage I am storing the ID provided by Auth0 i.e. twitter|1234567.</p>
                    <p>Source code is available via the blog post.</p>
                    <h3 class="headline mb-0">Credits</h3>
                    <p>The Wolf Tracker logo image was <a href="http://www.freepik.com">Designed by Freepik</a></p>
                </div>
            </v-card-title>
        </v-card>
      </v-flex>
  </v-container>
</template>