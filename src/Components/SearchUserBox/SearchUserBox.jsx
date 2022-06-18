import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../../Assets/Images/logo.png"
import { useAuth } from '../../features/Auth/authSlice'



const SearchUserBox = ({searchQuery}) => {
 const {allUsers} = useAuth();
 const searchResult = allUsers.users.filter((user)=> user.username.toLowerCase().includes(searchQuery?.toLowerCase().trim()))
  return (
      
   <div>
       {searchResult.map((user)=> 
       <Link to={`/profile/${user.username}`}><div className="lg:flex lg:items-center p-1 pr-16 py-1 lg:justify-center gap-2 hover:bg-[aliceblue] dark:hover:bg-[#5556565c] hover:cursor-pointer w-fit">
       <img
         className="lg:w-7 h-7 rounded-full"
         src={user.img}
         alt="user-img"
       />
       <div className="lg:mr-4">
         <h1 className="lg:text-sm text-white">{user.firstName}</h1>
         <div>
           <small className="mt-[-1.3rem] text-white">{user.username}</small>
         </div>
       </div>
     </div>
     </Link>
       )}
     
   </div>
  )
  
  
}

export default SearchUserBox