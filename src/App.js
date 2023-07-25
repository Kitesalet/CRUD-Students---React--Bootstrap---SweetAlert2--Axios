import "./App.css";
import { useState, useEffect } from "react";
import { ImBin, ImPower } from "react-icons/im";
import axios from "axios";
import Swal from 'sweetalert2'


function App() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    getEmpleados();
  }, [empleados]);


  const deleteHandler = (id) =>{
    axios.delete(`http://localhost:5016/api/Student/${id}`)
    .then(response => 
      Swal.fire({
        icon: 'error',
        title: 'Se ha borrado un registro',
        text: `${response.data}`,
        
      }))
    .catch(error => console.log("error:", error))
  }

  const getEmpleados = () => {
    axios
      .get("http://localhost:5016/api/Student")
      .then((response) => {
        setEmpleados(response.data);
      })
      .catch((error) => {
        console.error("Error haciendo el get", error);
      });
  };

  const postHandler = (e) => {
    let newStudent = {
      name: name,
      course: course,
    };
    axios
      .post("http://localhost:5016/api/Student", newStudent)
      .then((response) => {
        Swal.fire(
          ("Se añadio un nuevo registro!" )
)
      })
      .catch((error) => {
        console.error("error!", error);
      });
  };

  const updateHandler = (estudiante) => {
     
    setCourse(estudiante.course)
    setName(estudiante.name)
    setId(estudiante.id)

    Swal.fire("Se ha rellenado el estudiante")


  };

  const updaterHandler = () =>{
    
    let studentUpdated = {id:id, name:name, course:course}

    axios.put(`http://localhost:5016/api/Student/`, studentUpdated)
        .then(response => Swal.fire(`Se ha updateado! || ${response.data}`))
        .catch(error => Swal.fire("Error!", error))
    getEmpleados()
        setCourse("")
        setName("")
        setId(0)
  }

  const [id, setId] = useState()
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <h1 style={{ textAlign: "center" }}>Student Details</h1>
      <div className="container">
        <form className="m-2" onSubmit={handleSubmit}>
          <label htmlFor="name">Student Name</label>
          <input
            placeholder="Enter Student Name"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="course" className="mt-2">
            Course
          </label>
          <input
            placeholder="Enter Student Name"
            id="course"
            className="form-control"
            onChange={(e) => setCourse(e.target.value)}
            value={course}
          />
          <div className="row justify-content-around mx-auto my-2">
            <input
              type="Submit"
              className="col-4 btn btn-success"
              id="btnPost"
              value={"Agregar"}
              onClick={() => postHandler()}
            />
            <input
              type="Submit"
              className="col-4 btn btn-warning"
              id="btnUpdate"
              value={"Update"}
              onClick={() => updaterHandler()}
            />
          </div>
        </form>
      </div>

      <hr></hr>

      <div className="container align-items-center justify-content-center">
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col" className="text-center align-middle">
                Student Id
              </th>
              <th scope="col" className="text-center align-middle">
                Student Name
              </th>
              <th scope="col" className="text-center align-middle">
                Course
              </th>
              <th scope="col" className="text-center align-middle">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado, index) => {
              return (
                <tr key={index}>
                  <th scope="row" className="text-center align-middle">
                    {empleado.id}
                  </th>
                  <td className="text-center align-middle">{empleado.name}</td>
                  <td className="text-center align-middle">
                    {empleado.course}
                  </td>
                  <td className="text-center align-middle">
                    <button 
                    onClick={() => deleteHandler(empleado.id)}
                    className="mx-1 btn btn-danger">
                      <ImBin />
                    </button>
                    <button 
                    onClick = {() => updateHandler({...empleado, isUpdating:true})}
                    className="mx-1 btn btn-warning">
                      <ImPower />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
