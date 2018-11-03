import * as frb from 'firebase'

class Item {
  constructor (name, location, currency, itemId, id = null) {
    this.name = name
    this.location = location
    this.currency = currency
    this.itemId = itemId
    this.id = id
  }
}

class NewItem {
  constructor (name, location, currency, itemId, id) {
    this.name = name
    this.location = location
    this.currency = currency
    this.id = itemId
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
    updateCurrency (state, {name, location, currency, id}) {
      const item = state.currencies.find(a => {
        return a.id === id
      })
      item.name = name
      item.location = location
      item.currency = currency
    }
  },
  actions: {
    async addCurrency ({commit}, payload) {
      try {
        const newItem = new NewItem(payload.name, payload.location, payload.currency, payload.id, payload.id)
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
            new Item(currency.name, currency.location, currency.currency, currency.id, key)
          )
        })
        commit('loadCurrencies', resultCurrencies)
      } catch (error) {
        throw error
      }
    },
    async updateCurrency ({commit}, {name, location, currency, id}) {
      try {
        await frb.database().ref().child(id).update({
          name, location, currency
        })
        commit('updateCurrency', {
          name, location, currency, id
        })
      } catch (error) {
        throw error
      }
    }
  },
  getters: {
    currencies (state) {
      return state.currencies
    },
    getTotalBalance (state) {
      return state.currencies.reduce((sum, e) => { return sum + Number(e.currency) }, 0)
    },
    currencyById (state) {
      return itemId => {
        return state.currencies.find(item => item.id === itemId)
      }
    }
  }
}
