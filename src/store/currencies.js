import * as frb from 'firebase'

class Item {
  constructor (uniqueId, name, location, currency, id = null) {
    this.uniqueId = uniqueId
    this.name = name
    this.location = location
    this.currency = currency
    this.id = id
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
    updateCurrency (state, {uniqueId, name, location, currency, id}) {
      const item = state.currencies.find(a => {
        return a.id === id
      })
      item.uniqueId = uniqueId
      item.name = name
      item.location = location
      item.currency = currency
    }
  },
  actions: {
    async addCurrency ({commit}, payload) {
      try {
        const newItem = new Item(payload.uniqueId, payload.name, payload.location, payload.currency)
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
            new Item(currency.uniqueId, currency.name, currency.location, currency.currency, key)
          )
        })
        commit('loadCurrencies', resultCurrencies)
      } catch (error) {
        throw error
      }
      // commit('addCurrency', payload)
    },
    async updateCurrency ({commit}, {uniqueId, name, location, currency, id}) {
      try {
        await frb.database().ref().child(id).update({
          uniqueId, name, location, currency
        })
        commit('updateCurrency', {
          uniqueId, name, location, currency, id
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
