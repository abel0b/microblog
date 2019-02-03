<template lang="pug">
.container
    .cover
        .cover-image(v-html="identicon")
        .cover-text
            h1
                |{{user.name}}
                span.username @{{user.username}}
            p {{user.bio}}
    post-item-list(
        v-if="!user.processing"
        v-bind:author="user._id"
    )

</template>
<script>
import jdenticon from "jdenticon"
import api from "../api"
import PostItemList from "./PostItemList"
import sha from "sha.js"

export default {
    data() {
        return {
            user: {
                _id: "",
                name: "",
                username: "",
                bio: "",
                processing: true
            }
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
    },
    methods: {
        async fetchUser() {
            const response = await api.get(`/users/${this.username}`)
            if (response.ok) {
                const data = await response.json()
                this.user._id = data._id
                this.user.name = data.name
                this.user.username = data.username
                this.user.bio = data.bio
                this.user.processing = false
            }
        }
    },
    components: {
        PostItemList
    }
}
</script>

<style lang="stylus">
.cover
    padding 15px
    display flex
    align-items flex-start
.cover .cover-image
    margin-right 15px
    background #dedede
    border-radius 3px
.cover .cover-text
    display flex
    flex-direction column
.cover .cover-text h1
    margin 0
    font-size 20px
    line-height 30px
.cover .username
    color #777
    font-size 0.8em
    margin-left 5px
.cover .cover-text p
    margin 0
    color #464646
    font-style italic
</style>
