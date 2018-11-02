<template>
    <v-dialog v-model="dialog" max-width="500px">
    <v-btn slot="activator" dark class="mb-2 primary--text" style="border: #1976d2 2px solid">
      <v-icon size="19">add</v-icon>
      New Item</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">New Item</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm8 md12>
              <v-text-field v-model="itemId" label="id"></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field v-model="name" label="Name"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="location" label="Location"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="currency" label="Currency"></v-text-field>
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
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        itemId: '',
        id: '',
        name: '',
        location: '',
        currency: ''
      }
    },
    methods: {
      close () {
        this.dialog = false
      },
      save () {
        const newCurrency = {
          id: this.itemId,
          name: this.name,
          location: this.location,
          currency: this.currency
        }
        this.$store.dispatch('addCurrency', newCurrency)
        this.close()
      }
    }
  }
</script>
