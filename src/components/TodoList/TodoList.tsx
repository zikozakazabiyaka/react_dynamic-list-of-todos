import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';

type Props = {
  todos: Todo[];
  handleUserSelection: (userId: number) => void;
};

interface State {
  query: string;
  filterBy: string;
}

export class TodoList extends React.Component<Props, State> {
  state = {
    query: '',
    filterBy: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  filterTodos = () => {
    let filteredTodos = this.props.todos.filter(todo => (
      todo.title.toLocaleLowerCase().includes(this.state.query.toLocaleLowerCase())
    ));

    filteredTodos = filteredTodos.filter(todo => {
      switch (this.state.filterBy) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        case 'all':
        default:
          return todo;
      }
    });

    return filteredTodos;
  };

  render() {
    const { handleUserSelection } = this.props;
    const { query, filterBy } = this.state;
    const filteredTodos = this.filterTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          className="TodoList__item"
          type="text"
          name="query"
          value={query}
          onChange={this.handleChange}
        />

        <select
          className="TodoList__item"
          name="filterBy"
          value={filterBy}
          onChange={this.handleChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classnames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => (handleUserSelection(todo.userId))}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              </li>
            ))}

            <li className="TodoList__item TodoList__item--checked">
              <label>
                <input type="checkbox" checked readOnly />
                <p>distinctio vitae autem nihil ut molestias quo</p>
              </label>

              <button
                className="TodoList__user-button button"
                type="button"
              >
                User&nbsp;#2
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// export const TodoList: React.FC<Props> = (props) => {
//   const { todos, handleUserSelection } = props;

//   return (
//     <div className="TodoList">
//       <h2>Todos:</h2>

//       <div className="TodoList__list-container">
//         <ul className="TodoList__list">
//           {todos.map(todo => (
//             <li
//               key={todo.id}
//               className={classnames(
//                 'TodoList__item',
//                 {
//                   'TodoList__item--unchecked': !todo.completed,
//                   'TodoList__item--checked': todo.completed,
//                 },
//               )}
//             >
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={todo.completed}
//                   readOnly
//                 />
//                 <p>{todo.title}</p>
//               </label>

//               <button
//                 className="
//                   TodoList__user-button
//                   TodoList__user-button--selected
//                   button
//                 "
//                 type="button"
//                 onClick={() => (handleUserSelection(todo.userId))}
//               >
//                 User&nbsp;#
//                 {todo.userId}
//               </button>
//             </li>
//           ))}

//           <li className="TodoList__item TodoList__item--checked">
//             <label>
//               <input type="checkbox" checked readOnly />
//               <p>distinctio vitae autem nihil ut molestias quo</p>
//             </label>

//             <button
//               className="TodoList__user-button button"
//               type="button"
//             >
//               User&nbsp;#2
//             </button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };
