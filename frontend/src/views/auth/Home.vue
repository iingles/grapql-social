<template>
    <div class="container">
        <div class="col 3-col">
            <News />
        </div>
        <div class="col 3-col middle-col">
            <Feed />
        </div>
        <div class="col 3-col">
            <Recent />
        </div>
    </div>
</template>

<script>
import News from '../../components/News'
import Feed from '../../components/Feed'
import Recent from '../../components/Recent'

export default {
  components: {
    News,
    Feed,
    Recent
  }
}
</script>

<style scoped>
    .container {
        flex-direction: column;
    }

    @media screen and (min-width: 1000px) {
        .container {
            flex-direction: row;
            justify-content: space-around;
        }

        .middle-col {
            width: 33%;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
        }
    }

</style>
