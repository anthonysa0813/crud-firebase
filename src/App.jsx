import React, { useState, useEffect } from "react";
import { firebase } from "./firebase";

function App() {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("tareas").get();
        const arrayFiltrado = data.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setTareas(arrayFiltrado);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  const registrar = async (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("campo vacio!!!");
      return;
    }

    try {
      const db = firebase.firestore();
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now(),
      };
      const data = await db.collection("tareas").add(nuevaTarea);
      setTareas([...tareas, { ...nuevaTarea, id: data.id }]);
      setTarea("");
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore();
      db.collection("tareas").doc(id).delete();
      const arrayFiltrado = tareas.filter((item) => item.id !== id);
      setTareas(arrayFiltrado);
    } catch (error) {
      console.log(error);
    }
  };

  const activateEdition = (item) => {
    setModoEdicion(true);
    setTarea(item.name);
    setId(item.id);
  };

  const editar = async (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("campo vacio");
      return;
    }

    try {
      const db = firebase.firestore();
      await db.collection("tareas").doc(id).update({
        name: tarea,
      });
      const arrayFiltrado = tareas.map((item) =>
        item.id === id ? { id: item.id, fecha: item.fecha, name: tarea } : item
      );
      setTareas(arrayFiltrado);
      setModoEdicion(false);
      setTarea("");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mb-2 mt-5">
      <div className="row">
        <div className="col-md-6">
          <h3>Lista de Tareas</h3>
          <ul className="list-group">
            {tareas.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span>{item.name}</span>
                <button
                  className="btn btn-danger btn-sm mx-2 float-right"
                  onClick={(id) => eliminar(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm  mx-2 float-right mr-2"
                  onClick={() => activateEdition(item)}
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h2>{modoEdicion ? "Editar Tarea" : "Agregar Tarea"}</h2>
          <form onSubmit={modoEdicion ? editar : registrar}>
            <input
              type="text"
              placeholder="Escriba la tarea"
              value={tarea}
              className="form-control"
              onChange={(e) => setTarea(e.target.value)}
            />
            <button
              className={
                modoEdicion ? "btn btn-warning mt-3" : "btn btn-dark mt-3"
              }
              type="submit"
            >
              {modoEdicion ? "Editar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
