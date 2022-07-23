<template>
  <v-container>
    <loading-dialog v-if="deleting" />
    <v-row justify="space-around">
      <div style="width:100%; max-width: 750px;">
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      <client-card class="mt-3" :loading="clienteLoading || cuentasLoading || tiposLoading" :header="nombreCompleto" >
        <template slot="header-buttons">
            <v-spacer></v-spacer>
            <v-btn
              icon
              color="white"
              @click="editing = !editing"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="white"
              v-on="on"
              v-bind="attrs"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5">Esta seguro que desea eliminar este cliente?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
                <v-btn color="red darken-1" text @click="onDelete">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
          </v-card>
        </v-dialog>
        </template>
        <client-data
          v-bind="cliente"
          v-if="!editing"
          v-on:edit="editing = true"
          v-on:submit-cuenta="onSubmitCuenta"
          v-on:update-cuenta="onUpdateCuenta"
          v-on:delete-cuenta="onDeleteCuenta"
        >
        </client-data>
        <client-form
          v-if="editing"
          v-on:submit="onSubmit"
          v-bind="cliente"
          :submitting="false"
          :cuentas="cliente.cuentas"
          v-on:cancel="editing = false"
          v-on:submit-cuenta="onSubmitCuenta"
          v-on:update-cuenta="onUpdateCuenta"
          v-on:delete-cuenta="onDeleteCuenta"
        />
      </client-card>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import ClientCard from './ClientCard'
import ClientData from './ClientData'
import ClientForm from './ClientForm'
import LoadingDialog from './LoadingDialog'
import axios from 'axios'
import router from '@/router'

export default {
  name: 'VClient',
  data: () => ({
    breadcrumbs: [
      {
        text: 'Clientes',
        disabled: false,
        to: '/'
      },
      {
        text: 'Cliente',
        disabled: true
      }
    ],
    clienteLoading: true,
    cuentasLoading: true,
    tiposLoading: true,
    deleting: false,
    editing: false,
    dialogDelete: false,
    cliente: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      rfc: '',
      curp: '',
      cuentas: []
    },
    tipoCuentas: []
  }),
  computed: {
    nombreCompleto () {
      return this.cliente.nombre + ' ' + this.cliente.apellidoPaterno +
        (this.cliente.apellidoMaterno ? (' ' + this.cliente.apellidoMaterno) : ' ')
    }
  },
  components: {
    ClientCard,
    ClientData,
    ClientForm,
    LoadingDialog
  },
  methods: {
    onSubmit (cliente) {
      this.cliente = Object.assign(this.cliente, cliente)
      axios.put('/api/clientes/' + this.cliente.idCliente, this.cliente)
        .catch(error => { console.error(error) })
      this.editing = false
    },
    onSubmitCuenta (cuenta) {
      const data = {
        idCuenta: cuenta.idCuenta,
        idCliente: this.cliente.idCliente,
        saldoActual: parseFloat(cuenta.saldoActual)
      }
      console.log(data)
      axios.post('/api/ClienteCuentas', data)
        .then(response => {
          const clienteVar = Object.assign({}, this.cliente)
          clienteVar.cuentas.push(response.data)
          this.cliente = clienteVar
        })
        .catch(error => { console.error(error.response) })
    },
    onUpdateCuenta (cuenta) {
      cuenta.fechaUltimoMovimiento = Date.now()
      const clienteVar = Object.assign({}, this.cliente)
      const cuentaIndex = clienteVar.cuentas.findIndex(e => e.idClienteCuenta === cuenta.idClienteCuenta)
      Object.assign(clienteVar.cuentas[cuentaIndex], cuenta)
      this.cliente = clienteVar
      axios.put('/api/ClienteCuentas/' + cuenta.idClienteCuenta, { idClienteCuenta: cuenta.idClienteCuenta, saldoActual: cuenta.saldoActual })
    },
    onDeleteCuenta (idClienteCuenta) {
      const clienteVar = Object.assign({}, this.cliente)
      const cuentaIndex = clienteVar.cuentas.findIndex(e => e.idClienteCuenta === idClienteCuenta)
      clienteVar.cuentas.splice(cuentaIndex, 1)
      this.cliente = clienteVar
      axios.delete('/api/ClienteCuentas/' + idClienteCuenta).catch(error => console.error(error))
    },
    onDelete () {
      this.deleting = true
      axios.delete('/api/clientes/' + this.cliente.idCliente)
        .then(response => { router.push({ path: '/' }) })
        .catch(error => console.error(error))
    }
  },
  mounted () {
    axios.get('/api/clientes/' + this.$route.params.idCliente)
      .then(response => {
        this.cliente = response.data
        this.clienteLoading = false
        axios.get('/api/ClienteCuentas/' + this.$route.params.idCliente)
          .then(response => {
            const clienteVar = Object.assign({}, this.cliente)
            clienteVar.cuentas = response.data
            this.cliente = clienteVar
            this.cuentasLoading = false
          })
      })
      .catch(error => { console.error(error); router.push({ path: '/' }) })
    axios.get('/api/tipoCuentas')
      .then(response => { this.tipoCuentas = response.data; this.tiposLoading = false })
      .catch(error => { console.error(error) })
  },
  provide () {
    const tipos = {}

    Object.defineProperty(tipos, 'tipoCuentas', {
      enumerable: true,
      get: () => this.tipoCuentas
    })

    return {
      tipoCuentas: tipos
    }
  }
}
</script>
