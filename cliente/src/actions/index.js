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
    return async function(){
        try{
            const response = await axios.post(`${server}/posts/`, payload)
            return response
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error 412',
                text: error.response.data.message || 'Cant create post',
                footer: 'Please verify that all required fields have been completed correctly, that the title has not yet been used, and try again.'
            })
        }
    }
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