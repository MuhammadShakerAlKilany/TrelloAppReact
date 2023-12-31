"use client";
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import { useApi } from "../hooks/api";
import { Fragment } from "react";
import { tokenContext } from '../context/tokenContext'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate ,Link} from "react-router-dom";



export default function Login() {
  const api = useApi();
  const router = useNavigate() 
  const [isLoading, setLoading] = useState(false);
  let { setToken } = useContext(tokenContext);
  const googleLogin = async (data) => {
    try {
      const res = await api.post("users/google_login", data);
      console.log(res.data);
    

        localStorage?.setItem("token", res.data.token)
        localStorage?.setItem("data", JSON.stringify(res.data.data))
      
      setToken(res.data.token);
      router("/user",{ replace: true })
      console.log("user")

    } catch (error) {
      console.log(error);
    }
  }

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .min(5, "email min is 5")
      .max(100, "email max is 100")
      .email("email not acceptable")
      .matches(
        /^.+@.+\.(com|net|lol)$/,
        "Not accepted email should end with com or net or lol"
      )
      .required("email is required"),
    password: Yup.string()
      .min(8, "password min is 8")
      .max(100, "password max is 100")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      )
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (data) => {
      try {
        setLoading(true);
        const res = await api.post("users/login", data);
        if(res.data.message== 'password is rong'){
          // PasswordErr.innerText = 'password is rong'
        }
        console.log(res.data);
        setLoading(false);
        if(typeof window !== "undefined"){

          localStorage?.setItem("token", res.data.token)
          localStorage?.setItem("data", JSON.stringify(res.data.data))
        }
        setToken(res.data.token);
        router('/user',{ replace: true });
      } catch (error) {
        
        console.log(error);
        setLoading(false);

      }
    },
  });

  useEffect(() => {
    formik.touched.email = false;
    formik.touched.password = false;
  }, []);

  return (
    <Fragment>
      <div className={styles.body}>
        <div className="container">
          <div className={styles.center}>
            <h1 className="mt-2">Login</h1>
            <form
              className={styles.newForm}
              onSubmit={(e) => {
                console.log(formik.touched);
                formik.handleSubmit(e);
              }}
            >
              <div className={styles.txt_field}>
                <input
                  type="email"
                  className=""
                  id="exampleInputEmail1"
                  name="email"
                  aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onFocus={() => {
                    formik.touched.email = true;
                  }}
                />
                <span></span>
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <div>
                  {formik.touched?.email && formik.errors?.email && (
                    <p className="text-danger">{formik.errors?.email}</p>
                  )}
                </div>
              </div>
              <div className={styles.txt_field}>
                <input
                  type="password"
                  className=""
                  id="exampleInputPassword1"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onFocus={() => {
                    formik.touched.password = true;
                  }}
                />
                <span></span>
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div>
                  <p className="text-danger" id="PasswordErr"></p>
                  {formik.touched?.password && <p className="text-danger"> {formik.errors?.password}</p>}
                </div>
              </div>
              <div>
                <button
                  name="submit"
                  type="Submit"
                  className={styles.sub}
                >{isLoading? <i className='fa fa-spin fa-spinner'></i>:<><i className='fa fa-edit'></i>Login</>}</button>
              </div>
              <div>
                <div className={styles.signup_link}>
                  Not a Member ? <Link href="/signup">Signup</Link>
                </div>
                <GoogleLogin
                  onSuccess={credentialResponse => {

                    console.log(credentialResponse);
                    googleLogin(credentialResponse)
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
