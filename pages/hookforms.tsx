import { useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'

interface LoginForm {
	username: string
	email: string
	password: string
}

export default function Forms() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginForm>()

	const onValid = (data: LoginForm) => {
		console.log('great!')
	}

	const onInvalid = (errors: FieldErrors) => {
		console.log(errors)
	}

	return (
		<form onSubmit={handleSubmit(onValid, onInvalid)}>
			<input
				{...register('username', { required: 'required!' })}
				type="text"
				placeholder="Username"
				minLength={5}
			/>
			<input
				type="email"
				{...register('email', { required: 'required!' })}
				placeholder="Email"
			/>

			<input
				type="password"
				{...register('password', { required: 'required!' })}
				placeholder="Password"
			/>
			<input type="submit" value="Create Account" />
		</form>
	)
}
