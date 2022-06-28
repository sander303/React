import { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import validator from 'validator';

function Employees() {

  // TODO: Load data from backend service
  const [employees, setEmployees] = useState([]);
  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const idRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const avatarRef = useRef();

  useEffect(() => {
    fetch("https://reqres.in/api/users")
    .then(res => res.json())
    .then(body => {
        setEmployees(body.data);
    })
}, []);

  const addEmployee = () => {
    // TODO: Add validations
    // TODO: Add an employee to the table
    const newEmployee = {
      id: idRef.current.value,
      name: nameRef.current.value,
      email: emailRef.current.value,
      avatar: avatarRef.current.value
    }
    if (validator.isEmail(emailRef.current.value) && 
        validator.isNumeric(idRef.current.value) && 
        validator.isAlpha(nameRef.current.value) && 
        validator.isURL(avatarRef.current.value)) {
      employees.push(newEmployee);
      setEmployees(employees.slice());
    } 
    if (!validator.isEmail(emailRef.current.value)) {
      setEmailError("Incorrect email address!");
    } else {
      setEmailError("");
    }
    if (!validator.isNumeric(idRef.current.value)) {
      setIdError("Incorrect ID!");
    } else {
      setIdError("");
    }
    if (!validator.isAlpha(nameRef.current.value)) {
      setNameError("Incorrect name!");
    } else {
      setNameError("");
    }
    if (!validator.isURL(avatarRef.current.value)) {
      setAvatarError("Incorrect URL!");
    } else {
      setAvatarError("");
    }   
  }

  const deleteEmployee = (employee) => {
    // TODO: Delete an employee from the table
    const index =  employees.findIndex(element => element.id === employee.id);
    employees.splice(index, 1);
    setEmployees(employees.slice());
  }

  return (<div>
    <div className="container">
      <h2 className="mb-4">Employees</h2>
      <Table className="table table-hover table-bordered table-sortable">
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Avatar</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        {employees.map(element => 
        <tr key={element.id}>
          <td>{element.id}</td>
          <td>{element.first_name} {element.last_name} {element.name}</td>
          <td>{element.email}</td>
          <td className="avatar"><img src={element.avatar} alt=""/></td>
          <td><Button onClick={() => deleteEmployee(element)} type="button" variant="danger">Delete</Button></td>
        </tr>)} 
        <tr className="input-row">
          <td><input ref={idRef} type="number" placeholder="ID" className="form-control"/>{idError}</td>
          <td><input ref={nameRef} type="text" placeholder="Name" className="form-control"/>{nameError}</td>
          <td><input ref={emailRef} type="email" placeholder="Email" className="form-control"/>{emailError}</td>
          <td><input ref={avatarRef} type="url" placeholder="Avatar URL" className="form-control"/>{avatarError}</td>
          <td><Button onClick={() => addEmployee()} type="submit" variant="success">Add</Button></td>
        </tr>
        </tbody>
      </Table>
    </div>

  </div>)
}

export default Employees;