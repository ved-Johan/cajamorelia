<template>
  <v-card
    width="100%"
    max-width="750"
  >
    <v-skeleton-loader
      class="mx-auto my-3"
      type="list-item-avatar, list-item-three-line, card-heading@2, actions"
      width="100%"
      v-if="loading"
    >
    </v-skeleton-loader>
    <template v-if="!loading">
    <v-sheet color="teal">
      <v-card-title>
        <v-icon large dark>
          mdi-account
        </v-icon>
        <div
          class="text-h4 white--text ml-3"
        >
          {{ header }}
        </div>
        <slot name="header-buttons"></slot>
      </v-card-title>
    </v-sheet>
    <v-card-text>
      <slot></slot>
    </v-card-text>
    </template>
  </v-card>
</template>

<style scoped>
  .w-100{
    width: 100%;
  }
</style>

<script>
export default {
  name: 'ClientCard',

  props: ['loading', 'header']
}
</script>
