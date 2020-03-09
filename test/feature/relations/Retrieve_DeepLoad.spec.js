import { createStore } from 'test/support/Helpers'
import Model from 'app/model/Model'

describe('Relations – Deep Load', () => {
  /**
   * This test is a regression test for issue #152. It try's to see that the
   * user attached to the comment should be `null`.
   * See: https://github.com/vuex-orm/vuex-orm/issues/152
   */
  it('can retrieve deep nested morphMany relation', () => {
    class User extends Model {
      static entity = 'users'

      static fields () {
        return {
          id: this.attr(null),
          name: this.attr('')
        }
      }
    }

    class Post extends Model {
      static entity = 'posts'

      static fields () {
        return {
          id: this.attr(null),
          comments: this.morphMany(Comment, 'commentable_id', 'commentable_type')
        }
      }
    }

    class Comment extends Model {
      static entity = 'comments'

      static fields () {
        return {
          id: this.attr(null),
          user_id: this.attr(null),
          commentable_id: this.attr(null),
          commentable_type: this.attr(''),
          user: this.belongsTo(User, 'user_id')
        }
      }
    }

    createStore([{ model: User }, { model: Post }, { model: Comment }])

    Post.create({
      id: 1,
      comments: [{
        id: 1,
        user_id: 1,
        user: {
          id: 1,
          name: 'John Doe'
        }
      }]
    })

    const post = Post.query().withAll().first()

    const expected = {
      $id: '1',
      id: 1,
      comments: [{
        $id: '1',
        id: 1,
        user_id: 1,
        commentable_id: 1,
        commentable_type: 'posts',
        user: null
      }]
    }

    expect(post).toEqual(expected)
  })
})
