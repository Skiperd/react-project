import { PostCard } from '../PostCard';
import './style.css';

export const Posts = ({ post }) => {
  return (
    <div className="posts">
      {post.map((item) => (
        <PostCard
          key={item.id}
          title={item.title}
          body={item.body}
          id={item.id}
          cover={item.cover}
          // item={item}
        />
      ))}
    </div>
  );
};
