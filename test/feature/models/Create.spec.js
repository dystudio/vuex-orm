import { createStore, createState } from 'test/support/Helpers'
import Model from 'app/model/Model'

describe('Feature – Models – Create', () => {
  class User extends Model {
    static entity = 'users'

    static fields () {
      return {
        id: this.attr(null),
        name: this.attr('')
      }
    }
  }

  it('can create a record via static method', async () => {
    const store = createStore([{ model: User }])

    await User.create({
      data: { id: 1, name: 'John Doe' }
    })

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('can create a record via static method by passing object literal', async () => {
    const store = createStore([{ model: User }])

    await User.create({ id: 1, name: 'John Doe' })

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('can create a list of record via static method', async () => {
    const store = createStore([{ model: User }])

    await User.create({
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ]
    })

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('can create a list of record via static method by passing array', async () => {
    const store = createStore([{ model: User }])

    await User.create([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ])

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('returns created records via static method', async () => {
    createStore([{ model: User }])

    const data = await User.create({
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ]
    })

    expect(data.users.length).toBe(2)
    expect(data.users[0]).toBeInstanceOf(User)
  })

  it('can create a record via instance method', async () => {
    const store = createStore([{ model: User }])

    const user = new User()

    await user.$create({
      data: { id: 1, name: 'John Doe' }
    })

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('can create a record via instance method by passing object literal', async () => {
    const store = createStore([{ model: User }])

    const user = new User()

    await user.$create({ id: 1, name: 'John Doe' })

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('can create a list of record via instance method', async () => {
    const store = createStore([{ model: User }])

    const user = new User()

    await user.$create({
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ]
    })

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('can create a list of record via instance method by passing array', async () => {
    const store = createStore([{ model: User }])

    const user = new User()

    await user.$create([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ])

    const expected = createState({
      users: {
        1: { $id: '1', id: 1, name: 'John Doe' },
        2: { $id: '2', id: 2, name: 'Jane Doe' }
      }
    })

    expect(store.state.entities).toEqual(expected)
  })

  it('returns created records via instance method', async () => {
    createStore([{ model: User }])

    const user = new User()

    const data = await user.$create({
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
      ]
    })

    expect(data.users.length).toBe(2)
    expect(data.users[0]).toBeInstanceOf(User)
  })
})
