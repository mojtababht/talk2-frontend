<script>
    import {onMount} from "svelte";
    import avatar from "$lib/avatar.jpg"
    import AddChat from "./AddChat.svelte";
    import {selectedChat} from "$lib/store.js";

    export let access_token
    const backend_base_url = 'http://127.0.0.1:8000/'
    const chats_url = backend_base_url + 'api/chats/'

    $: selected_chat = {}
    let chats = []

    onMount(async () => {
        let response = await fetch(chats_url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
        if (response.ok) {
            chats = await response.json()
            chats = chats.results
        }
    })
    let showModal = false

    function mmd(chat){
        selected_chat = chat
        selectedChat.set(selected_chat)
    }

</script>


<div class="conversation-area">
    {#each chats as chat}
        <div name="{chat.name}" class="msg online {selected_chat === chat ? 'active' : ''}" on:click={mmd(chat)}>
            <img class="msg-profile" src={chat.avatar ? chat.avatar : avatar} alt={chat.name}/>
            <div class="msg-detail">
                <div class="msg-username">{chat.name}</div>
                <div class="msg-content">
<!--                    <span class="msg-message">What time was our meet</span>-->
<!--                    <span class="msg-date">20m</span>-->
                </div>
            </div>
        </div>
    {/each}
<!--    <div class="msg">-->
<!--        <img class="msg-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png" alt="" />-->
<!--        <div class="msg-detail">-->
<!--            <div class="msg-username">Miguel Cohen</div>-->
<!--            <div class="msg-content">-->
<!--                <span class="msg-message">Adaptogen taiyaki austin jean shorts brunch</span>-->
<!--                <span class="msg-date">20m</span>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--    <div class="msg active">-->
<!--        <div class="msg-profile group">-->
<!--            <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">-->
<!--                <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5" />-->
<!--                <path d="M22 8.5l-10 7-10-7" />-->
<!--                <path d="M2 15.5l10-7 10 7M12 2v6.5" /></svg>-->
<!--        </div>-->
<!--        <div class="msg-detail">-->
<!--            <div class="msg-username">CodePen Group</div>-->
<!--            <div class="msg-content">-->
<!--                <span class="msg-message">Aysenur: I love CSS</span>-->
<!--                <span class="msg-date">28m</span>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
    <button class="add" on:click={() => showModal = true}></button>
    <AddChat bind:showModal>
        <form action="?/addChat" method="POST" class="add-form">
            <input type="text" name="username" required="" class="input-box" placeholder="Username"/>
            <button autofocus type="submit" class="btn-submit">add</button>
        </form>
    </AddChat>

    <div class="overlay"></div>
</div>

<style>
    .conversation-area{
        width: 340px;
        flex-shrink: 0;
    }
    .conversation-area {
        border-right: 1px solid var(--border-color);
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .msg {
        display: flex;
        align-items: center;
        padding: 20px;
        cursor: pointer;
        transition: 0.2s;
        position: relative;
    }
    .msg:hover {
        background-color: var(--msg-hover-bg);
    }
    .msg.active {
        background: var(--active-conversation-bg);
        border-left: 4px solid var(--theme-color);
    }
    .msg.online:before {
        content: "";
        position: absolute;
        background-color: #23be7e;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        border: 2px solid var(--theme-bg-color);
        left: 50px;
        bottom: 19px;
    }

    .msg-username {
        margin-bottom: 4px;
        font-weight: 600;
        font-size: 15px;
    }

    .msg-detail {
        overflow: hidden;
    }

    .msg-content {
        font-weight: 500;
        font-size: 13px;
        display: flex;
    }

    .msg-message {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--msg-message);
    }

    .msg-date {
        font-size: 14px;
        color: var(--msg-date);
        margin-left: 3px;
    }
    .msg-date:before {
        content: "•";
        margin-right: 2px;
    }

    .add {
        position: sticky;
        bottom: 25px;
        background-color: var(--theme-color);
        width: 60px;
        height: 60px;
        border: 0;
        border-radius: 50%;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-plus'%3e%3cpath d='M12 5v14M5 12h14'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 28px;
        box-shadow: 0 0 16px var(--theme-color);
        margin: auto auto -55px;
        flex-shrink: 0;
        z-index: 1;
        cursor: pointer;
    }

    .overlay {
        position: sticky;
        bottom: 0;
        left: 0;
        width: 340px;
        flex-shrink: 0;
        background: var(--overlay-bg);
        height: 80px;
    }


    .add-form {
        background: transparent;
        /*background-color: #76d8ff;*/
        /*background-color: red;*/
        display: flex;
        /*overflow: hidden;*/
        border: solid 1px var(--border-color);
        border-radius: 4px;

    }


    .input-box {
        background: transparent;
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: var(--chat-text-color);
        /*margin-bottom: 30px;*/
        /*border: none;*/
        border: solid 1px var(--theme-color);
        border-radius: 4px 0 0 4px;
    }

    .input-box:focus{
        transition: 300ms;
        border: solid 0.5px var(--theme-color);
    }

    .btn-submit{
        background-color: var(--border-color);
        border: solid 0.1px var(--theme-color);
        border-radius:0 4px 4px 0;
        color: var(--chat-text-color);
    }
    .btn-submit:hover{
        background-color: var(--theme-color);
        transition: 300ms;
    }

</style>