import { SideBar } from "../common/sidebar/SideBar";
import { Header } from "../common/header/Header";
import classes from './manageUser.module.css'
import React, { useEffect, useState} from "react"
import axios from "axios";
import UserCard from "./usercard/UserCard";
import AdminCard from "./adminusercard/AdminCard"
const ManageUser = () => {

    const serverUrl =  process.env.REACT_APP_SERVER_URL
    const [users, setUsers] = useState([])
    const [normalUsers, setNormalUsers] = useState([])
    const [adminUsers, setAdminUsers] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [bannedAdminUsers, setBannedAdminUsers] = useState([]);
    const [bannedNormalUsers, setBannedNormalUsers] = useState([]);
    useEffect(() => {       
        getUsers()
    }, []);

    const getUsers = async () => {
            try {  
                const loginData = JSON.parse(sessionStorage.getItem('userData'))

                const usersData = await axios.get(`${serverUrl}/api/adminandnormalusers`);
                console.log("usersData: ", usersData);
                setUsers(usersData.data);
                // Separate admin and normal users into different arrays
                const adminUsers = usersData.data.filter(user => user.admin === 1 && user.firstName!=='Admin' && user.username !==loginData['username']); //dun include root admin
                const normalUsers = usersData.data.filter(user => user.admin !== 1);
                // Set state for admin and normal users
                setAdminUsers(adminUsers);
                setNormalUsers(normalUsers);
            } catch (error) {
                console.error('Error fetching Users: ', error);
            }
    };


    const handleAdminBan = async (username) => {
        try {
          await axios.delete(`${serverUrl}/api/username/${username}`);
          console.log("User banned successfully.");
          setBannedAdminUsers([...bannedAdminUsers, username]); 

        } catch (error) {
          console.error("Error banning user:", error);
        }
      };

    const handleNormalBan = async (username) => {
        try {
            await axios.delete(`${serverUrl}/api/username/${username}`);
            console.log("User banned successfully.");
            setBannedNormalUsers([...bannedNormalUsers, username]); 

        } catch (error) {
            console.error("Error banning user:", error);
        }
    };
    const handleToggle = () => {
        setIsAdmin(!isAdmin); // Toggle the value of isAdmin
    };

    return ( 
        <div className={classes["grid-container"]}>
            <Header/>
            <SideBar/>
            <main className={classes["content"]}>
                <div className={classes["toggle-container"]}>
                    <div>user</div>
                    <label className={classes["switch"]} htmlFor="toggle">
                        <input id="toggle" type="checkbox" checked={isAdmin} onChange={handleToggle} />
                        <span className={classes["slider"]}></span>
                    </label>
                    <div>admin</div>
                </div>

                { isAdmin 
                ? adminUsers.map(adminuser => (
                        <AdminCard
                            key={adminuser.userId}
                            {...adminuser}
                            isBanned={bannedAdminUsers.includes(adminuser.username)} 
                            handleBan={() => handleAdminBan(adminuser.username)}
                        />
                    ))
                : normalUsers.map(user => (
                    <UserCard
                        key={user.userId}
                        {...user}
                        isBanned={bannedNormalUsers.includes(user.username)} 
                        handleBan={() => handleNormalBan(user.username)}

                    />
                ))
                }
            </main>
        </div>
     );
}
 
export default ManageUser;