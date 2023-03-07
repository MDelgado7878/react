import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { NavDropdown } from 'react-bootstrap'
import './css/footerStyles.css'

const Footer = () => {
    return (
        <footer>
            <hr/>
            <div className='container'>
                <div className='first'>
                    <div className='title'>
                        <h3>Legales</h3>
                    </div>
                    <div className='links'>
                        <ul>
                            <li>
                                <a target={"_blank"} href='https://prod.storage.oxxofintech.com.mx/PrivacyPolicy.pdf'>
                                    Aviso de Privacidad
                                </a>
                            </li>
                            <li>
                                <NavDropdown title="Términos y condiciones" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="https://prod.storage.oxxofintech.com.mx/TermsAndConditions.pdf" className='item'>Contrato de Adhesión</NavDropdown.Item>
                                    <NavDropdown.Item href="https://spinbyoxxo.com.mx/wp-content/uploads/2022/10/TyC-Promociones-Octubre-VF.pdf" className='item'>Términos y Condiciones de Promociones</NavDropdown.Item>
                                </NavDropdown>
                            </li>
                            <li>
                                <a target={"_blank"} href='https://spinbyoxxo.com.mx/comisionistas/'>
                                    Comisionistas
                                </a>
                            </li>
                            <li>
                                <a target={"_blank"} href='https://spinbyoxxo.com.mx/buro-de-entidades/'>
                                    Buró de Entidades Financieras
                                </a>
                            </li>
                        </ul>

                        <h4><a target={"_blank"} href='https://spinbyoxxo.com.mx/costos-y-comisiones/'>Consulta los costos y comisiones de nuestros servicios</a></h4>
                    </div>
                </div>
                <div className='second'>
                    <div className='description'>
                        <p className='desc'>
                            COMPROPAGO S.A de C.V., Institución de Fondos de Pago Electrónico, es una entidad financiera autorizada, regulada y supervisada por las Autoridades Financieras bajo la marca comercial Spin by OXXO. Ni el Gobierno Federal ni las entidades de la administración pública paraestatal podrán responsabilizarse o garantizar los recursos de los Clientes que sean utilizados en las Operaciones que celebren con Spin by OXXO o frente a otros, así como tampoco asumir alguna responsabilidad por las obligaciones contraídas por Spin by OXXO o por algún Cliente frente a otro, en virtud de las operaciones que celebren.
                        </p>
                        <h5 className='copyright'>
                            ©2023 Spin by OXXO. Todos los derechos reservados
                        </h5>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
