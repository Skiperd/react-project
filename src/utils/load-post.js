export const loadPosts = async () => {
  const resposta = fetch('https://jsonplaceholder.typicode.com/posts')
  const respostaFotos = fetch('https://jsonplaceholder.typicode.com/photos')

  const [post,fotos] = await Promise.all([resposta, respostaFotos])

  const postJson = await post.json();
  const fotosJson = await fotos.json();  

  const fotosEposts = postJson.map((post,index) => {
    return { ...post, cover: fotosJson[index].url }
  })
  return fotosEposts;
}