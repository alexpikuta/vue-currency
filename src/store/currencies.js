import * as frb from 'firebase'

class Item {
  constructor (id, name, location, currency) {
    this.id = id
    this.name = name
    this.location = location
    this.currency = currency
  }
}

export default {
  state: {
    currencies: []
  },
  mutations: {
    addCurrency (state, payload) {
      state.currencies.push(payload)
    },
    loadCurrencies (state, payload) {
      state.currencies = payload
    }
  },
  actions: {
    async addCurrency ({commit}, payload) {
      try {
        const newItem = new Item(payload.id, payload.name, payload.location, payload.currency)
        frb.database().ref().push(newItem)
      } catch (error) {
        throw error
      }
      commit('addCurrency', payload)
    },
    async fetchCurrencies ({commit}) {
      const resultCurrencies = []
      try {
        const frbVal = await frb.database().ref().once('value')
        const currencies = frbVal.val()

        Object.keys(currencies).forEach(key => {
          const currency = currencies[key]
          resultCurrencies.push(
            new Item(currency.id, currency.name, currency.location, currency.currency, key)
          )
        })
        commit('loadCurrencies', resultCurrencies)
      } catch (error) {
        throw error
      }
      // commit('addCurrency', payload)
    }
  },
  getters: {
    currencies (state) {
      return state.currencies
    }
  }
}
