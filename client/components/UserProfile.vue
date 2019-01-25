<template lang="pug">
.container
    .cover
        .cover-image(v-html="identicon")
        .cover-text
            h1 {{user.name}}
            span.username @{{user.username}}
    .posts
        template(v-for="post in posts")
            post-item(
                v-bind:data="post"
                v-bind:key="post._id"
                v-on:click.native="fetchResponses(post._id)"
            )
            post-item(
                v-for="pst in resp(post)"
                v-bind:data="pst"
                v-bind:key="pst._id"
                response=""
            )
            post-item-new(
                v-bind:key="`reply-${post._id}`"
                v-if="post._id === responses.id"
                v-on:new-post="onNewPost"
                v-bind:parent="post._id"
                response=""
            )
    a.more(
        v-if="total > page"
        v-on:click="loadMore"
    )
        |Load more

</template>
<script>
import jdenticon from "jdenticon"
import api from "../api"
import PostItemNew from "./PostItemNew"
import PostItem from "./PostItem"
import sha from "sha.js"

export default {
    data() {
        return {
            user: {
                _id: "",
                name: "",
                username: "",
            },
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
    computed: {
        identicon() {
            return jdenticon.toSvg(sha("sha256").update(this.user.username).digest("hex"), 70)
        },
        username() {
            return this.$route.params.username
        }
    },
    async mounted() {
        await this.fetchUser()
        await this.fetchPosts(1)
    },
    methods: {
        async fetchUser() {
            const response = await api.get(`/users/${this.username}`)
            if (response.ok) {
                const data = await response.json()
                this.user = data
            }
        },
        async fetchPosts(page) {
            const response = await api.get(`/posts?page=${page}&author=${this.user._id}`)
            if (response.ok) {
                const json = await response.json()
                this.posts = this.posts.concat(json.data)
            }
        },
        async fetchResponses(id) {
            if (this.responses.id === id) {
                this.responses.id = ""
                return
            }
            this.responses.id = id
            const response = await api.get(`/posts?parent=${id}`)
            if (response.ok) {
                const json = await response.json()
                this.responses.posts =  json.data
            }
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
            if (this.responses.id == post._id) {
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
.cover
    padding 15px
    display flex
    align-items center
.cover .cover-image
    margin-right 15px
    background #dedede
    border-radius 3px
.cover .cover-text
    display flex
    flex-direction column
.cover .cover-text h1
    margin 0
    font-size 28px
    line-height 45px
.cover .username

    color #777
    font-size 16px
    line-height 25px
</style>
