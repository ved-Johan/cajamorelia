<template>
    <v-dialog
      v-model="dialog"
      persistent
      width="150"
    >
      <v-card
        color="blue darken-3"
        dark
        width="150"
          class="pt-4"
      >
        <v-card-text
          style="display: flex;
                align-items: center;
                flex-direction: column;"
        >
          <v-progress-circular
            indeterminate
            color="white"
            :size="50"
          ></v-progress-circular>
          <span>Cargando</span>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'LoadingDialog',
  data: () => ({
    dialog: true
  })
}
</script>
