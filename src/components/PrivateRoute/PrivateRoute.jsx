import React, { use } from 'react';
import AuthContext from '../../context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading, setLoading} = use(AuthContext);
    const location = useLocation();
    if(loading){
        return <span className='font-semibold text-3xl text-center'>@@@...Loading...@@@</span>
    }
    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to="/login"></Navigate>
};

export default PrivateRoute;