<script>
    import {selectedChat} from "$lib/store.js";
    import avatar from "$lib/avatar.jpg";
    function lastOnline(profile){
        if(profile.is_online) {
            return 'online'
        }
        let last_online = new Date(profile.last_online)
        let now = new Date()
        let difference = (now - last_online) / 1000
        if(difference <= 24*60*60){
            let hours = Math.floor(difference / (60 * 60))
            let minutes = Math.floor((difference - (hours * 60 * 60)) / 60)
            return `${hours ? hours + 'hours': ''} ${minutes ? minutes + 'minutes': ''} ago`
        }
        return last_online.toDateString()
    }
</script>


<div class="detail-area">
    <div class="detail-area-header">
        {#if $selectedChat.id}
            <div class="image-container">
                <img src={$selectedChat.avatar ? $selectedChat.avatar: avatar} class="detail-image">
            </div>
            <div class="detail-title">{$selectedChat.name}</div>
            {#if $selectedChat.members.length > 1}
                <div class="detail-subtitle">Created by Aysenur, 1 May 2020</div>
            {:else}
                <div class="detail-subtitle">{lastOnline($selectedChat.members[0].profile)}</div>
            {/if}
        {/if}
    </div>
</div>

<style>
    .detail-area {
        width: 340px;
        flex-shrink: 0;
    }
    .detail-area {
        border-left: 1px solid var(--border-color);
        margin-left: auto;
        padding: 30px 30px 0 30px;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    .detail-area-header {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .detail-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .detail-subtitle {
        font-size: 12px;
        font-weight: 600;
        color: var(--msg-date);
    }
    .detail-area input {
        background-color: transparent;
        border: none;
        width: 100%;
        color: var(--body-color);
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23c1c7cd'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-size: 16px;
        background-position: 100%;
        font-family: var(--body-font);
        font-weight: 600;
        font-size: 14px;
        border-bottom: 1px solid var(--border-color);
        padding: 14px 0;
    }
    .detail-area input::placeholder {
        color: var(--detail-font-color);
    }
    @media (max-width: 1120px) {
        .detail-area {
            display: none;
        }
    }
    .image-container{
        align-self: center;
        align-content: center;
        justify-content: center;
        overflow: hidden;
        display: flex;
        width: 100%;
        height: 15rem;
    }
    .detail-image{
        max-width: 100%;
        aspect-ratio: auto;
        object-fit: contain;
    }
</style>