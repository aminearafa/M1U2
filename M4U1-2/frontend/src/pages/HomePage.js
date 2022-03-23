import React from 'react';
import '../styles/components/pages/HomePage.css';
const HomePage = ( props ) => {
    return (
       <main className="holder">
            <div className="homeimg">
               <img src="images/home/img01.jpg" alt="avion" />
            </div>
            <div className="columnas">
                <div className="bienvenidos left">
                    <h2>Bienvenidos</h2>
                    <p>Chuck Norris can clap with one hand. Chuck Norris once had a heart attack. His heart lost. Chuck Norris does not sleep. He waits. Chuck Norris once won an underwater breathing contest. With a fish. Chuck Norris once shattered the space-time continuum. He felt so bad, he put it back together.</p>
                </div>
                <div className="testimonios right">
                    <h2>Testimonios</h2>
                    <div className=" testimonio">
                        <span className="cita">Simplemente excelente</span>
                        <span className="autor">Juan Perez </span>
                    </div>
                </div>
            </div>
        </main>
    
    );
} 

export default HomePage;