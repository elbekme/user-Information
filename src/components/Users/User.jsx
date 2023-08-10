import React, { useEffect, useState } from 'react'
import './Users.scss'
import axios from 'axios';
import './ResponsiveUsers.scss';

const User = () => {
    const [users,setUsers] = useState([])
    const [errorMsg, setErrorMsg] = useState('');
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
            setUsers(res.data);
            console.log(res.data);
        }).catch((err)=>{
            setErrorMsg(err.message)
        });
    },[]);


  return (
    <div className="main">
         <div className="main-search">
            <div className="search-wrapping">
                <h1>Users Information</h1>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='form-control' placeholder='Searching...' />
            </div>
        </div>
        <div className='main-users'>
        {users.filter((user)=>{
            if(search ===""){
                return user
            }
            else if(user.name.toLowerCase().includes(search.toLowerCase())){
                return user
            }
        })
        .map((user)=>{return( 
                <div class="user-card">
                <div class="user-card-inner">
                    <div class="user-card-front">
                        <h1 key={user.id}>{user.name}</h1>
                        <h2>User : {user.username}</h2>
                    </div>
                    <div class="user-card-back">
                        <h3><b>Email</b> : {user.email}</h3>
                        <h3><b>Address</b> : {user.address.street} {user.address.suite}{user.address.city}{user.address.zipcode}</h3>
                        <h3><b>Phone</b> : {user.phone}</h3>
                        <h3><b>Website</b> : {user.website}</h3>
                        <h3><b>Company</b> : {user.company.name}</h3>
                    </div>
                </div>
            </div>
        )})
        }
        </div>
    </div>
  );
};

export default User