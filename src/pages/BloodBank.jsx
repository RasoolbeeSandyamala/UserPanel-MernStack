import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const BloodBank = () => {
  const { bloodBankData } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter banks based on blood group availability with proper checks
  const filteredBanks = bloodBankData?.filter((bank) =>
    bank?.bloodGroupDetails?.some((group) =>
      group?.bloodGroup?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ) || [];

  return (
    <div className="container mx-auto p-4">
      <div className='d-flex justify-content-around gap-5 flex-wrap mb-2'>
      <h1 className="text-2xl font-bold text-primary">Blood Bank Details</h1>

{/* Search Input for Blood Group */}
<input
  type="text"
  placeholder="Search Blood Group (e.g., A+, B-)"
  className="border p-1 w-full mb-4 rounded border-primary"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
      </div>
     

      {/* Show Results */}
      <div className='container d-flex justify-content-evenly gap-4 flex-wrap'>
        {(searchQuery ? filteredBanks : bloodBankData)?.map((bank) => (
          <p key={bank.id} className="border border-2 rounded-4 border-secondary p-5 mb-2 shadow ">
            <strong className='text-primary'>Blood Bank:</strong> {bank.bloodBankName} <br />
            <strong>Location:</strong> {bank.location} <br />
            <strong>Contact:</strong> {bank.contactNumber} <br />
            <strong>Blood Group Availability:</strong>
            <ul>
              {bank.bloodGroupDetails?.map((group, index) => (
                <li key={index} className='my-2'>
                  {group.bloodGroup}   :   {group.availability} units
                </li>
              ))}
            </ul>
            <hr />
          </p>
        ))}
      </div>
    </div>
  );
};

export default BloodBank;
