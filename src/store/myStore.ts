import { reactive, toRefs } from '@vue/composition-api'

const store = {
  collection: JSON.parse(localStorage.getItem('GUITAR_COLLCTION'))
}

const commit = (key: string|object, state?: object) => {
  if (typeof key === 'string') {
    store[key] = state
    if (key === 'collection') {
      localStorage.setItem('GUITAR_COLLCTION', JSON.stringify(state))
    }
  }
}

export default (key: string|null) => {
  const storeRef = toRefs(reactive(store))

  if (typeof key === 'string') {
    const dataRef = storeRef[key]

    return [
      dataRef,
      commit,
    ]
  } else {
    return [
      storeRef,
      commit,
    ]
  }
}