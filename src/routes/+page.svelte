<script>
    import Header from "../components/Header.svelte";
    import Conversations from "../components/Conversations.svelte";
    import Detail from "../components/Detail.svelte";
    import Chat from "../components/Chat.svelte";
    import {afterUpdate} from "svelte";
    import {selectedChat} from "$lib/store.js";

    const backend_base_url = 'http://127.0.0.1:8000/'
    const backend_base_ws_url = 'ws://127.0.0.1:8000/'
    /** @type {import('./$types').PageData} */
    export let data;
    afterUpdate(() => {
        if (data.access_token){
            const socket = new WebSocket(backend_base_ws_url + 'ws/information' + '/?token=' + data.access_token)
            socket.addEventListener('open', async event => {
                console.log(event)
            })
            socket.addEventListener('message', event => {
                console.log(event.data)
            })
        }
    });


</script>

<div class="app">
    <Header user_info={data.user_info}/>
    <div class="wrapper">
        <Conversations access_token={data.access_token}/>
        <Chat access_token={data.access_token} user={data.user_info}/>
        <Detail/>
    </div>
</div>


<style>
    @charset "UTF-8";
    @import url("https://fonts.googleapis.com/css?family=Manrope:300,400,500,600,700&display=swap&subset=latin-ext");
    :global(:root) {
        --body-bg-color: #e5ecef;
        --theme-bg-color: #fff;
        --settings-icon-hover: #9fa7ac;
        --developer-color: #f9fafb;
        --input-bg: #f8f8fa;
        --input-chat-color: #a2a2a2;
        --border-color: #eef2f4;
        --body-font: "Manrope", sans-serif;
        --body-color: #273346;
        --settings-icon-color: #c1c7cd;
        --msg-message: #969eaa;
        --chat-text-bg: #f1f2f6;
        --theme-color: #0086ff;
        --msg-date: #c0c7d2;
        --button-bg-color: #f0f7ff;
        --button-color: var(--theme-color);
        --detail-font-color: #919ca2;
        --msg-hover-bg: rgba(238, 242, 244, 0.4);
        --active-conversation-bg: linear-gradient(
                to right,
                rgba(238, 242, 244, 0.4) 0%,
                rgba(238, 242, 244, 0) 100%
        );
        --overlay-bg: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 1) 65%,
                rgba(255, 255, 255, 1) 100%
        );
        --chat-header-bg: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 1) 0%,
                rgba(255, 255, 255, 1) 78%,
                rgba(255, 255, 255, 0) 100%
        );
    }

    [data-theme=purple] {
        --theme-color: #9f7aea;
        --button-color: #9f7aea;
        --button-bg-color: rgba(159, 122, 234, 0.12);
    }

    [data-theme=green] {
        --theme-color: #38b2ac;
        --button-color: #38b2ac;
        --button-bg-color: rgba(56, 178, 171, 0.15);
    }

    [data-theme=orange] {
        --theme-color: #ed8936;
        --button-color: #ed8936;
        --button-bg-color: rgba(237, 137, 54, 0.12);
    }

    :global(.dark-mode) {
        --body-bg-color: #1d1d1d;
        --theme-bg-color: #27292d;
        --border-color: #323336;
        --body-color: #d1d1d2;
        --active-conversation-bg: linear-gradient(
                to right,
                rgba(47, 50, 56, 0.54),
                rgba(238, 242, 244, 0) 100%
        );
        --msg-hover-bg: rgba(47, 50, 56, 0.54);
        --chat-text-bg: #383b40;
        --chat-text-color: #b5b7ba;
        --msg-date: #626466;
        --msg-message: var(--msg-date);
        --overlay-bg: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0) 0%,
                #27292d 65%,
                #27292d 100%
        );
        --input-bg: #2f3236;
        --chat-header-bg: linear-gradient(
                to bottom,
                #27292d 0%,
                #27292d 78%,
                rgba(255, 255, 255, 0) 100%
        );
        --settings-icon-color: #7c7e80;
        --developer-color: var(--border-color);
        --button-bg-color: #393b40;
        --button-color: var(--body-color);
        --input-chat-color: #6f7073;
        --detail-font-color: var(--input-chat-color);
    }
    .blue {
        background-color: #0086ff;
    }

    .purple {
        background-color: #9f7aea;
    }

    .green {
        background-color: #38b2ac;
    }

    .orange {
        background-color: #ed8936;
    }

    :global(*) {
        outline: none;
        box-sizing: border-box;
    }

    img {
        max-width: 100%;
    }
    :global(body) {
        background-color: var(--body-bg-color);
        font-family: var(--body-font);
        color: var(--body-color);
        margin: 0;
    }
    :global(html) {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
    }
    .app {
        display: flex;
        flex-direction: column;
        background-color: var(--theme-bg-color);
        max-width: 1600px;
        /*max-width: 100%;*/
        height: 100vh;
        margin: 0 auto;
        overflow: hidden;
    }
    .wrapper {
        width: 100%;
        display: flex;
        flex-grow: 1;
        overflow: hidden;
    }



    :global(.msg-profile) {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 15px;
    }
    :global(.msg-profile.group) {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--border-color);
    }
    :global(.msg-profile.group svg) {
        width: 60%;
    }
    :global(.detail-area-header .msg-profile) {
        margin-right: 0;
        width: 60px;
        height: 60px;
        margin-bottom: 15px;
    }
    .detail-button {
        border: 0;
        background-color: var(--button-bg-color);
        padding: 10px 14px;
        border-radius: 5px;
        color: var(--button-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        flex-grow: 1;
        font-weight: 500;
    }
    .detail-button svg {
        width: 18px;
        margin-right: 10px;
    }
    .detail-button:last-child {
        margin-left: 8px;
    }

    .detail-buttons {
        margin-top: 20px;
        display: flex;
        width: 100%;
    }

    .detail-changes {
        margin-top: 40px;
    }

    .detail-change {
        color: var(--detail-font-color);
        font-family: var(--body-font);
        font-weight: 600;
        font-size: 14px;
        border-bottom: 1px solid var(--border-color);
        padding: 14px 0;
        display: flex;
    }
    .detail-change svg {
        width: 16px;
        margin-left: auto;
    }

    .colors {
        display: flex;
        margin-left: auto;
    }

    .color {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        cursor: pointer;
    }
    .color.selected {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' stroke='%23fff' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1' viewBox='0 0 24 24'%3E%3Cpath d='M20 6L9 17l-5-5'/%3E%3C/svg%3E");
        background-size: 10px;
        background-position: center;
        background-repeat: no-repeat;
    }
    .color:not(:last-child) {
        margin-right: 4px;
    }

    .detail-photo-title {
        display: flex;
        align-items: center;
    }
    .detail-photo-title svg {
        width: 16px;
    }

    .detail-photos {
        margin-top: 30px;
        text-align: center;
    }

    .detail-photo-title {
        color: var(--detail-font-color);
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .detail-photo-title svg {
        margin-right: 8px;
    }

    .detail-photo-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 6px;
        grid-row-gap: 6px;
        grid-template-rows: repeat(3, 60px);
    }
    .detail-photo-grid img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 8px;
        object-position: center;
    }

    .view-more {
        color: var(--theme-color);
        font-weight: 600;
        font-size: 15px;
        margin: 25px 0;
    }

    .follow-me {
        text-decoration: none;
        font-size: 14px;
        width: calc(100% + 60px);
        margin-left: -30px;
        display: flex;
        align-items: center;
        margin-top: auto;
        overflow: hidden;
        color: #9c9cab;
        padding: 0 20px;
        height: 52px;
        flex-shrink: 0;
        position: relative;
        justify-content: center;
    }
    .follow-me svg {
        width: 16px;
        height: 16px;
        margin-right: 8px;
    }

    .follow-text {
        display: flex;
        align-items: center;
        transition: 0.3s;
    }

    .follow-me:hover .follow-text {
        transform: translateY(100%);
    }
    .follow-me:hover .developer {
        top: 0;
    }

    .developer {
        position: absolute;
        color: var(--detail-font-color);
        font-weight: 600;
        left: 0;
        top: -100%;
        display: flex;
        transition: 0.3s;
        padding: 0 20px;
        align-items: center;
        justify-content: center;
        background-color: var(--developer-color);
        width: 100%;
        height: 100%;
    }

    .developer img {
        border-radius: 50%;
        width: 26px;
        height: 26px;
        object-fit: cover;
        margin-right: 10px;
    }




</style>