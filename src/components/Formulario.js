import React, {Fragment, useState} from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) => {

    // States
    // State de objeto para manejar los datos del formulario
    const [cita, actualizaCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    // State para manejar error
    const [ error, manejarError ] = useState(false); // Inicia con un false

    // Funcion que recibe los datos de los inputa
    const actualizandoState = e => {
        actualizaCita({
            // Vamos guardando en el state (Guardamos una copia)
            ...cita,
            // Vamos llenando cada valor en el state desde el formulario
            [e.target.name]: e.target.value
        })
        console.log("escribiendo...");
    }

    // Extraer los valores
    // DESTRUCTURING : Para no tener que estar escribiendo cite.mascota , cita.propietario, etc
    const { mascota, propietario, fecha, hora, sintomas } = cita; 

    // Funcion de agregar cita
    const submitCita = e => {
        // prevent Default es para prevenir el evento por defecto. (Que coloque los parametros en la url al momento de llamar la funcion)
        e.preventDefault();

        // Validar
        if(mascota.trim() === "" || propietario.trim() === "" || fecha.trim() === "" || hora.trim() === "" || sintomas.trim() === "") {
            manejarError(true);
            console.log("hay un error");
            return; // para que no se siga ejecutando el codigo
        }
        // Eliminando mensaje de campos vacios
        manejarError(false);

        // Asiganr ID
        cita.id = uuid();
        //console.log(cita);
        console.log(cita);
        //Crear la cita
        crearCita(cita);

        //Reiniciar el form
        actualizaCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }



    return ( 
        <Fragment>
            <h1>Crear cita</h1>

            { error? <p className="alerta-error">Todos los campos son obligatorios</p> 
                : null
            }

            <form
            onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizandoState}
                    value={mascota} // viene del desctructuring
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={actualizandoState}
                    value={propietario} // viene del desctructuring

                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"      
                    onChange={actualizandoState}
                    value={fecha} // viene del desctructuring

                />

                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"      
                    onChange={actualizandoState}
                    value={hora} // viene del desctructuring

                />

                <label>Síntomas</label>
                
                <textarea
                className="u-full-width"
                name="sintomas"
                onChange={actualizandoState}
                value={sintomas} // viene del desctructuring

                >
                </textarea>

                <button
                type="submit"
                className="u-full-width button-primary"
               // onClick=""
                >Agregar cita</button>
            </form>
        </Fragment>
     );
}
 
// PorpTypes - 
// Verificacion de tipos de props que se le pasan a los components
Formulario.propTypes = { // Nombre del componente. propTypes
    crearCita: PropTypes.func.isRequired
}


export default Formulario;