import { useRef, useState } from 'react';

function App() {
  const [idea, setIdea] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Tipo explícito del ref
  const [imageUrl, setImageUrl] = useState<string | null>(null);


  const handleStartComposition = () => {
    if (textareaRef.current) {
      const ideaValue = textareaRef.current.value;
      const jsonData = {
        prompt: ideaValue,
      };

      // Realizar una solicitud POST a la dirección deseada
      fetch('http://localhost:3000/stable-diffusion-integration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => {
          if (response.ok) {
            return response.blob(); // Obtener los datos binarios (imagen)
          } else {
            throw new Error('La solicitud no se pudo completar con éxito.');
          }
        })
        .then((imageData) => {
          // `imageData` contiene los datos binarios de la imagen
          const imageUrl = URL.createObjectURL(imageData);

          // Establecer la URL de la imagen en el estado
          setImageUrl(imageUrl);

          console.log('Imagen del servidor:', imageUrl);
          // Luego puedes usar `imageUrl` para mostrar la imagen en tu aplicación
        })
        .catch((error) => {
          console.error('Error en la solicitud:', error);
        });
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

        <div className="mt-4">
          <div className="bg-gray-700 h-32 rounded-md mt-4 image-container">
            <img
              src={imageUrl || ''}
              alt="Imagen del servidor"
              className="w-full h-full object-cover"
            />
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;
