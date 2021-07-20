import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
// import 'Districtedit.css';

const url = "http://localhost:2000/api";


const Districtedit = ({ data: { confirmed, recovered, deaths, district, state,country },handleDistrictChange,district_id}) => {
  const {user} = useContext(UserContext);
  const [editid, seteditid] = useState("");  
  const [editdistrict, seteditdistrict] = useState({
    confirmed: null,
    recovered: null,
    deaths: null,
  });

  const handleEdit = () => {
    seteditid(district_id);
    seteditdistrict({
       confirmed:confirmed,
       recovered:recovered,
       deaths:deaths
    });
}

const update = (e) => {
    e.preventDefault();
    console.log(editdistrict);
    if(editdistrict.confirmed===undefined || editdistrict.recovered===undefined || editdistrict.deaths===undefined){
        alert("All the fields are required");
        return;
    }
    console.log(editdistrict);
    updatedistrict(editdistrict);
    seteditid("");
    seteditdistrict({ confirmed: null, recovered: null, deaths: null})
}

const updatedistrict=async(new_district)=>{
  console.log(new_district);
  console.log(district_id);
  console.log(district);
   const response=await axios.put(`${url}/district/${district_id}`,new_district, user.auth);
   console.log(response.data);
   handleDistrictChange(country,state,district_id);
}

  return (
    <>
    
      {editid!==district_id?
      <>
      {user.isAdmin && <button style={{position:'absolute', left:'1180px', top:'315px'}} className='btnEdit' type='submit' onClick={(e) => handleEdit()}>Edit</button>}
      </>
      :
      <>
      <div style={{marginLeft:'270px'}}>
            <form style={{marginTop:"75px", marginBottom: '100px'}} className='formEdit' style={{width:"300px"}} onSubmit={update}>
        <div className="field inputs">
          <label>Infected</label>
          <input
            type="number"
            //  name="Beds_total"
            className="form-control"
            placeholder="Total Infected"
            value={editdistrict.confirmed}
            onChange={(e) =>
              seteditdistrict({ ...editdistrict, confirmed: e.target.value })
            }
          />
        </div>
        <div className="field inputs">
          <label>Recovered</label>
          <input
            type="number"
            //  name="Beds_total"
            className="form-control"
            placeholder="Total Recovered"
            value={editdistrict.recovered}
            onChange={(e) =>
              seteditdistrict({ ...editdistrict, recovered: e.target.value })
            }
          />
        </div>
        <div className="field inputs" style={{paddingRight:'20px'}}>
          <label>Deaths</label>
          <input
            type="number"
            //  name="Beds_total"
            className="form-control"
            placeholder="Total Deaths"
            value={editdistrict.deaths}
            onChange={(e) =>
              seteditdistrict({ ...editdistrict, deaths: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btnSave">Save</button>
      </form>
      </div>
      </>
    }
    </>
  );
};

export default Districtedit;
