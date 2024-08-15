<script>
    import ChatHeader from "./ChatHeader.svelte";
    import ChatFooter from "./ChatFooter.svelte";
</script>

<div class="chat-area">
    <ChatHeader/>
    <div class="chat-area-main">
        <div class="chat-msg">
            <div class="chat-msg-profile">
                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
                <div class="chat-msg-date">Message seen 1.22pm</div>
            </div>
            <div class="chat-msg-content">
                <div class="chat-msg-text">Luctus et ultrices posuere cubilia curae.</div>
                <div class="chat-msg-text">
                    <img src="https://media0.giphy.com/media/yYSSBtDgbbRzq/giphy.gif?cid=ecf05e47344fb5d835f832a976d1007c241548cc4eea4e7e&rid=giphy.gif" /></div>
                <div class="chat-msg-text">Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Pretium lectus quam id leo.</div>
            </div>
        </div>
        <div class="chat-msg owner">
            <div class="chat-msg-profile">
                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
                <div class="chat-msg-date">Message seen 1.22pm</div>
            </div>
            <div class="chat-msg-content">
                <div class="chat-msg-text">Sit amet risus nullam eget felis eget. Dolor sed viverra ipsum😂😂😂</div>
                <div class="chat-msg-text">Cras mollis nec arcu malesuada tincidunt.</div>
            </div>
        </div>
        <div class="chat-msg">
            <div class="chat-msg-profile">
                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt="">
                <div class="chat-msg-date">Message seen 2.45pm</div>
            </div>
            <div class="chat-msg-content">
                <div class="chat-msg-text">Aenean tristique maximus tortor non tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae😊</div>
                <div class="chat-msg-text">Ut faucibus pulvinar elementum integer enim neque volutpat.</div>
            </div>
        </div>
        <div class="chat-msg owner">
            <div class="chat-msg-profile">
                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
                <div class="chat-msg-date">Message seen 2.50pm</div>
            </div>
            <div class="chat-msg-content">
                <div class="chat-msg-text">posuere eget augue sodales, aliquet posuere eros.</div>
                <div class="chat-msg-text">Cras mollis nec arcu malesuada tincidunt.</div>
            </div>
        </div>
        <div class="chat-msg">
            <div class="chat-msg-profile">
                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png" alt="" />
                <div class="chat-msg-date">Message seen 3.16pm</div>
            </div>
            <div class="chat-msg-content">
                <div class="chat-msg-text">Egestas tellus rutrum tellus pellentesque</div>
            </div>
        </div>
        <div class="chat-msg">
            <div class="chat-msg-profile">
                <img class="chat-msg-img account-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="">
                <div class="chat-msg-date">Message seen 3.16pm</div>
            </div>
            <div class="chat-msg-content">
                <div class="chat-msg-text">Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et.</div>
            </div>
        </div>
        <div class="chat-msg owner">
            <div class="chat-msg-profile">
                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
                <div class="chat-msg-date">Message seen 2.50pm</div>
            </div>
            <div class="chat-msg-content">
                <div class="chat-msg-text">Tincidunt arcu non sodales😂</div>
            </div>
        </div>
        <div class="chat-msg">
            <div class="chat-msg-profile">
                <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt="">
                <div class="chat-msg-date">Message seen 3.16pm</div>
            </div>
            <div class="chat-msg-content">
                <div class="chat-msg-text">Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et🥰</div>
            </div>
        </div>
    </div>
    <ChatFooter/>
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