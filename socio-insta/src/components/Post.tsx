import "./Post.css";
import { Avatar } from "@material-ui/core";
import { IPost } from "../interfaces/IPost";

function Post(props: IPost) {
  return (
    <div className="post">
      {/* header -> avatar + username*/}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={props.username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{props.username}</h3>
      </div>
      {/* image */}
      <img className="post__image" src={props.imageUrl} alt="image"></img>

      {/* username + caption */}
      <h5 className="post__text">
        <strong>{props.username}: </strong>
        {props.caption}
      </h5>
    </div>
  );
}

export default Post;
