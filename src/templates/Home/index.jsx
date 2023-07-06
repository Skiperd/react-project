import './style.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    post: [],
    allPosts: [],
    page: 0,
    postsPerPage: 50,
    searchValue: '',
  };

  //RECEBER PARAMETROS, SE O COMPONENTE FOI ATUALIZADO
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const fotosEposts = await loadPosts();
    this.setState({
      post: fotosEposts.slice(page, postsPerPage),
      allPosts: fotosEposts,
    });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  loadMorePost = () => {
    const { page, postsPerPage, allPosts, post } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    post.push(...nextPosts);
    this.setState({ post, page: nextPage });
  };

  render() {
    const { post, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? post.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : post;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Search Value: {searchValue}</h1>}

          <TextInput onChange={this.handleChange} value={searchValue} />
        </div>
        {filteredPosts.length > 0 && <Posts post={filteredPosts} />}
        {filteredPosts.length === 0 && <h2>Não existem post =( </h2>}
        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load more posts"
              onClick={this.loadMorePost}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
