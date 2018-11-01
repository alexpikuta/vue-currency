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
    },
    updateCurrency (state, {id, name, location, currency}) {
      const item = state.currencies.find(a => {
        return a.id === id
      })
      item.id = id
      item.name = name
      item.location = location
      item.currency = currency
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
    },
    async updateCurrency ({commit}, {id, name, location, currency}) {
      try {
        await frb.database().ref().child(id).update({
          id, name, location, currency
        })
        commit('updateCurrency', {
          id, name, location, currency
        })
      } catch (error) {
        throw error
      }
    }
  },
  getters: {
    currencies (state) {
      return state.currencies
    }
  }
}
