import { fetchComments } from "./api";
import { useQuery } from "@tanstack/react-query";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation , updateMutation }) {
  // replace with useQuery
  const { data, isLoading, isError, error} = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => fetchComments(post.id),
  });

  if(isLoading){
    return <h3>loading...</h3>
  }

  if(isError){
    return(
      <>
       <h3>Error</h3>
       <p>{error.toString()}</p>
      </>
    )
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button> 
        {deleteMutation.isPending && (
          <p className="loading">deleting the post</p>
        )}
        {deleteMutation.isError && (
          <p className="error">error deleting the post</p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">post was deleted</p>
        )}
      </div>
      <div>
        <button onClick={() => updateMutation.mutate(post.id)}>Update Title</button>
        {updateMutation.isPending && (
          <p className="loading">updating the title of the post</p>
        )}
        {updateMutation.isError && (
          <p className="error">error in updation</p>
        )}
        {updateMutation.isSuccess && (
          <p className="success">post updated!!!</p>
        )}
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
