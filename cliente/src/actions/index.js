import axios from "axios";
import Swal from 'sweetalert2';

const server = process.env.REACT_APP_SERVER;

export function getPosts(){
    return async function(dispatch) {
        try {
            const res = await axios.get(`${server}/posts`);
            dispatch({
                type:"GET_POSTS",
                payload: res.data
            });
        } 
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 500',
                text: error.response.data.message || 'The server responded with an error, please try again later, if the error persists, please contact support.'
            })
        }
    }
}

export function getPostById(id){
    return async function(dispatch){
        try{
        const res = await axios.get(`${server}/posts/${id}`);
        return dispatch({
            type: "GET_POST_BY_ID",
            payload: res.data
        })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 404',
                text: error.response.data.message || 'Post info dont found, see if that post id is correct, and try again.'
            })
        }
    }
}

export function createPost(payload){
    return async function(dispatch){
        try{
            const response = await axios.post(`${server}/posts/`, payload)
            return dispatch({
                type: "CREATE_POST",
                payload: response.data
            });
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error 412',
                text: error.response.data.message || 'No se pudo crear el post',
                footer: 'Porfavor verifica que todos lo campos se hayan completado correctamente, y que el titulo no este siendo utilizado, y vuelve a internarlo.'
            })
        }
    }
}

export function subscribe(email){
    return async function (dispatch) {
        try {
            const res = await axios.post(`${server}/subscriber/`, {email: email});
            
            return dispatch({
                type: "SUBSCRIBE",
                payload: res.data
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 500',
                text: error.response.data.message || 'Algo salio mal',
                footer: 'Porfavor vuelva a intentarlo nuevamente mas tarde, o pongase en contacto con soporte.'
            })
        }
    }
}

export function sendNewsletter(title){
    return async function (dispatch) {
        try {
            const res = await axios.post(`${server}/subscriber/newsletter`, {title: title});
            return dispatch({
                type: "SEND_NEWSLETTER",
                payload: res.data
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 500',
                text: error.response.data.message || 'Algo salio mal',
                footer: 'Porfavor vuelva a intentarlo nuevamente mas tarde, o pongase en contacto con soporte.'
            })
        }
    }
}

export function unsubscribe(data){
    return async function (dispatch) {
        try {
            const res = await axios.delete(`${server}/subscriber/${data}`);
            return dispatch({
                type: "UNSUBSCRIBE",
                payload: res.data
            });
        } catch (error) {
            console.log(error.response.data.message || 'Algo salio mal')
        }
    }
}

export function uploadImage(file, imageType, index = null) {
    return async function (dispatch) {
        try {
            if (!file) return;

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = async () => {
                try {
                    const response = await axios.post(`${server}/posts/upload`, { image: reader.result }, {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    dispatch({
                        type: 'UPLOAD_IMAGE_SUCCESS',
                        payload: { imageUrl: response.data.imageUrl, imageType, index }
                    });

                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al subir la imagen',
                        text: error.response?.data?.message || 'No se pudo subir la imagen',
                        footer: 'Verifica el archivo e intenta de nuevo.'
                    });
                }
            };
        } catch (error) {
            console.error('Error en la conversión de imagen:', error);
        }
    };
}

export function updatePost(id, updatedPost) {
    return async function (dispatch) {
      try {
        const response = await axios.put(`${server}/posts/${id}`, updatedPost);
        if (response.status >= 200 && response.status < 400) {
            await dispatch({
                type: 'POST_UPDATED',
                payload: response.data,
              });
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: 'Post updated successfully.',
              });
        }        
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response.data.message || 'Hubo un error al actualizar el TODO.',
        });
      }
    };
}

export function removePost(id){
    return async function(dispatch){
        try{        
        const response = await axios.delete(`${server}/posts/${id}`);
        return dispatch({
            type: "REMOVE_POST",
            payload: response.data
        })}
        catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error 412',
                text: error.response.data.message || 'Cant delete Post',
                footer: 'Check if Post id is correct, and try again'
            })
        }
    }
}

export function clearDetail(){
    return {
        type: "CLEAR_DETAIL"
    }
}

export function clearImageSuccess(){
    return {
        type: "CLEAR_IMAGE_SUCCESS"
    }
}