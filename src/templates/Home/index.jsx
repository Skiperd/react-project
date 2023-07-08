import './style.css';
import { Component, useEffect, useState, useCallback } from 'react';
import { loadPosts } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [post, setPost] = useState([]);
  const [allPosts, setallPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage, setpostsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : post;

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const fotosEposts = await loadPosts();

    setPost(fotosEposts.slice(page, postsPerPage));
    setallPosts(fotosEposts);
  }, []);

  useEffect(() => {
    console.log('OI');
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePost = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    post.push(...nextPosts);

    setPost(post);
    setPage(nextPage);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search Value: {searchValue}</h1>}

        <TextInput onChange={handleChange} value={searchValue} />
      </div>
      {filteredPosts.length > 0 && <Posts post={filteredPosts} />}
      {filteredPosts.length === 0 && <h2>Não existem post =( </h2>}
      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePost}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

export default Home;
