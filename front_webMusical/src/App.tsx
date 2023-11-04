import { useRef, useState } from 'react';

function App() {
  const [idea, setIdea] = useState('');
  const [genero, setGenero] = useState('');
  const [melody, setMelody] = useState('');


  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const ideaTextareaRef = useRef<HTMLTextAreaElement | null>(null); // Ref para el campo de "idea"
  const genreInputRef = useRef<HTMLInputElement | null>(null); // Ref para el campo de "genero"
  const melodyTextareaRef = useRef<HTMLTextAreaElement | null>(null); // Ref para el campo de "melody"

  const handleStartComposition = () => {
    if (ideaTextareaRef.current) {
      const ideaValue = ideaTextareaRef.current.value;
      const genreInput = document.getElementById('genero') as HTMLInputElement; // Añadir 'as HTMLInputElement'

      if (genreInput) {
        const genreValue = genreInput.value;
        const jsonData = {
          question: `Necesito una letra original, de al menos 3 versos para una canción del género ${genreValue} con la siguiente idea: ${ideaValue}`,
        };
        console.log(jsonData); // Imprime el objeto jsonData en la consola


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(jsonData);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow' as RequestRedirect
        };
        

        fetch("http://localhost:3000/chat-gpt-ai/mesagge", requestOptions)
          .then((response) => {
            if (response.ok) {
              return response.json(); // Parsear la respuesta JSON
            } else {
              throw new Error('La solicitud no se pudo completar con éxito.');
            }
          })
          .then((responseJson) => {
            console.log('Respuesta del servidor:', responseJson);
            // Aquí puedes manejar la respuesta como desees
          })
          .catch((error) => {
            console.error('Error en la solicitud:', error);
          });
      } else {
        console.error('Elemento "genero" no encontrado en el documento.');
      }
    } else {
      console.error('El ref del textarea es nulo.');
    }
  };








  return (
    <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
      <div className="bg-gray-800 p-4 w-2/5 rounded-lg">
        <h1 className="text-3xl font-bold text-center my-2">Let's compose!</h1>

        <div className="mt-4">
          <label htmlFor="genero" className="block text-sm font-medium text-gray-400">
            Genre:
          </label>
          <input
            type="text" // Cambia el tipo a "text"
            id="genero"
            name="genero"
            ref={genreInputRef}
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md py-2 px-3 mt-1"
            placeholder="Example: Rock, Soft, Cumbia..."
            value={genero}
            onChange={(e) => setGenero(e.target.value)} // Asegúrate de cambiar setIdea a setGenero
          />
        </div>


        <div className="mt-4">
          <label htmlFor="idea" className="block text-sm font-medium text-gray-400">
            Enter your song idea here:
          </label>
          <textarea
            id="idea"
            name="idea"
            rows={4}
            ref={ideaTextareaRef}
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md py-2 px-3 mt-1"
            placeholder="Idea descripcion..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-4">
          <label htmlFor="melody" className="block text-sm font-medium text-gray-400">
            Enter details about the melody:
          </label>
          <textarea
            id="melody"
            name="melody"
            rows={4}
            ref={melodyTextareaRef}
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md py-2 px-3 mt-1"
            placeholder="Instruments, rhythm..."
            value={melody}
            onChange={(e) => setMelody(e.target.value)}
          ></textarea>
        </div>

        <button
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
          onClick={handleStartComposition}
        >
          Compose song
        </button>
        {/* Resto del contenido... */}

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
