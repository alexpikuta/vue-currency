<template>
  <div>
    <p>{{ item.name }}</p>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      item () {
        const id = this.id
        return this.$store.getters.currencyById(id)
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
