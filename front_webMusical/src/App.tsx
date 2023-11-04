import { useRef, useState } from 'react';

function App() {
  const [idea, setIdea] = useState('');
  const [genero, setGenero] = useState('');
  const [melody, setMelody] = useState('');
  const [composedSong, setComposedSong] = useState(''); // Estado para mostrar la canción generada

  const ideaTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const genreInputRef = useRef<HTMLInputElement | null>(null);
  const melodyTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleStartComposition = () => {
    if (ideaTextareaRef.current) {
      const ideaValue = ideaTextareaRef.current.value;
      const genreInput = document.getElementById('genero') as HTMLInputElement;

      if (genreInput) {
        const genreValue = genreInput.value;
        const jsonData = {
          question: `Necesito una letra original, de al menos 3 versos para una canción del género ${genreValue} con la siguiente idea: ${ideaValue}`,
        };

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
              return response.json();
            } else {
              throw new Error('La solicitud no se pudo completar con éxito.');
            }
          })
          .then((responseJson) => {
            if (responseJson && responseJson[0] && responseJson[0].text) {
              setComposedSong(responseJson[0].text); // Establece la canción generada
            }
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
            type="text"
            id="genero"
            name="genero"
            ref={genreInputRef}
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md py-2 px-3 mt-1"
            placeholder="Example: Rock, Soft, Cumbia..."
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
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
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md mt-4 hover-bg-blue-600"
          onClick={handleStartComposition}
        >
          Compose song
        </button>

         {/* Agrega un campo de texto para mostrar la canción generada */}
         <div className="mt-4">
          <label htmlFor="composedSong" className="block text-sm font-medium text-gray-400">
            Composed Song:
          </label>
          <textarea
            id="composedSong"
            name="composedSong"
            rows={6} // Ajusta la cantidad de filas según tu preferencia
            className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md py-2 px-3 mt-1"
            value={composedSong} // Muestra la canción generada
            readOnly // Hace que el campo sea de solo lectura
          />
        </div>

      </div>
    </div>
  );
}

export default App;
