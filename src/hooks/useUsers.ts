import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";

const useUsers = ()=>{

    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
      const { request, cancel } = userService.getAll<User>();
      request
        .then((res) => {
          setUsers(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          console.log("error");
        });
  
      return () => cancel();
    }, []);
  
    return {users,error,isLoading,setUsers,setError };
}

export default useUsers;