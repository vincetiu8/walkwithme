import {Button, Input, TextField} from "@mui/material";

function Login() {
	return (
		<div className="login">
			<TextField required label="username"/>
			<TextField required label="password"/>
			<Button>Submit</Button>
		</div>
	)
}

export default Login;
