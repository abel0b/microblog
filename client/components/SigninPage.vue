
<template>
<div class="container">
        <h1 class="title">Sign In</h1>

        <form v-on:submit.prevent="signin">
            <div class="field">
                <label for="username">Username</label>

                <input id="username" type="text" name="username" v-model="data.username">
            </div>

            <div class="field">
                <label for="password">Password</label>

                <input id="password" type="password" v-model="data.password" name="password">
            </div>
            <div v-if="error" class="error">{{error.message}}</div>

            <div class="field">
                <button type="submit" class="button">
                    Sign in
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import api from "../api"

export default {
    data() {
        return {
            data: {
                username: "",
                password: "",
            },
            error: null,
        }
    },
    methods: {
        async signin() {
            const response = await api.post("/auth/login", this.data)
            if (response.ok) {
                const data = await response.json()
                this.$store.dispatch('login', {token: data.token, data: data.user})
                this.$router.push({name: 'home'})
            }
            else {
                this.error = await response.json()
            }
        }
    }
}
</script>