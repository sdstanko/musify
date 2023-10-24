import * as Yup from 'yup'

const AuthSchemaConstructor = (isSignInValue: boolean) => {
	let SignupSchema = Yup.object().shape({
        userName: Yup.string()
            .min(2, 'must be atleast 2 symbols')
            .max(50, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(8, 'must be atleast 8 symbols')
            .max(50, 'Too Long!')
            .required('Required'),
        isSignIn: Yup.boolean(),
        email: Yup.string()
            .email('Invalid email')
            .when('isSignIn', {
                is: false,
                then: () =>
                    isSignInValue === false ? Yup.string().required('Required') : Yup.string(),
                otherwise: () => Yup.string(),
            }),
    });

	return SignupSchema;
}

export default AuthSchemaConstructor;