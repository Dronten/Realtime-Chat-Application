import axios from 'axios'
import React, { useEffect } from 'react'
import { setOtherUsers } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const useGetOtherUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`https://realtime-chat-application-8e59.onrender.com/api/v1/user/`);
                // store
                dispatch(setOtherUsers(res.data));

            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [])
}

export default useGetOtherUsers