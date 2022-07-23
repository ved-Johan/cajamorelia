<template>
  <v-data-table
    :headers="headers"
    :items="clientes"
    sort-by="nombre"
    class="elevation-3 ma-sm-5"
    :loading = "loading"
    loading-text="Cargando..."
  >
  <template v-slot:top>
    <v-toolbar
      flat
    >
      <v-toolbar-title>Clientes</v-toolbar-title>
      <v-divider
        class="mx-4"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <router-link to="/new">
      <v-btn
        color="teal lighten-1"
        dark
        class="mb-2"
      >
        Nuevo Cliente
      </v-btn>
      </router-link>
      <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">Esta seguro que desea eliminar este cliente?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-grey darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="red darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-toolbar>
    </template>
    <template v-slot:[`item.fechaAlta`] = "{ item }">
      {{ formattedAlta(item.fechaAlta) }}
    </template>
  <template v-slot:[`item.actions`] = "{ item }">
      <router-link
        :to="'/'+item.idCliente"
        class="text-decoration-none"
        >
      <v-icon
        small
        class="mr-2"
      >
        mdi-eye
      </v-icon>
      </router-link>
      <v-icon
        small
        @click="deleteItem(item)"

      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ClientTable',

  data: () => ({
    clientes: [],
    headers: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Apellido Paterno', value: 'apellidoPaterno' },
      { text: 'Apellido Materno', value: 'apellidoMaterno' },
      { text: 'RFC', value: 'rfc' },
      { text: 'Curp', value: 'curp' },
      { text: 'Fecha Alta', value: 'fechaAlta' },
      { text: 'Acciones', value: 'actions', sortable: false }

    ],
    loading: true,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      idCliente: 0,
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      rfc: '',
      curp: '',
      fechaAlta: ''
    }
  }),
  methods: {
    deleteItem (item) {
      this.editedIndex = this.clientes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.clientes.splice(this.editedIndex, 1)
      axios.delete('/api/clientes/' + this.editedItem.idCliente)
        .catch(error => console.error(error))
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    formattedAlta: function (date) {
      return new Date(date).toLocaleString()
    }
  },
  mounted () {
    axios.get('/api/clientes')
      .then(response => { this.clientes = response.data; this.loading = false })
      .catch(error => console.error(error))
  }
}
</script>
