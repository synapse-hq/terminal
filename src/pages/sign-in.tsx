import FormTemplate from "@/components/FormTemplate";
import { FormikValues } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios"

const domain = "https://terminal.diegohernandezramirez.dev/api"

const SignIn = () => {
  const router = useRouter();
  // const sessionContext = useContext(SessionContext)
    const checkUser = async() => {
    try {
      const user: any = await axios.get(domain + "/users/session_test")
      const username = user.data.username
      router.push("/dashboard/" + username)
    } catch(err) {
      return
    }
  } 
  const validateUsername = (value: string): string | undefined => {
    let error;
    if (!value) {
      error = "Username is required";
    }

    return error;
  };

  const validatePassword = (value: string): string | undefined => {
    let error;
    if (!value) {
      error = "Password is required";
    }

    return error;
  };

  const handleFormSubmit = (
    values: FormikValues,
    actions: FormikValues
  ): void => {
    actions.setSubmitting(false);

    let body = JSON.stringify({
      username: values.username,
      passwordHash: values.password,
    });
    fetch("https://terminal.diegohernandezramirez.dev/api/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    })
      .then((response) => {
        return response.json();
      })
      .then((data: any) => {
        let error = data.error;
        if (error) {
          console.log("error", error)

          let lowercasedError = error.toLowerCase();

          if (lowercasedError.includes("user")) {
            return actions.setFieldError("username", error, false);
          } else if (lowercasedError.includes("password")) {
            return actions.setFieldError("password", error, false);
          } else {
            return;
          }
        }

        router.push(`/dashboard/${data.username}`);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <FormTemplate
      title="Sign In"
      validateUsername={validateUsername}
      validatePassword={validatePassword}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default SignIn;
