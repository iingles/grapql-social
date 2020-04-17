<template>
    <div>
        <h3>Today's Headlines</h3>
        <p>Powered by <b-btn class="pt-0 pl-0 pr-0 pb-0 mt-0 ml-0 mr-0 mb-0 newsapi-link" variant="link" href="https://newsapi.org/">Newsapi</b-btn></p>
        <div class="card mb-2 pl-2 pr-2 pt-2 pb-2" v-for="article in news.articles" :key="article.id">
            <a :href="article.url">
                <img :src="article.urlToImage">
                <p>{{ article.title }}</p>
            </a>
        </div>
    </div>
</template>

<script>
export default {
  data: () => {
    return {
      news: {}
    }
  },
  created () {
    const vm = this

    const url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'pagesize=10&' +
          'apiKey=57c90487788b47509fb1288a7d2f6429'
    const req = new Request(url)
    fetch(req)
      .then(function (response) {
        return response.json()
      })
      .then(resData => {
        vm.news = resData
      })
  }
}
</script>

<style lang="less" scoped>

.newsapi-link {
  color: blue;
}

a {
    color: #000;

    img {
        max-width: 100%;
    }

}

</style>
