
// Autor: Tatan022
import { useState, useEffect } from "react";
import Card from './components/Card';
import SearchInput from './components/SearchInput';
import axios from 'axios';

export default function App() {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [mensajeError, setMensajeError] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  // Cargar usuarios desde la API
  const cargarUsuarios = async () => {
    try {
      const respuesta = await axios.get('http://localhost:8000/usuarios');
      setListaUsuarios(respuesta.data);
    } catch (error) {
      setMensajeError('Error al cargar usuarios');
      console.error("Error al cargar los usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Filtrar usuarios por nombre, perfil o intereses
  const usuariosFiltrados = listaUsuarios.filter((usuario) => {
    const termino = terminoBusqueda.toLowerCase();
    return (
      `${usuario.nombre} ${usuario.apellidos}`.toLowerCase().includes(termino) ||
      usuario.perfil.toLowerCase().includes(termino) ||
      usuario.intereses.toLowerCase().includes(termino)
    );
  });

  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold text-center mb-4">
        Buscador de Usuarios
      </h1>

      <SearchInput value={terminoBusqueda} onChange={setTerminoBusqueda} />

      {mensajeError && <p className="text-red-500 text-center">{mensajeError}</p>}

      {usuariosFiltrados.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron resultados.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {usuariosFiltrados.map((usuario) => (
            <Card key={usuario.id} user={usuario} />
          ))}
        </div>
      )}
    </div>
  );
}
