<template>
  <v-app>
    <v-app-bar
      app
      elevation="5"
      color="light-green lighten-5"
    >
    <v-img
      src="./assets/logo.png"
      max-width="300"
      class="my-4"
    ></v-img>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
