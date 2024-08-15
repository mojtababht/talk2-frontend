<div class="chat-area-header">
    <div class="chat-area-title">CodePen Group</div>
    <div class="chat-area-group">
        <img class="chat-area-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
        <img class="chat-area-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt="">
        <img class="chat-area-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png" alt="" />
        <span>+4</span>
    </div>
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