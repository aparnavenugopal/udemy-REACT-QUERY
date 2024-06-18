import { fetchComments } from "./api";
import { useQuery } from "@tanstack/react-query";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation }) {
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
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button> <button>Update title</button>
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
