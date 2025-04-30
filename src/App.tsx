import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState<any>([]);

  const fetchCountries = () => {
    axios.get(import.meta.env.VITE_BASEURL)
      .then((res) => {
        setCountries(res.data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error.message);
      });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className='p-10'>
      <h1 className='text-2xl font-bold mb-6'>Country Flags</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {
          countries.map((item:any, i:any) => (
            <div key={i} className='rounded shadow p-4 text-center border'>
              <img
                src={item.flags?.png || item.flags?.svg}
                alt={`Flag of ${item.name?.common}`}
                className='w-full h-40 object-cover mb-3 rounded'
              />
              <div className='font-semibold'>{item.name?.common}</div>
              <div className='text-sm text-gray-600'>Region: {item.region}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
