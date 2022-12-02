import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../store/slices/isLoading.slice';

const Login = () => {

  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submit = (data) => {
    dispatch(setIsLoading(true));
    axios.post("https://e-commerce-api.academlo.tech/api/v1/users/login/", data)
      .then(res => {
        navigate('/')
        localStorage.setItem('token', res.data.data.token)
      })
      .finally(() => dispatch(setIsLoading(false)))
      .catch(error => {
        if(error.response?.status === 404) {
          alert('Credenciales incorrectas')
        } else{
          console.log(error.response.data)
        }
      })
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" {...register("email")}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register("password")}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;