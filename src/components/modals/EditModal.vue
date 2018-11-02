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
            <v-form ref="form" validation>
              <v-text-field v-model="itemId" label="id" disabled></v-text-field>
              <v-text-field v-model="editedName" label="Name" :rules="[rules.required]"></v-text-field>
              <v-text-field v-model="editedLocation" label="Location" :rules="[rules.required]"></v-text-field>
              <v-text-field v-model="editedCurrency" label="Currency" :rules="[rules.number, rules.required]"></v-text-field>
          </v-form>
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
        valid: true,
        rules: {
          required: value => !!value || 'This field is required',
          number: value => /^[0-9]*$/.test(value) || 'This field should contains number characters only'
        },
        dialog: false,
        itemId: this.item.itemId,
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
        if (this.$refs.form.validate()) {
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
  }
</script>
