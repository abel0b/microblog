<template>
    <form v-if="logged" v-bind:class="{response}" v-on:submit.prevent="sendMessage" class="post">
        <textarea placeholder="Your message?" v-on:focus="edit" v-click-outside="editStop" name="post" v-model="message"></textarea>
        <div v-if="showActions" class="form-actions">
            <button>{{response? 'Post a reply' : 'Post'}}</button>
        </div>
    </form>
</template>

<script>
import api from "../api"
    export default {
        props: {
            parent: {
                type: String,
                default: ""
            },
            response: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                showActions: this.response,
                message: "",
            }
        },
        computed: {
            logged() {
                return this.$store.state.user.logged
            }
        },
        mounted: function() {

        },
        methods: {
            edit() {
                this.showActions = true
            },
            editStop() {
                if (this.message.length === 0 && !this.response)
                    this.showActions = false
            },
            async sendMessage() {
                const response = await api.post('/posts', {
                    body: this.message,
                    parent: this.parent
                })
                if (response.ok) {
                    const data = await response.json()
                    this.$emit('new-post', data)
                    this.message = ""
                }
                this.editStop()
            }
        }
    }
</script>
<style lang="stylus">
form.post
    padding 15px
</style>
