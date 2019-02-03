<template lang="pug">
.container
    h1.title Settings
    form(v-on:submit.prevent="updateSettings")
        .field
            label(for="username") Username
            input#username(
                type="text"
                name="username"
                v-model="data.username"
            )
        .field
            label(for="email") E-Mail Address
            input#email(
                type="text"
                name="email"
                v-model="data.email"
            )
        .field
            label(for="bio") Bio
            textarea#email(
                type="text"
                name="bio"
                v-model="data.bio"
            )
        .error(v-if="error") {{error.message}}
        .field
            button.button(type="submit")
                | Sauvegarder
</template>

<script>
import api from "../api"
export default {
    data() {
        return {
            data: {
                username: this.$store.state.user.data.username,
                email: this.$store.state.user.data.email,
                bio: this.$store.state.user.data.bio
            },
            error: null
        }
    },
    methods: {
        async updateSettings() {
            const response = await api.patch(`/users/${this.$store.state.user.data._id}`, this.data)
            if (response.ok) {
                this.$router.push({name: 'user', params: { username: this.data.username }})
            }
            else {
                this.error = await response.json()
            }
        }
    }
}
</script>