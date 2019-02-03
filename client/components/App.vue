<template lang="pug">
div#app
    div#mainHeaderWrapper
        header#mainHeader.container
            h1
                router-link(v-bind:to="{name: 'home'}")
                    hand-icon.microblog-logo
                    |microblog
            div.fg1
            router-link.green.button(v-bind:to="{ name: 'sign-up' }" v-if="!logged") Sign Up
            router-link.button(v-bind:to="{ name: 'sign-in' }" v-if="!logged" )
                i.fas.fa-sign-in-alt
                |Sign In
    #main
        .fg1
        nav.panel
            .nav-profile(v-if="logged")
                .nav-profile-icon(v-html="identicon")
                .nav-profile-text
                    span.name {{userdata.name}}
                    span.username @{{userdata.username}}
            router-link(v-bind:to="{ name: 'user', params: {username: userdata.username}}" v-if="logged")
                span
                    account-icon
                |My profile
            router-link(v-bind:to="{ name: 'settings' }" v-if="logged")
                span
                    tune-icon
                |Settings
            a(v-on:click="$store.dispatch('logout')" v-if="logged")
                span
                    logout-icon
                |Log out
        router-view
        nav.panel
        .fg1
    footer#mainFooter.container
        p je suis un footer
</template>

<script>
import jdenticon from "jdenticon"
import sha from "sha.js"
import AccountIcon from "vue-material-design-icons/Account"
import TuneIcon from "vue-material-design-icons/Tune"
import LogoutIcon from "vue-material-design-icons/Logout"
import HandIcon from "vue-material-design-icons/Hand"
export default {
    computed: {
        logged() {
            return this.$store.state.user.logged
        },
        userdata() {
            return this.$store.state.user.data
        },
        identicon() {
            return jdenticon.toSvg(sha('sha256').update(this.$store.state.user.data._id).digest('hex'), 50)
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    },
    components: {
        AccountIcon,
        TuneIcon,
        LogoutIcon,
        HandIcon
    }
}
</script>

<style lang="stylus">
.nav-profile
    border-bottom: 1px solid #ddd;
    display flex
    align-items center
    padding 10px 15px
.nav-profile-icon
    background: #dedede;
    border-radius: 3px;
.nav-profile-text
    margin-left 10px
    display flex
    flex-direction column
.nav-profile-text .name
    font-weight: bold;
    color: #55f;
.nav-profile-text .username
    color #777
nav.panel a
    display flex
    align-items center
nav.panel a .material-design-icon__svg 
    height 1em
    width 1em
    margin-right .5em
.microblog-logo
    width 40px
    display flex
</style>
