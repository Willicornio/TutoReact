import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutation';

export const Comentarios = ({comments, crearComment}) => (
    <div className="card p-2 m-2">
         <div>
            {comments.map(comment=>(
            <div className="card p-2 mt-2" key = {comment.id}>{comment.content}</div>

            ))}
         </div>
         <form onSubmit={crearComment}>
            <input type="text" placeholder="comment" name="comment" defaultValue="" className="form-control"/>
            <button type="submit" className="form-control mt-2 btn btn-primary"> Botón de la creacion </button>
    </form>
    </div>
)
const mapStateToProps = (state, ownProps) => {

    let id = ownProps.id;
    //  let comments = state.comments.filter(comment=>comment.task === id )

     let comments = [];
     var i;
     for (i = 0; i < state.comments.length; i++) {

        let statecomment  = state.comments[i];
        var j;
        for (j = 0; j < statecomment.length; j++) {

            let propsComment = statecomment[j];
            if (propsComment.task == id)
            {
                comments.push(propsComment);
            }
        }
     }

    return {

        comments
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {crearComment(e){
        e.preventDefault();
        let comment = e.target[`comment`].value;
        dispatch(mutations.requestCommentCreation(comment, ownProps.id));

   }
}
   
    }



export const ConnectComentario = connect(mapStateToProps, mapDispatchToProps)(Comentarios);