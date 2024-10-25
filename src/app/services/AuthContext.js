import React, { createContext, useState, useCallback, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import statement
import { useNavigate } from "react-router-dom";

import { environment } from "../../environments/environment";
import { useGoogleLogin } from "@react-oauth/google";

// import { useGoogleLogin } from '@react-oauth/google';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(
    () => JSON.parse(localStorage.getItem("authTokens")) || null
  );
  const [user, setUser] = useState(() =>
    authTokens ? jwtDecode(authTokens.access) : null
  );
  const [role, setRole] = useState(localStorage.getItem("userRole") || null);
  const [userLoginData, setUserLoginData] = useState(
    localStorage.getItem("userLoginDetails") || null
  );
  const history = useNavigate();
  const baseUrl = environment.API_ENDPOINT;

  const loginUser = useCallback(
    async (loginData) => {
      try {
        const response = await fetch(`${baseUrl}/create_token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const res= await response.json()
            // throw new Error("Failed to login");
            return res;
        }

        const data = await response.json();
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));

        const roleresponse = await fetch(`${baseUrl}/get_user_role`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        });

        const roledata = await roleresponse.json();
        const userRoleName = roledata?.data[0]?.role_name;
        setRole(userRoleName);
        localStorage.setItem("userRole", userRoleName);

        if (userRoleName !== "admin") {
          const userresponse = await fetch(`${baseUrl}/get_customer`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access}`,
            },
          });

          if (!userresponse.ok) {
            throw new Error("Failed to fetch data");
          }
          const userdata = await userresponse.json();
          setUserLoginData(userdata.data.customer_name);
          localStorage.setItem("userLoginDetails", userdata.data.customer_name);
        } else {
          history("/adm");
        }
        return response
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [baseUrl, history]
  );

  const google_login = useGoogleLogin({
    onSuccess: async (tokenresponse) => {
      try {
        const tokendata = tokenresponse;
        const tokenres = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokendata.access_token}`,
            },
          }
        );
        const userInfo = await tokenres.json();

        const response = await fetch(`${baseUrl}/signinwith_google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({'username': e?.target.username.value, 'password': e?.target.password.value})
          body: JSON.stringify({
            sub: userInfo.sub,
            name: userInfo.name,
            email: userInfo.email,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to login");
        }

        const data = await response.json();
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));

        const roleresponse = await fetch(`${baseUrl}/get_user_role`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.access}`,
          },
        });

        const roledata = await roleresponse.json();
        const userRoleName = roledata?.data[0]?.role_name;
        setRole(userRoleName);
        localStorage.setItem("userRole", userRoleName);

        if (userRoleName !== "admin") {
          const userresponse = await fetch(`${baseUrl}/get_customer`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.access}`,
            },
          });

          if (!userresponse.ok) {
            throw new Error("Failed to fetch data");
          }
          const userdata = await userresponse.json();
          setUserLoginData(userdata.data.customer_name);
          localStorage.setItem("userLoginDetails", userdata.data.customer_name);
        } else {
          history("/adm");
        }
        if (response.ok) {
          const redirectUrl = localStorage.getItem("redirectAfterLogin");
          if (redirectUrl) {
            history(redirectUrl);
            localStorage.removeItem("redirectAfterLogin");
          } else {
            history("/");
          }
        }
        return response;
      } catch (error) {
        console.log("error", error);
        return error;
      }
    },
  });

  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userLoginDetails");
    history("/");
  }, [history]);

  const getData = async (urlpath) => {
    try {
      const response = await fetch(`${baseUrl}/${urlpath}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const getProductsData = async (urlpath) => {
    try {
      const response = await fetch(`${baseUrl}/${urlpath}`, {
        method: "GET",
        // headers: {
        //     Authorization: `Bearer ${authTokens.access}`
        // }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const insert = async (Data, urlpath, History = null) => {
    try {
      const response = await fetch(`${baseUrl}/${urlpath}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });

      if (!response.ok) {
        throw new Error("Failed to create ");
      }
      history(History);
      return response;
    } catch (error) {
      console.error(" creation failed:", error);
    }
  };

  const contact = async (Data, urlpath, History = null) => {
    try {
      const response = await fetch(`${baseUrl}/${urlpath}`, {
        method: "POST",
        headers: {
          //    Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });

      if (!response.ok) {
        throw new Error("Failed to create ");
      }
      history(History);
      return response;
    } catch (error) {
      console.error(" creation failed:", error);
    }
  };

  const update = async (Data, urlpath, History = null) => {
    try {
      const response = await fetch(`${baseUrl}/${urlpath}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      if (!response.ok) {
        throw new Error("Failed to  update");
      }

      return response;
      // history(History);
    } catch (error) {
      console.error(" update failed:", error);
    }
  };

  const Delete = async (Data, urlpath, History = null) => {
    try {
      const response = await fetch(`${baseUrl}/${urlpath}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });

      if (!response.ok) {
        throw new Error("Failed to delete ");
      }
      history(History);
      return response;
    } catch (error) {
      console.error("Delete operation failed:", error);
    }
  };

  const DeleteAll = async (urlpath, History = null) => {
    try {
      const response = await fetch(`${baseUrl}/${urlpath}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete ");
      }
      history(History);
    } catch (error) {
      console.error("Delete operation failed:", error);
    }
  };

  const Fetch = async (Data, urlpath) => {
    try {
      const response = await fetch(`${baseUrl}/${urlpath}`, {
        method: "POST",
        headers: {
          Authorization: authTokens.access && `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("fetch data failed:", error);
    }
  };

  const FetchProductsData = async (Data, urlpath) => {
    try {
      const response = await fetch(`${baseUrl}/${urlpath}`, {
        method: "POST",
        headers: {
          // Authorization : authTokens.access && `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("fetch data failed:", error);
    }
  };

  const imageUpload = async (Data, urlpath) => {
    try {
      const response = await fetch(`${baseUrl}/${urlpath}`, {
        method: "POST",
        // headers: {
        //     Authorization: `Bearer ${authTokens.access}`,
        //     'Content-Type': 'application/json'
        // },
        body: Data,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Upload image failed:", error);
    }
  };

  const ImageFetch = async (Data, urlpath) => {
    try {
      const response = await fetch(`${baseUrl}/${urlpath}`, {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });

      const data = await response.blob();
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return data;
    } catch (error) {
      console.error("fetch data failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        authTokens,
        userLoginData,
        contact,
        google_login,
        loginUser,
        FetchProductsData,
        logoutUser,
        getProductsData,
        getData,
        insert,
        Delete,
        Fetch,
        update,
        DeleteAll,
        imageUpload,
        ImageFetch,
        setUserLoginData
      }}
    >
      {" "}
      {/* Provide getData in context value */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
