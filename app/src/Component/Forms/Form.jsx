import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
export default function Form({props}) {
  const navigate = useNavigate();
const [formData,setFormData] = useState({
  ComponentName:'',
  name:'',
  propertyName:'',
  contactInfo:'',
  location:'',
  image:''
})
const [result,setResult] = useState('');
  function handleInputChange(e){
    const {name,value} = e.target;
    setFormData((prevState)=>({
      ...prevState,
      [name]:value
    }))
    setResult('');
  }
  function handleSubmit(e){
   e.preventDefault();
   fetch('http://localhost:3000/vendorData',{
    method:"POST",
    headers:{
      "content-type":"application/json",
    },
    body: JSON.stringify(formData)
   }).then((response)=>response.json())
   .then((data)=>{setResult('data added succussfully')
  setFormData(
    {
  ComponentName:'',
  name:'',
  propertyName:'',
  contactInfo:'',
  location:''
    }
  );}
  )
   .catch((err)=>console.log('network error check the server',err))
}
  
return (
  <div className="form mx-auto h-100">
    <div className="module-header rounded-2 d-flex w-100 px-3 pt-3"><h3><b>Vendor Module</b></h3><div className='py-1 ps-1 text-secondary'><p>. new vendor</p></div></div>
    <form onSubmit={handleSubmit} className="w-100 d-flex justify-content-center h-80 px-4 rounded-2 font-size-xl font-weight-bold">
     <div className="w-100">
      <div className="custom-overline"></div>
     <div className="w-100 mb-5"><h4><b>New vendor</b></h4>
     <p>use the form below to update the vendor</p>
     </div>
      <div className="d-flex flex-row">
        <div className="col d-flex flex-column me-4 ">
         {props.feildOne && (
          <>
          <label htmlFor="name" className='ms-1'>Enter the {props.feildOne}</label>
          <input
            type="text"
            id="name"
            name="name"
            className="p-3  rounded-5"
            value={formData.name}
            placeholder={props.feildOne}
            onChange={handleInputChange}
          />
          </>
          )}

          {props.feildTwo && (
            <>
            <label htmlFor="contactInfo" className='postion-relative ms-1  mt-4'>Enter the {props.feildTwo}</label>
          <input
            type="number"
            id="contactInfo"
            name="contactInfo"
            className="p-3  rounded-5"
            value={formData.contactInfo}
            placeholder={props.feildTwo}
            onChange={handleInputChange}
          />
          </>
          )}
        </div>
        <div className="col d-flex flex-column mx-2 ms-4">
         {props.feildThree && (
          <>
          <label htmlFor="propertyName" className='ms-2'>Enter the {props.feildThree}</label>
          <input
            type="text"
            id="propertyName"
            name="propertyName"
            className="p-3  rounded-5"
            value={formData.propertyName}
            placeholder={props.feildThree}
            onChange={handleInputChange}
          />
          </>
          )}
{props.feildFour &&(
  <>
          <label htmlFor="location" className='ms-2 mt-4'>Enter the {props.feildFour}</label>
          <input
            type="text"
            id="location"
            name="location"
            className="p-3 rounded-5"
            value={formData.location}
            placeholder={props.feildFour}
            onChange={handleInputChange}
          />
          </>
          )}
        </div>
      </div>
      <br />
      {result &&<div className="text-primary bg-light text-center fs-3 rounded-3 mb-1 mx-auto w-50">{result}</div>}
      <div className="submit me-5 w-100 d-flex justify-content-end">
        <button type="submit" className="btn me-2 btn rounded-5">submit</button>
        <button className='submit btn rounded-5 bg-danger'   onClick={() => {
    setFormData({
      ComponentName: '',
      name: '',
      propertyName: '',
      contactInfo: '',
      location: ''
    });
    setResult(''); // Make sure this is called separately
  }}>cancel</button>
      </div>
      </div>
    </form>
  </div>
);
}