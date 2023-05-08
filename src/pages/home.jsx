import React from "react";
import {FaRegTrashAlt} from 'react-icons/fa'

const style = {
    li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize bg-green-200`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer `,
    button: `cursor-pointer flez items-center`
}

const Todo = ({todo, toggleComplete, deleteUsuario}) => {
    return (
        <li className={todo.activo ? style.liComplete : style.li}>
            <div className={style.row}>
                <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.activo ? 'checked' : ''} />
                <p onClick={() => toggleComplete(todo)} className={todo.activo ? style.textComplete : style.text}>{todo.nombre} </p>
            </div>
            <button onClick={() => deleteUsuario(todo.id)}>{<FaRegTrashAlt />}</button>
        </li>
    )
}

export default Todo



/*

import React, { useRef,useEffect} from "react";
import { firestore } from "../firebase";
import {addDoc,collection,getDocs} from "@firebase/firestore"

export default function Home() {
    const messageRef = useRef();
    const ref = collection(firestore,"messages");

    // pasar datos
    const handleSave = async(e) => {
        e.preventDefault();
        console.log(messageRef.current.value)

        let data = {
            message:messageRef.current.value,
        }
        try{
            addDoc(ref,data);
        }catch(e){
            console.log(e);
        }
    };

    //obtener datos 
    useEffect(() =>{
        const obtenerDatos = async() => {
            const datos = await getDocs(collection(firestore,'usuarios'));
            datos.forEach((documento) =>{
                console.log(documento.data());
            });
        }
        obtenerDatos();
    }, []);

    return(
        <div>
            <form onSubmit={handleSave}>
                <label>ESCRIBE UN MENSAJE</label>
                <input type="text" ref={messageRef}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}*/