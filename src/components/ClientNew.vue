<template>
  <v-container>
    <loading-dialog v-if="submitting" />
    <v-row justify="space-around">
      <div style="width:100%; max-width: 750px;">
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      <client-card class="mt-3" :loading="loading" header="Nuevo Cliente" >
        <client-form
          v-on:submit="onSubmit"
          v-bind="cliente"
          :submitting="submitting"
          :cuentas="cliente.cuentas"
          v-on:cancel="onCancel"
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
import ClientForm from './ClientForm'
import LoadingDialog from './LoadingDialog'
import axios from 'axios'
import router from '@/router'

export default {
  name: 'ClientNew',
  data: () => ({
    breadcrumbs: [
      {
        text: 'Clientes',
        disabled: false,
        to: '/'
      },
      {
        text: 'Nuevo Cliente',
        disabled: true
      }
    ],
    loading: true,
    submitting: false,
    cuentasCounter: 0,
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
  components: {
    ClientCard,
    ClientForm,
    LoadingDialog
  },
  methods: {
    onSubmit (cliente) {
      this.cliente = Object.assign(this.cliente, cliente)
      this.submitting = true
      const cuentas = this.cliente.cuentas
      axios.post('/api/clientes', cliente)
        .then((response) => {
          const id = response.data.idCliente
          cuentas.forEach(async (cuenta) => {
            await axios.post('/api/ClienteCuentas', {
              idCliente: id,
              IdCuenta: cuenta.idCuenta,
              SaldoActual: cuenta.saldoActual
            })
          })
          router.push({ path: '/' + id })
        })
        .catch(error => { console.error(error); this.submitting = false })
    },
    onSubmitCuenta (cuenta) {
      this.cuentasCounter = this.cuentasCounter - 1
      cuenta.idClienteCuenta = this.cuentasCounter
      const clienteVar = Object.assign({}, this.cliente)
      clienteVar.cuentas.push(cuenta)
      this.cliente = clienteVar
    },
    onUpdateCuenta (cuenta) {
      const clienteVar = Object.assign({}, this.cliente)
      const cuentaIndex = clienteVar.cuentas.findIndex(e => e.idClienteCuenta === cuenta.idClienteCuenta)
      Object.assign(clienteVar.cuentas[cuentaIndex], cuenta)
      this.cliente = clienteVar
    },
    onDeleteCuenta (idClienteCuenta) {
      const clienteVar = Object.assign({}, this.cliente)
      const cuentaIndex = clienteVar.cuentas.findIndex(e => e.idClienteCuenta === idClienteCuenta)
      clienteVar.cuentas.splice(cuentaIndex, 1)
      this.cliente = clienteVar
    },
    onCancel () {
      router.push({ path: '/' })
    }
  },
  mounted () {
    axios.get('/api/tipoCuentas')
      .then(response => { this.tipoCuentas = response.data; this.loading = false })
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
