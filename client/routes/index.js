import HomePage from "../components/HomePage"
import SigninPage from "../components/SigninPage"
import SignupPage from "../components/SignupPage"
import UserProfile from "../components/UserProfile"
import UserSettings from "../components/UserSettings"

const routes = [
    {
        path: "/",
        name: "home",
        component: HomePage
    },
    {
        path: "/sign-in",
        name: "sign-in",
        component: SigninPage
    },
    {
        path: "/sign-up",
        name: "sign-up",
        component: SignupPage
    },
    {
        path: "/(@)?:username",
        name: "user",
        component: UserProfile
    },
    {
        path: "/settings",
        name: "settings",
        component: UserSettings
    }
]

export default routes