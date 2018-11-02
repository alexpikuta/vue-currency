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
          <td class="justify-center layout px-0">
          <edit-modal :item="props.item"></edit-modal>
            <!-- <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon> -->
          </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
          <template slot="footer">
            <td></td>
            <td></td>
            <td></td>
            <td colspan="100%">
              <strong>Total:</strong>
            </td>
          </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
  import addModal from './components/modals/AddModal'
  import editModal from './components/modals/EditModal'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      addModal,
      editModal
    },
    data: () => ({
      dialog: false,
      search: '',
      pagination: {
        sortBy: 'id'
      },
      headers: [
        {
          text: 'id',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: 'Name', value: 'name', align: 'right' },
        { text: 'Location', value: 'location', align: 'right' },
        { text: 'Currency', value: 'currency', align: 'right' },
        { text: 'Actions', value: 'name', align: 'center', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        location: '',
        currency: ''
      },
      defaultItem: {
        id: '',
        name: '',
        location: '',
        currency: ''
      }
    }),

    computed: {
      ...mapGetters([
        'currencies'
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    // created () {
    //   this.initialize()
    // },

    methods: {
      // initialize () {
      //   this.currencies = this.$store.getters.currencies
      // },

      editItem (item) {
        this.editedIndex = this.currencies.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.currencies.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.currencies.splice(index, 1)
      },

      save () {
        if (this.editedIndex > -1) {
          console.log('edited')
        } else {
          const currency = {
            id: this.editedItem.id,
            name: this.editedItem.name,
            location: this.editedItem.location,
            currency: this.editedItem.currency
          }
          this.$store.dispatch('addCurrency', currency)
        }
        this.close()
      }
      // save () {
      //   if (this.editedIndex > -1) {
      //     Object.assign(this.currencies[this.editedIndex], this.editedItem)
      //   } else {
      //     this.currencies.push(this.editedItem)
      //   }
      //   this.close()
      // }
    }
  }
</script>