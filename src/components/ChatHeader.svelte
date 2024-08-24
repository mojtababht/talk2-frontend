<script>
    import {selectedChat} from "$lib/store.js";

    $: selected_chat = $selectedChat
</script>


<div class="chat-area-header">
    {#if selected_chat.id}
    <div class="chat-area-title">{selected_chat.name}</div>
    <div class="chat-area-group">
        {#each selected_chat.members.slice(0, 3) as member, i}
            <img class="chat-area-profile" src={member.profile.avatar} alt={member.username} />
        {/each}
        {#if selected_chat.members.length > 3}
            <span>+{selected_chat.members.length - 3}</span>
        {:else}
            <span style="background: transparent; border: none"></span>
        {/if}
    </div>
    {/if}
</div>

<style>
    .chat-area-header {
        display: flex;
        position: sticky;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        background: var(--chat-header-bg);
    }
    .chat-area-title {
        font-size: 18px;
        font-weight: 600;
    }
    .dark-mode .chat-area-group span {
        color: #d1d1d2;
    }

    .chat-area-group {
        flex-shrink: 0;
        display: flex;
    }
    .chat-area-group * {
        border: 2px solid var(--theme-bg-color);
    }
    .chat-area-group * + * {
        margin-left: -5px;
    }
    .chat-area-group span {
        width: 32px;
        height: 32px;
        background-color: var(--button-bg-color);
        color: var(--theme-color);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
    }
    .chat-area-profile {
        width: 32px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>