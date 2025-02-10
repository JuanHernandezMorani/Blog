import '../styles/nav.css';
import React from 'react';
import bs from '../images/logo.png';

export default function Nav() {
    return (
        <nav className="navbar">
        <div className="nav-logo">
            <img src={bs} alt="boom!" className='img-fluid'/>
            <a href='/'><span className="sp1">Boomstudio</span></a>
            <a href='/'><span className="sp2">Blog</span></a>
        </div>
      <div className="nav-item">
        <a href='/Canales'>Canales</a>
        <ul className="dropdown-menu">
                            <li><a href="/Canales/#no-defined" className="dp-m-a">Búsqueda de Pago</a></li>
                            <li><a href="/Canales/#no-defined" className="dp-m-a">Display</a></li>
                            <li><a href="/Canales/#no-defined" className="dp-m-a">Redes Sociales</a></li>
                            <li><a href="/Canales/#no-defined" className="dp-m-a">Analítica</a></li>
                            <li><a href="/Canales/#no-defined" className="dp-m-a">Amazon</a></li>
                            <li><a href="/Canales/#no-defined" className="dp-m-a">YouTube y Video</a></li>
                        </ul>
      </div>
      <div className="nav-item">
        <a href='/Contenido'>Contenido</a>
      <ul className="dropdown-menu">
                            <li><a href="/Contenido/#no-defined" className="dp-m-a">Estrategia de Contenido</a></li>
                            <li><a href="/Contenido/#no-defined" className="dp-m-a">Creación de Contenido</a></li>
                            <li><a href="/Contenido/#no-defined" className="dp-m-a">Tipos de Contenido</a></li>
                        </ul>
      </div>
      <div className="nav-item">
        <a href='/Marketing'>Marketing</a>
      <ul className="dropdown-menu">
                            <li><a href="/Marketing/#no-defined" className="dp-m-a">Fundamentos de Marketing</a></li>
                            <li><a href="/Marketing/#no-defined" className="dp-m-a">Investigación Competitiva</a></li>
                            <li><a href="/Marketing/#no-defined" className="dp-m-a">Investigación de Mercado</a></li>
                            <li><a href="/Marketing/#no-defined" className="dp-m-a">Relaciones Públicas</a></li>
                            <li><a href="/Marketing/#no-defined" className="dp-m-a">Agencias</a></li>
                            <li><a href="/Marketing/#no-defined" className="dp-m-a">eCommerce</a></li>
                        </ul>
      </div>
      <div className="nav-item">
        <a href='/Noticias-e-Investigacion'>Noticias e Investigación</a>
      <ul className="dropdown-menu">
                            <li><a href="/Noticias-e-Investigacion/#no-defined" className="dp-m-a">Noticias del Sector</a></li>
                            <li><a href="/Noticias-e-Investigacion/#no-defined" className="dp-m-a">Investigación Original</a></li>
                            <li><a href="/Noticias-e-Investigacion/#no-defined" className="dp-m-a">Casos de Estudio</a></li>
                        </ul>
      </div>
    </nav>
    );
}