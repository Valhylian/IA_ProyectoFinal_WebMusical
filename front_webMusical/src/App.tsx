import { useRef, useState } from 'react';

function App() {
  const [idea, setIdea] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Tipo explícito del ref

  const handleStartComposition = () => {
    if (textareaRef.current) {
      const ideaValue = textareaRef.current.value;
      console.log('Valor del textarea:', ideaValue);
    } else {
      console.log('El ref del textarea es nulo.');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
      <div className="bg-gray-800 p-4 w-2/5 rounded-lg">
        <h1 className="text-3xl font-bold text-center my-2">WEB DE CREACIÓN MUSICAL</h1>
        <div className="mt-4">
          <label htmlFor="idea" className="block text-sm font-medium text-gray-400">
            Ingrese su idea aquí:
          </label>
          <textarea
            id="idea"
            name="idea"
            rows={4}
            ref={textareaRef}
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md py-2 px-3 mt-1"
            placeholder="Escriba su idea..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          ></textarea>
        </div>
        <button
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
          onClick={handleStartComposition}
        >
          Iniciar composición
        </button>
        {/* Resto del contenido... */}
        <div className="mt-4">
          <div className="bg-gray-700 h-32 rounded-md mt-4">
            Espacio Imagen
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
