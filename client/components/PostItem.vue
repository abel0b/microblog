<template>
    <div class="post" v-bind:class="{response}">
        <router-link v-bind:to="{name: 'user', params: {username: data.author.username}}" class="post-image" v-html="identicon"></router-link>
        <div class="post-content">
            <div class="post-meta">
                <router-link v-bind:to="{name: 'user', params: {username: data.author.username}}" class="display-username">{{ data.author.name }}</router-link>
                <a class="username">@{{ data.author.username }}</a>
                <div class="fg1"></div>
                <div class="date">{{ data.created_at | moment("lll") }}</div>
            </div>
            <p>{{ data.body }}</p>
            <div class="post-info">
                <span v-if="data.nbresponses">
                    <message-reply-text-icon size="16"></message-reply-text-icon>
                    {{data.nbresponses}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import sha from "sha.js"
import jdenticon from "jdenticon"
import MessageReplyTextIcon from "vue-material-design-icons/MessageReplyText"

export default {
    props: {
        data: {
            _id: String,
            author: {
                _id: String,
                name: String,
                username: String
            },
            created_at: String,
            body: String
        },
        response: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        identicon() {
            return jdenticon.toSvg(sha('sha256').update(this.data.author._id).digest("hex"), 50)
        }
    },
    components: {
        MessageReplyTextIcon
    }
}
</script>

<style lang="stylus">

.post {
    position: relative;
    border: 1px solid #f8f8f8;
    background: #fefefe;
    padding: 15px 15px 10px;
    display: flex;
}

.post .display-username:hover {
    text-decoration underline
}

.post:nth-child(even) {
    background: #fcfcfc;
}

.post:hover {
    background: #fff;
}

.post p {
    margin: 0;
}

.post-image {
    height: 50px;
    width: 50px;
    flex-shrink: 0;
    background: #343434;
    border-radius: 3px;
}

.post-content {
    padding-left: 15px;
    flex-grow: 1;
}
.post-info
    color #777
    justify-content flex-end
    padding-top 10px
    padding-right 10px
    font-size .9em
    display flex
    opacity 0
    height 1.3em

.post:hover .post-info
    opacity 1

.post-info span .material-design-icon
    height 1.3em
    width 1.3em
    margin-right .4em
.post:hover
    cursor pointer
.post-info span
    display flex
.post.response
    background #f0f0f0
    border-color #eaeaea
</style>
