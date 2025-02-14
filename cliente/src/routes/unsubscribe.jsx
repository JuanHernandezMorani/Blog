import React, { useState, useEffect } from 'react';
import { unsubscribe } from '../actions';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Unsubscribe() {
    const { uuid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [send, setSend] = useState(true);

    useEffect(() => {
        if (uuid && send) {
            dispatch(unsubscribe(uuid));
            setTimeout(() => {
                setSend(false);
                navigate('/');
            }, 500);
        }
    }, [uuid, send, dispatch,navigate]);

    return (<div className="loading">Procesando&#8230;</div>);
}