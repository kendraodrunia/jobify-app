import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext  } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

// global context and useNavigate later

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};
// if possible prefer local state
// global state

function Register() {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const {
    user,
    isLoading, 
    showAlert,
     displayAlert, 
     registerUser} = useAppContext()
  // global context and useNavigate later

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    const {name, email, password, isMember} = values

    if(!email || !password || (!isMember && !name)){
      displayAlert()
    }

    const currentUser = { name, email, password };
    if (isMember) {
      console.log('already a member');
    } else {
      registerUser(currentUser);
    }
  };

  const toggleMember = () => {
  setValues({ ...values, isMember: !values.isMember });
  }; 

  useEffect(() => {
    console.log("USER",{user})
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);
  console.log("USEROUT",user)
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert/>}
        {!values.isMember && (
            <FormRow
             type='text'
             name='name'
             value={values.name}
             handleChange={handleChange}
            />
        )}
        <FormRow 
         type="email" 
         name='email'
         value={values.email} 
         handleChange={handleChange} 
         />
        <FormRow 
         type="password" 
         name='password'
         value={values.password} 
         handleChange={handleChange} 
         />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
        <p>
            {values.isMember ? 'Not a member yet?' : 'Already a member?'}

            <button type='button' onClick={toggleMember} className='member-btn'>
                {values.isMember ? 'Register' : 'Login'}
            </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register