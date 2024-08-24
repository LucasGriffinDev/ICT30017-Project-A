import React from 'react';


export default function facilityManagment() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-around p-24">
           
  <h1 className="text-3xl">Rooms</h1>

<table className="table-auto border-4 border-indigo-500/100">
 <thead>
<tr>
    <th className="p-2">Room</th>
    <th className="p-2">Availablility</th>
    <th className="p-2">Resident</th>
</tr>
</thead>
<tbody>
<tr>
    <td className="p-2">1-A</td>
    <td className="p-2">Occupied</td>
    <td className="p-2">Alice Banks</td>
</tr>
<tr>
    <td className="p-2">1-A</td>
    <td className="p-2">Occupied</td>
    <td className="p-2">Arpit Puri</td>
</tr>
<tr>
    <td className="p-2">1-B</td>
    <td className="p-2">Occupied</td>
    <td className="p-2">Alice Banks</td>
 </tr>
<tr>
    <td className="p-2">2-A</td>
    <td className="p-2">Occupied</td>
    <td className="p-2">Luca Biondi</td>
</tr>
<tr>
    <td className="p-2">2-B</td>
    <td className="p-2">Occupied</td>
    <td className="p-2">Lucas Griffin</td>
</tr>
<tr>
    <td className="p-2">3-A</td>
    <td className="p-2">Occupied</td>
    <td className="p-2">Vincent Ni</td>
</tr>
<tr>
    <td className="p-2">3-B</td>
    <td className="p-2">Occupied</td>
    <td className="p-2">Jun Hatori</td>
</tr> 
<tr>
    <td className="p-2">4-A</td>
    <td className="p-2">Available</td>
    <td className="p-2"></td>
</tr>
<tr>
    <td className="p-2">4-B</td>
    <td className="p-2">Available</td>
    <td className="p-2"></td>
  </tr>
</tbody>
</table>

<h1 className="text-3xl">Reservations</h1>
          
<table className="table-auto border-4 border-indigo-500/100">
 <thead>
<tr>
    <th className="p-2">Facility</th>
    <th className="p-2">Availablility</th>
    <th className="p-2">Resident</th>
    <th className="p-2">Date and Time</th>
</tr>
</thead>
<tbody>
<tr>
    <td className="p-2">Spa</td>
    <td className="p-2">Reserved</td>
    <td className="p-2">Alice Banks</td>
    <td className="p-2">1/8/24 8:00 - 9:00</td>
</tr>
<tr>
    <td className="p-2">Sauna</td>
    <td className="p-2">Reserved</td>
    <td className="p-2">Lucas Griffin</td>
    <td className="p-2">2/8/24 9:00 - 10:00</td>
</tr>
<tr>
    <td className="p-2">Game Room</td>
    <td className="p-2">Reserved</td>
    <td className="p-2">Vincent Ni</td>
    <td className="p-2">2/8/24 8:00 - 9:00</td>
</tr>
<tr>
    <td className="p-2">Gym</td>
    <td className="p-2">Available</td>
    <td className="p-2"></td>
    <td className="p-2"></td>
</tr>
  
</tbody>
</table>      

<h2 className="text-3xl">Maintenance</h2>
         
<table className="table-auto border-4 border-indigo-500/100">
 <thead>
<tr>
    <th className="p-2">Room</th>
    <th className="p-2">Issue</th>
    <th className="p-2">Status</th>
</tr>
</thead>
<tbody>
<tr>
    <td className="p-2">1-A</td>
    <td className="p-2">Heater not working</td>
    <td className="p-2">Complete</td>
</tr>
<tr>
    <td className="p-2">3-B</td>
    <td className="p-2">Lights need replacing</td>
    <td className="p-2">Incomplete</td>
</tr>
</tbody>
</table>             
</main>
        
    );
}
