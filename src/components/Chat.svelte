<script>
    import ChatHeader from "./ChatHeader.svelte";
    import ChatFooter from "./ChatFooter.svelte";
    import {selectedChat} from "$lib/store.js";
    import {beforeUpdate, afterUpdate, onMount, onDestroy} from 'svelte';
    import avatar from "$lib/avatar.jpg"
    import {refreshTokens} from "$lib";


    export let data;

    const backend_base_websocket = 'ws://127.0.0.1:8000/'
    export let user
    $: socket = null
    let messages = []

    let chatArea;
    let scrollHeight = 0;
    let messagesHeight = 96
    let autoscroll = false;



    beforeUpdate(() => {
        if(chatArea) {
            const scrollableDistance = chatArea.scrollHeight - chatArea.offsetHeight;
            autoscroll = chatArea.scrollTop > scrollableDistance - 20;
        }
    });

    afterUpdate(() => {
        if (autoscroll) {
            chatArea.scrollTo(0, chatArea.scrollHeight);
        }
    });

    selectedChat.subscribe(currentChat => {
        if (currentChat.id) {
            if (socket){
                messages = []
                socket.close()
            }
            socket = new WebSocket(backend_base_websocket + 'ws/chat/' + currentChat.id +'/?token=' + data.access_token)
            socket.addEventListener('message', event => {
                messages = JSON.parse(event.data)
                messages.reverse()
            })
            socket.addEventListener('error', async event => {
                let access_refresh = await refreshTokens(data.refresh_token)
                data.access_token = access_refresh.access_token
                data.refresh_token = access_refresh.refresh_token
                socket = new WebSocket(backend_base_websocket + 'ws/chat/' + $selectedChat.id +'/?token=' + data.access_token)
            })

        }
    })

    function sendMessage(message){
        let data = {'message': message}
        if (socket) {
            socket.send(JSON.stringify(data))
        }
    }

    function seenMessage(event){
        const firstMessageToLastVisibleDistance = event.target.scrollTop + event.target.offsetHeight
        const cuntOfSeenMessages = firstMessageToLastVisibleDistance / messagesHeight
        const unSeenMessagesIdList = messages.slice(0, cuntOfSeenMessages).filter((message) => !message.seen).map((message) => message.id)
        if (unSeenMessagesIdList) {
            let data = {'seen': unSeenMessagesIdList}
            socket.send(JSON.stringify(data))
        }
    }

    function getMessageCreatedAt(message){
        const createdAt = new Date(message.created_at)
        const options = {
            hour12: false,
            timeStyle: 'short'
        }
        return `${createdAt.toISOString().split('T')[0]} ${createdAt.toLocaleTimeString(undefined, options)}`
    }

</script>

<div class="chat-area" bind:this={chatArea} on:scrollend={seenMessage}>
    <ChatHeader/>
    <div class="chat-area-main">
        {#each messages as message}
            {#if user.id === message.user.id}
                <div class="chat-msg owner">
                    <div class="chat-msg-profile">
                        <img class="chat-msg-img" src={user.profile.avatar} alt="" />
                        <div class="chat-msg-date">{getMessageCreatedAt(message)}</div>
                    </div>
                    <div class="chat-msg-content">
                        <div class="chat-msg-text">{message.text}</div>
                    </div>
                </div>
            {:else}
                <div class="chat-msg">
                    <div class="chat-msg-profile">
                        <img class="chat-msg-img" src={$selectedChat.members.length === 1 && $selectedChat.members[0].profile.avatar? $selectedChat.members[0].profile.avatar: avatar} alt="" />
                        <div class="chat-msg-date">{getMessageCreatedAt(message)}</div>
                    </div>
                    <div class="chat-msg-content">
                        <div class="chat-msg-text">{message.text}</div>
                    </div>
                </div>
            {/if}
        {/each}
<!--        <div class="chat-msg owner">-->
<!--            <div class="chat-msg-profile">-->
<!--                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />-->
<!--                <div class="chat-msg-date">Message seen 1.22pm</div>-->
<!--            </div>-->
<!--            <div class="chat-msg-content">-->
<!--                <div class="chat-msg-text">Sit amet risus nullam eget felis eget. Dolor sed viverra ipsum😂😂😂</div>-->
<!--                <div class="chat-msg-text">Cras mollis nec arcu malesuada tincidunt.</div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="chat-msg">-->
<!--            <div class="chat-msg-profile">-->
<!--                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt="">-->
<!--                <div class="chat-msg-date">Message seen 2.45pm</div>-->
<!--            </div>-->
<!--            <div class="chat-msg-content">-->
<!--                <div class="chat-msg-text">Aenean tristique maximus tortor non tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae😊</div>-->
<!--                <div class="chat-msg-text">Ut faucibus pulvinar elementum integer enim neque volutpat.</div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="chat-msg owner">-->
<!--            <div class="chat-msg-profile">-->
<!--                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />-->
<!--                <div class="chat-msg-date">Message seen 2.50pm</div>-->
<!--            </div>-->
<!--            <div class="chat-msg-content">-->
<!--                <div class="chat-msg-text">posuere eget augue sodales, aliquet posuere eros.</div>-->
<!--                <div class="chat-msg-text">Cras mollis nec arcu malesuada tincidunt.</div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="chat-msg">-->
<!--            <div class="chat-msg-profile">-->
<!--                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png" alt="" />-->
<!--                <div class="chat-msg-date">Message seen 3.16pm</div>-->
<!--            </div>-->
<!--            <div class="chat-msg-content">-->
<!--                <div class="chat-msg-text">Egestas tellus rutrum tellus pellentesque</div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="chat-msg">-->
<!--            <div class="chat-msg-profile">-->
<!--                <img class="chat-msg-img account-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="">-->
<!--                <div class="chat-msg-date">Message seen 3.16pm</div>-->
<!--            </div>-->
<!--            <div class="chat-msg-content">-->
<!--                <div class="chat-msg-text">Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et.</div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="chat-msg owner">-->
<!--            <div class="chat-msg-profile">-->
<!--                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />-->
<!--                <div class="chat-msg-date">Message seen 2.50pm</div>-->
<!--            </div>-->
<!--            <div class="chat-msg-content">-->
<!--                <div class="chat-msg-text">Tincidunt arcu non sodales😂</div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="chat-msg">-->
<!--            <div class="chat-msg-profile">-->
<!--                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt="">-->
<!--                <div class="chat-msg-date">Message seen 3.16pm</div>-->
<!--            </div>-->
<!--            <div class="chat-msg-content">-->
<!--                <div class="chat-msg-text">Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et🥰</div>-->
<!--            </div>-->
<!--        </div>-->
    </div>
    {#if $selectedChat.id}
        <ChatFooter sendMessage={sendMessage}/>
    {/if}
</div>

<style>
    .chat-area {
        flex-grow: 1;
    }
    .chat-area {
        display: flex;
        flex-direction: column;
        overflow: auto;
    }



    .chat-area-main {
        flex-grow: 1;
    }

    .chat-msg-img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

    .chat-msg-profile {
        flex-shrink: 0;
        margin-top: auto;
        margin-bottom: -20px;
        position: relative;
    }

    .chat-msg-date {
        position: absolute;
        left: calc(100% + 12px);
        bottom: 0;
        font-size: 12px;
        font-weight: 600;
        color: var(--msg-date);
        white-space: nowrap;
    }

    .chat-msg {
        display: flex;
        padding: 0 20px 45px;
    }
    .chat-msg-content {
        margin-left: 12px;
        max-width: 70%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .chat-msg-text {
        background-color: var(--chat-text-bg);
        padding: 15px;
        border-radius: 20px 20px 20px 0;
        line-height: 1.5;
        font-size: 14px;
        font-weight: 500;
    }


    .chat-msg-text + .chat-msg-text {
        margin-top: 10px;
    }

    .chat-msg-text {
        color: var(--chat-text-color);
    }

    .owner {
        flex-direction: row-reverse;
    }
    .owner .chat-msg-content {
        margin-left: 0;
        margin-right: 12px;
        align-items: flex-end;
    }
    .owner .chat-msg-text {
        background-color: var(--theme-color);
        color: #fff;
        border-radius: 20px 20px 0 20px;
    }
    .owner .chat-msg-date {
        left: auto;
        right: calc(100% + 12px);
    }

    .chat-msg-text img {
        max-width: 300px;
        width: 100%;
    }
</style>