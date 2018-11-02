<template>
    <v-dialog v-model="dialog" max-width="500px">
    <v-icon slot="activator" small>
      edit
    </v-icon>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Item</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm8 md12>
              <v-text-field v-model="this.item.itemId" label="id" disabled></v-text-field>
            </v-flex>
            <v-flex xs12 sm4 md4>
              <v-text-field v-model="editedName" label="Name"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedLocation" label="Location"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedCurrency" label="Currency"></v-text-field>
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
    props: ['item'],
    data () {
      return {
        dialog: false,
        editedName: this.item.name,
        editedLocation: this.item.location,
        editedCurrency: this.item.currency
      }
    },
    methods: {
      close () {
        this.dialog = false
      },
      save () {
        this.$store.dispatch('updateCurrency', {
          name: this.editedName,
          location: this.editedLocation,
          currency: this.editedCurrency,
          id: this.item.id
        })
        this.dialog = false
      }
    }
  }
</script>
