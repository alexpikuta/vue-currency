<template>
  <div>
    <v-app>
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
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm8 md12>
                    <v-text-field v-model="editedItem.id" label="id"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.location" label="Location"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.currency" label="Currency"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.name }}</td>
          <td >{{ props.item.location }}</td>
          <td>{{ props.item.currency }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
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
  export default {
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
        { text: 'Name', value: 'name' },
        { text: 'Location', value: 'location' },
        { text: 'Currency', value: 'currency' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      currencies: [],
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
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.currencies = [
          {
            id: '17d5653e-ab63-44cb-b1f6-403d9d7c48a0',
            name: 'Twitterlist',
            location: 'Namur',
            currency: 62675
          },
          {
            id: '9eee0e4e-d3a7-4a4c-aca8-00077164abf2',
            name: 'Mydo',
            location: 'Bojong',
            currency: 18917
          },
          {
            id: '6d3a7fd5-da98-4fc8-9818-c59ac9b15d36',
            name: 'Gigazoom',
            location: 'Marshintsy',
            currency: 89681
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.currencies.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.currencies.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.currencies.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.currencies[this.editedIndex], this.editedItem)
        } else {
          this.currencies.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>