import LoginForm from "./components/LoginForm.tsx";
import {useContext, useEffect, useState} from "react";
import {Context} from "./main.tsx";
import {observer} from "mobx-react-lite";
import type {IUser} from "./models/response/IUser.ts";
import UserService from "./services/UserService.ts";

const App = () => {

    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if(localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, []);

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers()
            setUsers(response.data)
        }catch (e) {
            console.log(e)
        }
    }

    if(store.isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if(!store.isAuth) {
        return (
            <div>
                <LoginForm/>
                <button onClick={getUsers}>To get users</button>
            </div>
        )
    }

    return (
        <div>
            <h1>{store.isAuth ? "User is authorized" : "User is not authorized"}</h1>
            <h1>{store.user.isActivated ? "" : "Confirm your email"}</h1>
            <button onClick={() => store.logout()}>Logout</button>
            <div>
                <button onClick={getUsers}>To get users</button>
            </div>
            {users.map(user =>
                <div key={user.id}>
                    {user.email}
                </div>
            )}
        </div>
    )
}
export default observer(App);