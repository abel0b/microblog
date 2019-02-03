<template>
    <div class="post-item-list">
        <post-item-new
            v-on:new-post="onNewPost"
        ></post-item-new>
        <div class="posts">
            <div
                v-bind:class="{'post-wrapper' : true, current: responses.id === post._id}"
                v-bind:key="post._id"
                v-for="post in posts"
            >
                <post-item
                    v-bind:key="post._id"
                    v-bind:data="post"
                    v-on:click.native="onPostClick(post._id)"
                ></post-item>

                <div
                    class="replies"
                    v-if="responses.id === post._id"
                >
                    <post-item
                        v-for="pst in responses.posts"
                        v-bind:data="pst"
                        v-bind:key="pst._id"
                        response
                    ></post-item>
                    <a
                        v-if="responses.total > responses.page"
                        v-on:click="loadMoreResponses"
                        class="more"
                    >
                        Load more
                    </a>
                </div>
                <post-item-new
                    v-if="post._id === responses.id"
                    v-on:new-post="onNewPost"
                    v-bind:parent="post._id"
                    response
                ></post-item-new>
            </div>
        </div>
        <a
            v-if="total > page"
            v-on:click="loadMore"
            class="more"
        >
            <i class="fas fa-plus"></i> Load more
        </a>
    </div>
</template>

<script>
    import PostItem from './PostItem'
    import PostItemNew from './PostItemNew'
    import api from "../api"

    export default {
        props: {
            author: String
        },
        data() {
            return {
                posts: [],
                responses: {
                    id: "",
                    posts: [],
                    page: 1,
                    total: 1
                },
                page: 1,
                total: 1
            }
        },
        mounted() {
            this.fetchPosts(this.page)
        },
        methods: {
            async fetchPosts(page) {
                let path = `/posts?page=${page}`
                if (this.author) {
                    path = path + `&author=${this.author}`
                }
                const response = await api.get(path)
                
                if (response.ok) {
                    const json = await response.json()
                    this.posts = this.posts.concat(json.data)
                    this.total = json.total
                }
            },
            async onPostClick(id) {
                if (this.responses.id === id) {
                    this.responses.id = ""
                    this.responses.posts = []
                    this.responses.page = 1
                    return
                }
                this.responses.posts = []
                this.responses.page = 1
                this.responses.id = id
                this.fetchResponses(this.responses.page)
            },
            async fetchResponses(page) {
                const path = `/posts?parent=${this.responses.id}&page=${page}&reverse=true`
                const response = await api.get(path)
                if (response.ok) {
                    const json = await response.json()
                    this.responses.posts =  this.responses.posts.concat(json.data)
                    this.responses.total = json.total
                }
            },
            async loadMoreResponses() {
                this.responses.page++
                await this.fetchResponses(this.responses.page)
            },
            async loadMore() {
                this.page++
                await this.fetchPosts(this.page)
            },
            onNewPost(data) {
                if (data.parent) {
                    this.responses.posts.push(data)
                }
                else {
                    this.posts.unshift(data)
                }
            },
            resp(post) {
                if (this.responses.id === post._id) {
                    return this.responses.posts
                }
                return []
            }
        },
        components: {
            PostItem,
            PostItemNew
        }
    }
</script>

<style lang="stylus">
    .post-wrapper.current
        border 2px solid #55f
    .post-wrapper.current .post
        padding-left 13px
        padding-right 13px
    .post-wrapper.current .post:first-child
        padding-top 13px
</style>
