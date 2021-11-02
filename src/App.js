import React, {Fragment, useState, useEffect} from 'react';
import Formulario  from "./components/Formulario";
import Cita  from "./components/Cita";

function App() {

  // Citas en el local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
      citasIniciales = [];
  }

   // State para listar las citas del lado derecho
    const [citas, agregarCita] = useState(citasIniciales);

    // UseEffect para realizar ciertas operaciones cuando el State cambia
    // Se ejecuta cuando se carga el componente. de una vez
    useEffect(() => {       

  //  let citasIniciales = JSON.parse(localStorage.getItem('citas')); Se puede poner aqui o en las dependencias(abajo en el array => [citas, citasIniciales])


      if(citasIniciales) {
        localStorage.setItem('citas', JSON.stringify(citas));
      }
      else {
        localStorage.setItem('citas', JSON.stringify([]));
      }
    }, [citas, citasIniciales] ) // Se le coloca este array vacio cuando queremos que cargue 1 vez. Sino cargara cada vez que ocurra algo. Se llama dependencias.

  // Funcion para ir cargando las citas
  const crearCita = cita => {
      agregarCita([
        ...citas,
        cita
      ]);  
  //  console.log(agregarCita());
  }

  // Funcion para eliminar cita
  const eliminarCita = id => {
        
      const nuevasCitas = citas.filter(item => item.id !== id)
      agregarCita(nuevasCitas);
  }

  // mENSAJE CONDICIONAL
  const TituloMisCitas = citas.length === 0 ? 'AGREGA UNA CITA' : 'aDMINISTRA TUS CITAS';
  

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">

          <h2>{TituloMisCitas}</h2>

            {citas.map(cita => (
                <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
                />

            ))}
          </div>
        </div>
      </div>
    </Fragment>
    
  );
}

export default App;
