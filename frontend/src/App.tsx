import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState<any>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/getAllBooks', {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log(data);
        setCount(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='bg-amber-400'>hello</div>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div>{JSON.stringify(count)}</div>
      )}
    </>
  )
}

export default App;
