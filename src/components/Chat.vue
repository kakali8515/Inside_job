<template>
    <div class="chat-wrap">
        <!-- <span class="chat-wrap-innr">
            <img src="@/assets/icons/chat-icon2.svg" alt="" />
        </span> -->
        <!-- example 1 -->
        <!-- <button class="custom-button-1">chat</button> -->

        <!-- example 2 -->
        <!-- <button id="custom-button-2">chat</button> -->
    </div>
</template>

<script>
import { reactive } from "vue";
import { recruitermypage } from "@/service/API/recruitermypage.js";
export default {
    name: "Chat",
    mounted() {
        console.log('chat mounted');
        //Channel Plugin Scripts
        (function () {
            var w = window;
            if (w.ChannelIO) {
                return (window.console.error || window.console.log || function () { })(
                    "ChannelIO script included twice."
                );
            }
            var ch = function () {
                ch.c(arguments);
            };
            ch.q = [];
            ch.c = function (args) {
                ch.q.push(args);
            };
            w.ChannelIO = ch;
            function l() {
                if (w.ChannelIOInitialized) {
                    return;
                }
                w.ChannelIOInitialized = true;
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.async = true;
                s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
                s.charset = "UTF-8";
                var x = document.getElementsByTagName("script")[0];
                x.parentNode.insertBefore(s, x);
            }
            if (document.readyState === "complete") {
                l();
            } else if (window.attachEvent) {
                window.attachEvent("onload", l);
            } else {
                window.addEventListener("DOMContentLoaded", l, false);
                window.addEventListener("load", l, false);
            }
        })();
        ChannelIO("boot", {
            pluginKey: "3e5d41c9-b6e5-44f3-bda7-5c7e84aa76b5", //please fill with your plugin key
            // customLauncherSelector: ".custom-button-1, #custom-button-2",
            // hideChannelButtonOnBoot: true,
            appearance: "system",
            mobileMessengerMode: "iframe",
        });
        //End Channel Plugin
    },
    unmounted() {
        console.log('chat unmounted');
        ChannelIO('shutdown');
    }
};
</script>

<style lang="scss" scoped>
#ch-plugin {  
      bottom: 130px !important;
      z-index: 99 !important;
      right: 16px !important;   
    .gybbpr {
      border-radius: 100% !important;
    }
  
}
</style>
