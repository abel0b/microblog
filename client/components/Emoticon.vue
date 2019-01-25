<template lang="pug">
    div(v-bind:is="emoticon")
</template>
<script>
import Emoticon from "vue-material-design-icons/Emoticon"
import EmoticonAngry from "vue-material-design-icons/EmoticonAngry"
import EmoticonAngryOutline from "vue-material-design-icons/EmoticonAngryOutline"
import EmoticonCool from "vue-material-design-icons/EmoticonCool"
import EmoticonCoolOutline from "vue-material-design-icons/EmoticonCoolOutline"
import EmoticonCry from "vue-material-design-icons/EmoticonCry"
import EmoticonCryOutline from "vue-material-design-icons/EmoticonCryOutline"
import EmoticonDead from "vue-material-design-icons/EmoticonDead"
import EmoticonDeadOutline from "vue-material-design-icons/EmoticonDeadOutline"
import EmoticonDevil from "vue-material-design-icons/EmoticonDevil"
import EmoticonDevilOutline from "vue-material-design-icons/EmoticonDevilOutline"
import EmoticonExcited from "vue-material-design-icons/EmoticonExcited"
import EmoticonExcitedOutline from "vue-material-design-icons/EmoticonExcitedOutline"
import EmoticonHappy from "vue-material-design-icons/EmoticonHappy"
import EmoticonHappyOutline from "vue-material-design-icons/EmoticonHappyOutline"
import EmoticonKiss from "vue-material-design-icons/EmoticonKiss"
import EmoticonKissOutline from "vue-material-design-icons/EmoticonKissOutline"
import EmoticonNeutral from "vue-material-design-icons/EmoticonNeutral"
import EmoticonNeutralOutline from "vue-material-design-icons/EmoticonNeutralOutline"
import EmoticonOutline from "vue-material-design-icons/EmoticonOutline"
import EmoticonPoop from "vue-material-design-icons/EmoticonPoop"
import EmoticonPoopOutline from "vue-material-design-icons/EmoticonPoopOutline"
import EmoticonSad from "vue-material-design-icons/EmoticonSad"
import EmoticonSadOutline from "vue-material-design-icons/EmoticonSadOutline"
import EmoticonTongue from "vue-material-design-icons/EmoticonTongue"
import EmoticonTongueOutline from "vue-material-design-icons/EmoticonTongueOutline"
import EmoticonWink from "vue-material-design-icons/EmoticonWink"
import EmoticonWinkOutline from "vue-material-design-icons/EmoticonWinkOutline"

export default {
    props: {
        name: String
    },
    data() {
        return {
            icons: {
                Emoticon,
                EmoticonAngry,
                EmoticonAngryOutline,
                EmoticonCool,
                EmoticonCoolOutline,
                EmoticonCry,
                EmoticonCryOutline,
                EmoticonDead,
                EmoticonDeadOutline,
                EmoticonDevil,
                EmoticonDevilOutline,
                EmoticonExcited,
                EmoticonExcitedOutline,
                EmoticonHappy,
                EmoticonHappyOutline,
                EmoticonKiss,
                EmoticonKissOutline,
                EmoticonNeutral,
                EmoticonNeutralOutline,
                EmoticonOutline,
                EmoticonPoop,
                EmoticonPoopOutline,
                EmoticonSad,
                EmoticonSadOutline,
                EmoticonTongue,
                EmoticonTongueOutline,
                EmoticonWink,
                EmoticonWinkOutline
            }
        }
    },
    computed: {
        emoticon() {
            return this.icons[this.name] || this.icons['Emoticon']
        }
    }
}
</script>
