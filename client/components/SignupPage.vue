
<template lang="html">
<div class="container">
        <h1 class="title">Sign Up</h1>

        <form v-on:submit.prevent="signup">
            <div class="field">
                <label for="username">Username</label>

                <input id="username" type="text" name="username" v-model="data.username">
            </div>

            <div class="field">
                <label for="email">E-Mail Address</label>

                <input id="email" type="text" name="email" v-model="data.email">
            </div>

            <div class="field">
                <label for="password">Password</label>

                <input id="password" type="password" v-model="data.password" name="password">
            </div>

            <div v-if="error" class="error">{{error.message}}</div>

            <div class="field">
                <button type="submit" class="button">
                    Sign up
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
                email: "",
                password: "",
            },
            error: null,
        }
    },
    methods: {
        async signup() {
            const response = await api.post("/users", this.data)
            if (response.ok) {
                this.$router.push({name: 'home'})
            }
            else {
                this.error = await response.json()
            }
        }
    }
}
</script>