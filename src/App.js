import React, {useState, useEffect} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './pages/home'
import { firestore } from './firebase'
import {query,collection, onSnapshot, updateDoc,doc, addDoc, deleteDoc} from 'firebase/firestore'

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#00E0E1]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`
}

function App() {

  //estados
  const [usuarios, setUsario] = useState([]);
  const [inputNombre, setInputNombre] = useState('');
  const [inputEdad, setInputEdad] = useState('');


  // FUNCION CREAR USUARIO #00FFFF #1CB5E0 #00E0E1
  //e es pasar eventos
  const createTodo = async (e) => {
    e.preventDefault(e);
    if(inputNombre === '' || inputEdad === ''){
      alert('ESCRIBE ALGO VALIDO!!!')
      return
    }
    await addDoc(collection(firestore,'usuarios'),{
      nombre: inputNombre,
      edad: inputEdad,
      activo: true,
    })
    setInputNombre('');
    setInputEdad('');
  }

  // FUNCION LEER USUARIO
  useEffect(() =>{
    const q = query(collection(firestore,'usuarios'))
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(),id: doc.id})
      });
      setUsario(todosArr)
    })
    return ()  => unsubscribe()
  },[])


  // FUNCAION ACTUALIZAR USUARIO
  const toggleComplete = async(todo) => {
    await updateDoc(doc(firestore,'usuarios',todo.id), {
      activo: !todo.activo
    })
  }

  // FUNCION BORRAR USUARIO
  const deleteUsuario = async (id) => {
    await deleteDoc(doc(firestore,'usuarios',id))
  }


  return (
    <div className={style.bg}>
      <div className={style.container}>
      <h3 className={style.heading}>USUARIOS</h3>
      <form  onSubmit={createTodo} className={style.form}>
        <input
         value={inputNombre}
         onChange={(e) => setInputNombre(e.target.value)} 
         className={style.input} 
         type='text' 
         placeholder='agregar usuario'/>
        <input
         value={inputEdad}
         onChange={(e) => setInputEdad(e.target.value)} 
         className={style.input} 
         type='text' 
         placeholder='Edad'/>
        <button className={style.button}><AiOutlinePlus size={30}/></button>
      </form>
      <ul>
        {usuarios.map((todo, index) => (
          <Todo 
          key={index} 
          todo={todo} 
          toggleComplete={toggleComplete} 
          deleteUsuario={deleteUsuario}/>
        ))}
      </ul>
      {usuarios.length < 1 ? null : <p className={style.count}>{`TIENES ${usuarios.length} ALUMNOS EN TOTAL`}</p>}
      </div>
    </div>
  );
}

export default App;
