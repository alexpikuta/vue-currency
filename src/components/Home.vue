<template>
  <div>
    <v-app dark>
      <v-toolbar flat dark>
        <v-toolbar-title>Currencies</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <add-modal></add-modal>
      </v-toolbar>

      <v-data-table
        dark
        :headers="headers"
        :items="currencies"
        :search="search"
        :pagination.sync="pagination"
        class="elevation-10"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.itemId || props.item.id}}</td>
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.location }}</td>
          <td class="text-xs-right">{{ props.item.currency }}</td>
          <td class="justify-center text-xs-right px-0">
            <edit-modal :item="props.item"></edit-modal>
            <v-btn small class="ml-4" :to="'/currency/' + props.item.id">Open</v-btn>
          </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
          <template slot="footer">
            <td></td>
            <td></td>
            <td class="text-xs-right">
              <strong>Total:</strong>
            </td>
            <td class="text-xs-right">{{ getTotalBalance }}</td>
            <td></td>
          </template>
      </v-data-table>
    </v-app>
    <router-view></router-view>
  </div>
</template>

<script>
  import addModal from './modals/AddModal'
  import editModal from './modals/EditModal'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      addModal,
      editModal
    },
    data: () => ({
      dialog: false,
      search: '',
      currenciesSum: 0,
      pagination: {
        sortBy: 'id'
      },
      headers: [
        { text: 'id', align: 'left', sortable: false, value: 'id' },
        { text: 'Name', value: 'name', align: 'right' },
        { text: 'Location', value: 'location', align: 'right' },
        { text: 'Currency', value: 'currency', align: 'right' },
        { text: 'Actions', value: 'name', align: 'center', sortable: false }
      ]
    }),

    computed: {
      ...mapGetters([
        'currencies',
        'getTotalBalance'
      ])
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.currencies.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.currencies.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.currencies.splice(index, 1)
      }
    }
  }
</script>