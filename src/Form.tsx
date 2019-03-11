import * as React from 'react'
interface State {
  name: string
}
interface Props {
  onSubmit: (formValues: State) => void
}
export class Form extends React.Component<Props, State> {
  state = {
    name: '',
    description: ''
  }
  handleChange = (e: any) => {
    const { name, value } = e.target
    this.setState({ [name]: value } as any)
  }
  render() {
    return (
      <form
        onSubmit={async e => {
          e.preventDefault()
          this.props.onSubmit(this.state)
        }}
      >
        <h3>Create Todo</h3>
        <input
          name="name"
          placeholder="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          name="description"
          placeholder="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <button type="submit">add</button>
      </form>
    )
  }
}
