import React from 'react';
import fetch from 'isomorphic-fetch';

class AddTodo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todo : '',
        };
    }

    handleChange(event) {
        this.setState({todo: event.target.value});
    }

    onAddItem(event) {
        if(this.state.todo){
            fetch('http://192.168.99.100:3000/todos',
                { 
                    method: 'POST', 
                    body : JSON.stringify({ text: this.state.todo }),
                }
            ).then(this.setState({ todo: '' }))
            .catch(() => console.log('Error'));
        }
        
    }

    render() {
        return (
            <div>
                <h2>Adicionar nova Tarefa: </h2>
               <h4>(Command feito no Postgres)</h4>
                <input className="input-text" type="text" value={this.state.todo} onChange={this.handleChange.bind(this)} />
                <input className="input-button" type="button" value="Add" onClick={this.onAddItem.bind(this)} />
            </div>
        );
    }
}

export default AddTodo;
