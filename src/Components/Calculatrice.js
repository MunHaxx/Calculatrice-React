import React, { useState, useEffect} from 'react';
import { unstable_concurrentAct } from 'react-dom/cjs/react-dom-test-utils.development';

function Calculatrice() {
    const [valeur_a, setValeur_a] = useState("");
    const [valeur_b, setValeur_b] = useState("");
    const [last_op_deja_exec, setLast_op_deja_exec] = useState(true);
    const [operation, setOperation] = useState("None");

    useEffect(() => {
        document.getElementById("nombre-avant").innerHTML = valeur_b;
    }, [valeur_b]);

    useEffect(() => {
        if (valeur_a) {
            document.getElementById("nombre-actuel").innerHTML = valeur_a;
        }
        else {
            document.getElementById("nombre-actuel").innerHTML = 0;
        }
    }, [valeur_a]);

    /* Permet de rentrer les nombres de 0 a 9 */
    function entrerNombre (valeur) {
        setValeur_a (valeur_a + "" + valeur);
        setLast_op_deja_exec (false);
    }

    /* Fonction permettant d'effectuer une addition */
    function addition () {
        exec_last_operation();
        setOperation("add");
        document.getElementById("ico_op").innerHTML = "+";
        console.log(operation);
    }

    /* Fonction permettant d'effectuer une soustraction */
    function soustraction () {
        exec_last_operation();
        setOperation("sous");
        document.getElementById("ico_op").innerHTML = "-";
        console.log(operation);
    }

    /* Fonction permettant d'effectuer une multiplication */
    function multiplication() {
        exec_last_operation();
        setOperation("mult");
        document.getElementById("ico_op").innerHTML = "x";
        console.log(operation);
    }

    /* Fonction permettant d'effectuer une division */
    function division () {
        exec_last_operation();
        setOperation("div");
        document.getElementById("ico_op").innerHTML = "÷";
        console.log(operation);
    }

    /* Fonction effectuant la dernière opération souhaiter */
    function exec_last_operation () {

        /* Si la dernière opération rentré n'a pas été encore fait, la faire */
        if (last_op_deja_exec === false) {
    
            console.log("Au début de la fonction ELO, a = ", valeur_a, " et b = ", valeur_b)
    
    
            if (operation === "add") {
                setValeur_b (valeur_b + parseInt(valeur_a));
            } else if (operation === "sous") {
                setValeur_b (valeur_b - parseInt(valeur_a));
            } else if (operation === "mult") {
                setValeur_b (valeur_b * parseInt(valeur_a));
            } else if (operation === "div") {
                setValeur_b (valeur_b / parseInt(valeur_a));
            } else {
                setValeur_b (parseInt(valeur_a));
            }
            setValeur_a ("");
            //refreshNombreAvant(b);
            //refreshNombreActuel(a);
            setLast_op_deja_exec (true);
    
            console.log("A la fin de la fonction ELO, a = ", valeur_a, " et b = ", valeur_b)
    
        }
        
    }

    /* Permet de valider une opération */
    function egal() {
        exec_last_operation ();
    
        setOperation ("None");
        document.getElementById("ico_op").innerHTML = "";
        setValeur_a ("");
    }

    /* Permet de tous remettre à 0 */
    function reset () {
        setValeur_a("");
        setValeur_b("");
        setOperation("None");
        document.getElementById("ico_op").innerHTML = "";
        setLast_op_deja_exec (true);
    }

    /* Permet de rapidement faire le carré du nombre en cours */
    function exposant_2 () {
        setValeur_a(valeur_a**2);
    }

    /* Permet de supprimer le dernier charactère de a */
    function retour () {
        setValeur_a (valeur_a.substring(0, valeur_a.length - 1));
    }

    return (
        <div>
            <main>
                <div id="case">
                    <div id='nombre-avant'> </div>
                    <div id='ico_op'> </div>
                    <div id='nombre-actuel'>0</div>
                </div> 

                <div className='ligne-bouton'>
                    <button className='bouton-text' onClick={() => reset()}>rst</button>
                    <button className='bouton-text' onClick={() => exposant_2()}>x²</button>
                    <button className='bouton-text' onClick={() => retour()}>ret</button>
                    <button className='bouton-operation' onClick={() => division()}>÷</button>
                </div>

                <div className='ligne-bouton'>
                    <button onClick={() => entrerNombre(7)}>7</button>
                    <button onClick={() => entrerNombre(8)}>8</button>
                    <button onClick={() => entrerNombre(9)}>9</button>
                    <button className='bouton-operation' onClick={() => multiplication()}>x</button>
                </div>

                <div className='ligne-bouton'>
                    <button onClick={() => entrerNombre(4)}>4</button>
                    <button onClick={() => entrerNombre(5)}>5</button>                    
                    <button onClick={() => entrerNombre(6)}>6</button>
                    <button className='bouton-operation' onClick={() => soustraction()}>-</button>
                </div>

                <div className='ligne-bouton'>
                    <button onClick={() => entrerNombre(1)}>1</button>
                    <button onClick={() => entrerNombre(2)}>2</button>
                    <button onClick={() => entrerNombre(3)}>3</button>
                    <button className='bouton-operation' onClick={() => addition()}>+</button>
                </div>

                <div className='ligne-bouton'>
                    <button id='bouton-zero' onClick={() => entrerNombre(0)}>0</button>
                    <button className='bouton-operation'>.</button>
                    <button id='bouton-egal'  onClick={() => egal()}>=</button>
                </div>
            </main>
        </div>
    );
}

export default Calculatrice;