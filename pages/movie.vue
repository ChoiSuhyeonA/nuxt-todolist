<template>
    <v-app>
        <v-container>
            <search-bar></search-bar>
            <movie-list></movie-list>
        </v-container>
    </v-app>
    
</template>

<script lang='ts'>
import SearchBar from '@/components/movie/SearchBar.vue'
import MovieList from '@/components/movie/MovieList.vue'
import Vue from 'vue'

export default Vue.extend({
    components:{
        SearchBar,
        MovieList
    }
})
</script>