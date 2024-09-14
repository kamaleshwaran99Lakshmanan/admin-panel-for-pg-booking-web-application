import React, { useState, useEffect } from 'react';
import Form from './Forms/Form';

export default function Vendor() {
  const [data, setData] = useState({
    ComponentName:'',
    feildOne: '',
    feildTwo: '',
    feildThree: '',
    feildFour: '', // Fixed typo from 'Location' to 'location'
    feildFive: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/FormData?ComponentName=vendor`);
        if (response.ok) {
          const fetchedData = await response.json();
          console.log('Fetched vendor data:', fetchedData);
          setData(fetchedData);
        } else {
          console.log('Failed to fetch the vendor');
        }
      } catch (err) {
        console.log('Network Error:', err);
      }
    };
  
    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  return (
    <>
        <div className="form-content w-100">
        <Form props={data} />
      </div>
    </>
  );
}
