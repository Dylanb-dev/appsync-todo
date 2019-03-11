import * as React from 'react'
import { Connect } from 'aws-amplify-react'
import { graphqlOperation } from 'aws-amplify'
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations'
import * as subscriptions from './graphql/subscriptions'

import { Form } from './Form'
import { Todos } from './Todos'

interface State {
  creatingTodo: boolean
  updatingTodo: boolean
  deletingTodo: boolean
}

interface Props {}

export default class App extends React.Component<Props, State> {
  state = { creatingTodo: false, updatingTodo: false, deletingTodo: false }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Connect mutation={graphqlOperation(createTodo)}>
          {({ mutation }: any) => (
            <Form
              onSubmit={async formData => {
                this.setState({ creatingTodo: true })
                const response = await mutation({
                  input: {
                    ...formData,
                    status: 'pending'
                  }
                })
                this.setState({ creatingTodo: false })
                console.log(response)
              }}
            />
          )}
        </Connect>
        <Connect mutation={graphqlOperation(updateTodo)}>
          {({ mutation: updateTodo }: any) => (
            <Connect mutation={graphqlOperation(deleteTodo)}>
              {({ mutation: deleteTodo }: any) => (
                <Todos
                  creatingTodo={this.state.creatingTodo}
                  updatingTodo={this.state.updatingTodo}
                  deletingTodo={this.state.deletingTodo}
                  onUpdateTodo={async ({ id, status }) => {
                    this.setState({ updatingTodo: true })
                    const response = await updateTodo({
                      input: {
                        id,
                        status
                      }
                    })
                    this.setState({ updatingTodo: false })
                    console.log(response)
                  }}
                  onDeleteTodo={async id => {
                    this.setState({ deletingTodo: true })

                    const response = await deleteTodo({
                      input: {
                        id
                      }
                    })
                    this.setState({ deletingTodo: false })

                    console.log(response)
                  }}
                />
              )}
            </Connect>
          )}
        </Connect>
      </div>
    )
  }
}
