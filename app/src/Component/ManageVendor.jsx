import React, { useState } from 'react'
import Table from './Table/Table'
export default function ManageVendor() {
  const [data,setData] = useState('');
  return (
    <>
        <div className="main-content w-100 p-5 flex-column ">
        <div className="module-header text-dark w-100 px-3 pt-2 pb-1 rounded"><h3>Vendor Modules</h3></div>
        <div className="table-header w-100 rounded">
          <div className="px-3 pb-3 rounded">
        <Table props={data} />
        </div>
        </div>
        </div>
    </>
  )
}
