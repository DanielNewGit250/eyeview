import React, { Component } from 'react';
import './App.css';
import { v4 } from 'uuid';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';


// static seed data
// todo - dates as dates, not strings
const userList = [
  {
    name: 'peldi',
    age: 37,
    date: 'Mon Jan 1 2017',
    userID: 0,
  },
  {
    name: 'Lior',
    age: 34,
    date: 'Mon Jan 1 2017',
    userID: 1,
  },
  {
    name: 'Patata',
    age: 37,
    date: 'Thu Dec 1 2017',
    userID: 2,
  },
  {
    name: 'Val',
    age: 18,
    date: 'Mon Jan 1 2017',
    userID: 3,
  },
  {
    name: 'Shakshouka',
    age: 6,
    date: 'Mon Jan 27 2017',
    userID: 4,
  },
  {
    name: 'Jachnun',
    age: 15,
    date: 'Mon Jan 27 2017',
    userID: 5,
  },
];

// util search function
const isSearched = (searchTerm) => (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase());


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      userList: userList,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  onDelete(id) {
    //console.log("delete: " + id);
    const isNotId = (user) => user.userID !== id;
    const updatedUserList = this.state.userList.filter(isNotId);
    this.setState({userList: updatedUserList});
  }

  onEdit(id) {
    console.log("edit - not implemented " + id);
  }

  onSearchChange(event) {
    console.log("Searching... " + event.target.value);
    this.setState({searchTerm: event.target.value});
  }


addUser(name, age){
  // console.log("Added... " + v4());
    const newUserList = [...this.state.userList, {
                          "name": name,
                          "age": age,
                          "userID": v4(),
                          "date": new Date().toDateString() // temp
                        }
                ];
              
    this.setState(
      {
        userList: newUserList,
        searchTerm: '' 
      }
     );
}


  render() {
    const userList = this.state.userList;

    return (
      <div className="App">
          
          <form className="search-form">
            <input className="search-form__input" type="text" onChange={this.onSearchChange} value={this.state.searchTerm} placeholder="search" />
          </form>
         
          <table className="data-table">
            <thead>
              <tr>
                <td>Date</td>
                <td>Age</td>
                <td>Name</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
            {userList.filter(isSearched(this.state.searchTerm)).map(user => 
                <User key={user.userID} user={user} onDelete={this.onDelete} onEdit={this.onEdit} /> 
            )}
            </tbody>
          </table>

          <AddForm onNewUser={this.addUser} />

      </div>
    );
  }
}


const User = ({user, onDelete, onEdit}) => {
  const {name, date, age, userID} = user;
  
  return(
      <tr key={userID}>
          <td>{date}</td>
          <td>{name}</td>
          <td>{age}</td>
          <td><button className="button--edit" onClick={() => onEdit(userID)}><FaPencilAlt /></button></td>
          <td><button className="button--delete" onClick={() => onDelete(userID)}><FaTrashAlt /></button></td>
      </tr>
  )
}



const AddForm = ({onNewUser=f=>f}) => {
  let _name, _age;

  const submit = e => {
      e.preventDefault();
      onNewUser(_name.value, _age.value);
      _name.value = '';
      _age.value = '';
  }


  /* 
 todo - validation age, not empty, etc
 todo - propTypes etc
  */
  return (
      <form className="add-form" onSubmit={submit}>
        <div className="add-form__fields">
          <div className="add-form__input">
            <label>Name</label>
            <input ref={input => _name = input}
                 type="text" maxLength={50}  required  />
          </div>
          <div className="add-form__input">
            <label>Age</label>
            <input ref={input => _age = input}
                 type="text" maxLength={50} required />
          </div>
        </div> 

        <div className="add-form__submit">
          <button className="button--add">Create New User</button>
        </div> 
      </form>
  )
}


export default App;