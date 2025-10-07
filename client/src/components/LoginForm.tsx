import {useContext, useState} from "react";
import {Context} from "../main.tsx";
import {observer} from "mobx-react-lite";

function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context)
    return (
        <div>
            <input type='text' value={email} placeholder='Email'
                   onChange={(e) => setEmail(e.target.value)} />
            <input type='text' value={password} placeholder='Password'
                   onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(email, password)}>Register</button>
        </div>
    );
}

export default observer(LoginForm);