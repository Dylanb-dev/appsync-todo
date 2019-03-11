import * as React from 'react'
import { graphqlOperation } from 'aws-amplify'
import { Connect } from 'aws-amplify-react'
import { listTodos } from './graphql/queries'
import * as subscriptions from './graphql/subscriptions'

interface Props {
  onDeleteTodo: (id: string) => void
  onUpdateTodo: (update: { id: string; status: string }) => void
  creatingTodo: boolean
  updatingTodo: boolean
  deletingTodo: boolean
}

export class Todos extends React.Component<Props> {
  render() {
    if (
      this.props.creatingTodo ||
      this.props.updatingTodo ||
      this.props.deletingTodo
    ) {
      return <h3>Loading...</h3>
    }

    return (
      <Connect query={graphqlOperation(listTodos)}>
        {({ data: { listTodos: todos }, loading, error }: any) => {
          if (loading) {
            return <h3>Loading...</h3>
          }
          if (error) {
            return <h3>Error</h3>
          }
          if (!todos) {
            return null
          }
          return (
            <div>
              {todos.items.map((b: any) => (
                <div key={b.id}>
                  <span
                    onClick={() => {
                      this.props.onUpdateTodo({
                        id: b.id,
                        status: b.status === 'pending' ? 'done' : 'pending'
                      })
                    }}
                  >
                    {b.status === 'pending' ? '[  ]' : '[x]'}
                  </span>
                  {b.name} {b.description}{' '}
                  <span
                    onClick={() => {
                      this.props.onDeleteTodo(b.id)
                    }}
                  >
                    {' X '}
                  </span>
                </div>
              ))}
            </div>
          )
        }}
      </Connect>
    )
  }
}
