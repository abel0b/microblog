<template>
    <section class="container">
        <post-item-new
            v-on:new-post="onNewPost"
        ></post-item-new>
        <div class="posts">
            <template v-for="post in posts">
                <post-item
                    v-bind:data="post"
                    v-bind:key="post._id"
                    v-on:click.native="onPostClick(post._id)"
                ></post-item>
                <template v-if="responses.id === post._id" >
                    <post-item
                        v-for="pst in responses.posts"
                        v-bind:data="pst"
                        v-bind:key="pst._id"
                        response
                    ></post-item>
                </template>
                <a
                    v-bind:key="`more-${post._id}`"
                    v-if="(responses.id === post._id) && (responses.total > responses.page)"
                    v-on:click="loadMoreResponses"
                    class="more"
                >
                    Load more
                </a>
                <post-item-new
                    v-bind:key="`reply-${post._id}`"
                    v-if="post._id === responses.id"
                    v-on:new-post="onNewPost"
                    v-bind:parent="post._id"
                    response
                ></post-item-new>
            </template>
        </div>
        <a
            v-if="total > page"
            v-on:click="loadMore"
            class="more"
        >
            <i class="fas fa-plus"></i> Load more
        </a>
    </section>
</template>

<script>
    import PostItem from './PostItem'
    import PostItemNew from './PostItemNew'
    import api from "../api"

    export default {
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
                const response = await api.get(`/posts?page=${page}`)
                if (response.ok) {
                    const json = await response.json()
                    this.posts = this.posts.concat(json.data.reverse())
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
                const response = await api.get(`/posts?parent=${this.responses.id}&page=${page}`)
                if (response.ok) {
                    const json = await response.json()
                    this.responses.posts =  this.responses.posts.concat(json.data)
                    this.responses.total = json.total
                }
            },
            async loadMore() {
                this.page++
                await this.fetchPosts(this.page)
            },
            async loadMoreResponses() {
                this.responses.page++
                await this.fetchResponses(this.responses.page)
                console.log('ok')
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
