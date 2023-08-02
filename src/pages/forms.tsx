import { FieldErrors, useForm } from 'react-hook-form'

interface LoginForm {
	username: string
	password: string
	email: string
}

export default function Forms() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginForm>({ mode: 'onBlur' })

	const onValid = (data: LoginForm) => {
		console.log('hi')
	}

	const onInValid = (errors: FieldErrors) => {
		console.log(errors)
	}

	return (
		<form onSubmit={handleSubmit(onValid, onInValid)}>
			<input
				{...register('username', {
					required: 'Username is Required',
					minLength: { message: 'more then 6', value: 6 }
				})}
				type="text"
				placeholder="Username"
			/>

			<input
				{...register('email', {
					required: 'Email is Required',
					validate: {
						notGmail: (value) =>
							!value.includes('@gmail.com') ? '' : 'Gmail is not allowed'
					}
				})}
				type="email"
				placeholder="Email"
			/>
			{errors.email?.message}
			<input
				{...register('password', { required: 'PW is Required' })}
				type="password"
				placeholder="Password"
			/>
			<input type="submit" value="Create Account" />
		</form>
	)
}
