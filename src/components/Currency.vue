<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2 md8 offset-md2>
        <v-list >
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>id</v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-right">{{ item.itemId }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Name</v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-right">{{ item.name }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Location</v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-right">{{ item.location }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Currency</v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-right">{{ item.currency }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      item () {
        const id = this.id
        return this.$store.getters.currencyById(id)
      }
    }
  }
</script>
